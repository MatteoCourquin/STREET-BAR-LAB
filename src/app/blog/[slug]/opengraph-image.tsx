import { ImageResponse } from "next/og";
import { OgImage } from "@/components/OgImage";
import { getAllPosts, getPost } from "@/lib/posts";

export const alt = "StreetBarLab article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return new ImageResponse(<OgImage eyebrow={post?.category ?? "Blog"} title={post?.title ?? "StreetBarLab"} />, size);
}
