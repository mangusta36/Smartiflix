import { chromium } from "playwright";
import { openProductionServer } from "./production-server.mjs";
import { articleRoutes, staticRoutes } from "./qa-routes.mjs";

const expectedOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN?.replace(/\/$/, "");
if (!expectedOrigin) throw new Error("NEXT_PUBLIC_SITE_ORIGIN is required for production verification");

const routes = [...staticRoutes, ...articleRoutes];
const routeSet = new Set(routes);
const server = await openProductionServer();
const browser = await chromium.launch({ headless: true });
const failures = [];
const titles = new Map();
const descriptions = new Map();
let internalLinkOccurrences = 0;
let jsonLdBlocks = 0;
let viewportChecks = 0;

function recordUnique(map, value, route, label) {
  if (!value) return failures.push(`${route}: missing ${label}`);
  if (map.has(value)) failures.push(`${route}: duplicate ${label} also used by ${map.get(value)}`);
  else map.set(value, route);
}

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const runtimeErrors = [];
  page.on("console", (message) => { if (message.type() === "error") runtimeErrors.push(`console: ${message.text()}`); });
  page.on("pageerror", (error) => runtimeErrors.push(`pageerror: ${error.message}`));

  for (const route of routes) {
    const response = await page.goto(`${server.baseUrl}${route}`, { waitUntil: "networkidle" });
    if (response?.status() !== 200) failures.push(`${route}: HTTP ${response?.status() ?? "unknown"}`);
    const data = await page.evaluate(() => ({
      lang: document.documentElement.lang,
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute("content"),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
      robots: document.querySelector('meta[name="robots"]')?.getAttribute("content"),
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content"),
      ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute("content"),
      ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute("content"),
      ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute("content"),
      ogSiteName: document.querySelector('meta[property="og:site_name"]')?.getAttribute("content"),
      twitterCard: document.querySelector('meta[name="twitter:card"]')?.getAttribute("content"),
      twitterImage: document.querySelector('meta[name="twitter:image"]')?.getAttribute("content"),
      h1Count: document.querySelectorAll("main h1").length,
      hrefs: [...document.querySelectorAll("main a[href]")].map((link) => link.getAttribute("href")),
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((script) => script.textContent || ""),
    }));
    const expectedCanonical = route === "/" ? expectedOrigin : `${expectedOrigin}${route}`;
    recordUnique(titles, data.title, route, "title");
    recordUnique(descriptions, data.description, route, "meta description");
    if (data.lang !== "en") failures.push(`${route}: html lang is ${data.lang || "missing"}`);
    if (data.h1Count !== 1) failures.push(`${route}: expected one H1, received ${data.h1Count}`);
    if (data.canonical !== expectedCanonical) failures.push(`${route}: canonical ${data.canonical} does not match ${expectedCanonical}`);
    if (data.ogUrl !== expectedCanonical) failures.push(`${route}: og:url mismatch`);
    if (!data.ogTitle || !data.ogDescription || data.ogSiteName !== "Smartiflix" || !data.ogImage?.startsWith(`${expectedOrigin}/`)) failures.push(`${route}: incomplete Open Graph metadata`);
    if (data.twitterCard !== "summary_large_image" || !data.twitterImage?.startsWith(`${expectedOrigin}/`)) failures.push(`${route}: incomplete Twitter card metadata`);
    if (data.robots && (!data.robots.includes("index") || !data.robots.includes("follow"))) failures.push(`${route}: unexpected robots directive ${data.robots}`);
    for (const href of data.hrefs.filter(Boolean)) {
      if (!href.startsWith("/")) continue;
      internalLinkOccurrences += 1;
      const path = href.split("#")[0].split("?")[0] || route;
      if (!routeSet.has(path)) failures.push(`${route}: broken internal target ${href}`);
    }
    for (const block of data.jsonLd) {
      jsonLdBlocks += 1;
      try {
        const parsed = JSON.parse(block);
        const serialized = JSON.stringify(parsed);
        if (/\.invalid|\.example|localhost/i.test(serialized)) failures.push(`${route}: stale origin in JSON-LD`);
      } catch (error) {
        failures.push(`${route}: invalid JSON-LD (${error instanceof Error ? error.message : String(error)})`);
      }
    }
  }

  const sitemapResponse = await fetch(`${server.baseUrl}/sitemap.xml`);
  const sitemap = await sitemapResponse.text();
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const expectedSitemapUrls = routes.map((route) => `${expectedOrigin}${route === "/" ? "/" : route}`);
  if (sitemapResponse.status !== 200) failures.push(`/sitemap.xml: HTTP ${sitemapResponse.status}`);
  if (new Set(sitemapUrls).size !== routes.length || expectedSitemapUrls.some((url) => !sitemapUrls.includes(url))) failures.push(`/sitemap.xml: coverage mismatch (${sitemapUrls.length}/${routes.length})`);
  const robotsResponse = await fetch(`${server.baseUrl}/robots.txt`);
  const robots = await robotsResponse.text();
  if (robotsResponse.status !== 200 || !robots.includes(`Sitemap: ${expectedOrigin}/sitemap.xml`)) failures.push("/robots.txt: sitemap origin mismatch");

  const representativeRoutes = ["/", "/blog", articleRoutes[0], articleRoutes[1], articleRoutes[3], "/pricing", "/support"];
  for (const width of [390, 1440]) {
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
  if (runtimeErrors.length) failures.push(...runtimeErrors);
} finally {
  await browser.close();
  await server.close();
}

console.log(`Indexable routes checked: ${routes.length}`);
console.log(`Unique titles: ${titles.size}; unique descriptions: ${descriptions.size}`);
console.log(`Internal link occurrences checked: ${internalLinkOccurrences}`);
console.log(`JSON-LD blocks parsed: ${jsonLdBlocks}`);
console.log(`Responsive viewport checks: ${viewportChecks}`);
if (failures.length) {
  console.error("Production site verification: FAIL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log("Production site verification: PASS");
