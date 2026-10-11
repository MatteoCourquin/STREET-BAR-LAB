import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { createClient } from "next-sanity";

// The dataset is public: published content is read without a token.
export const client = createClient({
  projectId: "63wccw3u",
  dataset: "production",
  apiVersion: "2026-10-11",
  // Next's cache sits in front; reading from the API (not the CDN) avoids stacking a second
  // cache delay on top of it.
  useCdn: false,
  perspective: "published",
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format");
}
