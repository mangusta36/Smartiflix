import { blogArticles } from "../src/data/blog.ts";

function words(article) {
  const text = [
    article.title,
    article.intro ?? article.description,
    ...article.sections.flatMap((section) => [section.heading, ...section.body]),
  ].join(" ");
  return text.trim().split(/\s+/).filter(Boolean).length;
}

for (const article of blogArticles) {
  const count = words(article);
  console.log(`${article.slug}: ${count} strict editorial words`);
}

console.log("Count includes title, intro, section headings, and section body copy once; excludes shared template, CTA, tables, FAQ, sources, related links, navigation, and footer.");
console.log("Word counts are diagnostic only; quality validation uses intent, structure, sources, semantic coverage, and rendered-page checks.");

if (blogArticles.length !== 10 || blogArticles.some((article) => !article.intro || article.sections.length < 6 || article.faqs.length < 3 || article.sources.length < 2)) process.exitCode = 1;
