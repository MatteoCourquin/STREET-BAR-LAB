import type { Metadata } from "next";
import { SimplePage } from "@/components/SimplePage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for StreetBarLab.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return (
    <SimplePage title="Terms of Use" href="/terms">
      <h2>Use of the content</h2>
      <p>
        Programs, progressions and articles on StreetBarLab are provided for free, for personal and educational use.
        You may share links to any page; please don&apos;t republish our content without permission.
      </p>
      <h2>Training at your own risk</h2>
      <p>
        Exercise involves a risk of injury. By using our programs you accept that you train at your own risk. Warm up,
        progress gradually, stop if you feel pain, and consult a medical professional if in doubt.
      </p>
      <h2>No warranty</h2>
      <p>
        We do our best to keep the content accurate but provide it &quot;as is&quot;, without any guarantee of results.
      </p>
    </SimplePage>
  );
}
