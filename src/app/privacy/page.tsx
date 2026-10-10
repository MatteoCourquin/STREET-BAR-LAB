import type { Metadata } from "next";
import { SimplePage } from "@/components/SimplePage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How StreetBarLab handles your data.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <SimplePage title="Privacy Policy" href="/privacy" intro="Short version: we collect as little as possible.">
      <h2>Data stored in your browser</h2>
      <p>
        Your level test result and the skill steps you tick are saved in your browser&apos;s local storage only. They
        never leave your device and you can clear them at any time by clearing your browser data.
      </p>
      <h2>Newsletter</h2>
      <p>
        If you subscribe to the newsletter, we store your email address with our email provider for the sole purpose
        of sending you the newsletter. You can unsubscribe at any time with the link in every email.
      </p>
      <h2>Analytics</h2>
      <p>
        We may use privacy-friendly analytics to understand which pages are useful (pages visited, referrer, device
        type). We do not sell any data.
      </p>
      <h2>Your rights</h2>
      <p>
        You can ask us to access or delete any personal data we hold about you by emailing{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </SimplePage>
  );
}
