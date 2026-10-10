"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "ok" | "unavailable" | "error";

export function Newsletter({
  title = "Get a new progression every week",
  text = "One email a week: a skill progression, a workout and a technique tip. No spam, unsubscribe anytime.",
}: {
  title?: string;
  text?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "ok" : res.status === 503 ? "unavailable" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="card relative overflow-hidden p-6 sm:p-10">
      <div className="absolute inset-y-0 right-0 hidden w-24 stripes opacity-20 md:block" aria-hidden="true" />
      <div className="relative max-w-xl">
        <h2 className="h-display text-3xl sm:text-4xl">{title}</h2>
        <p className="mt-3 text-sm text-muted">{text}</p>
        {status === "ok" ? (
          <p className="mt-6 rounded-md border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
            You&apos;re in. Check your inbox to confirm.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-2 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@email.com"
              className="min-w-0 flex-1 rounded-md border border-line bg-ink px-4 py-3 text-sm placeholder:text-muted focus:border-accent focus:outline-none"
            />
            <button type="submit" disabled={status === "loading"} className="btn-primary disabled:opacity-60">
              {status === "loading" ? "Sending…" : "Subscribe"}
            </button>
          </form>
        )}
        {status === "unavailable" && (
          <p className="mt-3 text-sm text-muted">The newsletter launches soon — come back in a few days!</p>
        )}
        {status === "error" && <p className="mt-3 text-sm text-rust">Something went wrong. Please try again.</p>}
      </div>
    </section>
  );
}
