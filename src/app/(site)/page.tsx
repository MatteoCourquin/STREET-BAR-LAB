import type { Metadata } from "next";
import Link from "next/link";
import { Faq, type FaqItem } from "@/components/Faq";
import { LevelTabs } from "@/components/LevelTabs";
import { ToolsCta } from "@/components/ToolsCta";
import { PostCard } from "@/components/PostCard";
import { ProgramView } from "@/components/ProgramView";
import { getAllPosts } from "@/lib/posts";
import { generateProgram, levels } from "@/lib/program";
import { skills, tiers } from "@/lib/skills";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Free Street Workout Program for Beginners to Advanced | StreetBarLab" },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Free Street Workout Program — Built Around Your Level",
    description: site.description,
    url: "/",
  },
};

const levelCopy = {
  beginner:
    "For your first months on the bars. Negatives, rows and support holds build the strength for your first pull-ups and dips. Three full-body sessions a week.",
  intermediate:
    "You've got your first sets of pull-ups and dips. Now you add volume, harder variations and start working toward the muscle-up.",
  advanced:
    "Explosive and one-arm biased variations plus a skill block each session for the front lever, handstand or planche.",
};

const principles = [
  {
    title: "Progress through variations",
    text: "No weights to add? You make exercises harder: incline push-up → push-up → diamond → archer. Every level of the program uses the right variation.",
  },
  {
    title: "Balance pull and push",
    text: "Every week includes as many pulling sets as pushing sets. It's what keeps shoulders healthy when you train on bars several times a week.",
  },
  {
    title: "Train often, not to failure",
    text: "Bodyweight strength is a skill. Three to five sessions a week, stopping 1–2 reps short of failure, beats one brutal session.",
  },
  {
    title: "Skills come on top of strength",
    text: "Muscle-ups and levers come from a strong base. The program adds skill work only when your strength is ready for it.",
  },
];

const equipment = [
  { name: "Pull-up bar", text: "Any park bar or a door-frame bar at home. Essential." },
  { name: "Dip bars", text: "Parallel bars in most street workout parks. Optional — the generator replaces dips if you don't have them." },
  { name: "Low bar or bench", text: "For Australian rows, split squats and elevated push-ups." },
  { name: "Your bodyweight", text: "That's it. No gym membership, no weights." },
];

const faq: FaqItem[] = [
  {
    q: "What is a street workout program?",
    a: "A street workout program is a structured weekly plan of bodyweight exercises done on bars and the floor — pull-ups, dips, push-ups, rows, squats and core work — with sets, reps and rest times that progress over time. Good programs also include skill progressions like the muscle-up or front lever.",
  },
  {
    q: "Is street workout good for beginners?",
    a: "Yes. Every exercise has an easier version: negative pull-ups instead of pull-ups, incline push-ups instead of push-ups, support holds instead of dips. A beginner street workout program starts there and builds up to the full movements in a few weeks.",
  },
  {
    q: "How many days a week should I do street workout?",
    a: "Three full-body sessions a week is ideal for beginners. Intermediate athletes can train 3–4 times with a pull/push split, and advanced athletes 4–5 times with daily skill practice.",
  },
  {
    q: "Can you build muscle with street workout?",
    a: "Absolutely. Muscle grows when you train close to failure with progressive difficulty, and harder bodyweight variations do exactly that. Street workout is especially effective for the back, chest, shoulders, arms and core.",
  },
  {
    q: "What's the difference between street workout and calisthenics?",
    a: "They use the same exercises. Calisthenics is the broader term for bodyweight training; street workout is the outdoor, park-based culture of calisthenics with a strong focus on bar skills and freestyle.",
  },
  {
    q: "How long until I see results?",
    a: "Most beginners add several reps to their pull-ups and push-ups within 4–6 weeks. Visible muscle changes usually take 2–3 months of consistent training, and skills like the muscle-up 3–9 months.",
  },
];

export default async function Home() {
  const posts = (await getAllPosts()).slice(0, 3);
  const preview = generateProgram({ level: "beginner", goal: "muscle", days: 3, minutes: 30, hasDipBars: true });
  const firstSession = preview.sessions[0];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="container-x grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="eyebrow">100% free · no app · no signup</p>
            <h1 className="h-display mt-5 text-5xl sm:text-6xl lg:text-7xl">
              Free street workout program, <span className="text-accent">built around your level.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Take a 2-minute level test, get a weekly plan with exact sets, reps and rest times, then follow
              step-by-step progressions to your first muscle-up, front lever or handstand.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/program-generator" className="btn-primary">
                Build my program →
              </Link>
              <Link href="/level-test" className="btn-ghost">
                Take the level test
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
              {[
                ["3", "levels"],
                ["6", "skill roadmaps"],
                ["1", "bar needed"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd>
                    <span className="h-display block text-4xl text-chalk">{n}</span>
                    <span className="text-xs uppercase tracking-wider text-muted">{l}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Session preview card */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 -z-10 rotate-3 rounded-2xl stripes opacity-25" aria-hidden="true" />
            <div className="card -rotate-1 shadow-2xl shadow-black/60">
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <div>
                  <p className="eyebrow">Today · {firstSession.day}</p>
                  <p className="mt-1 font-bold">Beginner — {firstSession.title}</p>
                </div>
                <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold uppercase text-ink">30 min</span>
              </div>
              <ul className="divide-y divide-line/70">
                {firstSession.items.map((it) => (
                  <li key={it.name} className="flex items-center justify-between gap-3 px-5 py-3.5 text-sm">
                    <span className="flex items-center gap-3">
                      <span className="h-4 w-4 rounded border border-line" aria-hidden="true" />
                      {it.name}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {it.sets}×{it.reps}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container-x py-20">
        <p className="eyebrow">How it works</p>
        <h2 className="h-display mt-3 text-4xl sm:text-5xl">From zero to your first skill in 3 steps</h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { n: "01", t: "Find your level", d: "7 quick questions about your pull-ups, dips, push-ups and core. You get your level and your weak point.", href: "/level-test", cta: "Take the test" },
            { n: "02", t: "Generate your plan", d: "Pick your goal, your training days and session length. Get a full week with sets, reps, rest and coaching cues.", href: "/program-generator", cta: "Open the generator" },
            { n: "03", t: "Unlock skills", d: "Track your progress step by step toward the L-sit, muscle-up, levers, handstand and planche.", href: "/skills", cta: "See the roadmap" },
          ].map((s) => (
            <li key={s.n} className="card flex flex-col p-6">
              <span className="font-display text-5xl text-accent">{s.n}</span>
              <h3 className="mt-4 text-xl font-bold">{s.t}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.d}</p>
              <Link href={s.href} className="mt-5 text-sm font-semibold text-accent hover:underline">
                {s.cta} →
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* SAMPLE PROGRAMS */}
      <section className="border-y border-line bg-surface/40 py-20">
        <div className="container-x">
          <p className="eyebrow">Sample weeks</p>
          <h2 className="h-display mt-3 text-4xl sm:text-5xl">A street workout program for every level</h2>
          <p className="mt-4 max-w-2xl text-muted">
            Here&apos;s what a 3-day week looks like at each level. Want 2, 4 or 5 days, a strength or skills focus,
            or no dip bars? The <Link href="/program-generator" className="text-accent hover:underline">program generator</Link> adapts it in one click.
          </p>
          <div className="mt-10">
            <LevelTabs
              tabs={levels.map((l) => ({
                id: l.id,
                label: l.label,
                panel: (
                  <div>
                    <h3 className="text-xl font-bold">{l.label} street workout program</h3>
                    <p className="mb-6 mt-2 max-w-2xl text-sm leading-relaxed text-muted">{levelCopy[l.id]}</p>
                    <ProgramView
                      program={generateProgram({ level: l.id, goal: "muscle", days: 3, minutes: 45, hasDipBars: true })}
                    />
                  </div>
                ),
              }))}
            />
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="container-x py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">The method</p>
            <h2 className="h-display mt-3 text-4xl sm:text-5xl">What makes a street workout program actually work</h2>
            <p className="mt-4 text-muted">
              Most people stall because they repeat the same workout for months. These four rules are built into
              every plan the generator creates.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((p, i) => (
              <div key={p.title} className="card p-6">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPMENT */}
      <section className="container-x pb-20">
        <div className="card grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow">Equipment</p>
            <h2 className="h-display mt-3 text-3xl sm:text-4xl">All you need is a bar</h2>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {equipment.map((e) => (
              <li key={e.name} className="border-l-2 border-accent pl-4">
                <h3 className="font-semibold">{e.name}</h3>
                <p className="mt-1 text-sm text-muted">{e.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SKILLS */}
      <section className="border-y border-line bg-surface/40 py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Skill roadmap</p>
              <h2 className="h-display mt-3 text-4xl sm:text-5xl">Your path to the big street workout skills</h2>
            </div>
            <Link href="/skills" className="btn-ghost">
              Full roadmap →
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((s) => (
              <Link key={s.slug} href={`/skills/${s.slug}`} className="card group p-6 transition-colors hover:border-accent/60">
                <div className="flex items-center justify-between text-xs text-muted">
                  <span>Tier {s.tier} · {tiers[s.tier].name}</span>
                  <span>{s.timeline}</span>
                </div>
                <h3 className="mt-3 text-2xl font-bold group-hover:text-accent">{s.name}</h3>
                <p className="mt-2 text-sm text-muted">{s.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="h-display mt-3 text-4xl sm:text-5xl">Street workout program questions</h2>
          </div>
          <Faq items={faq} />
        </div>
      </section>

      {/* BLOG */}
      {posts.length > 0 && (
        <section className="container-x pb-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="h-display text-4xl sm:text-5xl">Latest from the blog</h2>
            <Link href="/blog" className="text-sm font-semibold text-accent hover:underline">
              All articles →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      <div className="container-x">
        <ToolsCta title="Start training today" />
      </div>
    </>
  );
}
