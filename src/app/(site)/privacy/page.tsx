import type { Metadata } from "next";
import { SimplePage } from "@/components/SimplePage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How StreetBarLab handles your data.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <SimplePage title="Privacy Policy" href="/privacy" intro="Short version: we don't collect personal data.">
      <h2>No account, no sign-up</h2>
      <p>
        StreetBarLab works without an account. We don&apos;t ask for your name, your email address or any other
        personal information.
      </p>
      <h2>Data stored in your browser</h2>
      <p>
        Your level test result and the skill steps you tick are saved in your browser&apos;s local storage only. They
        never leave your device and you can clear them at any time by clearing your browser data.
      </p>
    </SimplePage>
  );
}
