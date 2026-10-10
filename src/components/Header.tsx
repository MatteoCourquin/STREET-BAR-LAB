import Link from "next/link";
import { nav } from "@/lib/site";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-ink/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" aria-label="StreetBarLab home" className="flex items-center gap-2">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-chalk"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/level-test" className="btn-primary ml-3 px-4 py-2">
            Find my level
          </Link>
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
