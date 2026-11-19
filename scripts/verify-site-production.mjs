import { chromium } from "playwright";
import { request as httpRequest } from "node:http";
import { readFileSync } from "node:fs";
import { openProductionServer } from "./production-server.mjs";
import { articleRoutes, staticRoutes } from "./qa-routes.mjs";
import { blogArticles } from "../src/data/blog.ts";
import { CANONICAL_ORIGIN } from "../src/lib/site.ts";

const expectedOrigin = CANONICAL_ORIGIN;

const routes = [...staticRoutes, ...articleRoutes];
const routeSet = new Set(routes);
const server = await openProductionServer();
const browser = await chromium.launch({ headless: true });
const failures = [];
const titles = new Map();
const descriptions = new Map();
const domainResults = [];
let internalLinkOccurrences = 0;
let jsonLdBlocks = 0;
let viewportChecks = 0;
let canonicalTags = 0;
let openGraphUrls = 0;
let twitterImageUrls = 0;
let sitemapEntries = 0;
const socialImagePaths = new Set();

const URL_BEARING_KEYS = new Set(["@id", "url", "mainEntityOfPage", "image", "logo", "contentUrl", "thumbnailUrl", "item", "publisher"]);
const forbiddenProductionHosts = new Set(["smartiflix.vercel.app", "smartiflix.io", "tvsmartiflix.online", "localhost", "127.0.0.1"]);

function recordUnique(map, value, route, label) {
  if (!value) return failures.push(`${route}: missing ${label}`);
  if (map.has(value)) failures.push(`${route}: duplicate ${label} also used by ${map.get(value)}`);
  else map.set(value, route);
}

function requestWithHost(baseUrl, path, hostname) {
  const target = new URL(path, baseUrl);
  return new Promise((resolve, reject) => {
    const request = httpRequest(target, { headers: { host: hostname } }, (response) => {
      response.resume();
      response.once("end", () => resolve({ status: response.statusCode, location: response.headers.location }));
    });
    request.once("error", reject);
    request.end();
  });
}

function collectStructuredUrls(value, path = "$", parentKey = "", output = []) {
  if (typeof value === "string") {
    if (URL_BEARING_KEYS.has(parentKey) || /^https?:\/\//i.test(value)) output.push({ path, value });
    return output;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectStructuredUrls(item, `${path}[${index}]`, parentKey, output));
    return output;
  }
  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) collectStructuredUrls(item, `${path}.${key}`, key, output);
  }
  return output;
}

function validateProductionUrl(value, context) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    failures.push(`${context}: invalid absolute URL ${value}`);
    return;
  }
  const hostname = parsed.hostname.toLowerCase();
  const isPreviewHost = hostname.endsWith(".vercel.app");
  if (forbiddenProductionHosts.has(hostname) || isPreviewHost) failures.push(`${context}: forbidden production host ${hostname}`);
  if (hostname === "www.tvsmartiflix.online" && parsed.protocol !== "https:") failures.push(`${context}: canonical host must use HTTPS (${value})`);
}

const appPaths = JSON.parse(readFileSync(".next/server/app-paths-manifest.json", "utf8"));
const builtStaticRoutes = Object.keys(appPaths)
  .filter((route) => route.endsWith("/page") && !route.startsWith("/_") && !route.includes("["))
  .map((route) => route.slice(0, -5) || "/")
  .sort();
const expectedStaticRoutes = [...staticRoutes].sort();
if (JSON.stringify(builtStaticRoutes) !== JSON.stringify(expectedStaticRoutes)) {
  failures.push(`built static route inventory differs: built=${builtStaticRoutes.join(",")} expected=${expectedStaticRoutes.join(",")}`);
}
const builtDynamicRoutes = Object.keys(appPaths).filter((route) => route.endsWith("/page") && route.includes("["));
if (JSON.stringify(builtDynamicRoutes) !== JSON.stringify(["/blog/[slug]/page"])) {
  failures.push(`unreviewed dynamic route inventory: ${builtDynamicRoutes.join(",") || "none"}`);
}

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const runtimeErrors = [];
  page.on("console", (message) => { if (message.type() === "error") runtimeErrors.push(`console: ${message.text()}`); });
  page.on("pageerror", (error) => runtimeErrors.push(`pageerror: ${error.message}`));

  for (const route of routes) {
    const routeFailureStart = failures.length;
    const response = await page.goto(`${server.baseUrl}${route}`, { waitUntil: "networkidle" });
    if (response?.status() !== 200) failures.push(`${route}: HTTP ${response?.status() ?? "unknown"}`);
    const data = await page.evaluate(() => ({
      lang: document.documentElement.lang,
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute("content"),
      canonicals: [...document.querySelectorAll('link[rel="canonical"]')].map((element) => element.getAttribute("href")),
      robots: document.querySelector('meta[name="robots"]')?.getAttribute("content"),
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content"),
      ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute("content"),
      ogUrls: [...document.querySelectorAll('meta[property="og:url"]')].map((element) => element.getAttribute("content")),
      ogImages: [...document.querySelectorAll('meta[property="og:image"]')].map((element) => element.getAttribute("content")),
      ogSiteName: document.querySelector('meta[property="og:site_name"]')?.getAttribute("content"),
      twitterCard: document.querySelector('meta[name="twitter:card"]')?.getAttribute("content"),
      twitterUrls: [...document.querySelectorAll('meta[name="twitter:url"]')].map((element) => element.getAttribute("content")),
      twitterImages: [...document.querySelectorAll('meta[name="twitter:image"]')].map((element) => element.getAttribute("content")),
      h1Count: document.querySelectorAll("main h1").length,
      hrefs: [...document.querySelectorAll("a[href]")].map((link) => link.getAttribute("href")),
      formActions: [...document.querySelectorAll("form[action]")].map((form) => form.getAttribute("action")),
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((script) => script.textContent || ""),
      staleDomainTokens: [
        "smartiflix.vercel.app",
        "smartiflix.io",
        "https://tvsmartiflix.online",
        "http://localhost",
        "https://localhost",
      ].filter((token) => document.documentElement.outerHTML.includes(token)),
      previewUrls: document.documentElement.outerHTML.match(/https:\/\/[a-z0-9-]+(?:-[a-z0-9-]+)*\.vercel\.app/gi) || [],
    }));
    const expectedCanonical = route === "/" ? expectedOrigin : `${expectedOrigin}${route}`;
    recordUnique(titles, data.title, route, "title");
    recordUnique(descriptions, data.description, route, "meta description");
    if (data.lang !== "en") failures.push(`${route}: html lang is ${data.lang || "missing"}`);
    if (data.h1Count !== 1) failures.push(`${route}: expected one H1, received ${data.h1Count}`);
    canonicalTags += data.canonicals.length;
    openGraphUrls += data.ogUrls.length;
    twitterImageUrls += data.twitterImages.length;
    if (data.canonicals.length !== 1 || data.canonicals[0] !== expectedCanonical) failures.push(`${route}: expected one canonical ${expectedCanonical}, received ${data.canonicals.join(" | ") || "none"}`);
    if (data.ogUrls.length !== 1 || data.ogUrls[0] !== expectedCanonical) failures.push(`${route}: expected one og:url ${expectedCanonical}`);
    if (!data.ogTitle || !data.ogDescription || data.ogSiteName !== "Smartiflix" || !data.ogImages.length || data.ogImages.some((url) => !url?.startsWith(`${expectedOrigin}/`))) failures.push(`${route}: incomplete or wrong-origin Open Graph metadata`);
    if (data.twitterCard !== "summary_large_image" || !data.twitterImages.length || data.twitterImages.some((url) => !url?.startsWith(`${expectedOrigin}/`))) failures.push(`${route}: incomplete or wrong-origin Twitter card metadata`);
    if (data.twitterUrls.length && (data.twitterUrls.length !== 1 || data.twitterUrls[0] !== expectedCanonical)) failures.push(`${route}: twitter:url mismatch`);
    for (const imageUrl of [...data.ogImages, ...data.twitterImages].filter(Boolean)) {
      validateProductionUrl(imageUrl, `${route} social image`);
      try { socialImagePaths.add(new URL(imageUrl).pathname); } catch {}
    }
    if (data.staleDomainTokens.length || data.previewUrls.length) failures.push(`${route}: stale domain in rendered HTML (${[...data.staleDomainTokens, ...data.previewUrls].join(", ")})`);
    if (data.robots && /(?:^|,)\s*(?:noindex|nofollow)\b/i.test(data.robots)) failures.push(`${route}: unexpected robots directive ${data.robots}`);
    const xRobotsTag = response?.headers()["x-robots-tag"];
    if (xRobotsTag && /(?:noindex|nofollow)/i.test(xRobotsTag)) failures.push(`${route}: unexpected X-Robots-Tag ${xRobotsTag}`);
    for (const href of [...data.hrefs, ...data.formActions].filter(Boolean)) {
      if (/^(?:https?:)?\/\//i.test(href)) {
        const absolute = href.startsWith("//") ? `https:${href}` : href;
        validateProductionUrl(absolute, `${route} absolute navigation target`);
        try {
          const parsed = new URL(absolute);
          if (parsed.hostname === "www.tvsmartiflix.online" && !routeSet.has(parsed.pathname)) failures.push(`${route}: broken absolute internal target ${href}`);
        } catch {}
        continue;
      }
      if (!href.startsWith("/")) continue;
      internalLinkOccurrences += 1;
      const path = href.split("#")[0].split("?")[0] || route;
      if (!routeSet.has(path)) failures.push(`${route}: broken internal target ${href}`);
    }
    for (const block of data.jsonLd) {
      jsonLdBlocks += 1;
      try {
        const parsed = JSON.parse(block);
        for (const structuredUrl of collectStructuredUrls(parsed)) {
          if (!/^https?:\/\//i.test(structuredUrl.value)) {
            failures.push(`${route} JSON-LD ${structuredUrl.path}: URL-bearing value is not absolute (${structuredUrl.value})`);
            continue;
          }
          validateProductionUrl(structuredUrl.value, `${route} JSON-LD ${structuredUrl.path}`);
        }
      } catch (error) {
        failures.push(`${route}: invalid JSON-LD (${error instanceof Error ? error.message : String(error)})`);
      }
    }
    domainResults.push({
      route,
      status: response?.status() ?? "unknown",
      canonical: data.canonicals[0] || "missing",
      ogUrl: data.ogUrls[0] || "missing",
      twitterImages: data.twitterImages.length,
      jsonLd: data.jsonLd.length,
      pass: failures.length === routeFailureStart,
    });
  }

  for (const imagePath of socialImagePaths) {
    const imageResponse = await fetch(`${server.baseUrl}${imagePath}`);
    if (imageResponse.status !== 200 || !imageResponse.headers.get("content-type")?.startsWith("image/")) failures.push(`social image is unavailable: ${imagePath} (HTTP ${imageResponse.status})`);
  }

  const sitemapResult = await page.evaluate(async () => {
    const response = await fetch("/sitemap.xml");
    const text = await response.text();
    const xml = new DOMParser().parseFromString(text, "application/xml");
    return {
      status: response.status,
      text,
      parseError: xml.querySelector("parsererror")?.textContent || null,
      entries: [...xml.getElementsByTagNameNS("*", "url")].map((entry) => ({
        loc: entry.getElementsByTagNameNS("*", "loc")[0]?.textContent?.trim() || "",
        lastmod: entry.getElementsByTagNameNS("*", "lastmod")[0]?.textContent?.trim() || null,
      })),
    };
  });
  if (sitemapResult.parseError) failures.push(`/sitemap.xml: XML parser error ${sitemapResult.parseError}`);
  const sitemapUrls = sitemapResult.entries.map((entry) => entry.loc);
  sitemapEntries = sitemapUrls.length;
  const expectedSitemapUrls = routes.map((route) => `${expectedOrigin}${route === "/" ? "/" : route}`);
  if (sitemapResult.status !== 200) failures.push(`/sitemap.xml: HTTP ${sitemapResult.status}`);
  if (new Set(sitemapUrls).size !== routes.length || expectedSitemapUrls.some((url) => !sitemapUrls.includes(url))) failures.push(`/sitemap.xml: coverage mismatch (${sitemapUrls.length}/${routes.length})`);
  const articleModifiedDates = new Map(blogArticles.map((article) => [`/blog/${article.slug}`, new Date(article.modified ?? article.date).toISOString()]));
  for (const entry of sitemapResult.entries) {
    try {
      const parsed = new URL(entry.loc);
      if (parsed.origin !== expectedOrigin || parsed.protocol !== "https:") failures.push(`/sitemap.xml: disallowed URL ${entry.loc}`);
      const expectedLastModified = articleModifiedDates.get(parsed.pathname);
      if (expectedLastModified && entry.lastmod !== expectedLastModified) failures.push(`/sitemap.xml: unsupported article lastmod for ${parsed.pathname} (${entry.lastmod || "missing"})`);
      if (!expectedLastModified && entry.lastmod) failures.push(`/sitemap.xml: static route has unsupported lastmod ${parsed.pathname}`);
    } catch {
      failures.push(`/sitemap.xml: invalid URL ${entry.loc}`);
    }
  }
  const robotsResponse = await fetch(`${server.baseUrl}/robots.txt`);
  const robots = await robotsResponse.text();
  if (robotsResponse.status !== 200 || !robots.includes(`Sitemap: ${expectedOrigin}/sitemap.xml`)) failures.push("/robots.txt: sitemap origin mismatch");
  if (!/^User-Agent:\s*\*$/mi.test(robots) || !/^Allow:\s*\/$/mi.test(robots) || /^Disallow:\s*\/$/mi.test(robots)) failures.push("/robots.txt: crawl rules do not allow public routes");
  if (/smartiflix\.vercel\.app|smartiflix\.io|https:\/\/tvsmartiflix\.online/i.test(robots)) failures.push("/robots.txt: stale domain reference");

  for (const route of routes) {
    const canonicalHostResponse = await requestWithHost(server.baseUrl, route, "www.tvsmartiflix.online");
    if (canonicalHostResponse.status !== 200 || canonicalHostResponse.location) failures.push(`${route}: canonical-host request redirects or fails (${canonicalHostResponse.status})`);
  }

  const representativeRoutes = ["/", "/pricing", "/devices", "/faq", "/blog", articleRoutes[0], "/support", "/reseller"];
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of representativeRoutes) {
      await page.goto(`${server.baseUrl}${route}`, { waitUntil: "networkidle" });
      viewportChecks += 1;
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      if (overflow) failures.push(`${route} at ${width}px: horizontal overflow`);
    }
  }

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto(server.baseUrl, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Menu" }).click();
  if (await page.locator("#mobile-menu").count() !== 1) failures.push("mobile menu did not open");
  await page.getByRole("link", { name: "Blog", exact: true }).last().click();
  await page.waitForURL(`${server.baseUrl}/blog`);
  await page.goto(`${server.baseUrl}/faq`, { waitUntil: "networkidle" });
  const collapsedFaq = page.locator('main button[aria-expanded="false"]').first();
  const faqId = await collapsedFaq.getAttribute("id");
  await collapsedFaq.click();
  await page.waitForTimeout(100);
  if (!faqId || await page.locator(`[id="${faqId}"]`).getAttribute("aria-expanded") !== "true") failures.push("FAQ did not expand");
  await page.goto(`${server.baseUrl}${articleRoutes[0]}`, { waitUntil: "networkidle" });
  await page.locator("[data-editorial-link] a[href^='/blog/']").first().click();
  if (!page.url().includes("/blog/")) failures.push("contextual article navigation failed");

  const apexRedirectResponse = await requestWithHost(server.baseUrl, "/pricing?ref=seo-qa", "tvsmartiflix.online");
  if (apexRedirectResponse.status !== 308) failures.push(`tvsmartiflix.online: expected permanent 308, received ${apexRedirectResponse.status}`);
  if (apexRedirectResponse.location !== `${expectedOrigin}/pricing?ref=seo-qa`) failures.push("tvsmartiflix.online: path/query redirect mismatch");
  if (runtimeErrors.length) failures.push(...runtimeErrors);
} finally {
  await browser.close();
  await server.close();
}

console.log(`Indexable routes checked: ${routes.length}`);
console.log(`Unique titles: ${titles.size}; unique descriptions: ${descriptions.size}`);
console.log(`Internal link occurrences checked: ${internalLinkOccurrences}`);
console.log(`JSON-LD blocks parsed: ${jsonLdBlocks}`);
console.log(`Canonical tags: ${canonicalTags}; Open Graph URLs: ${openGraphUrls}; Twitter image URLs: ${twitterImageUrls}`);
console.log(`Sitemap entries parsed as XML: ${sitemapEntries}; social image assets checked: ${socialImagePaths.size}`);
console.log(`Responsive viewport checks: ${viewportChecks}`);
for (const result of domainResults) {
  console.log(`DOMAIN ${result.pass ? "PASS" : "FAIL"} ${result.route}: HTTP ${result.status}; canonical=${result.canonical}; og:url=${result.ogUrl}; twitter:image=${result.twitterImages}; JSON-LD=${result.jsonLd}`);
}
if (failures.length) {
  console.error("Production site verification: FAIL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log("Production site verification: PASS");
