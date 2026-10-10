"use client";

import { useEffect, useMemo, useState } from "react";
import {
  generateProgram,
  goals,
  levels,
  type Goal,
  type Level,
  type Program,
  type ProgramInput,
  type SessionLength,
} from "@/lib/program";
import { LEVEL_KEY, readJSON } from "@/lib/storage";
import { ProgramView } from "./ProgramView";

function Choice<T extends string | number>({
  label,
  options,
  value,
  onChange,
  cols = "grid-cols-2 sm:grid-cols-3",
}: {
  cols?: string;
  label: string;
  options: { id: T; label: string; blurb?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold">{label}</legend>
      <div className={`grid gap-2 ${cols}`}>
        {options.map((o) => {
          const active = o.id === value;
          return (
            <button
              key={String(o.id)}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.id)}
              className={`rounded-lg border px-3 py-3 text-left transition-colors ${
                active ? "border-accent bg-accent/10" : "border-line hover:border-muted"
              }`}
            >
              <span className={`block text-sm font-semibold ${active ? "text-accent" : ""}`}>{o.label}</span>
              {o.blurb && <span className="mt-0.5 block text-xs text-muted">{o.blurb}</span>}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function programToText(p: Program) {
  const lines = [`StreetBarLab — ${p.level} ${p.goal} program, ${p.days} days/week, ${p.minutes} min`, ""];
  for (const s of p.sessions) {
    lines.push(`${s.day} — ${s.title}`);
    s.items.forEach((it, i) => lines.push(`  ${i + 1}. ${it.name}: ${it.sets} × ${it.reps} (rest ${it.rest})`));
    lines.push("");
  }
  lines.push("Progression:", ...p.progression.map((r) => `- ${r}`));
  return lines.join("\n");
}

export function ProgramGenerator() {
  const [input, setInput] = useState<ProgramInput>({
    level: "beginner",
    goal: "muscle",
    days: 3,
    minutes: 45,
    hasDipBars: true,
  });
  const [fromTest, setFromTest] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = readJSON<{ level: Level }>(LEVEL_KEY);
    if (saved?.level) {
      // Sync with the level test result stored in this browser.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInput((i) => ({ ...i, level: saved.level }));
      setFromTest(true);
    }
  }, []);

  const program = useMemo(() => generateProgram(input), [input]);
  const set = <K extends keyof ProgramInput>(k: K, v: ProgramInput[K]) => setInput((i) => ({ ...i, [k]: v }));

  async function copy() {
    try {
      await navigator.clipboard.writeText(programToText(program));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <div className="grid gap-10">
      <div className="card grid gap-6 p-5 sm:p-7 print:hidden">
        {fromTest && (
          <p className="rounded-md border border-accent/40 bg-accent/10 px-3 py-2 text-xs text-accent">
            Level pre-filled from your level test result.
          </p>
        )}
        <Choice<Level> label="Your level" options={levels} value={input.level} onChange={(v) => set("level", v)} />
        <Choice<Goal> label="Main goal" options={goals} value={input.goal} onChange={(v) => set("goal", v)} />
        <div className="grid gap-6 sm:grid-cols-2">
          <Choice<2 | 3 | 4 | 5>
            label="Days per week"
            cols="grid-cols-4"
            options={[2, 3, 4, 5].map((d) => ({ id: d as 2 | 3 | 4 | 5, label: `${d} days` }))}
            value={input.days}
            onChange={(v) => set("days", v)}
          />
          <Choice<SessionLength>
            label="Time per session"
            cols="grid-cols-3"
            options={([30, 45, 60] as const).map((m) => ({ id: m, label: `${m} min` }))}
            value={input.minutes}
            onChange={(v) => set("minutes", v)}
          />
        </div>
        <label className="flex cursor-pointer items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={input.hasDipBars}
            onChange={(e) => set("hasDipBars", e.target.checked)}
            className="h-5 w-5 accent-[#ffd60a]"
          />
          I have access to dip bars (parallel bars)
        </label>
      </div>

      <section aria-live="polite">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Your week</p>
            <h2 className="h-display mt-2 text-3xl sm:text-4xl">
              {input.level} {input.goal} plan · {input.days}×/week
            </h2>
          </div>
          <div className="flex gap-2 print:hidden">
            <button type="button" onClick={copy} className="btn-ghost px-4 py-2">
              {copied ? "Copied ✓" : "Copy plan"}
            </button>
            <button type="button" onClick={() => window.print()} className="btn-ghost px-4 py-2">
              Print / PDF
            </button>
          </div>
        </div>
        <ProgramView program={program} />
        <div className="card mt-6 p-5 sm:p-7">
          <h3 className="text-lg font-bold">How to progress</h3>
          <ul className="mt-3 grid gap-2 text-sm text-muted">
            {program.progression.map((r) => (
              <li key={r} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
