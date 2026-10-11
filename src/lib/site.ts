// Canonical domain for every build (production and previews), so canonicals and the sitemap
// always point to streetbarlab.com — never to a *.vercel.app URL. Override with NEXT_PUBLIC_SITE_URL.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production" ? "https://streetbarlab.com" : "http://localhost:3000");

export const site = {
  name: "StreetBarLab",
  url: siteUrl.replace(/\/$/, ""),
  tagline: "Free street workout programs, level test & skill roadmaps",
  description:
    "Get a free street workout program built around your level. Take the 2-minute level test, generate your weekly plan and follow step-by-step progressions to your first muscle-up, front lever or handstand.",
};

export const nav = [
  { href: "/program-generator", label: "Program" },
  { href: "/level-test", label: "Level test" },
  { href: "/skills", label: "Skills" },
  { href: "/blog", label: "Blog" },
];

export function absoluteUrl(path = "/") {
  return `${site.url}${path === "/" ? "" : path}`;
}

/** Serialises JSON-LD safely for a <script> tag. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
