import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";

export default function NotFound() {
  // The root 404 sits outside the (site) group, so it adds the header and footer itself.
  return (
    <SiteChrome>
      <div className="container-x py-24 text-center">
        <p className="font-display text-8xl text-accent">404</p>
        <h1 className="h-display mt-4 text-4xl">You fell off the bar</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">This page doesn&apos;t exist. Get back on track:</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/program-generator" className="btn-primary">Build my program</Link>
          <Link href="/" className="btn-ghost">Home</Link>
        </div>
      </div>
    </SiteChrome>
  );
}
