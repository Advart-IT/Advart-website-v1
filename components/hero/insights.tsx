"use client"

import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react"

/* ---------- Static data ---------- */
type Insight = { icon: string; text: string; description: string }

const INSIGHTS: Insight[] = [
  { icon: "/hero/insights/ranking.svg", text: "Building High-Growth Brands", description: "We've scaled client revenues to ₹30 Cr+ and beyond." },
  { icon: "/hero/insights/net-butterfly.svg", text: "15k+ SKUs", description: "Over 15,000 SKUs across 200+ categories." },
  { icon: "/hero/insights/paper.svg", text: "400M+ Social Views", description: "More than 400 million views across social platforms." },
]

/* ---------- Helpers ---------- */
function useOnceVisible<T extends Element>(threshold = 0.05, rootMargin = "15% 0px 0% 0px") {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || visible) return
    const io = "IntersectionObserver" in window
      ? new IntersectionObserver((entries, obs) => {
          if (entries[0]?.isIntersecting) { setVisible(true); obs.disconnect() }
        }, { threshold, rootMargin })
      : null
    if (io) io.observe(el); else setTimeout(() => setVisible(true), 0)
    return () => io?.disconnect()
  }, [visible, threshold, rootMargin])
  return { ref, visible } as const
}

/* ---------- Presentational Components ---------- */
const DesktopInsight = memo(function DesktopInsight({ item }: { item: Insight }) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-6 xl:p-8 transition-colors duration-300">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white">
          <img src={item.icon || "/placeholder.svg"} alt="icons" className="h-10 w-10 object-contain" aria-hidden="true" loading="lazy" decoding="async" />
        </div>
        <div className="flex-1">
          <h3 className="heading3 font-semibold pb-1">{item.text}</h3>
          <p className="paragraph text-muted-foreground">{item.description}</p>
        </div>
      </div>
    </div>
  )
})

const MobileSlide = memo(function MobileSlide({
  item, index, active, refFn, fixedHeight,
}: {
  item: Insight
  index: number
  active: number
  refFn?: (el: HTMLDivElement | null) => void
  fixedHeight?: number
}) {
  return (
    <div className="px-6 sm:px-8">
      <div
        ref={refFn}
        className="w-full rounded-xl border border-black/10 bg-white py-8 px-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow duration-200"
        style={fixedHeight ? { height: fixedHeight } : undefined}
      >
        <img 
          src={item.icon || "/placeholder.svg"} 
          alt="" 
          className="h-10 w-10 sm:h-12 sm:w-12 object-contain mb-3" 
          aria-hidden="true" 
          loading="lazy" 
          decoding="async" 
        />
        <h3 className="heading3 font-semibold mb-2">{item.text}</h3>
        <p className="text-black/70 text-sm">{item.description}</p>
      </div>
    </div>
  )
})

/* ============================== Main Component ============================== */
export default function Insights() {
  const insights = useMemo(() => INSIGHTS, [])
  const [active, setActive] = useState(0)

  const { ref: mobileBlockRef, visible: mobileVisible } = useOnceVisible<HTMLDivElement>()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Equal height: collect each mobile card ref and set uniform height
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const [slideHeight, setSlideHeight] = useState<number | null>(null)

  const measureHeights = useCallback(() => {
    const heights = cardRefs.current.map((el) => el?.offsetHeight ?? 0)
    const max = Math.max(0, ...heights)
    if (max && max !== slideHeight) setSlideHeight(max)
  }, [slideHeight])

  useEffect(() => {
    if (!mobileVisible) return
    // measure once visible (images may be lazy), also after a tick
    const t = setTimeout(measureHeights, 0)
    measureHeights()
    const onResize = () => measureHeights()
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', onResize)
    }
  }, [mobileVisible, measureHeights])

  // Pointer/drag state (unified mouse/touch)
  const draggingRef = useRef(false)
  const startXRef = useRef(0)
  const lastXRef = useRef(0)
  const widthRef = useRef(1)

  // Keep container width updated
  useEffect(() => {
    const update = () => {
      widthRef.current = scrollContainerRef.current?.clientWidth || 1
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  // Handle scroll to update active slide (kept for snap/scroll syncing)
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return
    const scrollLeft = container.scrollLeft
    const slideWidth = container.clientWidth
    const newActive = Math.round(scrollLeft / slideWidth)
    if (newActive !== active && newActive >= 0 && newActive < insights.length) {
      setActive(newActive)
    }
  }, [active, insights.length])

  // Set up scroll listener
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container || !mobileVisible) return
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [mobileVisible, handleScroll])

  // Navigate to specific slide
  const goToSlide = useCallback((index: number) => {
    const container = scrollContainerRef.current
    if (!container) return
    const slideWidth = container.clientWidth
    container.scrollTo({ left: index * slideWidth, behavior: 'smooth' })
  }, [])

  const next = useCallback(() => goToSlide(Math.min(active + 1, insights.length - 1)), [active, insights.length, goToSlide])
  const prev = useCallback(() => goToSlide(Math.max(active - 1, 0)), [active, goToSlide])

  // Keyboard (left/right arrows)
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); next() }
    else if (e.key === "ArrowLeft") { e.preventDefault(); prev() }
  }, [next, prev])

  // Pointer Events (mouse + touch unified) => apply drag threshold logic then snap
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return
    draggingRef.current = true
    startXRef.current = e.clientX
    lastXRef.current = e.clientX
    ;(e.currentTarget as Element).setPointerCapture?.(e.pointerId)

    const el = scrollContainerRef.current
    if (el) el.style.scrollBehavior = "auto"
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    const el = scrollContainerRef.current
    if (!el) return
    lastXRef.current = e.clientX
    const delta = lastXRef.current - startXRef.current
    el.scrollLeft = active * widthRef.current - delta
  }, [active])

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    draggingRef.current = false
    ;(e.currentTarget as Element).releasePointerCapture?.(e.pointerId)

    const delta = lastXRef.current - startXRef.current
    const w = widthRef.current
    const threshold = Math.max(0.12 * w, 50) // 12% or 50px

    const el = scrollContainerRef.current
    if (el) el.style.scrollBehavior = "smooth"

    if (delta > threshold) {
      prev()
    } else if (delta < -threshold) {
      next()
    } else {
      goToSlide(active)
    }
  }, [active, next, prev, goToSlide])

  return (
    <section
      id="insights"
      className="section"
      style={{ contentVisibility: "auto" as any, containIntrinsicSize: "1200px 900px" }}
    >
      <div className="section-container">
        <div>
          <div className="max-w-6xl mx-auto">
            {/* Desktop Layout */}
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
                    loading="lazy" 
                    decoding="async" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 xl:gap-6">
                {insights.map((item, i) => (
                  <DesktopInsight key={i} item={item} />
                ))}
              </div>
            </div>

            {/* Mobile/Tablet Layout */}
            <div className="lg:hidden" ref={mobileBlockRef}>
              {/* Header */}
              <div className="px-6 sm:px-8 pt-6 sm:pt-8 text-center">
                <h2 className="heading2">
                  Based on <span className="font-semibold text-black">True Impact</span>
                </h2>
                <div className="relative mx-auto mt-4 mb-6 w-full overflow-hidden rounded-2xl grid place-items-center">
                  <img 
                    src="/hero/insights/man-star.webp" 
                    alt="Insights hero" 
                    className="w-48 sm:w-56 h-auto object-contain" 
                    loading="lazy" 
                    decoding="async" 
                  />
                </div>
              </div>

              {/* Slider Container */}
              <div className="relative">
                <div
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                  style={{
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                  aria-label="Insights carousel"
                  role="region"
                  tabIndex={0}
                  onKeyDown={onKeyDown}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                  onPointerLeave={onPointerUp}
                >
                  {insights.map((item, index) => (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 snap-start"
                      aria-hidden={index !== active}
                    >
                      <MobileSlide
                        item={item}
                        index={index}
                        active={active}
                        refFn={(el) => (cardRefs.current[index] = el)}
                        fixedHeight={slideHeight ?? undefined}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots Navigation */}
              <div className="flex items-center justify-center gap-2 mt-6 mb-4" aria-label="Slide indicators">
                {insights.map((_, index) => {
                  const isActive = index === active
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => goToSlide(index)}
                      className={`h-2.5 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50 ${
                        isActive 
                          ? "w-6 bg-black" 
                          : "w-2.5 bg-black/30 hover:bg-black/50"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                      aria-current={isActive ? "true" : "false"}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
