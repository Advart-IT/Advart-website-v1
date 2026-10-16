import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/aboutus", "About Advart", "Meet Advart Technologies, a digital marketing agency in Coimbatore combining strategy, creativity and performance marketing to help brands grow.");

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
