"use client";
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
      <main>
        <HeroSection />
        <VideoScrolling/>
        <WhyAdvart/>
        <Services />
        <Strategy />
        <AdvartGen />
        <Insights />
        <Dot isVisible={true} />
        <AdvartSection />
      </main>
    </div>
  );
}
