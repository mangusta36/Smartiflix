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
const unsupportedFirstPartyClaim = /official\s+(partner|affiliate)|our\s+(tests|testing)|we\s+tested|licensed\s+channels|customers?\s+(say|report)/i;
const approvedSourceHosts = new Set(["developer.amazon.com", "www.developer.amazon.com", "www.samsung.com", "www.lg.com", "support.google.com", "help.netflix.com", "github.com", "support.apple.com", "developer.apple.com"]);

const checks = [
  ["10 intended articles", blogArticles.length === 10],
  ["expected slugs", expectedSlugs.every((slug) => slugs.includes(slug))],
  ["unique slugs", new Set(slugs).size === slugs.length],
  ["unique titles", new Set(titles).size === titles.length],
  ["unique descriptions", new Set(descriptions).size === descriptions.length],
  ["image paths exist", blogArticles.every((article) => existsSync(`public${article.image}`))],
  ["source URLs exist", blogArticles.every((article) => article.sources.length > 0 && article.sources.every((source) => source.url.startsWith("https://")))],
  ["sources use primary or official hosts", blogArticles.every((article) => article.sources.every((source) => approvedSourceHosts.has(new URL(source.url).hostname)))],
  ["distinct reader FAQs exist", blogArticles.every((article) => article.faqs.length >= 3 && new Set(article.faqs.map((faq) => faq.q.toLowerCase())).size === article.faqs.length)],
  ["topical strategy exists", blogArticles.every((article) => article.category && article.hub && article.entities?.length >= 5 && article.supportingQuestions?.length >= 3)],
  ["no placeholder source URLs", blogArticles.every((article) => article.sources.every((source) => !source.url.includes("example.com")))],
  ["no cross-brand leakage in article data", !crossBrand.test(JSON.stringify(blogArticles))],
  ["no unsupported first-party claims", !unsupportedFirstPartyClaim.test(JSON.stringify(blogArticles))],
  ["image ledger mentions current article images", blogArticles.every((article) => ledger.includes(article.image.replace("/images/", "public/images/")))],
];

let failed = 0;
for (const [name, ok] of checks) {
  console.log(`${name}: ${ok ? "PASS" : "FAIL"}`);
  if (!ok) failed += 1;
}

if (failed > 0) process.exitCode = 1;
