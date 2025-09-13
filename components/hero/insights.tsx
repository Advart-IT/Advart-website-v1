"use client"

import { useRef, useState } from "react"

type Insight = {
  icon: string
  text: string
  description: string
}

export default function Insights() {
  const insights: Insight[] = [
    {
      icon: "/hero/insights/ranking.svg",
      text: "Building High-Growth Brands",
      description: "We've scaled client revenues to ₹30 Cr+ and beyond.",
    },
    {
      icon: "/hero/insights/net-butterfly.svg",
      text: "15k+ SKUs",
      description: "Over 15,000 SKUs across 200+ categories.",
    },
    {
      icon: "/hero/insights/paper.svg",
      text: "400M+ Social Views",
      description: "More than 400 million views across social platforms.",
    },
  ]

  // --- Mobile slider state & helpers (mirrors the above slider behavior)
  const [active, setActive] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const next = () => setActive((p) => Math.min(p + 1, insights.length - 1))
  const prev = () => setActive((p) => Math.max(p - 1, 0))
  const goTo = (i: number) =>
    setActive(() => Math.max(0, Math.min(i, insights.length - 1)))

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && active < insights.length - 1) next()
    else if (isRightSwipe && active > 0) prev()

    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <section id="insights" className="section">
      <div className="section-container">
        <div>
          <div className="max-w-6xl mx-auto">
            {/* Desktop / Large screens (unchanged) */}
            <div className="hidden lg:grid lg:grid-cols-2 items-center gap-12 xl:gap-16">
              <div className="flex flex-col items-center justify-center text-center">
                <h2 className="heading2 pb-4">
                  Based on <span className="font-semibold text-black">True Impact</span>
                </h2>
                <div className="relative w-full overflow-hidden rounded-2xl grid place-items-center">
                  <img
                    src="/hero/insights/man-star.webp"
                    alt="Insights hero"
                    className="w-64 md:w-80 h-auto object-contain pt-4"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 xl:gap-6">
                {insights.map((item, i) => (
                  <div
                    key={i}
                    className="group rounded-2xl border border-border bg-card p-6 xl:p-8 transition-colors duration-300"
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
                        <h3 className="heading3 font-semibold pb-1">{item.text}</h3>
                        <p className="paragraph text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile / Tablet — mirrors above slider (no loop, swipe, dots) */}
            <div className="lg:hidden">
              <div className="px-6 sm:px-8 pt-6 sm:pt-8 text-center">
                <h2 className="heading2">
                  Based on <span className="font-semibold text-black">True Impact</span>
                </h2>
                <div className="relative mx-auto mt-4 mb-6 w-full overflow-hidden rounded-2xl grid place-items-center">
                  <img
                    src="/hero/insights/man-star.webp"
                    alt="Insights hero"
                    className="w-48 sm:w-56 h-auto object-contain"
                  />
                </div>
              </div>

              <div className="relative w-full overflow-hidden">
                <div
                  ref={trackRef}
                  className="flex transition-transform duration-300 ease-in-out cursor-grab active:cursor-grabbing"
                  style={{ transform: `translateX(-${active * 100}%)` }}
                  aria-label="Insights carousel"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {insights.map((item, i) => (
                    <div
                      key={`slide-${i}`}
                      className="w-full shrink-0 flex-[0_0_100%]"
                      aria-hidden={i !== active}
                    >
                      <div className="px-6 sm:px-8">
                        <div className="w-full rounded-xl border border-black/10 bg-white py-8 px-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow duration-200">
                          <img
                            src={item.icon || "/placeholder.svg"}
                            alt=""
                            className="h-10 w-10 sm:h-12 sm:w-12 object-contain mb-3"
                            aria-hidden="true"
                          />
                          <h3 className="heading3 font-semibold mb-2">{item.text}</h3>
                          <p className="text-black/70 text-sm">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slide Indicator (mobile only) */}
              <div
                className="mt-4 mb-2 flex items-center justify-center gap-2"
                aria-label="Slide indicators"
              >
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

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
