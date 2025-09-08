// "use client"

// type Insight = {
//   icon: string
//   text: string
//   description: string
// }

// export default function Insights() {
//   const insights: Insight[] = [
//     { icon: "/hero/insights/bar.svg",           text: "100k+ Monthly Visitors", description: "BeeLittle attracts over 100,000 website visitors every month." },
//     { icon: "/hero/insights/ranking.svg",       text: "1,600+ Product Variants", description: "BeeLittle scaled to 1,600 SKUs across 300+ variants." },
//     { icon: "/hero/insights/net-butterfly.svg", text: "22k Instagram Followers", description: "Zing Clothing’s @zingclothing.in counts 22,000 followers on Instagram." },
//     { icon: "/hero/insights/paper.svg",         text: "8× Collection Growth",   description: "Prathiksham expanded seasonal collections from 2 to 8 in one year." },
//   ]

//   return (
//     /* === Same outer rhythm as Hero/Services (no animations) === */
//     <section id="insights" className="scroll-mt-24 md:scroll-mt-32">
//       <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-10 md:pt-12 pb-10 sm:pb-12 md:pb-14">
//         <div className="bg-[#F6F7F9] text-black rounded-2xl">
//           <div className="max-w-6xl w-full mx-auto">
//             {/* Desktop / Large screens */}
//             <div className="hidden lg:grid lg:grid-cols-2 items-center gap-12 xl:gap-16">
//               <div className="flex flex-col items-center justify-center text-center">
//                 <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-4 leading-tight">
//                   Based on <span className="font-semibold">True Impact</span>
//                 </h2>
//                 <div className="relative w-full overflow-hidden rounded-2xl grid place-items-center">
//                   <img
//                     src="/hero/insights/man-star.webp"
//                     alt="Insights hero"
//                     className="w-64 md:w-80 h-auto object-contain pt-4"
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-col gap-4 xl:gap-6">
//                 {insights.map((item, i) => (
//                   <div key={i} className="group rounded-2xl border border-black/10 bg-white p-6 xl:p-8 transition-colors duration-300">
//                     <div className="flex items-start gap-4">
//                       <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white">
//                         <img src={item.icon || "/placeholder.svg"} alt="" className="h-10 w-10 object-contain" aria-hidden="true" />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="mb-2 text-lg md:text-xl font-medium">{item.text}</h3>
//                         <p className="leading-relaxed text-black/70">{item.description}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Mobile / Tablet */}
//             <div className="lg:hidden p-6 sm:p-8">
//               <div className="text-center mb-6 sm:mb-8">
//                 <h2 className="text-xl xs:text-xl sm:text-2xl md:text-3xl font-light">
//                   Based on <span className="font-semibold">Impact</span>
//                 </h2>
//                 <div className="relative mx-auto mt-4 mb-6 w-full overflow-hidden rounded-2xl grid place-items-center">
//                   <img
//                     src="/hero/insights/man-star.webp"
//                     alt="Insights hero"
//                     className="w-48 sm:w-56 h-auto object-contain"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4 sm:gap-6">
//                 {insights.map((item, i) => (
//                   <div key={i} className="rounded-2xl border border-black/10 bg-white p-4">
//                     <div className="flex flex-col items-center text-center">
//                       <img src={item.icon || "/placeholder.svg"} alt="" className="h-10 w-10 sm:h-12 sm:w-12 object-contain mb-2" aria-hidden="true" />
//                       <span className="text-sm sm:text-base font-medium">{item.text}</span>
//                       <p className="text-xs sm:text-sm text-black/70 mt-2">{item.description}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//           </div>{/* max-w-6xl */}
//         </div>{/* panel */}
//       </div>{/* container */}
//     </section>
//   )
// }
"use client"

import { useRef, useState, useEffect } from "react"

type Insight = {
  icon: string
  text: string
  description: string
}

export default function Insights() {
  const insights: Insight[] = [
    {
      icon: "/hero/insights/bar.svg",
      text: "100k+ Monthly Visitors",
      description: "BeeLittle attracts over 100,000 website visitors every month.",
    },
    {
      icon: "/hero/insights/ranking.svg",
      text: "1,600+ Product Variants",
      description: "BeeLittle scaled to 1,600 SKUs across 300+ variants.",
    },
    {
      icon: "/hero/insights/net-butterfly.svg",
      text: "22k Instagram Followers",
      description: "Zing Clothing's @zingclothing.in counts 22,000 followers on Instagram.",
    },
    {
      icon: "/hero/insights/paper.svg",
      text: "8× Collection Growth",
      description: "Prathiksham expanded seasonal collections from 2 to 8 in one year.",
    },
  ]

  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const slideWidthRef = useRef<number>(0)

  const [active, setActive] = useState(0)
  const currentSlideRef = useRef(0)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const pausedRef = useRef(false)
  const [viewportH, setViewportH] = useState<number | null>(null)
  const isTransitioningRef = useRef(false)

  const extendedInsights = [
    ...insights, // First set
    ...insights, // Second set
    ...insights, // Third set (main set - we start here)
    ...insights, // Fourth set
    ...insights, // Fifth set
  ]

  // Helpers
  const getSlideWidth = () => viewportRef.current?.clientWidth || Math.round(window.innerWidth)

  const measureSlideWidth = () => {
    slideWidthRef.current = getSlideWidth()
  }

  const measureMaxHeight = () => {
    const el = trackRef.current
    if (!el) return
    let maxH = 0
    el.querySelectorAll<HTMLElement>("[data-slide-card]").forEach((c) => {
      maxH = Math.max(maxH, c.offsetHeight)
    })
    if (maxH > 0) setViewportH(maxH)
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const initPosition = () => {
      measureSlideWidth()
      const w = slideWidthRef.current || getSlideWidth()
      // Start at the middle set (third group - index 2 * insights.length)
      const startIndex = insights.length * 2
      el.scrollTo({ left: startIndex * w, behavior: "auto" })
      currentSlideRef.current = startIndex
      setActive(0)
    }

    initPosition()
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const onScroll = () => {
      if (isTransitioningRef.current) return

      const w = slideWidthRef.current || getSlideWidth()
      const scrollLeft = el.scrollLeft
      const currentIndex = Math.round(scrollLeft / w)

      currentSlideRef.current = currentIndex

      // Calculate which item we're showing (always based on modulo)
      const activeIndex = currentIndex % insights.length
      setActive(activeIndex)

      const totalSlides = extendedInsights.length
      const middleStart = insights.length * 2 // Start of middle section
      const middleEnd = insights.length * 3 - 1 // End of middle section

      // Only reposition when we're completely outside the safe middle zone
      if (currentIndex < insights.length || currentIndex >= totalSlides - insights.length) {
        console.log("[v0] Repositioning from index:", currentIndex)

        requestAnimationFrame(() => {
          if (isTransitioningRef.current) return

          isTransitioningRef.current = true

          let targetIndex
          if (currentIndex < insights.length) {
            // We're in the first section, jump to equivalent position in middle section
            targetIndex = currentIndex + insights.length * 2
          } else {
            // We're in the last section, jump to equivalent position in middle section
            targetIndex = currentIndex - insights.length * 2
          }

          console.log("[v0] Jumping to index:", targetIndex)

          // Instant repositioning without animation
          el.scrollTo({ left: targetIndex * w, behavior: "auto" })
          currentSlideRef.current = targetIndex

          // Re-enable after repositioning is complete
          setTimeout(() => {
            isTransitioningRef.current = false
          }, 100)
        })
      }
    }

    measureSlideWidth()
    measureMaxHeight()

    // Observe size changes of cards
    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        measureSlideWidth()
        measureMaxHeight()
      })
      el.querySelectorAll("[data-slide-card]").forEach((n) => ro!.observe(n))
    }

    el.addEventListener("scroll", onScroll, { passive: true })

    const onResize = () => {
      measureSlideWidth()
      measureMaxHeight()
      const w = slideWidthRef.current || getSlideWidth()
      el.scrollTo({ left: currentSlideRef.current * w, behavior: "auto" })
    }

    window.addEventListener("resize", onResize, { passive: true })
    window.addEventListener("orientationchange", onResize, { passive: true })

    return () => {
      el.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("orientationchange", onResize)
      ro?.disconnect()
    }
  }, [insights.length])

  const scrollToNext = () => {
    const el = trackRef.current
    if (!el || isTransitioningRef.current) return

    const w = slideWidthRef.current || getSlideWidth()
    const nextIndex = currentSlideRef.current + 1

    el.scrollTo({ left: nextIndex * w, behavior: "smooth" })
  }

  // Autoplay
  useEffect(() => {
    if (autoplayRef.current) return

    autoplayRef.current = setInterval(() => {
      if (!pausedRef.current) {
        scrollToNext()
      }
    }, 3500)

    const onVis = () => {
      pausedRef.current = document.hidden
    }
    document.addEventListener("visibilitychange", onVis)

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
      autoplayRef.current = null
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [])

  // Pause autoplay while user interacts
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const pause = () => {
      pausedRef.current = true
    }
    const resume = () => {
      pausedRef.current = false
    }
    el.addEventListener("pointerdown", pause, { passive: true })
    el.addEventListener("pointerup", resume, { passive: true })
    el.addEventListener("touchstart", pause, { passive: true })
    el.addEventListener("touchend", resume, { passive: true })
    el.addEventListener("mouseenter", pause, { passive: true })
    el.addEventListener("mouseleave", resume, { passive: true })
    return () => {
      el.removeEventListener("pointerdown", pause)
      el.removeEventListener("pointerup", resume)
      el.removeEventListener("touchstart", pause)
      el.removeEventListener("touchend", resume)
      el.removeEventListener("mouseenter", pause)
      el.removeEventListener("mouseleave", resume)
    }
  }, [])

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

            {/* Mobile / Tablet — seamless infinite loop */}
            <div className="lg:hidden">
              <div className="px-6 sm:px-8 pt-6 sm:pt-8 text-center">
                <h2 className="heading2">
                  Based on <span className="font-semibold text-black">True Impact</span>
                </h2>
                <div className="relative mx-auto mt-4 mb-6 w-full overflow-hidden rounded-2xl grid place-items-center">
                  <img
                    src="/hero/insights/man-star.webp"
                    alt="Insights hero"
                    className="w-50 sm:w-56 h-auto object-contain"
                  />
                </div>
              </div>

              <div
                ref={viewportRef}
                className="relative ml-[calc(50%-50vw)] w-[100vw]"
                style={viewportH ? { height: viewportH } : undefined}
              >
                <div
                  ref={trackRef}
                  className="
                    flex w-full h-full snap-x snap-mandatory overflow-x-auto scroll-smooth
                    touch-pan-x overscroll-x-contain
                    [scroll-snap-stop:always]
                    [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                  "
                >
                  {extendedInsights.map((item, i) => (
                    <div key={`slide-${i}`} className="min-w-[100vw] w-[100vw] shrink-0 snap-start snap-always h-full">
                      <div className="px-6 sm:px-8 h-full">
                        <div
                          data-slide-card
                          className="w-full h-full rounded-xl  border-black/10 bg-inherit py-4 flex flex-col items-center justify-center text-center"
                        >
                          {/* <img
                            src={item.icon || "/placeholder.svg"}
                            alt=""
                            className="h-10 w-10 sm:h-12 sm:w-12 object-contain mb-3"
                            aria-hidden="true"
                          /> */}
                          <h3 className="heading3 font-semibold mb-2">{item.text}</h3>
                          <p className="text-black/70 text-sm">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
