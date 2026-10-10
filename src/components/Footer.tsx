import Link from "next/link";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Train",
    links: [
      { href: "/program-generator", label: "Program generator" },
      { href: "/level-test", label: "Level test" },
      { href: "/skills", label: "Skill roadmap" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/skills/muscle-up", label: "Muscle-up progression" },
      { href: "/skills/front-lever", label: "Front lever progression" },
    ],
  },
  {
    title: "StreetBarLab",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="h-2 stripes opacity-80" aria-hidden="true" />
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">
            Free street workout programs and progressions for people who train on bars, in parks, with nothing
            but their bodyweight.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold text-chalk">{col.title}</p>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-x border-t border-line/60 py-6 text-xs text-muted">
        © StreetBarLab. Training content is educational — listen to your body and consult a professional if
        you have an injury.
      </div>
    </footer>
  );
}
