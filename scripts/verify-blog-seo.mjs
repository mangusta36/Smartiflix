import { chromium } from "playwright";
import { blogArticles } from "../src/data/blog.ts";
import { openProductionServer } from "./production-server.mjs";
import { CANONICAL_ORIGIN } from "../src/lib/site.ts";

const expectedOrigin = CANONICAL_ORIGIN;

const allowedBrandAnchors = new Set(["Smartiflix", "Smartiflix IPTV"]);
const articleRoutes = new Set(blogArticles.map((article) => `/blog/${article.slug}`));
const coreRoutes = new Set(["/pricing", "/devices", "/support", "/faq", "/blog", "/refund"]);

function wordCount(article) {
  const text = [article.intro || article.description, ...article.sections.flatMap((section) => [section.heading, ...section.body])].join(" ");
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function sorted(values) {
  return [...values].sort((a, b) => a.localeCompare(b));
}

function sameValues(actual, expected) {
  return JSON.stringify(sorted(actual)) === JSON.stringify(sorted(expected));
}

const sourceFailures = [];
const inboundEditorialLinks = new Map(blogArticles.map((article) => [article.slug, 0]));
const primaryIntents = blogArticles.map((article) => article.primaryKeyword?.trim().toLowerCase()).filter(Boolean);

if (primaryIntents.length !== blogArticles.length) sourceFailures.push("every article must declare one primary keyword intent");
if (new Set(primaryIntents).size !== primaryIntents.length) sourceFailures.push("article primary keyword intents must be unique");

for (const article of blogArticles) {
  if (!article.secondaryKeywords || article.secondaryKeywords.length < 3) sourceFailures.push(`${article.slug}: needs useful secondary keyword variations`);
  if (!article.headingKeywordPhrases || new Set(article.headingKeywordPhrases.map((phrase) => phrase.toLowerCase())).size < 3) sourceFailures.push(`${article.slug}: needs distinct heading themes`);
  if (!article.headingKeywordPhrases?.some((phrase) => phrase.toLowerCase() === article.primaryKeyword.toLowerCase())) sourceFailures.push(`${article.slug}: primary theme is absent from heading assignments`);
  if (!article.category || !article.hub || !article.entities?.length || !article.supportingQuestions?.length) sourceFailures.push(`${article.slug}: incomplete topical-semantic strategy`);
  const editorialText = [article.title, article.intro, ...article.sections.flatMap((section) => [section.heading, ...section.body])].filter(Boolean).join(" ").toLowerCase();
  for (const entity of article.entities || []) {
    if (!editorialText.includes(entity.toLowerCase())) sourceFailures.push(`${article.slug}: declared entity is absent from visible copy: ${entity}`);
  }
  if (article.faqs.length < 3 || new Set(article.faqs.map((faq) => faq.q.toLowerCase())).size !== article.faqs.length) sourceFailures.push(`${article.slug}: needs three distinct reader questions`);

  const brandLinks = article.homepageLinks || [];
  const brandAnchors = brandLinks.map((link) => link.anchor).filter(Boolean);
  if (brandLinks.length < 1 || brandLinks.length > 2 || brandAnchors.some((anchor) => !allowedBrandAnchors.has(anchor))) sourceFailures.push(`${article.slug}: branded homepage links must be editorially limited to approved anchors`);
  if (new Set(brandAnchors).size !== brandAnchors.length) sourceFailures.push(`${article.slug}: repeated branded homepage anchor`);
  if (new Set(brandLinks.map((link) => link.afterSection)).size !== brandLinks.length) sourceFailures.push(`${article.slug}: branded homepage links must appear after distinct sections`);
  if (brandLinks.some((link) => !Number.isInteger(link.afterSection) || link.afterSection < 0 || link.afterSection >= article.sections.length)) sourceFailures.push(`${article.slug}: invalid branded homepage-link section placement`);

  const editorialLinks = article.editorialLinks || [];
  const blogLinks = editorialLinks.filter((link) => articleRoutes.has(link.href));
  const coreLinks = editorialLinks.filter((link) => coreRoutes.has(link.href));
  if (blogLinks.length < 2 || blogLinks.length > 5) sourceFailures.push(`${article.slug}: expected a focused set of 2-5 contextual article links`);
  if (new Set(blogLinks.map((link) => link.href)).size !== blogLinks.length) sourceFailures.push(`${article.slug}: duplicate contextual article destination`);
  if (coreLinks.length < 1) sourceFailures.push(`${article.slug}: missing contextual core-page link`);
  if (editorialLinks.some((link) => !articleRoutes.has(link.href) && !coreRoutes.has(link.href))) sourceFailures.push(`${article.slug}: unknown editorial destination`);
  if (editorialLinks.some((link) => link.href === `/blog/${article.slug}`)) sourceFailures.push(`${article.slug}: contextual self-link`);
  if (new Set(editorialLinks.map((link) => link.anchor.toLowerCase())).size !== editorialLinks.length) sourceFailures.push(`${article.slug}: repeated contextual anchor text`);
  if (editorialLinks.some((link) => !Number.isInteger(link.afterSection) || link.afterSection < 0 || link.afterSection >= article.sections.length)) sourceFailures.push(`${article.slug}: invalid contextual-link section placement`);

  for (const link of blogLinks) {
    const targetSlug = link.href.replace("/blog/", "");
    inboundEditorialLinks.set(targetSlug, (inboundEditorialLinks.get(targetSlug) || 0) + 1);
  }
  if (new Set(article.related).size !== article.related.length) sourceFailures.push(`${article.slug}: duplicate related-article destination`);
  if (article.related.some((slug) => slug === article.slug || !inboundEditorialLinks.has(slug))) sourceFailures.push(`${article.slug}: invalid related-article destination`);
}

for (const [slug, count] of inboundEditorialLinks) {
  if (count === 0) sourceFailures.push(`${slug}: orphaned from contextual article graph`);
}

const server = await openProductionServer();
const browser = await chromium.launch({ headless: true });
const failures = [...sourceFailures];
const results = [];
const sitewideEditorialAnchors = new Map();

try {
  const page = await browser.newPage();
  for (const article of blogArticles) {
    const route = `/blog/${article.slug}`;
    const response = await fetch(`${server.baseUrl}${route}`);
    const html = await response.text();
    const htmlVerified = response.status === 200 && /<h1\b/i.test(html) && html.includes(article.primaryKeyword);
    await page.goto(`${server.baseUrl}${route}`, { waitUntil: "networkidle" });

    const h1Count = await page.locator("main h1").count();
    const headings = await page.locator("main h2, main h3").allTextContents();
    const normalizedHeadings = headings.map((heading) => heading.replace(/\s+/g, " ").trim().toLowerCase());
    const primaryThemeInHeading = normalizedHeadings.some((heading) => heading.includes(article.primaryKeyword.toLowerCase()));
    const homeLinks = await page.locator("[data-editorial-home-link] a").evaluateAll((links) => links.map((link) => ({ text: link.textContent?.trim(), href: link.getAttribute("href") })));
    const editorialLinks = await page.locator("[data-editorial-link] a").evaluateAll((links) => links.map((link) => ({ text: link.textContent?.replace(/\s+/g, " ").trim(), href: link.getAttribute("href") })));
    const contextualBlogLinks = editorialLinks.filter((link) => link.href?.startsWith("/blog/"));
    const contextualCoreLinks = editorialLinks.filter((link) => link.href && coreRoutes.has(link.href));
    const relatedLinks = await page.locator("[data-related-article-link]").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    const blogHubLinks = await page.locator("[data-blog-hub-link][href='/blog']").count();
    const canonical = await page.locator("link[rel='canonical']").getAttribute("href");
    const imageCount = await page.locator("article img").count();
    const invalidAltCount = await page.locator("article img:not([alt]), article img[alt='']").count();
    const articleFailures = [];

    for (const link of editorialLinks) {
      if (!link.text) continue;
      const normalized = link.text.toLowerCase();
      sitewideEditorialAnchors.set(normalized, (sitewideEditorialAnchors.get(normalized) || 0) + 1);
      if (/^(click here|read more|learn more)$/.test(normalized)) articleFailures.push(`generic contextual anchor: ${link.text}`);
    }

    if (h1Count !== 1) articleFailures.push(`expected one H1, received ${h1Count}`);
    if (!primaryThemeInHeading) articleFailures.push("primary topic is absent from article section headings");
    if (homeLinks.length < 1 || homeLinks.length > 2 || !homeLinks.every((link) => link.href === "/" && link.text && allowedBrandAnchors.has(link.text))) articleFailures.push("invalid branded homepage-link set");
    if (contextualBlogLinks.length < 2 || contextualBlogLinks.length > 5) articleFailures.push(`expected 2-5 contextual article links, received ${contextualBlogLinks.length}`);
    if (new Set(contextualBlogLinks.map((link) => link.href)).size !== contextualBlogLinks.length) articleFailures.push("duplicate rendered contextual article destination");
    if (contextualCoreLinks.length < 1) articleFailures.push("missing rendered contextual core-page link");
    if (!sameValues(relatedLinks.filter(Boolean), article.related.map((slug) => `/blog/${slug}`))) articleFailures.push("rendered related-article set does not match source data");
    if (blogHubLinks < 1) articleFailures.push("missing blog-hub return path");
    if (canonical !== `${expectedOrigin}${route}`) articleFailures.push(`canonical mismatch: ${canonical}`);
    if (!htmlVerified) articleFailures.push("production HTML verification failed");
    if (invalidAltCount) articleFailures.push(`${invalidAltCount} invalid image alt values`);
    for (const issue of articleFailures) failures.push(`${article.slug}: ${issue}`);

    results.push({
      slug: article.slug,
      brandedHomeLinks: homeLinks.map((link) => link.text).join(" | "),
      contextualBlogLinks: contextualBlogLinks.map((link) => link.href),
      coreLinks: contextualCoreLinks.map((link) => link.href),
      relatedLinks: relatedLinks.length,
      words: wordCount(article),
      imageCount,
      pass: articleFailures.length === 0,
    });
  }
} finally {
  await browser.close();
  await server.close();
}

for (const [anchor, count] of sitewideEditorialAnchors) {
  if (count > 2) failures.push(`contextual anchor repeated excessively (${count}x): ${anchor}`);
}

for (const result of results) {
  console.log(`${result.pass ? "PASS" : "FAIL"} ${result.slug}: brand=[${result.brandedHomeLinks}] contextual=${result.contextualBlogLinks.length} core=${result.coreLinks.join("|")} related=${result.relatedLinks} editorialWords=${result.words} images=${result.imageCount}`);
}
if (failures.length) {
  console.error("Blog SEO verification: FAIL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Blog SEO verification: PASS (${results.length}/${blogArticles.length} articles; no contextual orphans)`);
