import type { MetadataRoute } from "next";
import { blogArticles } from "@/data/blog";
import { absoluteUrl } from "@/lib/site";

const routes = ["/", "/pricing", "/devices", "/faq", "/blog", "/support", "/reseller", "/privacy", "/terms", "/refund", "/disclaimer"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = routes.map((route) => ({ url: absoluteUrl(route), lastModified: new Date("2026-11-14") }));
  const blogRoutes = blogArticles.map((article) => ({ url: absoluteUrl(`/blog/${article.slug}`), lastModified: new Date(article.modified ?? article.date) }));
  return [...staticRoutes, ...blogRoutes];
}
