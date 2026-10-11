import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import { absoluteUrl, jsonLd, site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Free Street Workout Program for Every Level | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: site.name,
      url: site.url,
      logo: absoluteUrl("/icon.svg"),
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      name: site.name,
      url: site.url,
      publisher: { "@id": absoluteUrl("/#organization") },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable} h-full antialiased`}>
      <body className="grain flex min-h-full flex-col font-sans">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(siteJsonLd)} />
      </body>
    </html>
  );
}
