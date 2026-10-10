import type { Metadata } from "next";
import Link from "next/link";
import { SimplePage } from "@/components/SimplePage";

export const metadata: Metadata = {
  title: "About StreetBarLab",
  description: "StreetBarLab makes free, structured street workout programs and skill progressions for people who train with their bodyweight.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <SimplePage title="About" href="/about" intro="Free, structured street workout training for everyone with access to a bar.">
      <p>
        Street workout is one of the most accessible ways to get strong: a park, a bar and your bodyweight. But most
        people who start on their own don&apos;t know what to do after their first few sessions. They repeat the same
        workout, stall, and give up.
      </p>
      <p>
        StreetBarLab exists to fix that. We build free tools that give you a clear plan: a{" "}
        <Link href="/level-test">level test</Link> to know where you stand, a{" "}
        <Link href="/program-generator">program generator</Link> to know what to do each week, and a{" "}
        <Link href="/skills">skill roadmap</Link> to know what comes next.
      </p>
      <h2>Our approach</h2>
      <ul>
        <li>
          <strong>Progressive variations over random workouts.</strong> Every exercise has an easier and a harder
          version, and you move up only when you own the current one.
        </li>
        <li>
          <strong>Balance.</strong> As much pulling as pushing, with legs and core in every week.
        </li>
        <li>
          <strong>Free and without signup.</strong> No app to download, no paywall on the program.
        </li>
      </ul>
      <h2>Disclaimer</h2>
      <p>
        Our content is for educational purposes and doesn&apos;t replace advice from a doctor or physiotherapist. If
        you have an injury or a medical condition, talk to a professional before starting a new program.
      </p>
    </SimplePage>
  );
}
