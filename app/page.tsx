import { pageMetadata, homeStructuredData } from "@/lib/seo";

export const metadata = pageMetadata("/", "Advart | Performance Marketing Agency in Coimbatore", "Advart is a performance marketing agency in Coimbatore helping brands grow through data-driven marketing, ecommerce strategies and Advart Gen AI product photography.");
import HeroSection from "@/components/hero/hero-section";
import Services from "@/components/hero/services";
import Dot from "@/components/hero/dot";
import Strategy from "@/components/hero/strategy";
import VideoScrolling from "@/components/hero/advart-video";
import WhyAdvart from "@/components/hero/why-advart";
import AdvartSection from "@/components/hero/brand";
import Insights from "@/components/hero/insights";
import AdvartGen from "@/components/hero/advart-gen";


export default function Home() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData).replace(/</g, "\\u003c") }} />
      <div>
        <HeroSection />
        <VideoScrolling/>
        <WhyAdvart/>
        <Services />
        <Strategy />
        <AdvartGen />
        <Insights />
        <Dot isVisible={true} />
        <AdvartSection />
      </div>
    </div>
  );
}
