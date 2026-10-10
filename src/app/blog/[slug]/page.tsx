import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getHeadings, Markdown } from "@/components/Markdown";
import { Newsletter } from "@/components/Newsletter";
import { formatDate, PostCard } from "@/components/PostCard";
import { getAllPosts, getPost } from "@/lib/posts";
import { absoluteUrl, jsonLd, site } from "@/lib/site";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.seoTitle ?? post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
    },
  };
}

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const headings = getHeadings(post.body);
  const more = (await getAllPosts()).filter((p) => p.slug !== post.slug).slice(0, 2);
  const url = absoluteUrl(`/blog/${post.slug}`);
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    url,
    mainEntityOfPage: url,
    image: `${url}/opengraph-image`,
    inLanguage: "en",
    author: { "@type": "Organization", name: post.author, url: site.url },
    publisher: { "@id": absoluteUrl("/#organization") },
  };

  return (
    <article className="container-x py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <header className="mx-auto mt-8 max-w-3xl">
        <p className="eyebrow">{post.category}</p>
        <h1 className="h-display mt-4 text-4xl sm:text-6xl">{post.title}</h1>
        <p className="mt-5 text-lg text-muted">{post.description}</p>
        <p className="mt-6 border-b border-line pb-6 text-sm text-muted">
          By {post.author} · <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> ·{" "}
          {post.readingMinutes} min read
        </p>
      </header>

      <div className="mx-auto mt-10 grid max-w-6xl gap-12 lg:grid-cols-[1fr_minmax(0,48rem)_1fr]">
        <aside className="hidden lg:block" />
        <div>
          {headings.length > 2 && (
            <nav aria-label="Table of contents" className="card mb-10 p-5">
              <p className="text-sm font-semibold">In this article</p>
              <ol className="mt-3 grid gap-1.5 text-sm">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-muted hover:text-accent">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <Markdown>{post.body}</Markdown>

          <div className="card mt-14 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold">Turn this into a plan</p>
              <p className="text-sm text-muted">Get a free weekly street workout program for your level.</p>
            </div>
            <Link href="/program-generator" className="btn-primary shrink-0">
              Build my program →
            </Link>
          </div>
        </div>
        <aside className="hidden lg:block" />
      </div>

      {more.length > 0 && (
        <section className="mx-auto mt-20 max-w-5xl">
          <h2 className="text-2xl font-bold">Keep reading</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {more.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
      <div className="mx-auto mt-16 max-w-5xl">
        <Newsletter />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleLd)} />
    </article>
  );
}
