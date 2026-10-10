"use client";

import { useEffect, useState } from "react";
import type { SkillStep } from "@/lib/skills";
import { readJSON, SKILLS_KEY, writeJSON } from "@/lib/storage";

type Store = Record<string, string[]>;

function useSkillProgress(slug: string) {
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    // Hydrate from this browser's saved progress after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDone(readJSON<Store>(SKILLS_KEY)?.[slug] ?? []);
  }, [slug]);

  function toggle(id: string) {
    setDone((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writeJSON(SKILLS_KEY, { ...(readJSON<Store>(SKILLS_KEY) ?? {}), [slug]: next });
      return next;
    });
  }

  return { done, toggle };
}

export function SkillTracker({ slug, steps }: { slug: string; steps: SkillStep[] }) {
  const { done, toggle } = useSkillProgress(slug);
  const pct = Math.round((done.length / steps.length) * 100);

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
          <div className="h-full bg-accent transition-[width] duration-300" style={{ width: `${pct}%` }} />
        </div>
        <span className="font-mono text-xs text-muted">
          {done.length}/{steps.length} unlocked
        </span>
      </div>
      <ol className="relative grid gap-3">
        {steps.map((s, i) => {
          const checked = done.includes(s.id);
          return (
            <li key={s.id}>
              <label
                className={`card flex cursor-pointer gap-4 p-4 transition-colors sm:p-5 ${
                  checked ? "border-accent/60 bg-accent/5" : "hover:border-muted"
                }`}
              >
                <input type="checkbox" checked={checked} onChange={() => toggle(s.id)} className="sr-only" />
                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-bold ${
                    checked ? "border-accent bg-accent text-ink" : "border-line text-muted"
                  }`}
                >
                  {checked ? "✓" : i + 1}
                </span>
                <span className="flex-1">
                  <span className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-semibold">{s.name}</span>
                    <span className="font-mono text-xs text-accent">{s.target}</span>
                  </span>
                  <span className="mt-1 block text-sm text-muted">{s.how}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-xs text-muted">Tick a step once you hit its target. Progress is saved in this browser.</p>
    </div>
  );
}

export function SkillProgressBadge({ slug, total }: { slug: string; total: number }) {
  const { done } = useSkillProgress(slug);
  if (done.length === 0) return null;
  return (
    <span className="rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[11px] text-accent">
      {done.length}/{total}
    </span>
  );
}
