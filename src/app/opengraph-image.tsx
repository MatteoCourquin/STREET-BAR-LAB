import { ImageResponse } from "next/og";
import { OgImage } from "@/components/OgImage";

export const alt = "StreetBarLab — free street workout program built around your level";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<OgImage eyebrow="Free street workout program" title="Built around your level." />, size);
}
