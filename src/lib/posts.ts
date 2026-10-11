import { cacheLife } from "next/cache";
import { defineQuery } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { site } from "@/lib/site";
import { client } from "@/sanity/client";

export type PostImage = SanityImageSource & { alt?: string };

export type PostSummary = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string; // YYYY-MM-DD
  updatedAt?: string;
  image: PostImage | null;
  noIndex: boolean;
  canonicalUrl?: string;
  readingMinutes: number;
};

export type Author = {
  name: string;
  jobTitle?: string;
  bio?: string;
  image: PostImage | null;
  sameAs?: string[];
};

export type Post = PostSummary & {
  metaTitle?: string;
  tags?: string[];
  author: Author | null;
  schemaType: "BlogPosting" | "Article";
  /** Custom JSON-LD from the Studio; replaces the generated structured data when set. */
  jsonLd?: string;
  introduction?: string;
  keyTakeaways?: string[];
  body: string;
  faq?: { q: string; a: string }[];
  conclusion?: string;
  cta?: { text?: string; buttonLabel?: string; href?: string };
  sources?: { label: string; url: string }[];
  relatedSkills?: string[];
  relatedPostIds?: string[];
};

// Fallbacks live in GROQ so the generator can omit any optional field.
// Reading time: ~6 characters per word, 230 words per minute.
const summaryProjection = `
  "id": _id,
  "slug": slug.current,
  "title": coalesce(h1, metaTitle, slug.current),
  "description": coalesce(metaDescription, ""),
  "category": coalesce(category, "Blog"),
  publishedAt,
  updatedAt,
  "image": featuredImage{asset, crop, hotspot, alt},
  "noIndex": noIndex == true,
  canonicalUrl,
  "readingMinutes": round(length(coalesce(introduction, "") + coalesce(body, "") + coalesce(conclusion, "")) / 6 / 230)
`;

const POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && defined(slug.current) && defined(publishedAt)]
  | order(publishedAt desc, _createdAt desc) { ${summaryProjection} }
`);

const POST_QUERY = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0] {
    ${summaryProjection},
    metaTitle,
    tags,
    "author": coalesce(author->, *[_type == "author" && isDefault == true][0]) {
      name, jobTitle, bio, sameAs, "image": image{asset, crop, hotspot, alt}
    },
    "schemaType": coalesce(schemaType, "BlogPosting"),
    "jsonLd": structuredDataJsonLd,
    introduction,
    keyTakeaways,
    "body": coalesce(body, ""),
    "faq": faq[defined(question) && defined(answer)]{ "q": question, "a": answer },
    conclusion,
    cta,
    "sources": sources[defined(label) && defined(url)]{ label, url },
    relatedSkills,
    "relatedPostIds": relatedPosts[]._ref
  }
`);

export async function getAllPosts(): Promise<PostSummary[]> {
  "use cache";
  // Content only changes when something is published in Sanity, which triggers a Vercel deploy
  // hook; each deploy starts with an empty cache, so there is no need to ever re-check.
  cacheLife("max");
  const posts = await client.fetch<PostSummary[]>(POSTS_QUERY);
  return posts.map(withMinReadingTime);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  "use cache";
  cacheLife("max");
  const post = await client.fetch<Post | null>(POST_QUERY, { slug });
  return post ? withMinReadingTime(post) : undefined;
}

/** Hand-picked related posts first, then the same category, then the latest. */
export async function getRelatedPosts(post: Post, limit = 3): Promise<PostSummary[]> {
  const others = (await getAllPosts()).filter((p) => p.id !== post.id);
  const picked = (post.relatedPostIds ?? [])
    .map((id) => others.find((p) => p.id === id))
    .filter((p) => p !== undefined);
  const rest = [
    ...others.filter((p) => p.category === post.category),
    ...others.filter((p) => p.category !== post.category),
  ];
  return [...new Set([...picked, ...rest])].slice(0, limit);
}

/** Posts that belong in the sitemap: indexable and canonical to this site. */
export function isIndexable(post: PostSummary) {
  return !post.noIndex && (!post.canonicalUrl || post.canonicalUrl.startsWith(site.url));
}

function withMinReadingTime<T extends PostSummary>(post: T): T {
  return { ...post, readingMinutes: Math.max(1, post.readingMinutes) };
}
