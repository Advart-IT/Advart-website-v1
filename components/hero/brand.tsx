"use client"

import React, {
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
  memo,
} from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/* ================= Types & Data ================= */
type CardT = {
  imageSrc: string
  imageAlt?: string
  title: string
  description: string
  whatTried: string[]
  result: string
  bgColor?: string
}

const cards: CardT[] = [
  {
    imageSrc: "hero/brand/bee-little.webp",
    title: "Beelittle",
    description:
      "10 YEARS OF BEELITTLE (A 4 yrs partnership we proudly celebrate) Beelittle turned 10, and we knew the celebration had to feel just as special as the journey. So, we went above and beyond to make this milestone a part of every tiny one's home.",
    whatTried: [
      "30-Day Strong Digital Campaign",
      "Private Screening & Celebration for Followers",
      "Custom Storybook",
    ],
    result:
      "A celebration that brought in strong community engagement, built deeper trust and skyrocketed brand awareness… all of which positively reflected in sales.",
  },
  {
    imageSrc: "/hero/brand/zing.webp",
    title: "Zing",
    description:
      "A homegrown kurta brand that feels like home to us... because we built it from scratch, turning failures into lessons and growth into success.",
    whatTried: [
      "Production to post-production...",
      "Everything it takes to make a brand stand tall.",
      "We tested and tried it all with Zing.",
    ],
    result:
      "The business that began with just ₹30k has now grown into a turnover of ₹3 crore.",
  },
  {
    imageSrc: "hero/brand/prathiksham.webp",
    title: "Prathiksham",
    description:
      "A well-known homegrown designer with 15 years of experience wanted to launch her own brand. She came to us with a dream and together, we made it real.",
    whatTried: ["Business Consulting", "Branding & Website Presence", "Social Media Presence"],
    result:
      "Her kurta line is now a go-to in every working woman's wardrobe. Sales have peaked and the label has grown into a name that many proudly recognise.",
  },
]

/* ================= Desktop GSAP stack scroll ================= */
const GsapStackScroll: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentIndexRef = useRef(0)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<HTMLDivElement[]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const stRef = useRef<ScrollTrigger | null>(null)

  const navigateToCard = useCallback((targetIndex: number) => {
    const st = stRef.current
    if (!st) return
    const clamped = Math.max(0, Math.min(cards.length - 1, targetIndex))
    const progress = clamped / Math.max(cards.length - 1, 1)
    const y = st.start + progress * (st.end - st.start)
    window.scrollTo({ top: y, behavior: "smooth" })
    currentIndexRef.current = clamped
    setCurrentIndex(clamped)
  }, [])

  useLayoutEffect(() => {
    if (!wrapRef.current) return

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768

      cardRefs.current.forEach((card, index) => {
        if (!card) return
        gsap.set(card, {
          yPercent: index === 0 ? 0 : 120,
          zIndex: index + 1,
          scale: 1,
          transformOrigin: "center center",
          willChange: "transform",
          pointerEvents: index === 0 ? "auto" : "none",
        })
      })

      const masterTL = gsap.timeline({
        paused: false,
        defaults: { ease: "power2.inOut", duration: 1 },
      })

      cards.forEach((_, index) => {
        if (index === 0) return
        const prevCard = cardRefs.current[index - 1]
        const currentCard = cardRefs.current[index]
        if (!prevCard || !currentCard) return

        const sectionTL = gsap.timeline()
        sectionTL.fromTo(currentCard, { yPercent: 120 }, { yPercent: 0, duration: 1 })
        sectionTL.to(
          prevCard,
          {
            scale: isMobile ? 0.9 : 0.95,
            yPercent: isMobile ? -6 : -4,
            duration: 1,
          },
          "<"
        )
        sectionTL.set(currentCard, { pointerEvents: "auto" }, 0)
        sectionTL.set(prevCard, { pointerEvents: "none" }, 0)
        masterTL.add(sectionTL)
      })

      const st = ScrollTrigger.create({
        trigger: wrapRef.current!,
        start: "top top",
        end: `+=${window.innerHeight * Math.max(cards.length - 1, 1)}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        scrub: 1,
        animation: masterTL,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const newIndex = Math.round(self.progress * (cards.length - 1))
          if (newIndex !== currentIndexRef.current) {
            currentIndexRef.current = newIndex
            setCurrentIndex(newIndex)
          }
        },
      })

      // start from card #2 (optional)
      const targetIndex = Math.min(1, cards.length - 1)
      const progress = targetIndex / Math.max(cards.length - 1, 1)
      const y = st.start + progress * (st.end - st.start)
      window.scrollTo({ top: y, behavior: "auto" })
      currentIndexRef.current = targetIndex
      setCurrentIndex(targetIndex)

      tlRef.current = masterTL
      stRef.current = st

      const onResize = () => {
        st.vars.end = `+=${window.innerHeight * Math.max(cards.length - 1, 1)}`
        st.refresh()
      }
      window.addEventListener("resize", onResize)
      ScrollTrigger.refresh()

      return () => {
        window.removeEventListener("resize", onResize)
        st.kill()
        masterTL.kill()
      }
    }, wrapRef)

    return () => {
      tlRef.current = null
      stRef.current = null
      ctx.revert()
    }
  }, [])

  return (
    <div className="relative">
      <section className="relative w-full">
        <div ref={wrapRef} className="relative min-h-screen w-full">
          <div className="absolute inset-0 h-screen flex items-center justify-center">
            <div className="relative w-full mx-auto h-[80vh] sm:h-[78vh] lg:h-[80vh] overflow-hidden">
              {(() => (cardRefs.current.length = cards.length, null))()}
              {cards.map((card, index) => (
                <div
                  key={`${card.title}-${index}`}
                  ref={(el) => {
                    if (el) cardRefs.current[index] = el
                  }}
                  className="absolute inset-0 will-change-transform overflow-hidden"
                  style={{ zIndex: index + 1 }}
                >
                  {/* Desktop: content left, image right */}
                  <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl bg-black text-white isolate">
                    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                      {/* Left: content */}
                      <div className="h-full overflow-hidden">
                        <div className="h-full flex flex-col justify-center p-6 lg:p-12 gap-4">
                          <h2 className="text-3xl lg:text-4xl font-bold leading-tight tracking-wide">
                            {card.title.toUpperCase()}
                          </h2>

                          <p className="text-sm lg:text-base font-light leading-relaxed text-gray-200">
                            {card.description}
                          </p>

                          <div className="grid md:grid-cols-2 gap-4 pt-1">
                            <div className="space-y-2">
                              <h3 className="text-xs lg:text-sm font-semibold text-white uppercase tracking-wider">
                                What did we try?
                              </h3>
                              <ul className="space-y-1 text-gray-300">
                                {card.whatTried.map((item, idx) => (
                                  <li key={idx} className="flex items-start text-xs lg:text-sm">
                                    <span className="text-white mr-2 mt-[3px]">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="space-y-2">
                              <h3 className="text-xs lg:text-sm font-semibold text-white uppercase tracking-wider">
                                And the result?
                              </h3>
                              <p className="text-gray-300 leading-relaxed text-xs lg:text-sm">
                                {card.result}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: image */}
                      <div className="h-full">
                        <div className="h-full w-full flex items-center justify-center p-6 lg:p-10">
                          <img
                            src={card.imageSrc}
                            alt={card.imageAlt ?? `${card.title} visual`}
                            className="max-h-[90%] w-auto object-contain pointer-events-none select-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                {cards.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to card ${i + 1}`}
                    onClick={() => navigateToCard(i)}
                    className={`h-2.5 w-2.5 rounded-full border-2 border-white/40 transition-all ${
                      i === currentIndex ? "bg-white scale-125" : "bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ================= Mobile drag-to-snap slider ================= */

function useOnceVisible<T extends Element>(threshold = 0.05, rootMargin = "15% 0px 0% 0px") {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || visible) return
    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver((entries, obs) => {
            if (entries[0]?.isIntersecting) {
              setVisible(true)
              obs.disconnect()
            }
          }, { threshold, rootMargin })
        : null
    if (io) io.observe(el)
    else setTimeout(() => setVisible(true), 0)
    return () => io?.disconnect()
  }, [visible, threshold, rootMargin])
  return { ref, visible } as const
}

const MobileSlide = memo(function MobileSlide({
  item,
  refFn,
  fixedHeight,
  onImgLoad,
}: {
  item: CardT
  refFn?: (el: HTMLDivElement | null) => void
  fixedHeight?: number
  onImgLoad?: () => void
}) {
  return (
    <div className="px-4 sm:px-6">
      <div
        ref={refFn}
        className="w-full rounded-2xl border border-white/10 bg-black text-white py-6 px-5 flex flex-col"
        style={fixedHeight ? { height: fixedHeight } : undefined}
      >
        {/* image centered */}
        <div
          className="w-full mb-4 flex items-center justify-center"
          style={{ height: "clamp(140px, 30vh, 200px)" }}
        >
          <img
            src={item.imageSrc}
            alt={item.imageAlt ?? `${item.title} visual`}
            className="h-full w-auto object-contain pointer-events-none select-none"
            loading="lazy"
            decoding="async"
            onLoad={onImgLoad}
          />
        </div>

        {/* content left-aligned */}
        <h3 className="text-lg font-semibold tracking-wide mb-2 text-left">
          {item.title.toUpperCase()}
        </h3>
        <p className="text-sm text-gray-200 leading-relaxed mb-3 text-left">
          {item.description}
        </p>

        <div className="grid grid-cols-1 gap-3 text-left">
          <div className="space-y-1.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider">What did we try?</h4>
            <ul className="space-y-1 text-gray-300">
              {item.whatTried.map((t, i) => (
                <li key={i} className="flex items-start text-xs">
                  <span className="text-white mr-2 mt-[2px]">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-1.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider">And the result?</h4>
            <p className="text-xs text-gray-300 leading-relaxed">{item.result}</p>
          </div>
        </div>
      </div>
    </div>
  )
})


const MobileDragSlider: React.FC = () => {
  const data = useMemo(() => cards, [])
  const [active, setActive] = useState(0)

  const { ref: mobileBlockRef, visible: mobileVisible } = useOnceVisible<HTMLDivElement>()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // equal height across slides
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const [slideHeight, setSlideHeight] = useState<number | null>(null)

  const measureHeights = useCallback(() => {
    const heights = cardRefs.current.map((el) => el?.offsetHeight ?? 0)
    const max = Math.max(0, ...heights)
    if (max && max !== slideHeight) setSlideHeight(max)
  }, [slideHeight])

  useEffect(() => {
    if (!mobileVisible) return
    const t = setTimeout(measureHeights, 0)
    const onResize = () => measureHeights()
    window.addEventListener("resize", onResize)
    return () => {
      clearTimeout(t)
      window.removeEventListener("resize", onResize)
    }
  }, [mobileVisible, measureHeights])

  // drag state
  const draggingRef = useRef(false)
  const startXRef = useRef(0)
  const lastXRef = useRef(0)
  const widthRef = useRef(1)

  useEffect(() => {
    const update = () => {
      widthRef.current = scrollContainerRef.current?.clientWidth || 1
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  // update active on scroll
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return
    const scrollLeft = container.scrollLeft
    const slideWidth = container.clientWidth
    const newActive = Math.round(scrollLeft / slideWidth)
    if (newActive !== active && newActive >= 0 && newActive < data.length) {
      setActive(newActive)
    }
  }, [active, data.length])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container || !mobileVisible) return
    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [mobileVisible, handleScroll])

  // nav helpers
  const goToSlide = useCallback((index: number) => {
    const container = scrollContainerRef.current
    if (!container) return
    const slideWidth = container.clientWidth
    container.scrollTo({ left: index * slideWidth, behavior: "smooth" })
  }, [])

  const next = useCallback(
    () => goToSlide(Math.min(active + 1, data.length - 1)),
    [active, data.length, goToSlide]
  )
  const prev = useCallback(() => goToSlide(Math.max(active - 1, 0)), [active, goToSlide])

  // keyboard support
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault()
        next()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        prev()
      }
    },
    [next, prev]
  )

  // pointer handlers (mouse + touch)
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return
    draggingRef.current = true
    startXRef.current = e.clientX
    lastXRef.current = e.clientX
    ;(e.currentTarget as Element).setPointerCapture?.(e.pointerId)
    const el = scrollContainerRef.current
    if (el) el.style.scrollBehavior = "auto"
  }, [])

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return
      const el = scrollContainerRef.current
      if (!el) return
      lastXRef.current = e.clientX
      const delta = lastXRef.current - startXRef.current
      el.scrollLeft = active * widthRef.current - delta
    },
    [active]
  )

  const onPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return
      draggingRef.current = false
      ;(e.currentTarget as Element).releasePointerCapture?.(e.pointerId)

      const delta = lastXRef.current - startXRef.current
      const w = widthRef.current
      const threshold = Math.max(0.12 * w, 50) // 12% or 50px

      const el = scrollContainerRef.current
      if (el) el.style.scrollBehavior = "smooth"

      if (delta > threshold) {
        // swipe right -> previous
        goToSlide(Math.max(active - 1, 0))
      } else if (delta < -threshold) {
        // swipe left -> next
        goToSlide(Math.min(active + 1, data.length - 1))
      } else {
        // snap back
        goToSlide(active)
      }
    },
    [active, data.length, goToSlide]
  )

  return (
    <div className="w-full mx-auto px-2" ref={mobileBlockRef}>
      {/* Slider */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          aria-label="Work carousel"
          role="region"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {data.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0 snap-start">
              <MobileSlide
                item={item}
                refFn={(el) => (cardRefs.current[index] = el)}
                fixedHeight={slideHeight ?? undefined}
                onImgLoad={measureHeights}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4 mb-2" aria-label="Slide indicators">
        {data.map((_, i) => {
          const isActive = i === active
          return (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-2.5 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                isActive ? "w-6 bg-white" : "w-2.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={isActive ? "true" : "false"}
            />
          )
        })}
      </div>

      {/* hide scrollbars */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

/* ================= Section Wrapper ================= */
export default function AdvartSection() {
  return (
    <section id="advart" className="section scroll-mt-24 md:scroll-mt-32">
      <div className="section-container pb-0">
        <div className="flex flex-col items-center justify-center">
          <section className="w-full">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="heading2 pb-1">
                All exciting things we do at <span className="font-semibold">Advart...</span>
              </h2>
              <p className="paragraph mx-auto text-center whitespace-pre-line">
                From scaling a brand from ₹30K to ₹3Cr, to building a homegrown brand like Zing, to creating many more
                meaningful brand stories… We love doing it all, while nailing it right!
              </p>
            </div>
          </section>

          <div className="w-full mt-8">
            {/* Mobile / Tablet: drag slider */}
            <div className="md:hidden">
              <MobileDragSlider />
            </div>

            {/* Desktop: GSAP stack scroll (content left, image right) */}
            <div className="hidden md:block">
              <GsapStackScroll />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
