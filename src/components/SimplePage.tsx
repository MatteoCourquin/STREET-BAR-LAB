import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";

export function SimplePage({
  title,
  href,
  intro,
  children,
}: {
  title: string;
  href: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="container-x py-10 sm:py-14">
      <Breadcrumbs items={[{ name: title, href }]} />
      <div className="mx-auto mt-8 max-w-3xl">
        <h1 className="h-display text-5xl sm:text-6xl">{title}</h1>
        {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
        <div className="prose prose-invert mt-10 max-w-none prose-a:text-accent prose-headings:font-bold">{children}</div>
      </div>
    </div>
  );
}
