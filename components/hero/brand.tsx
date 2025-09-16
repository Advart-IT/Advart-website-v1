"use client"

import React, { useLayoutEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type CardT = {
  imageSrc: string
  imageAlt?: string
  title: string
  description: string
  whatTried: string[]
  result: string
}

// Shared cards data
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

/* =========================
   Desktop GSAP stack scroll
   ========================= */
const GsapStackScroll: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentIndexRef = useRef(0) // keep source of truth without causing re-renders
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

      // initial placement
      cardRefs.current.forEach((card, index) => {
        if (!card) return
        gsap.set(card, {
          yPercent: index === 0 ? 0 : 120,
          zIndex: index + 1,
          scale: 1,
          filter: "blur(0px)",
          transformOrigin: "center center",
          willChange: "transform, filter",
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
            filter: "blur(8px)",
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
        start: "top 5%",
        end: `+=${window.innerHeight * Math.max(cards.length - 1, 1)}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        animation: masterTL,
        onUpdate(self) {
          const newIndex = Math.round(self.progress * (cards.length - 1))
          if (newIndex !== currentIndexRef.current) {
            currentIndexRef.current = newIndex
            setCurrentIndex(newIndex)
          }
        },
      })

      // --- DEFAULT TO CARD #2 (index 1) ---
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
  }, []) // IMPORTANT: run once only

  return (
    <div className="relative">
      <section className="relative w-full">
        <div ref={wrapRef} className="relative min-h-screen w-full">
          <div className="absolute inset-0 h-screen flex items-center justify-center">
            <div className="relative w-[95%] sm:w-[97%] lg:w-[99%] max-w-7xl mx-auto h-[78vh] sm:h-[70vh] lg:h-[75vh] overflow-hidden">
              {(() => (cardRefs.current.length = cards.length, null))()}
              {cards.map((card, index) => (
                <div
                  key={`${card.title}-${index}`}
                  ref={(el) => {
                    if (el) cardRefs.current[index] = el
                  }}
                  className="absolute inset-0 will-change-transform will-change-filter overflow-hidden bg-inherit"
                  style={{ zIndex: index + 1 }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 bg-black text-white">
                    <div className="h-full flex items-center px-3 sm:px-6 md:px-8 lg:px-12 bg-inherit">
                      <div className="max-w-7xl mx-auto w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center">
                          <div className="space-y-3 sm:space-y-4 lg:space-y-6 order-2 lg:order-1">
                            <div className="card-heading">
                              <h2 className="text-lg sm:text-2xl lg:text-4xl xl:text-5xl font-light mb-2 sm:mb-3 lg:mb-4 leading-tight">
                                {card.title}
                              </h2>
                              <div className="card-description">
                                <p className="text-xs sm:text-base lg:text-lg xl:text-xl font-light leading-relaxed text-gray-200">
                                  {card.description}
                                </p>
                              </div>
                            </div>

                            <div className="card-what-tried space-y-1.5 sm:space-y-2 lg:space-y-3">
                              <h3 className="text-[11px] sm:text-sm font-medium text-white">What did we try?</h3>
                              <ul className="space-y-1 text-gray-300">
                                {card.whatTried.map((item, idx) => (
                                  <li key={idx} className="flex items-start text-xs sm:text-sm lg:text-base">
                                    <span className="text-white mr-2 mt-1">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="card-result space-y-1.5 sm:space-y-2 lg:space-y-3">
                              <h3 className="text-[11px] sm:text-sm font-medium text-white">And the result?</h3>
                              <p className="text-gray-300 leading-relaxed text-xs sm:text-sm lg:text-base">
                                {card.result}
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                            <div className="card-image relative w-full max-w-[14rem] sm:max-w-sm lg:max-w-md">
                              <img
                                src={card.imageSrc}
                                alt={card.imageAlt ?? `${card.title} showcase`}
                                className="w-full h-auto max-h-[36vh] sm:max-h-[45vh] object-contain rounded-lg shadow-lg mx-auto"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden lg:flex gap-2">
                {cards.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to card ${i + 1}`}
                    onClick={() => navigateToCard(i)}
                    className={`h-2.5 w-2.5 rounded-full border border-white/50 transition-all ${
                      i === currentIndex ? "bg-white" : "bg-white/20 hover:bg-white/40"
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

/* ==============================================
   Mobile carousel — NO SHADCN
   infinite loop + swipe/drag + inertia + snap
   ============================================== */
/* ==============================================
   Mobile carousel — SINGLE SET (no clones)
   drag + inertia + snap, default to 2nd card
   ============================================== */
const MobileScaleCarousel: React.FC = () => {
  const trackRef = React.useRef<HTMLDivElement | null>(null)
  const [current, setCurrent] = React.useState(0)
  const [isInitialized, setIsInitialized] = React.useState(false)

  // start centered on the SECOND slide (index 1)
  React.useEffect(() => {
    const el = trackRef.current
    if (!el || isInitialized) return

    const timer = setTimeout(() => {
      const second = el.querySelector<HTMLDivElement>('[data-carousel-index="1"]')
      if (second) {
        second.scrollIntoView({ block: "nearest", inline: "center" })
        setIsInitialized(true)
      }
    }, 80)

    return () => clearTimeout(timer)
  }, [isInitialized])

  // scale cards based on distance to center + compute current index
  const update = React.useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const items = Array.from(el.querySelectorAll<HTMLDivElement>('[data-carousel-item="true"]'))

    let closestIdx = 0
    let closestDist = Infinity

    items.forEach((item, idx) => {
      const r = item.getBoundingClientRect()
      const cardCenter = r.left + r.width / 2
      const dist = Math.abs(cardCenter - centerX)
      if (dist < closestDist) {
        closestDist = dist
        closestIdx = idx
      }
      const norm = Math.min(1, dist / (rect.width * 0.5))
      const scale = 1 - 0.15 * norm // 1..0.85
      item.style.transform = `scale(${scale})`
    })

    setCurrent(closestIdx)
  }, [])

  React.useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onScroll = () => requestAnimationFrame(update)
    const onResize = () => requestAnimationFrame(update)
    update()
    el.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      el.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [update])

  // drag + inertia + snap (no loop correction since there are no clones)
  React.useEffect(() => {
    const el = trackRef.current
    if (!el) return

    let down = false
    let startX = 0
    let startLeft = 0
    let lastX = 0
    let lastT = 0
    let vx = 0

    const now = () => performance.now()

    const onPointerDown = (e: PointerEvent) => {
      down = true
      el.setPointerCapture(e.pointerId)
      startX = e.clientX
      startLeft = el.scrollLeft
      lastX = startX
      lastT = now()
      vx = 0
      el.style.scrollBehavior = "auto"
      el.classList.add("dragging")
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!down) return
      const dx = e.clientX - startX
      el.scrollLeft = startLeft - dx
      const t = now()
      const dt = t - lastT
      if (dt > 0) {
        vx = (e.clientX - lastX) / dt
        lastX = e.clientX
        lastT = t
      }
    }

    const snapToNearest = () => {
      // simple inertia
      const throwPx = Math.max(-800, Math.min(800, vx * 250))
      el.style.scrollBehavior = "smooth"
      el.scrollTo({ left: el.scrollLeft - throwPx })

      // after the throw finishes, snap cleanly to the nearest card
      window.setTimeout(() => {
        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const items = Array.from(el.querySelectorAll<HTMLDivElement>('[data-carousel-item="true"]'))
        let nearest = { idx: 0, dist: Infinity, el: null as HTMLDivElement | null }
        items.forEach((item, idx) => {
          const r = item.getBoundingClientRect()
          const cx = r.left + r.width / 2
          const d = Math.abs(cx - centerX)
          if (d < nearest.dist) nearest = { idx, dist: d, el: item }
        })
        nearest.el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
      }, 120)
    }

    const onPointerUp = (e: PointerEvent) => {
      if (!down) return
      down = false
      try {
        el.releasePointerCapture(e.pointerId)
      } catch {}
      el.classList.remove("dragging")
      snapToNearest()
    }

    el.addEventListener("pointerdown", onPointerDown)
    el.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)

    return () => {
      el.removeEventListener("pointerdown", onPointerDown)
      el.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
    }
  }, [])

  return (
    <div className="mx-auto w-full max-w-sm px-2">
      <div
        ref={trackRef}
        className="
          flex gap-0 overflow-x-auto snap-x snap-mandatory scroll-pl-4 scroll-pr-4 py-3
          no-scrollbar touch-pan-x select-none
        "
        style={{
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorX: "contain",
          scrollBehavior: "smooth",
        }}
        aria-label="Advart mobile carousel"
      >
        {cards.map((card, idx) => (
          <div
            key={card.title + idx}
            data-carousel-item="true"
            data-carousel-index={idx}
            className="basis-[75%] px-2 snap-center shrink-0 transition-transform duration-200 will-change-transform"
          >
            <div className="relative w-full h-[480px] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 bg-black text-white">
              <div className="h-full p-4 flex flex-col justify-between">
                {/* Image */}
                <div className="flex justify-center flex-shrink-0">
                  <div className="relative w-full max-w-[140px]">
                    <img
                      src={card.imageSrc}
                      alt={card.imageAlt ?? `${card.title} showcase`}
                      className="w-full h-auto max-h-[120px] object-contain rounded-lg shadow-lg mx-auto"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between space-y-3 mt-3">
                  <div className="space-y-2">
                    <h3 className="text-lg font-light text-white line-clamp-2">{card.title}</h3>
                    <p className="text-xs text-gray-200 leading-relaxed line-clamp-3">{card.description}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-white">What did we try?</h4>
                    <ul className="space-y-1">
                      {card.whatTried.map((item, i) => (
                        <li key={i} className="flex items-start text-xs text-gray-300">
                          <span className="text-white mr-2 mt-0.5 flex-shrink-0">•</span>
                          <span className="line-clamp-2">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-white">And the result?</h4>
                    <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">{card.result}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* dots */}
      <div className="mt-2 flex justify-center gap-1.5">
        {cards.map((_, i) => (
          <span
            key={i}
            className={i === current ? "h-1.5 w-1.5 rounded-full bg-white" : "h-1.5 w-1.5 rounded-full bg-white/30"}
            aria-hidden
          />
        ))}
      </div>
    </div>
  )
}

export default function AdvartSection() {
  return (
    <section id="advart" className="section scroll-mt-24 md:scroll-mt-32">
      <div className="section-container pb-0">
        <div className="flex flex-col items-center justify-center rounded-xl sm:rounded-2xl">
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

          <div className="w-full">
            {/* Show mobile carousel on mobile, desktop stack on larger screens */}
            <div className="md:hidden">
              <MobileScaleCarousel />
            </div>
            <div className="hidden md:block">
              <GsapStackScroll />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
