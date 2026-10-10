"use client";

import Link from "next/link";
import { useState } from "react";
import { nav } from "@/lib/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-line"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          {open ? (
            <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="2" />
          ) : (
            <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="2" />
          )}
        </svg>
      </button>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="absolute inset-x-0 top-16 border-b border-line bg-ink px-4 pb-6 pt-2"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line/60 py-4 text-lg font-semibold"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/level-test" onClick={() => setOpen(false)} className="btn-primary mt-5 w-full">
            Find my level
          </Link>
        </nav>
      )}
    </div>
  );
}
