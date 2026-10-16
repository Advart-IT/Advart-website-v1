import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/privacy-policy", "Privacy Policy", "Read how Advart Technologies handles personal information, website data and privacy enquiries.");

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
