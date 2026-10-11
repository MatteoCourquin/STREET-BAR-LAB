import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProgramGenerator } from "@/components/ProgramGenerator";
import { ToolsCta } from "@/components/ToolsCta";

export const metadata: Metadata = {
  title: "Street Workout Program Generator (Free, Personalised)",
  description:
    "Generate a free street workout program in seconds: choose your level, goal, training days and session length. Sets, reps, rest times and coaching cues included.",
  alternates: { canonical: "/program-generator" },
};

export default function Page() {
  return (
    <div className="container-x py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "Program generator", href: "/program-generator" }]} />
      <header className="mt-6 max-w-3xl">
        <p className="eyebrow">Program generator</p>
        <h1 className="h-display mt-3 text-5xl sm:text-6xl">Build your street workout program</h1>
        <p className="mt-4 text-lg text-muted">
          Pick your settings and your weekly plan updates instantly. Don&apos;t know your level?{" "}
          <Link href="/level-test" className="text-accent hover:underline">
            Take the 2-minute test
          </Link>{" "}
          and it will be filled in for you.
        </p>
      </header>
      <div className="mt-10">
        <ProgramGenerator />
      </div>
      <section className="mt-20 grid gap-8 md:grid-cols-3">
        {[
          ["How the plan is built", "Every session alternates pulling and pushing, hits legs and core, and rotates between two variations of each movement so you don't repeat the exact same workout twice in a row."],
          ["Choosing your days", "2–3 days: full body every session. 4 days: pull + core / push + legs. 5 days: dedicated pull, push and legs days. More days doesn't mean faster progress if you don't recover."],
          ["When to change level", "When you hit the top of the rep range on every set of the main exercises for two sessions in a row, switch to the next level and regenerate your plan."],
        ].map(([t, d]) => (
          <div key={t}>
            <h2 className="text-lg font-bold">{t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
          </div>
        ))}
      </section>
      <div className="mt-20 print:hidden">
        <ToolsCta title="Go further" exclude="/program-generator" />
      </div>
    </div>
  );
}
