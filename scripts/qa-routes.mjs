import { blogArticles } from "../src/data/blog.ts";

export const staticRoutes = ["/", "/pricing", "/devices", "/faq", "/blog", "/support", "/reseller", "/privacy", "/terms", "/refund", "/disclaimer"];
export const articleRoutes = blogArticles.map((article) => `/blog/${article.slug}`);
export const publicQaRoutes = [...staticRoutes, ...articleRoutes, "/__smartiflix-qa-not-found__"];
