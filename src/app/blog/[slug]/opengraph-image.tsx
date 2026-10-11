import { ImageResponse } from "next/og";
import { OgImage } from "@/components/OgImage";
import { getAllPosts, getPost } from "@/lib/posts";
import { urlFor } from "@/sanity/client";

export const alt = "StreetBarLab article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "__placeholder__" }];
}

// Uses the featured image from Sanity when there is one, otherwise a branded card with the title.
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (post?.image) {
    const src = urlFor(post.image).width(size.width).height(size.height).format("png").url();
    return new ImageResponse(
      <img src={src} alt="" width={size.width} height={size.height} style={{ objectFit: "cover" }} />,
      size,
    );
  }
  return new ImageResponse(<OgImage eyebrow={post?.category ?? "Blog"} title={post?.title ?? "StreetBarLab"} />, size);
}
