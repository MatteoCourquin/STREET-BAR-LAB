import { jsonLd } from "@/lib/site";

export type FaqItem = { q: string; a: string };

/** `structuredData={false}` when the page ships its own JSON-LD. */
export function Faq({ items, structuredData = true }: { items: FaqItem[]; structuredData?: boolean }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <div className="divide-y divide-line rounded-xl border border-line bg-surface">
      {items.map((i) => (
        <details key={i.q} className="group px-5 py-1 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold [&::-webkit-details-marker]:hidden">
            <h3>{i.q}</h3>
            <span aria-hidden="true" className="text-xl text-accent transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="pb-5 text-sm leading-relaxed text-muted">{i.a}</p>
        </details>
      ))}
      {structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />}
    </div>
  );
}
