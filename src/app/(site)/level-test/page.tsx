import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LevelTest } from "@/components/LevelTest";

export const metadata: Metadata = {
  title: "Street Workout Level Test: Beginner, Intermediate or Advanced?",
  description:
    "Find your street workout level in 2 minutes. Answer 7 questions about pull-ups, dips, push-ups and core to get your level, your weak point and your next skill.",
  alternates: { canonical: "/level-test" },
};

const benchmarks = [
  ["Beginner", "0–4 pull-ups, under 20 push-ups, working toward your first dips."],
  ["Intermediate", "5–12 pull-ups, 10+ dips, 30+ push-ups, first skill holds like the tuck front lever."],
  ["Advanced", "12+ pull-ups, 20+ dips, muscle-up or advanced levers, freestanding handstand."],
];

export default function Page() {
  return (
    <div className="container-x py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "Level test", href: "/level-test" }]} />
      <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <header>
          <p className="eyebrow">Level test · 2 minutes</p>
          <h1 className="h-display mt-3 text-5xl sm:text-6xl">What&apos;s your street workout level?</h1>
          <p className="mt-4 text-lg text-muted">
            Answer honestly with strict reps. You&apos;ll get your level, your strength profile, your weak point and
            the skill you should chase next.
          </p>
          <h2 className="mt-10 text-lg font-bold">Street workout level benchmarks</h2>
          <ul className="mt-4 grid gap-3">
            {benchmarks.map(([l, d]) => (
              <li key={l} className="border-l-2 border-accent pl-4">
                <p className="font-semibold">{l}</p>
                <p className="text-sm text-muted">{d}</p>
              </li>
            ))}
          </ul>
        </header>
        <LevelTest />
      </div>
    </div>
  );
}
