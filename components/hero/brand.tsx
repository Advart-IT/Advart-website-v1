"use client"

import React, { useLayoutEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type Card = {
  imageSrc: string
  imageAlt?: string
  title: string
  description: string
  whatTried: string[]
  result: string
}

const GsapStackScroll: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const cards: Card[] = [
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
        "Almost everything...",
        "From consulting to strategy.",
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

  const wrapRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<HTMLDivElement[]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const stRef = useRef<ScrollTrigger | null>(null)

  const navigateToCard = useCallback(
    (targetIndex: number) => {
      const st = stRef.current
      if (!st) return

      const clamped = Math.max(0, Math.min(cards.length - 1, targetIndex))
      const progress = clamped / Math.max(cards.length - 1, 1)
      const y = st.start + progress * (st.end - st.start)

      window.scrollTo({ top: y, behavior: "smooth" })
      setCurrentIndex(clamped)
    },
    [cards.length]
  )

  useLayoutEffect(() => {
    if (!wrapRef.current || cardRefs.current.length === 0) return

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768

      cardRefs.current.forEach((card, index) => {
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
        snap: {
          snapTo: gsap.utils.snap(1 / Math.max(cards.length - 1, 1)),
          duration: { min: 0.35, max: 0.7 },
          ease: "power2.inOut",
        },
        onUpdate(self) {
          const newIndex = Math.round(self.progress * (cards.length - 1))
          if (newIndex !== currentIndex) setCurrentIndex(newIndex)
        },
      })

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
    }
  }, [cards.length])

  return (
    <div className="relative">
      <section className="relative w-full">
        <div ref={wrapRef} className="relative min-h-screen w-full">
          <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-10">
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
                              <h1 className="text-lg sm:text-2xl lg:text-4xl xl:text-5xl font-light mb-2 sm:mb-3 lg:mb-4 leading-tight">
                                {card.title}
                              </h1>
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
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function AdvartSection() {
  return (
    <section id="advart" className="section scroll-mt-24 md:scroll-mt-32">
      <div className="section-container pb-0">
        <div className="flex flex-col items-center justify-center rounded-xl sm:rounded-2xl">
          {/* Top copy */}
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

          {/* Scroller (unchanged) */}
          <div className="w-full">
            <GsapStackScroll />
          </div>
        </div>
      </div>
    </section>
  )
}

