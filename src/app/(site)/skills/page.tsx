import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SkillProgressBadge } from "@/components/SkillTracker";
import { getSkill, skills, tiers } from "@/lib/skills";

export const metadata: Metadata = {
  title: "Street Workout Skills Roadmap: Progressions From L-Sit to Planche",
  description:
    "The street workout skill tree: L-sit, handstand, muscle-up, back lever, front lever and planche. Prerequisites, step-by-step progressions and a progress tracker.",
  alternates: { canonical: "/skills" },
};

export default function Page() {
  return (
    <div className="container-x py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "Skills", href: "/skills" }]} />
      <header className="mt-6 max-w-3xl">
        <p className="eyebrow">Skill roadmap</p>
        <h1 className="h-display mt-3 text-5xl sm:text-6xl">The street workout skill tree</h1>
        <p className="mt-4 text-lg text-muted">
          Six skills, ordered by difficulty. Each one lists what you need before starting and the exact steps to
          get there. Tick steps as you unlock them — your progress stays saved in this browser.
        </p>
      </header>

      <div className="mt-14 grid gap-12">
        {([1, 2, 3, 4] as const).map((tier) => (
          <section key={tier} aria-labelledby={`tier-${tier}`} className="grid gap-6 lg:grid-cols-[220px_1fr]">
            <div className="lg:border-r lg:border-line lg:pr-6">
              <p className="font-mono text-xs text-accent">TIER {tier}</p>
              <h2 id={`tier-${tier}`} className="mt-1 text-2xl font-bold">
                {tiers[tier].name}
              </h2>
              <p className="mt-2 text-sm text-muted">{tiers[tier].text}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {skills
                .filter((s) => s.tier === tier)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/skills/${s.slug}`}
                    className="card group flex flex-col p-6 transition-colors hover:border-accent/60"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs text-muted">
                      <span>{s.category}</span>
                      <SkillProgressBadge slug={s.slug} total={s.steps.length} />
                    </div>
                    <h3 className="mt-2 text-2xl font-bold group-hover:text-accent">{s.name}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted">{s.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full border border-line px-2.5 py-1">{s.steps.length} steps</span>
                      <span className="rounded-full border border-line px-2.5 py-1">{s.timeline}</span>
                      {s.after.map((a) => (
                        <span key={a} className="rounded-full border border-accent/40 px-2.5 py-1 text-accent">
                          after {getSkill(a)?.name}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
