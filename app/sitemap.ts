import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { notes } from "@/content/notes";
import { absolute } from "@/lib/seo";

/**
 * Generated from the content layer, so adding a project or a note puts it in
 * the sitemap automatically. A hand-written sitemap is wrong within a month.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absolute("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absolute("/projects"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absolute("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absolute("/notes"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absolute("/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => p.caseStudy)
    .map((p) => ({
      url: absolute(`/project/${p.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const noteRoutes: MetadataRoute.Sitemap = notes
    .filter((n) => !n.draft)
    .map((n) => ({
      url: absolute(`/notes/${n.slug}`),
      lastModified: new Date(n.date),
      changeFrequency: "yearly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...projectRoutes, ...noteRoutes];
}
