// "use client"
// import { useEffect, useState } from "react"
// import  HeroSection  from "@/components/hero/hero-section"
// import Services from "@/components/hero/services"
// import Dot from "@/components/hero/dot"
// import Insights from "@/components/hero/insights"
// import Greetings from "@/components/hero/common/greetings"
// import InsightHero from "@/components/hero/insight"
// import Strategy from "@/components/hero/strategy"

// export default function Home() {
//   const [showGreetings, setShowGreetings] = useState(false)
//   const [greetingsDone, setGreetingsDone] = useState(false)

//   // Detect first visit this session (only true on hard refresh)
//   useEffect(() => {
//     const hasSeenGreeting = sessionStorage.getItem("hasSeenGreeting")
//     if (!hasSeenGreeting) {
//       setShowGreetings(true)
//       sessionStorage.setItem("hasSeenGreeting", "true")
//     } else {
//       setGreetingsDone(true)
//     }
//   }, [])

//   // Reset greeting flag on hard refresh
//   useEffect(() => {
//     const clearGreeting = () => {
//       sessionStorage.removeItem("hasSeenGreeting")
//     }
//     window.addEventListener("beforeunload", clearGreeting)
//     return () => window.removeEventListener("beforeunload", clearGreeting)
//   }, [])

//   const handleGreetingComplete = () => {
//     setGreetingsDone(true)
//   }

//   if (showGreetings && !greetingsDone) {
//     return <Greetings onComplete={handleGreetingComplete} />
//   }

//   return (
//       <div className="flex flex-col min-h-[100dvh] text-black dark:text-gray-50 bg-[#F6F7F9]">
//         <main className="flex-1 space-y-16">
//           <HeroSection />
//           <Services />
//           <Strategy/>
//           <Insights />
//           <Dot isVisible={true} />
//           <InsightHero/>
//         </main>
//       </div>
//   )
// }
"use client"
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import HeroSection from "@/components/hero/hero-section"
import Services from "@/components/hero/services"
import Dot from "@/components/hero/dot"
import Insights from "@/components/hero/insights"
import InsightHero from "@/components/hero/insight"
import Strategy from "@/components/hero/strategy"
import WhyAdvart from '@/components/hero/whyadvart'

export default function Home() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // Animation frame loop
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Cleanup function
    return () => {
      lenis.destroy()
    }
  }, [])

  return (
 <div className="flex flex-col min-h-[100dvh] text-black dark:text-gray-50 bg-[#F6F7F9]">
      <main className="flex-1">
        <HeroSection />
        <Services />
        <Strategy />
        <Insights />
        <Dot isVisible={true} />
        <InsightHero />
      </main>
    </div>
  )
}