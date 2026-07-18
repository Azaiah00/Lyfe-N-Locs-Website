import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/** Sitemap for the marketing routes (docs/SEO.md). Future upsell routes are
 *  omitted until their flags are on. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/portfolio", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/book", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/policies", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
  ];

  const lastModified = new Date("2026-07-18");

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
