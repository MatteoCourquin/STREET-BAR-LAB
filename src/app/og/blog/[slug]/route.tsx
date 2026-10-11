import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { OgImage } from "@/components/OgImage";
import { getPost } from "@/lib/posts";
import { urlFor } from "@/sanity/client";

const size = { width: 1200, height: 630 };

// Open Graph image for an article, at a stable URL (/og/blog/[slug]) shared by the page metadata
// and the JSON-LD. A metadata `opengraph-image` file inside the (site) route group would get a
// hashed path instead.
export async function GET(_req: NextRequest, ctx: RouteContext<"/og/blog/[slug]">) {
  const { slug } = await ctx.params;
  const post = await getPost(slug);
  if (!post) return new Response("Not found", { status: 404 });

  if (post.image) {
    const src = urlFor(post.image).width(size.width).height(size.height).format("png").url();
    return new ImageResponse(
      // next/og renders this to a PNG; next/image does not apply here.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt="" width={size.width} height={size.height} style={{ objectFit: "cover" }} />,
      size,
    );
  }
  return new ImageResponse(<OgImage eyebrow={post.category} title={post.title} />, size);
}
