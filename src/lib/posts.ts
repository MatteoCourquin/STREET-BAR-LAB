import { posts as localPosts } from "@/content/posts";

export type Post = {
  slug: string;
  title: string;
  /** Used for <title> when set, otherwise `title`. */
  seoTitle?: string;
  description: string;
  category: string;
  publishedAt: string; // ISO date
  updatedAt?: string;
  author: string;
  /** Markdown body. With Sanity this becomes Portable Text. */
  body: string;
};

export type PostWithMeta = Post & { readingMinutes: number };

function withMeta(p: Post): PostWithMeta {
  const words = p.body.split(/\s+/).length;
  return { ...p, readingMinutes: Math.max(1, Math.round(words / 230)) };
}

// Data access layer — swap the bodies of these functions for Sanity (GROQ) queries later.
// The pages only depend on these signatures.

export async function getAllPosts(): Promise<PostWithMeta[]> {
  "use cache";
  return localPosts.map(withMeta).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPost(slug: string): Promise<PostWithMeta | undefined> {
  "use cache";
  const p = localPosts.find((x) => x.slug === slug);
  return p && withMeta(p);
}
