import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { getHeadings, Markdown } from "@/components/Markdown";
import { ToolsCta } from "@/components/ToolsCta";
import { formatDate, PostCard } from "@/components/PostCard";
import { getAllPosts, getPost, getRelatedPosts, type Post } from "@/lib/posts";
import { getSkill } from "@/lib/skills";
import { absoluteUrl, jsonLd, site } from "@/lib/site";
import { urlFor } from "@/sanity/client";

// Placeholder keeps the build valid on an empty dataset (Cache Components needs at least one param).
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "__placeholder__" }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const title = post.metaTitle ?? post.title;
  return {
    // The generator may already include the brand; don't append it twice.
    title: title.includes(site.name) ? { absolute: title } : title,
    description: post.description,
    alternates: { canonical: post.canonicalUrl ?? `/blog/${post.slug}` },
    robots: post.noIndex ? { index: false, follow: true } : undefined,
    keywords: post.tags,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: post.author ? [post.author.name] : undefined,
      section: post.category,
      tags: post.tags,
      images: [{ url: `/og/blog/${post.slug}`, width: 1200, height: 630, alt: post.image?.alt ?? post.title }],
    },
  };
}

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const headings = getHeadings(post.body);
  const related = await getRelatedPosts(post);
  const skills = (post.relatedSkills ?? []).map(getSkill).filter((s) => s !== undefined);
  const customJsonLd = parseCustomJsonLd(post.jsonLd);
  const cta = {
    text: post.cta?.text ?? "Get a free weekly street workout program for your level.",
    buttonLabel: post.cta?.buttonLabel ?? "Build my program",
    href: post.cta?.href ?? "/program-generator",
  };

  return (
    <article className="container-x py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
        structuredData={!customJsonLd}
      />
      <header className="mx-auto mt-8 max-w-3xl">
        <p className="eyebrow">{post.category}</p>
        <h1 className="h-display mt-4 text-4xl sm:text-6xl">{post.title}</h1>
        {!post.introduction && <p className="mt-5 text-lg text-muted">{post.description}</p>}
        <p className="mt-6 border-b border-line pb-6 text-sm text-muted">
          {post.author && <>By {post.author.name} · </>}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {post.updatedAt && post.updatedAt !== post.publishedAt && (
            <>
              {" "}
              · Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
            </>
          )}{" "}
          · {post.readingMinutes} min read
        </p>
      </header>

      {post.image && (
        <figure className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-xl border border-line">
          <Image
            src={urlFor(post.image).width(1600).height(840).url()}
            alt={post.image.alt ?? ""}
            width={1600}
            height={840}
            priority
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="h-auto w-full"
          />
        </figure>
      )}

      <div className="mx-auto mt-10 grid max-w-6xl gap-12 lg:grid-cols-[1fr_minmax(0,48rem)_1fr]">
        <aside className="hidden lg:block" />
        <div>
          {post.introduction && <Markdown>{post.introduction}</Markdown>}

          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <section aria-labelledby="takeaways" className="card my-10 p-6">
              <h2 id="takeaways" className="text-sm font-semibold uppercase tracking-wider text-accent">
                Key takeaways
              </h2>
              <ul className="mt-4 grid gap-2.5">
                {post.keyTakeaways.map((t) => (
                  <li key={t} className="flex gap-3 leading-relaxed">
                    <span aria-hidden="true" className="text-accent">
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </section>
          )}

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

          {post.faq && post.faq.length > 0 && (
            <section aria-labelledby="faq" className="mt-14">
              <h2 id="faq" className="mb-6 text-3xl font-bold">
                Frequently asked questions
              </h2>
              <Faq items={post.faq} structuredData={!customJsonLd} />
            </section>
          )}

          {post.conclusion && (
            <div className="mt-14">
              <Markdown>{post.conclusion}</Markdown>
            </div>
          )}

          <div className="card mt-14 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold">Turn this into a plan</p>
              <p className="text-sm text-muted">{cta.text}</p>
            </div>
            <Link href={cta.href} className="btn-primary shrink-0">
              {cta.buttonLabel} →
            </Link>
          </div>

          {skills.length > 0 && (
            <section aria-labelledby="skills" className="mt-10">
              <h2 id="skills" className="text-sm font-semibold uppercase tracking-wider text-muted">
                Related skill progressions
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/skills/${s.slug}`}
                      className="inline-block rounded-full border border-line px-4 py-1.5 text-sm hover:border-accent hover:text-accent"
                    >
                      {s.name} →
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {post.sources && post.sources.length > 0 && (
            <section aria-labelledby="sources" className="mt-10 border-t border-line pt-6">
              <h2 id="sources" className="text-sm font-semibold uppercase tracking-wider text-muted">
                Sources
              </h2>
              <ol className="mt-3 grid list-decimal gap-1.5 pl-5 text-sm text-muted">
                {post.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {post.author?.bio && (
            <aside aria-label="About the author" className="card mt-10 flex gap-4 p-6">
              {post.author.image && (
                <Image
                  src={urlFor(post.author.image).width(128).height(128).url()}
                  alt={post.author.image.alt ?? post.author.name}
                  width={64}
                  height={64}
                  className="size-16 shrink-0 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-bold">{post.author.name}</p>
                {post.author.jobTitle && <p className="text-sm text-accent">{post.author.jobTitle}</p>}
                <p className="mt-2 text-sm leading-relaxed text-muted">{post.author.bio}</p>
              </div>
            </aside>
          )}
        </div>
        <aside className="hidden lg:block" />
      </div>

      {related.length > 0 && (
        <section className="mx-auto mt-20 max-w-5xl">
          <h2 className="text-2xl font-bold">Keep reading</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
      <div className="mx-auto mt-16 max-w-5xl">
        <ToolsCta />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(customJsonLd ?? articleJsonLd(post))} />
    </article>
  );
}

function articleJsonLd(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const author = post.author;
  return {
    "@context": "https://schema.org",
    "@type": post.schemaType,
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(`/og/blog/${post.slug}`),
    inLanguage: "en",
    articleSection: post.category,
    keywords: post.tags?.join(", "),
    author:
      !author || author.name === site.name
        ? { "@id": absoluteUrl("/#organization") }
        : {
            "@type": "Person",
            name: author.name,
            jobTitle: author.jobTitle,
            description: author.bio,
            sameAs: author.sameAs,
          },
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

/** Accepts a raw JSON object or a <script type="application/ld+json"> wrapper; invalid JSON is ignored. */
function parseCustomJsonLd(value?: string): unknown {
  const json = value?.replace(/<\/?script[^>]*>/gi, "").trim();
  if (!json) return undefined;
  try {
    return JSON.parse(json);
  } catch {
    return undefined;
  }
}
