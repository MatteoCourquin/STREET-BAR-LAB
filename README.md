# StreetBarLab

SEO test site — a street workout blog + free tools. Target keyword for the landing page: **"street workout program"** (secondary: calisthenics program, beginner street workout).

Stack: Next.js 16 (App Router, Cache Components), Tailwind CSS v4, TypeScript.

## Run

```bash
npm install
cp .env.example .env.local   # fill in what you need
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Pages

| Route | What |
| --- | --- |
| `/` | Landing page (H1 + sample programs per level + method + FAQ schema) |
| `/program-generator` | Interactive weekly program generator |
| `/level-test` | 7-question level test, result saved in localStorage and reused by the generator |
| `/skills`, `/skills/[slug]` | Skill roadmap + 6 progression pages with a step tracker |
| `/blog`, `/blog/[slug]` | Blog (local demo posts for now) |
| `/about`, `/contact`, `/privacy`, `/terms` | Trust pages |

SEO built in: per-page metadata + canonicals, `sitemap.xml`, `robots.txt`, generated OG images (site + per article), JSON-LD (Organization, WebSite, BreadcrumbList, FAQPage, BlogPosting, Article).

## Environment

See `.env.example`: site URL, GA4 / Plausible, Google Search Console verification, newsletter webhook. Without `NEWSLETTER_WEBHOOK_URL` the form tells visitors the newsletter launches soon (no email is collected).

## Plugging in Sanity

All blog data goes through `src/lib/posts.ts` (`getAllPosts`, `getPost`). To switch to Sanity:

1. Replace the bodies of those two functions with GROQ queries (keep `"use cache"` + add `cacheTag("posts")`, revalidated by a Sanity webhook calling `revalidateTag`).
2. Map Sanity fields to the `Post` type (`slug`, `title`, `seoTitle`, `description`, `category`, `publishedAt`, `updatedAt`, `author`, `body`).
3. `body` is Markdown today, rendered by `src/components/Markdown.tsx`. With Portable Text, swap that component for `@portabletext/react` and update `getHeadings` for the table of contents.
4. Delete `src/content/posts/`.
