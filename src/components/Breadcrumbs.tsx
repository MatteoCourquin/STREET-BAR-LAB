import Link from "next/link";
import { absoluteUrl, jsonLd } from "@/lib/site";

type Crumb = { name: string; href: string };

/** `structuredData={false}` when the page ships its own JSON-LD. */
export function Breadcrumbs({ items, structuredData = true }: { items: Crumb[]; structuredData?: boolean }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {all.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === all.length - 1 ? (
              <span aria-current="page" className="text-chalk/80">
                {c.name}
              </span>
            ) : (
              <Link href={c.href} className="hover:text-accent">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
      {structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />}
    </nav>
  );
}
