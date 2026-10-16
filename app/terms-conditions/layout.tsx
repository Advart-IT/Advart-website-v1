import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/terms-conditions", "Terms and Conditions", "Read the terms and conditions for using the Advart Technologies website and services.");

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
