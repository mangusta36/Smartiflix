import type { MetadataRoute } from "next";
import { blogArticles } from "@/data/blog";
import { absoluteUrl } from "@/lib/site";

const routes = ["/", "/pricing", "/devices", "/faq", "/blog", "/reseller", "/privacy", "/terms", "/refund", "/disclaimer"];
const lastModified = new Date("2026-10-06T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = routes.map((route) => ({ url: absoluteUrl(route), lastModified }));
  const blogRoutes = blogArticles.map((article) => ({ url: absoluteUrl(`/blog/${article.slug}`), lastModified: new Date(article.date) }));
  return [...staticRoutes, ...blogRoutes];
}
