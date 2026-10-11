import Link from "next/link";

const tools = [
  { href: "/level-test", title: "Find your level", text: "7 questions, 2 minutes. Get your level and your weak point." },
  { href: "/program-generator", title: "Build your program", text: "A full week with sets, reps and rest, adapted to you." },
  { href: "/skills", title: "Unlock a skill", text: "Step-by-step progressions to the muscle-up, levers and more." },
];

/** End-of-page block pointing to the free tools, to keep visitors on the site. */
export function ToolsCta({ title = "Keep training — it's free", exclude }: { title?: string; exclude?: string }) {
  const items = tools.filter((t) => t.href !== exclude);

  return (
    <section className="card relative overflow-hidden p-6 sm:p-10">
      <div className="absolute inset-y-0 right-0 hidden w-24 stripes opacity-20 md:block" aria-hidden="true" />
      <h2 className="h-display relative text-3xl sm:text-4xl">{title}</h2>
      <div className={`relative mt-6 grid gap-3 md:mr-28 ${items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {items.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group rounded-lg border border-line bg-ink p-5 transition-colors hover:border-accent"
          >
            <p className="font-semibold group-hover:text-accent">{t.title} →</p>
            <p className="mt-1 text-sm text-muted">{t.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
