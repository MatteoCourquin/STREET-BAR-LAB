import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToolsCta } from "@/components/ToolsCta";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Street Workout Blog: Training Guides, Progressions & Tips",
  description:
    "Street workout and calisthenics guides: how to get your first pull-up, how often to train, skill progressions, programming and technique tips.",
  alternates: { canonical: "/blog" },
};

export default async function Page() {
  const posts = await getAllPosts();

  return (
    <div className="container-x py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />
      <header className="mt-6 max-w-3xl">
        <p className="eyebrow">Blog</p>
        <h1 className="h-display mt-3 text-5xl sm:text-6xl">Street workout guides</h1>
        <p className="mt-4 text-lg text-muted">
          Practical, no-fluff articles to train smarter on the bars — from your first pull-up to advanced skills.
        </p>
      </header>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
      <div className="mt-20">
        <ToolsCta />
      </div>
    </div>
  );
}
