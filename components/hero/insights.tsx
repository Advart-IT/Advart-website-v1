"use client"

import { useRef, useState, useEffect } from "react"

type Insight = {
  icon: string
  text: string
  description: string
}

export default function Insights() {
  const insights: Insight[] = [
    { icon: "/hero/insights/bar.svg", text: "100k+ Monthly Visitors", description: "BeeLittle attracts over 100,000 website visitors every month." },
    { icon: "/hero/insights/ranking.svg", text: "1,600+ Product Variants", description: "BeeLittle scaled to 1,600 SKUs across 300+ variants." },
    { icon: "/hero/insights/net-butterfly.svg", text: "22k Instagram Followers", description: "Zing Clothing's @zingclothing.in counts 22,000 followers on Instagram." },
    { icon: "/hero/insights/paper.svg", text: "8× Collection Growth", description: "Prathiksham expanded seasonal collections from 2 to 8 in one year." },
  ]

  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [viewportH, setViewportH] = useState<number | null>(null)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const pausedRef = useRef(false)

  // Create multiple copies for seamless infinite scroll
  const extendedInsights = [
    ...insights,
    ...insights,
    ...insights,
  ]

  const measureMaxHeight = () => {
    const el = trackRef.current
    if (!el) return
    let maxH = 0
    el.querySelectorAll<HTMLElement>("[data-slide-card]").forEach((c) => { 
      maxH = Math.max(maxH, c.offsetHeight) 
    })
    if (maxH > 0) setViewportH(maxH)
  }

  // Initialize position to middle set
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    
    const initPosition = () => {
      const slideWidth = el.clientWidth
      const startIndex = insights.length // Start at second set (middle)
      el.scrollTo({ left: startIndex * slideWidth, behavior: "auto" })
    }

    // Small delay to ensure DOM is ready
    setTimeout(initPosition, 50)
    measureMaxHeight()
  }, [])

  // Handle scroll events for seamless looping
  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const handleScroll = () => {
      const slideWidth = el.clientWidth
      const scrollLeft = el.scrollLeft
      const currentIndex = Math.round(scrollLeft / slideWidth)
      const totalSlides = extendedInsights.length

      // Update active indicator (always show logical index 0-3)
      setActive(currentIndex % insights.length)

      // Reset position when approaching boundaries
      if (currentIndex <= 0) {
        // At first set, jump to second set
        el.scrollTo({ left: insights.length * slideWidth, behavior: "auto" })
      } else if (currentIndex >= totalSlides - insights.length) {
        // At third set, jump back to second set
        el.scrollTo({ left: insights.length * slideWidth, behavior: "auto" })
      }
    }

    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        measureMaxHeight()
      })
      el.querySelectorAll("[data-slide-card]").forEach((n) => ro!.observe(n))
    }

    el.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      el.removeEventListener("scroll", handleScroll)
      ro?.disconnect()
    }
  }, [insights.length])

  // Auto-advance functionality
  const scrollToNext = () => {
    const el = trackRef.current
    if (!el) return
    
    const slideWidth = el.clientWidth
    const currentScroll = el.scrollLeft
    const nextScroll = currentScroll + slideWidth
    
    el.scrollTo({ left: nextScroll, behavior: "smooth" })
  }

  // Go to specific slide (for dot indicators)
  const goTo = (logicalIndex: number) => {
    const el = trackRef.current
    if (!el) return
    
    const slideWidth = el.clientWidth
    const currentScroll = el.scrollLeft
    const currentIndex = Math.round(currentScroll / slideWidth)
    
    // Find nearest instance of the target slide
    let targetIndex = insights.length + logicalIndex // Default to middle set
    
    // If we're closer to first or last set, adjust accordingly
    if (currentIndex < insights.length) {
      targetIndex = logicalIndex
    } else if (currentIndex >= insights.length * 2) {
      targetIndex = insights.length * 2 + logicalIndex
    }
    
    el.scrollTo({ left: targetIndex * slideWidth, behavior: "smooth" })
  }



  return (
    <section id="insights" className="section ">
      <div className="section-container">
        <div>
          <div className="max-w-6xl mx-auto">
            {/* Desktop / Large screens */}
            <div className="hidden lg:grid lg:grid-cols-2 items-center gap-12 xl:gap-16">
              <div className="flex flex-col items-center justify-center text-center">
                <h2 className="heading2 pb-4">
                  Based on <span className="font-semibold text-black">True Impact</span>
                </h2>
                <div className="relative w-full overflow-hidden rounded-2xl grid place-items-center">
                  <img src="/hero/insights/man-star.webp" alt="Insights hero" className="w-64 md:w-80 h-auto object-contain pt-4" />
                </div>
              </div>

              <div className="flex flex-col gap-4 xl:gap-6">
                {insights.map((item, i) => (
                  <div key={i} className="group rounded-2xl border border-border bg-card p-6 xl:p-8 transition-colors duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white">
                        <img src={item.icon || "/placeholder.svg"} alt="" className="h-10 w-10 object-contain" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h3 className="heading3 font-semibold pb-1">{item.text}</h3>
                        <p className="paragraph text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile / Tablet — seamless infinite loop */}
            <div className="lg:hidden">
              <div className="px-6 sm:px-8 pt-6 sm:pt-8 text-center">
                <h2 className="heading2">
                  Based on <span className="font-semibold text-black">True Impact</span>
                </h2>
                <div className="relative mx-auto mt-4 mb-6 w-full overflow-hidden rounded-2xl grid place-items-center">
                  <img src="/hero/insights/man-star.webp" alt="Insights hero" className="w-48 sm:w-56 h-auto object-contain" />
                </div>
              </div>

              <div ref={viewportRef} className="relative ml-[calc(50%-50vw)] w-[100vw]" style={viewportH ? { height: viewportH } : undefined}>
                <div
                  ref={trackRef}
                  className="
                    flex w-full h-full snap-x snap-mandatory overflow-x-auto scroll-smooth
                    touch-pan-x overscroll-x-contain
                    [scroll-snap-stop:always]
                    [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                  "
                  aria-label="Insights carousel"
                >
                  {extendedInsights.map((item, i) => (
                    <div key={`slide-${i}`} className="min-w-[100vw] w-[100vw] shrink-0 snap-start snap-always h-full">
                      <div className="px-6 sm:px-8 h-full">
                        <div
                          data-slide-card
                          className="w-full h-full rounded-xl border border-black/10 bg-white py-8 px-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow duration-200"
                        >
                          <img src={item.icon || "/placeholder.svg"} alt="" className="h-10 w-10 sm:h-12 sm:w-12 object-contain mb-3" aria-hidden="true" />
                          <h3 className="heading3 font-semibold mb-2">{item.text}</h3>
                          <p className="text-black/70 text-sm">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slide Indicator (mobile only) */}
              <div className="mt-4 mb-2 flex items-center justify-center gap-2" aria-label="Slide indicators">
                {insights.map((_, i) => {
                  const isActive = i === active
                  return (
                    <button
                      key={`dot-${i}`}
                      type="button"
                      onClick={() => goTo(i)}
                      className={`
                        h-2.5 rounded-full transition-all duration-200
                        ${isActive ? "w-6 bg-black" : "w-2.5 bg-black/30 hover:bg-black/50"}
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50
                      `}
                      aria-label={`Go to slide ${i + 1}`}
                      aria-current={isActive ? "true" : "false"}
                    />
                  )
                })}
              </div>

              {/* Live region for SR users */}
              <span className="sr-only" role="status" aria-live="polite">
                Slide {active + 1} of {insights.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}