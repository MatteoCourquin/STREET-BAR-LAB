import Link from "next/link";
import type { PostSummary } from "@/lib/posts";

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="card group relative flex flex-col p-6 transition-colors hover:border-accent/60">
      <p className="eyebrow">{post.category}</p>
      <h3 className="mt-3 text-xl font-bold leading-snug">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{post.description}</p>
      <p className="mt-5 text-xs text-muted">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> · {post.readingMinutes} min read
      </p>
    </article>
  );
}
