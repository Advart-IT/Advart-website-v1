"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import HeroSection from "@/components/hero/hero-section";
import Services from "@/components/hero/services";
import Dot from "@/components/hero/dot";
import Insights from "@/components/hero/insights";
import InsightHero from "@/components/hero/insight";
import Strategy from "@/components/hero/strategy";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
});


    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div>
      <main>
        <HeroSection />
        <Services />
        <Strategy />
        <Insights />
        <Dot isVisible={true} />
        <InsightHero />
      </main>
    </div>
  );
}
