"use client";
import HeroSection from "@/components/hero/hero-section";
import Services from "@/components/hero/services";
import Dot from "@/components/hero/dot";
import Insights from "@/components/hero/insights";
import InsightHero from "@/components/hero/brand";
import Strategy from "@/components/hero/strategy";
import VideoScrolling from "@/components/hero/advart-video";
import WhyAdvart from "@/components/hero/why-advart";
import AdvartSection from "@/components/hero/brand-mobile";

export default function Home() {
  return (
    <div>
      <main>
        <HeroSection />
        <VideoScrolling/>
        <WhyAdvart/>
        <Services />
        <Strategy />
        <Insights />
        <Dot isVisible={true} />
        <AdvartSection/>
        <InsightHero />
      </main>
    </div>
  );
}
