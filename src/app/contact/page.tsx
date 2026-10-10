import type { Metadata } from "next";
import { SimplePage } from "@/components/SimplePage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with StreetBarLab: questions, feedback on the program generator or partnership ideas.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <SimplePage title="Contact" href="/contact" intro="Questions, feedback, a bug in the program generator? We read everything.">
      <p>
        Email us at <a href={`mailto:${site.email}`}>{site.email}</a>. We usually reply within a few days.
      </p>
      <p>
        We can&apos;t give individual medical advice. If you&apos;re dealing with pain or an injury, please see a
        physiotherapist.
      </p>
    </SimplePage>
  );
}
