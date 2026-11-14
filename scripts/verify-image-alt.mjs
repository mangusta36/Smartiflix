import { chromium } from "playwright";
import { openProductionServer } from "./production-server.mjs";
import { publicQaRoutes } from "./qa-routes.mjs";

const GENERIC_ALT = /^(image|photo|picture|graphic|illustration|screenshot)$/i;

function attribute(tag, name) {
  const match = tag.match(new RegExp(`(?:^|\\s)${name}=(?:"([^"]*)"|'([^']*)')`, "i"));
  return match ? (match[1] ?? match[2] ?? "") : null;
}

function normalizedWords(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/).filter(Boolean);
}

function invalidAltReason(alt, src) {
  const trimmed = alt.trim();
  if (GENERIC_ALT.test(trimmed)) return "generic description";
  let assetSrc = src;
  try {
    const parsed = new URL(src, "http://smartiflix.test");
    if (parsed.pathname === "/_next/image" && parsed.searchParams.get("url")) assetSrc = parsed.searchParams.get("url");
  } catch {}
  const basename = decodeURIComponent(assetSrc.split("?")[0].split("/").pop() || "").replace(/\.[a-z0-9]+$/i, "");
  if (basename && normalizedWords(trimmed).join(" ") === normalizedWords(basename).join(" ")) return "filename used as alt text";
  const words = normalizedWords(trimmed);
  if (words.length > 30) return "suspiciously long alt text";
  const counts = new Map();
  for (const word of words.filter((item) => item.length > 3)) counts.set(word, (counts.get(word) || 0) + 1);
  if ([...counts.values()].some((count) => count >= 5)) return "suspicious repeated-keyword pattern";
  return null;
}

const server = await openProductionServer();
const browser = await chromium.launch({ headless: true });
const failures = [];
let htmlImages = 0;
let domImages = 0;
let missingAlt = 0;
let unmarkedEmptyAlt = 0;
let invalidDescriptions = 0;
let brokenImages = 0;

try {
  const page = await browser.newPage();
  for (const route of publicQaRoutes) {
    const response = await fetch(`${server.baseUrl}${route}`);
    const expectedStatus = route === "/__smartiflix-qa-not-found__" ? 404 : 200;
    if (response.status !== expectedStatus) failures.push(`${route}: expected HTTP ${expectedStatus}, received ${response.status}`);
    const html = await response.text();
    const tags = html.match(/<img\b[^>]*>/gi) || [];
    htmlImages += tags.length;
    for (const tag of tags) {
      const src = attribute(tag, "src") || "(missing src)";
      const alt = attribute(tag, "alt");
      const explicitlyDecorative = attribute(tag, "data-decorative") === "true" || attribute(tag, "role") === "presentation";
      if (alt === null) {
        missingAlt += 1;
        failures.push(`${route}: ${src} is missing an alt attribute in production HTML`);
      } else if (alt.trim() === "" && !explicitlyDecorative) {
        unmarkedEmptyAlt += 1;
        failures.push(`${route}: ${src} has empty alt without explicit decorative marking`);
      } else if (alt.trim()) {
        const reason = invalidAltReason(alt, src);
        if (reason) {
          invalidDescriptions += 1;
          failures.push(`${route}: ${src} has ${reason}: "${alt}"`);
        }
      }
    }

    const navigation = await page.goto(`${server.baseUrl}${route}`, { waitUntil: "networkidle" });
    if (navigation?.status() !== expectedStatus) failures.push(`${route}: browser received HTTP ${navigation?.status() ?? "unknown"}`);
    const imageLocators = page.locator("img");
    for (let index = 0; index < await imageLocators.count(); index += 1) {
      const image = imageLocators.nth(index);
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((element) => element.complete || new Promise((resolve) => {
        element.addEventListener("load", () => resolve(true), { once: true });
        element.addEventListener("error", () => resolve(false), { once: true });
        setTimeout(() => resolve(false), 5_000);
      }));
    }
    const browserImages = await page.locator("img").evaluateAll((images) => images.map((image) => ({
      src: image.currentSrc || image.getAttribute("src") || "(missing src)",
      hasAlt: image.hasAttribute("alt"),
      alt: image.getAttribute("alt"),
      decorative: image.dataset.decorative === "true" || image.getAttribute("role") === "presentation",
      complete: image.complete,
      naturalWidth: image.naturalWidth,
    })));
    domImages += browserImages.length;
    for (const image of browserImages) {
      if (!image.hasAlt) failures.push(`${route}: ${image.src} is missing alt in the browser DOM`);
      if (image.alt === "" && !image.decorative) failures.push(`${route}: ${image.src} is unmarked decorative/empty in the browser DOM`);
      if (!image.complete || image.naturalWidth === 0) {
        brokenImages += 1;
        failures.push(`${route}: ${image.src} did not load in Chromium`);
      }
    }
  }
} finally {
  await browser.close();
  await server.close();
}

console.log(`Routes checked: ${publicQaRoutes.length}`);
console.log(`Images checked: ${htmlImages} production HTML occurrences; ${domImages} browser DOM occurrences`);
console.log(`Missing alt attributes: ${missingAlt}`);
console.log(`Unmarked empty alt values: ${unmarkedEmptyAlt}`);
console.log(`Invalid descriptions: ${invalidDescriptions}`);
console.log(`Broken images: ${brokenImages}`);
if (failures.length) {
  console.error("Image alt verification: FAIL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log("Image alt verification: PASS");
