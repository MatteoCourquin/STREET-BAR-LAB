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

No environment variables needed on Vercel. `.env.local` holds `SANITY_WRITE_TOKEN`, the editor token for the SEO tool; the website never uses it.

The canonical domain (`https://streetbarlab.com`) is set in `src/lib/site.ts`; Search Console is verified by DNS.

## Blog (Sanity)

- Project `63wccw3u`, dataset `production` (public read). The Studio is embedded at https://streetbarlab.com/studio (`sanity.config.ts`, route `src/app/studio/[[...tool]]`, schema in `src/sanity/schemaTypes`). After a schema change, run `npx sanity schemas deploy` so API tools see it.
- Website pages live in the `src/app/(site)` route group, which adds the header and footer; `/studio` renders full-screen outside it.
- The website reads Sanity in `src/lib/posts.ts`, cached with `"use cache"` and `cacheLife("max")`.
- A Sanity webhook (`blogPost`/`author` create, update, delete) calls a Vercel deploy hook: every publish rebuilds the site, which starts with an empty cache.
- Articles are written by the SEO tool over the HTTP API: see [`docs/sanity-connection.md`](docs/sanity-connection.md). Long-form fields are Markdown, rendered by `src/components/Markdown.tsx`.
