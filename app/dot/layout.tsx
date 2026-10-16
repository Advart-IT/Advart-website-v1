import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/dot", "Dot by Advart", "Discover Dot by Advart, bringing social media and product data together to help businesses understand their information.");

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
