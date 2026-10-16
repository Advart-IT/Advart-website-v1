import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/careers", "Careers at Advart", "Explore career opportunities at Advart Technologies in Coimbatore and join our team working on marketing, creativity and business growth.");

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
