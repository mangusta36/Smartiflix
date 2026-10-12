import { existsSync, readFileSync } from "node:fs";
import { blogArticles } from "../src/data/blog.ts";

const expectedSlugs = [
  "how-to-install-iptv-on-firestick-2026",
  "best-iptv-players-smart-tv-2026",
  "xtream-codes-vs-m3u",
  "iptv-buffering-fix-2026",
  "iptv-on-samsung-lg-smart-tv-2026",
  "best-iptv-player-for-firestick-2026",
  "iptv-epg-not-working-guide",
  "iptv-on-apple-tv-2026",
  "internet-speed-for-iptv",
  "iptv-not-working-common-problems",
];

const slugs = blogArticles.map((article) => article.slug);
const titles = blogArticles.map((article) => article.title);
const descriptions = blogArticles.map((article) => article.description);
const ledger = existsSync("SMARTIFLIX_IMAGE_SOURCES.md") ? readFileSync("SMARTIFLIX_IMAGE_SOURCES.md", "utf8") : "";
const crossBrand = /Zorba|ZorbaTV|Wizard|FreeGoTV|EagleCast|ChannelMoa|MoaTV|KroozTV/i;

const checks = [
  ["10 intended articles", blogArticles.length === 10],
  ["expected slugs", expectedSlugs.every((slug) => slugs.includes(slug))],
  ["unique slugs", new Set(slugs).size === slugs.length],
  ["unique titles", new Set(titles).size === titles.length],
  ["unique descriptions", new Set(descriptions).size === descriptions.length],
  ["image paths exist", blogArticles.every((article) => existsSync(`public${article.image}`))],
  ["source URLs exist", blogArticles.every((article) => article.sources.length > 0 && article.sources.every((source) => source.url.startsWith("https://")))],
  ["FAQ data exists", blogArticles.every((article) => article.faqs.length >= 5)],
  ["no placeholder source URLs", blogArticles.every((article) => article.sources.every((source) => !source.url.includes("example.com")))],
  ["no cross-brand leakage in article data", !crossBrand.test(JSON.stringify(blogArticles))],
  ["image ledger mentions current article images", blogArticles.every((article) => ledger.includes(article.image.replace("/images/", "public/images/")))],
];

let failed = 0;
for (const [name, ok] of checks) {
  console.log(`${name}: ${ok ? "PASS" : "FAIL"}`);
  if (!ok) failed += 1;
}

if (failed > 0) process.exitCode = 1;
