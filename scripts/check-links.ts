import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd(), "src");
const publicRoutes = new Set(["/", "/pricing", "/devices", "/faq", "/blog", "/reseller", "/privacy", "/terms", "/refund", "/disclaimer"]);
const files: string[] = [];

function walk(dir: string) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.(tsx|ts)$/.test(entry)) files.push(full);
  }
}

walk(root);

let broken = 0;
let hashes = 0;
let empty = 0;
let placeholders = 0;

for (const file of files) {
  const text = readFileSync(file, "utf8");
  const matches = text.matchAll(/href={(?:"|')([^"']+)(?:"|')}|href=(?:"|')([^"']+)(?:"|')/g);
  for (const match of matches) {
    const href = match[1] || match[2];
    if (!href) empty += 1;
    if (href === "#") hashes += 1;
    if (/placeholder|example\.com/i.test(href)) placeholders += 1;
    if (href.startsWith("/") && !publicRoutes.has(href)) broken += 1;
  }
}

console.log(`Broken internal links: ${broken}`);
console.log(`href="#": ${hashes}`);
console.log(`Empty hrefs: ${empty}`);
console.log(`Placeholder links: ${placeholders}`);
if (broken || hashes || empty || placeholders) process.exit(1);
