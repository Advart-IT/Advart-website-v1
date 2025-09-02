"use client"

import { useEffect, useRef } from "react"

type Insight = {
  icon: string
  text: string
  description: string
}

export default function Insights() {
  const insights: Insight[] = [
    {
      icon: "/hero/insights/bar.svg",
      text: "20x Revenue Growth",
      description: "Scaled an e-commerce business from 5x sales to 20x.",
    },
    {
      icon: "/hero/insights/ranking.svg",
      text: "231k Followers",
      description: "Grew from 1K to 231k followers in record time.",
    },
    {
      icon: "/hero/insights/net-butterfly.svg",
      text: "3M Views",
      description: "Generated over 3 million reel views organically.",
    },
    {
      icon: "/hero/insights/paper.svg",
      text: "Category Expansion",
      description: "Consulted an e-commerce brand to scale from 2 to 25 product categories",
    },
  ]

  const loopRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = loopRef.current
    if (!el) return

    const isReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    if (isReduced) return

    let raf = 0
    let paused = false
    const speed = 0.6

    const animate = () => {
      if (!paused) {
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2
        }
        el.scrollLeft += speed
      }
      raf = requestAnimationFrame(animate)
    }

    const handlePause = () => (paused = true)
    const handleResume = () => (paused = false)

    el.addEventListener("mouseenter", handlePause)
    el.addEventListener("mouseleave", handleResume)
    el.addEventListener("touchstart", handlePause, { passive: true })
    el.addEventListener("touchend", handleResume)

    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener("mouseenter", handlePause)
      el.removeEventListener("mouseleave", handleResume)
      el.removeEventListener("touchstart", handlePause)
      el.removeEventListener("touchend", handleResume)
    }
  }, [])

  return (
    <section className="bg-[#F6F7F9] text-black py-20 sm:py-12 md:py-16 lg:pt-20 xl:py-24 px-8">
      <div className="max-w-6xl w-full mx-auto">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 items-start gap-12 xl:gap-16">
          <div className="sticky top-32 flex flex-col items-center text-center">
            <h2 className="text-xl xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-4 leading-tight">
              Based on <span className="font-semibold">True Impact</span>
            </h2>
            <div className="relative w-full overflow-hidden rounded-2xl grid place-items-center">
              <img src="/hero/insights/graph.png" alt="Insights hero" className="w-64 md:w-80 h-auto object-contain" />
            </div>
          </div>

          <div className="flex flex-col gap-4 xl:gap-6">
            {insights.map((item, i) => (
              <div
                key={i}
                className="group cursor-pointer rounded-2xl border border-black/10 bg-white p-6 xl:p-8 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white">
                    <img
                      src={item.icon || "/placeholder.svg"}
                      alt=""
                      className="h-10 w-10 object-contain"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg md:text-xl font-medium">{item.text}</h3>
                    <p className="leading-relaxed text-black/70">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light">
              Based on <span className="font-semibold">Impact</span>
            </h2>
            <div className="relative mx-auto mt-4 mb-6 w-full overflow-hidden rounded-2xl grid place-items-center">
              <img src="/hero/insights/graph.png" alt="Insights hero" className="w-48 sm:w-56 h-auto object-contain" />
            </div>
          </div>

          <div
            ref={loopRef}
            className="overflow-hidden"
            aria-roledescription="carousel"
            aria-label="Insights auto-scrolling list"
          >
            <div className="flex w-max gap-10 px-4 py-2">
              {[...insights, ...insights].map((item, i) => (
                <div
                  key={`${item.text}-${i}`}
                  className="flex flex-col items-center justify-center text-center min-w-[140px] select-none"
                >
                  <img
                    src={item.icon || "/placeholder.svg"}
                    alt=""
                    className="h-10 w-10 sm:h-12 sm:w-12 object-contain mb-2"
                    aria-hidden="true"
                  />
                  <span className="text-sm sm:text-base font-medium whitespace-nowrap">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}