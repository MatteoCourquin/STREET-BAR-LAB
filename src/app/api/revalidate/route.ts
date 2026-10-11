import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { BLOG_CACHE_TAG } from "@/lib/posts";

// Called by a Sanity webhook whenever an article or author is created, updated or deleted,
// so new content shows up on the site within seconds instead of waiting for the cache to expire.
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return new Response("Missing SANITY_REVALIDATE_SECRET", { status: 500 });

  const { isValidSignature } = await parseBody(req, secret, true);
  if (!isValidSignature) return new Response("Invalid signature", { status: 401 });

  revalidateTag(BLOG_CACHE_TAG, { expire: 0 });
  return Response.json({ revalidated: BLOG_CACHE_TAG });
}
