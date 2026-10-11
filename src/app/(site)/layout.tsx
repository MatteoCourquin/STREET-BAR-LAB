import { SiteChrome } from "@/components/SiteChrome";

// Website pages get the header and footer; /studio (outside this group) renders full-screen.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return <SiteChrome>{children}</SiteChrome>;
}
