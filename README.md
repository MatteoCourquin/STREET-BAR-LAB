# StreetBarLab

SEO test site — a street workout blog + free tools. Target keyword for the landing page: **"street workout program"** (secondary: calisthenics program, beginner street workout).

Stack: Next.js 16 (App Router, Cache Components), Tailwind CSS v4, TypeScript.

## Run

```bash
npm install
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
| `/blog`, `/blog/[slug]` | Blog, content from Sanity |
| `/about`, `/privacy`, `/terms` | Trust pages |

SEO built in: per-page metadata + canonicals, `sitemap.xml`, `robots.txt`, generated OG images (site + per article), JSON-LD (Organization, WebSite, BreadcrumbList, FAQPage, BlogPosting, Article).

## Environment

| Variable | Where | What |
| --- | --- | --- |
| `SANITY_REVALIDATE_SECRET` | Vercel + `.env.local` | Shared with the Sanity webhook that calls `/api/revalidate`. Without it, new articles still appear, but only when the hourly cache expires. |
| `SANITY_WRITE_TOKEN` | `.env.local` only | Editor token for the SEO tool. Not used by the website. |

The canonical domain (`https://streetbarlab.com`) is set in `src/lib/site.ts`; Search Console is verified by DNS.

## Blog (Sanity)

- Project `63wccw3u`, dataset `production` (public read). Studio: https://streetbarlab.sanity.studio, source in `studio/` (`cd studio && npm run dev`; deploy with `npx sanity schemas deploy && npx sanity deploy`).
- The website reads Sanity in `src/lib/posts.ts` (cached with `"use cache"`, tag `blog`, 1 h lifetime).
- A Sanity webhook (`blogPost`/`author` create, update, delete) calls `/api/revalidate`, which expires the `blog` tag.
- Articles are written by the SEO tool over the HTTP API: see [`docs/sanity-connection.md`](docs/sanity-connection.md). Long-form fields are Markdown, rendered by `src/components/Markdown.tsx`.
