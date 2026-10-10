"use client";

import { useState, type ReactNode } from "react";

/** Tabs whose panels are all server-rendered in the HTML (good for SEO), only one shown at a time. */
export function LevelTabs({ tabs }: { tabs: { id: string; label: string; panel: ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0].id);

  return (
    <div>
      <div role="tablist" aria-label="Program level" className="mb-6 inline-flex rounded-lg border border-line bg-surface p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setActive(t.id)}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
              active === t.id ? "bg-accent text-ink" : "text-muted hover:text-chalk"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div key={t.id} role="tabpanel" id={`panel-${t.id}`} aria-labelledby={`tab-${t.id}`} hidden={active !== t.id}>
          {t.panel}
        </div>
      ))}
    </div>
  );
}
