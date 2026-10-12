import { blogArticles } from "../src/data/blog.ts";

function paragraphs(article) {
  return article.sections.flatMap((section) => section.body).map((text) => text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim()).filter((text) => text.split(/\s+/).length >= 18);
}

function shingles(text) {
  const words = text.split(/\s+/);
  const set = new Set();
  for (let i = 0; i <= words.length - 8; i += 1) {
    set.add(words.slice(i, i + 8).join(" "));
  }
  return set;
}

let suspicious = 0;

for (let i = 0; i < blogArticles.length; i += 1) {
  for (let j = i + 1; j < blogArticles.length; j += 1) {
    const a = new Set(paragraphs(blogArticles[i]).flatMap((p) => [...shingles(p)]));
    const b = new Set(paragraphs(blogArticles[j]).flatMap((p) => [...shingles(p)]));
    const shared = [...a].filter((item) => b.has(item)).length;
    const smaller = Math.min(a.size, b.size) || 1;
    const ratio = shared / smaller;
    if (ratio > 0.18) {
      suspicious += 1;
      console.log(`Suspicious overlap: ${blogArticles[i].slug} <-> ${blogArticles[j].slug} (${ratio.toFixed(2)})`);
    }
  }
}

console.log(`Substantial duplicate pairs: ${suspicious}`);
if (suspicious > 0) process.exitCode = 1;
