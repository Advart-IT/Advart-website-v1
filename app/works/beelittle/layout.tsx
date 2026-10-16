import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/works/beelittle", "Beelittle Case Study", "Explore Advart's work with Beelittle across brand storytelling, social media marketing and its tenth anniversary campaign.");

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
