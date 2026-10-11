import type { MetadataRoute } from "next";
import { getAllPosts, isIndexable } from "@/lib/posts";
import { skills } from "@/lib/skills";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await getAllPosts()).filter(isIndexable);
  const latest = posts[0]?.updatedAt ?? posts[0]?.publishedAt;

  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/program-generator"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/level-test"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/skills"), changeFrequency: "monthly", priority: 0.8 },
    ...skills.map((s) => ({ url: absoluteUrl(`/skills/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: absoluteUrl("/blog"), lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.updatedAt ?? p.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...["/about", "/privacy", "/terms"].map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
