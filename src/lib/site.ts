export const site = {
  name: "StreetBarLab",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://streetbarlab.com").replace(/\/$/, ""),
  tagline: "Free street workout programs, level test & skill roadmaps",
  description:
    "Get a free street workout program built around your level. Take the 2-minute level test, generate your weekly plan and follow step-by-step progressions to your first muscle-up, front lever or handstand.",
  email: "hello@streetbarlab.com",
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
