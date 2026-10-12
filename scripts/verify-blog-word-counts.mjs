import { blogArticles } from "../src/data/blog.ts";

function words(article) {
  const text = [
    article.title,
    article.intro ?? article.description,
    ...article.sections.flatMap((section) => [section.heading, ...section.body]),
  ].join(" ");
  return text.trim().split(/\s+/).filter(Boolean).length;
}

let passing = 0;

for (const article of blogArticles) {
  const count = words(article);
  if (count >= 2500) passing += 1;
  console.log(`${article.slug}: ${count} strict editorial words`);
}

console.log("Count includes title, intro, section headings, and section body copy once; excludes shared template, CTA, tables, FAQ, sources, related links, navigation, and footer.");
console.log(`Articles >= 2,500 strict editorial words: ${passing}/${blogArticles.length}`);

if (blogArticles.length !== 10 || passing !== 10) {
  process.exitCode = 1;
}
