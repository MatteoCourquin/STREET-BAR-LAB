import type { Program } from "@/lib/program";

export function ProgramView({ program, compact = false }: { program: Program; compact?: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {program.sessions.map((s) => (
        <article key={s.day + s.title} className="card overflow-hidden">
          <header className="flex items-baseline justify-between gap-3 border-b border-line px-5 py-4">
            <div>
              <p className="eyebrow">{s.day}</p>
              <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
            </div>
            <span className="text-xs text-muted">{s.focus}</span>
          </header>
          <ol className="divide-y divide-line/70">
            {s.items.map((it, i) => (
              <li key={it.name} className="px-5 py-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold">
                    <span className="mr-2 font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                    {it.skill ? <span className="text-accent">{it.name}</span> : it.name}
                  </p>
                  <p className="shrink-0 text-right font-mono text-xs text-chalk">
                    {it.sets} × {it.reps}
                  </p>
                </div>
                {!compact && (
                  <p className="mt-1 pl-7 text-xs leading-relaxed text-muted">
                    {it.cue} <span className="text-chalk/60">· Rest {it.rest}</span>
                  </p>
                )}
              </li>
            ))}
          </ol>
        </article>
      ))}
    </div>
  );
}
