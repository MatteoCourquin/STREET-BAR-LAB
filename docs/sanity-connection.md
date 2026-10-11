# Connecting the SEO tool to StreetBarLab (Sanity)

The SEO tool publishes articles by writing `blogPost` documents into Sanity over HTTP.
No SDK is required — one `POST` per article.

## Credentials

| | |
| --- | --- |
| Project ID | `63wccw3u` |
| Dataset | `production` |
| API version | `v2026-10-11` |
| Token | `SANITY_WRITE_TOKEN` in `.env.local` (editor role, never commit it) |

Base URL: `https://63wccw3u.api.sanity.io/v2026-10-11/data`

Every request sends `Authorization: Bearer <SANITY_WRITE_TOKEN>`.

The Studio (to check what the tool published) is at https://streetbarlab.com/studio.

## Publish an article

```bash
curl -X POST "https://63wccw3u.api.sanity.io/v2026-10-11/data/mutate/production?returnIds=true" \
  -H "Authorization: Bearer $SANITY_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d @article.json
```

`article.json`:

```json
{
  "mutations": [
    {
      "create": {
        "_type": "blogPost",
        "externalId": "tool-article-1234",
        "metaTitle": "How to Do Your First Pull-Up (6-Week Plan From Zero)",
        "metaDescription": "Can't do a single pull-up yet? Follow this 6-week street workout plan with negatives, rows and scapular pulls to get your first strict rep.",
        "slug": { "_type": "slug", "current": "how-to-do-your-first-pull-up" },
        "keywordPrimary": "first pull up",
        "keywordsSecondary": ["pull up progression", "negative pull ups"],
        "category": "Beginner",
        "tags": ["pull-up", "beginner"],
        "h1": "How to Do Your First Pull-Up: A 6-Week Plan From Zero",
        "publishedAt": "2026-10-11",
        "introduction": "Your first pull-up is the most important milestone in **street workout**...",
        "keyTakeaways": [
          "Train the pull-up in parts: scapular pulls, rows, holds and negatives.",
          "Three sessions a week is enough to get your first rep in about six weeks.",
          "Stop each set one or two reps before failure."
        ],
        "body": "## Why you can't do a pull-up yet\n\nMost people fail for one of three reasons...\n\n## The 4 exercises you need\n\n### Scapular pull-ups\n\n...",
        "faq": [
          {
            "_key": "q1",
            "question": "How long does it take to do a first pull-up?",
            "answer": "Most beginners get their first strict pull-up in 4 to 8 weeks..."
          },
          {
            "_key": "q2",
            "question": "Are negative pull-ups enough?",
            "answer": "Negatives are the most effective single exercise, but..."
          }
        ],
        "conclusion": "Your first pull-up is a matter of weeks, not months...",
        "cta": {
          "text": "Get a free weekly plan built around your level.",
          "buttonLabel": "Generate my program",
          "href": "/program-generator"
        },
        "sources": [
          { "_key": "s1", "label": "Study title — Journal (2021)", "url": "https://example.org/study" }
        ],
        "relatedSkills": ["muscle-up"]
      }
    }
  ]
}
```

The response contains the new document `_id`. **Store it** in the tool: it is how you update or delete the article later.

```json
{ "transactionId": "…", "results": [{ "id": "0WplzLrkq33JxwTO22jYid", "operation": "create" }] }
```

A document created this way is **published immediately**. To send it as a draft for review in the Studio
instead, set `"_id": "drafts.<any-unique-id>"` in the `create` object.

### When it shows up on the website

Every published change (create, update, delete of an article or author) triggers a Sanity webhook that
rebuilds the website on Vercel. The article is live about **1 minute** later. Drafts don't trigger anything.

Each mutation request starts one rebuild, so send everything for an article in **one request**: upload the
images first, then create the article with all its fields at once, rather than creating it and patching
fields one by one.

## Update an article

Replace the whole document with the `_id` returned at creation:

```json
{ "mutations": [{ "createOrReplace": { "_id": "0WplzLrkq33JxwTO22jYid", "_type": "blogPost", "...": "all fields" } }] }
```

Or change only some fields:

```json
{ "mutations": [{ "patch": { "id": "0WplzLrkq33JxwTO22jYid", "set": { "updatedAt": "2026-11-02", "body": "## …" } } }] }
```

Lost the `_id`? Find it from your own ID:

```bash
curl -G "https://63wccw3u.api.sanity.io/v2026-10-11/data/query/production" \
  -H "Authorization: Bearer $SANITY_WRITE_TOKEN" \
  --data-urlencode 'query=*[_type == "blogPost" && externalId == "tool-article-1234"][0]._id'
```

## Delete an article

```json
{ "mutations": [{ "delete": { "id": "0WplzLrkq33JxwTO22jYid" } }] }
```

## Featured image (optional)

Two steps: upload the file, then reference the returned asset `_id`.

```bash
curl -X POST "https://63wccw3u.api.sanity.io/v2026-10-11/assets/images/production?filename=first-pull-up.webp" \
  -H "Authorization: Bearer $SANITY_WRITE_TOKEN" \
  -H "Content-Type: image/webp" \
  --data-binary @first-pull-up.webp
# → { "document": { "_id": "image-abc123-1200x630-webp", "url": "https://cdn.sanity.io/…" } }
```

```json
"featuredImage": {
  "_type": "image",
  "asset": { "_type": "reference", "_ref": "image-abc123-1200x630-webp" },
  "alt": "Man doing a negative pull-up on an outdoor bar"
}
```

Images inside the body: upload the same way, then use the returned `url` in Markdown: `![alt](https://cdn.sanity.io/…)`.

Without a featured image, the website generates one from the title.

## Field reference

Only `h1`, `slug`, `publishedAt` and `body` are strictly needed — everything else improves SEO and
has a fallback on the website. Recommended lengths are checked in the Studio as warnings only.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `externalId` | string | recommended | The tool's own article ID. |
| `metaTitle` | string | recommended | 45–65 chars. `\| StreetBarLab` is appended by the site. Falls back to `h1`. |
| `metaDescription` | string | recommended | 140–160 chars. |
| `slug` | `{ _type: "slug", current }` | **yes** | kebab-case (`a-z`, `0-9`, `-`), unique. URL: `/blog/<slug>`. |
| `keywordPrimary` | string | no | Internal tracking only, not displayed. |
| `keywordsSecondary` | string[] | no | Internal tracking only. |
| `category` | string | no | Free text, e.g. `Beginner`. Reuse the exact same spelling across articles. |
| `tags` | string[] | no | |
| `featuredImage` | image | no | 1200×630. `alt` required when set. See above. |
| `canonicalUrl` | URL | no | Only when the article is republished from another URL. |
| `noIndex` | boolean | no | `true` hides the article from Google and the sitemap. |
| `schemaType` | `"BlogPosting"` \| `"Article"` | no | Default `BlogPosting`. |
| `structuredDataJsonLd` | string | no | Custom JSON-LD (JSON object or `<script type="application/ld+json">`). **Replaces** the auto-generated JSON-LD entirely. Leave empty in most cases. |
| `h1` | string | **yes** | Keyword in the first 6 words; different from `metaTitle`. |
| `author` | reference | no | Leave empty → default author (StreetBarLab). |
| `publishedAt` | `YYYY-MM-DD` | **yes** | |
| `updatedAt` | `YYYY-MM-DD` | no | Set on every meaningful update. |
| `introduction` | Markdown | recommended | 100–150 words, keyword in the first 100 words. |
| `keyTakeaways` | string[] | recommended | 3–5 items. |
| `body` | Markdown | **yes** | See Markdown rules below. |
| `faq` | `{ _key, question, answer }[]` | recommended | 2–6 items, plain-text answers (60–100 words). Generates `FAQPage` JSON-LD. |
| `conclusion` | Markdown | no | |
| `cta` | `{ text, buttonLabel, href }` | no | Default: link to `/program-generator`. |
| `sources` | `{ _key, label, url }[]` | no | Only when citing studies or stats. |
| `relatedPosts` | reference[] | no | Max 3: `{ "_key": "r1", "_type": "reference", "_ref": "<article _id>" }`. Default: same category. |
| `relatedSkills` | string[] | no | Any of `l-sit`, `handstand`, `muscle-up`, `back-lever`, `front-lever`, `planche`. |

Array items made of objects (`faq`, `sources`, `relatedPosts`) need a `_key`: any string unique within the array.

## Markdown rules

- Start sections with `##` (H2), then `###` / `####`. **Never `#`**: the H1 is its own field.
- Supported: bold, italic, lists, links, blockquotes, GitHub tables, images, inline code.
- Internal links are relative: `[muscle-up progression](/skills/muscle-up)`, `[level test](/level-test)`.
- No raw HTML, no `<script>`.
- Strip invisible Unicode (zero-width spaces, soft hyphens) that LLMs sometimes emit.

## Errors

| Status | Meaning |
| --- | --- |
| 401 | Missing or wrong token. |
| 403 | Token lacks write access (must be editor role). |
| 409 | `create` with an `_id` that already exists — use `createOrReplace`. |
