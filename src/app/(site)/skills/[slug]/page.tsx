import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SkillTracker } from "@/components/SkillTracker";
import { getSkill, skills, tiers } from "@/lib/skills";
import { absoluteUrl, jsonLd } from "@/lib/site";

export function generateStaticParams() {
  return skills.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/skills/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) return {};
  return {
    title: `${skill.name} Progression: ${skill.steps.length} Steps From Zero`,
    description: `How to learn the ${skill.name.toLowerCase()}: prerequisites, ${skill.steps.length} progression steps with targets, common mistakes and a progress tracker. ${skill.summary}`,
    alternates: { canonical: `/skills/${skill.slug}` },
  };
}

export default async function Page({ params }: PageProps<"/skills/[slug]">) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();

  const related = skills.filter((s) => s.slug !== skill.slug && Math.abs(s.tier - skill.tier) <= 1).slice(0, 3);
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${skill.name} progression`,
    description: skill.summary,
    url: absoluteUrl(`/skills/${skill.slug}`),
    publisher: { "@id": absoluteUrl("/#organization") },
  };

  return (
    <div className="container-x py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { name: "Skills", href: "/skills" },
          { name: skill.name, href: `/skills/${skill.slug}` },
        ]}
      />
      <div className="mt-6 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="eyebrow">
            Tier {skill.tier} · {tiers[skill.tier].name} · {skill.category}
          </p>
          <h1 className="h-display mt-3 text-5xl sm:text-6xl">{skill.name} progression</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{skill.intro}</p>

          <h2 className="mt-12 text-2xl font-bold">The {skill.steps.length} steps to the {skill.name.toLowerCase()}</h2>
          <p className="mb-6 mt-2 text-sm text-muted">
            Move to the next step only when you hit the target with clean form, 2–3 sessions in a row.
          </p>
          <SkillTracker slug={skill.slug} steps={skill.steps} />
        </div>

        <aside className="grid content-start gap-4 lg:sticky lg:top-24">
          <div className="card p-6">
            <h2 className="font-bold">Before you start</h2>
            <ul className="mt-3 grid gap-2 text-sm text-muted">
              {skill.prerequisites.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-accent">✓</span>
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">
              Typical timeline: <span className="text-chalk">{skill.timeline}</span>
            </p>
          </div>
          <div className="card p-6">
            <h2 className="font-bold">Common mistakes</h2>
            <ul className="mt-3 grid gap-2 text-sm text-muted">
              {skill.mistakes.map((m) => (
                <li key={m} className="flex gap-2">
                  <span className="text-rust">✕</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h2 className="font-bold">Not strong enough yet?</h2>
            <p className="mt-2 text-sm text-muted">
              Build the base first with a structured plan, then add this skill at the start of each session.
            </p>
            <Link href="/program-generator" className="btn-primary mt-4 w-full">
              Generate my program
            </Link>
          </div>
        </aside>
      </div>

      <section className="mt-20">
        <h2 className="text-2xl font-bold">Related skills</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {related.map((s) => (
            <Link key={s.slug} href={`/skills/${s.slug}`} className="card p-5 transition-colors hover:border-accent/60">
              <p className="text-xs text-muted">Tier {s.tier}</p>
              <h3 className="mt-1 text-lg font-bold">{s.name} progression</h3>
              <p className="mt-1 text-sm text-muted">{s.summary}</p>
            </Link>
          ))}
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleLd)} />
    </div>
  );
}
