"use client"

import React, { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/* -------------------- CARD STACK WITH CONTENT LAYOUT -------------------- */
type Card = {
  imageSrc: string
  imageAlt?: string
  title: string
  description: string
  whatTried: string[]
  result: string
}

const GsapStackScroll: React.FC = () => {
  const cards: Card[] = [
    {
      imageSrc: "hero/zing/bee-little.png",
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
      imageSrc: "/hero/zing/zing.png",
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
        "A celebration that brought in strong community engagement, built deeper trust and skyrocketed brand awareness... all of which positively reflected in sales.",
    },

    {
      imageSrc: "hero/zing/prathiksham.png",
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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const steps = cards.length - 1
      const isMobile = window.innerWidth < 768
      const stepPx = isMobile ? window.innerHeight * 1.5 : Math.max(window.innerHeight * 1.25, 1000)
      const endDistance = steps > 0 ? `+=${Math.round(stepPx * steps)}` : "+=0"

      cardRefs.current.forEach((el, i) => {
        gsap.set(el, {
          yPercent: i === 0 ? 0 : 100,
          opacity: i === 0 ? 1 : 0,
          zIndex: 10 + i,
          willChange: "transform, opacity, filter",
          force3D: true,
          scale: 1,
          filter: "blur(0px)",
        })

        const heading = el.querySelector(".card-heading")
        const description = el.querySelector(".card-description")
        const whatTried = el.querySelector(".card-what-tried")
        const result = el.querySelector(".card-result")
        const image = el.querySelector(".card-image")

        if (i === 0) {
          gsap.set([heading, description, whatTried, result], { y: isMobile ? 30 : 50, opacity: 0 })
          gsap.set(image, { x: isMobile ? 30 : 50, opacity: 0, rotation: isMobile ? 3 : 5 })

          gsap.to([heading, description, whatTried, result], {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out",
            delay: 0.5,
          })

          gsap.to(image, {
            x: 0,
            opacity: 1,
            rotation: 0,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.3,
          })
        } else {
          gsap.set([heading, description, whatTried, result], { y: isMobile ? 60 : 100, opacity: 0 })
          gsap.set(image, { x: isMobile ? 60 : 100, opacity: 0, rotation: isMobile ? 7 : 10 })
        }
      })

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 1 },
scrollTrigger: {
  trigger: wrapRef.current,
  start: "top top",
  end: endDistance,
  pin: true,
  pinSpacing: true,
  scrub: isMobile ? 2 : 3,
  anticipatePin: 1,
  invalidateOnRefresh: true,
  ...(steps > 0
    ? {
        snap: {
          snapTo: Array.from({ length: steps + 1 }, (_, i) => i / steps),
          duration: { min: 0.4, max: 1 },
          ease: "power2.out",
        },
      }
    : {}),
},

      })

      cards.forEach((_, i) => {
        const curr = cardRefs.current[i]
        const prev = cardRefs.current[i - 1]

        if (curr && i > 0) {
          tl.fromTo(curr, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1 }, ">")

          const heading = curr.querySelector(".card-heading")
          const description = curr.querySelector(".card-description")
          const whatTried = curr.querySelector(".card-what-tried")
          const result = curr.querySelector(".card-result")
          const image = curr.querySelector(".card-image")

          tl.to([heading, description, whatTried, result], {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
          }, "<+0.3")

          tl.to(image, { x: 0, opacity: 1, rotation: 0, duration: 1.2, ease: "power2.out" }, "<+0.2")
        }

        if (prev && i > 0) {
          tl.to(
            prev,
            { scale: isMobile ? 0.85 : 0.92, yPercent: isMobile ? -12 : -8, opacity: 0.3, filter: "blur(8px)", duration: 0.8 },
            "<+0.1"
          ).set(prev, { zIndex: 1, pointerEvents: "none", filter: "blur(12px)", opacity: 0 }, ">-0.2")
        }
      })

      ScrollTrigger.refresh()
    }, wrapRef)

    return () => ctx.revert()
  }, [cards.length])

  cardRefs.current = []

  return (
    <section className="relative w-full">
      <div ref={wrapRef} className="relative min-h-screen w-full overflow-visible">
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="relative w-[95%] sm:w-[97%] lg:w-[99%] max-w-7xl mx-auto h-[65vh] sm:h-[70vh] lg:h-[75vh]">
            {cards.map((card, i) => (
              <div
                key={card.title}
                ref={(el) => {
                  if (el) cardRefs.current[i] = el
                }}
                className="absolute inset-0"
                style={{ zIndex: 10 + i }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl ring-1 ring-black/5 will-change-transform bg-black text-white">
                  <div className="h-full flex items-center px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
                    <div className="max-w-7xl mx-auto w-full">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center">
                        <div className="space-y-3 sm:space-y-4 lg:space-y-6 order-2 lg:order-1">
                          <div className="card-heading">
                            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light mb-2 sm:mb-3 lg:mb-4 leading-tight">
                              {card.title}
                            </h1>
                            <div className="card-description">
                              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-light leading-relaxed text-gray-200">
                                {card.description}
                              </p>
                            </div>
                          </div>

                          <div className="card-what-tried space-y-1 sm:space-y-2 lg:space-y-3">
                            <h3 className="text-xs sm:text-sm font-medium text-white">What did we try?</h3>
                            <ul className="space-y-1 text-gray-300">
                              {card.whatTried.map((item, idx) => (
                                <li key={idx} className="flex items-start text-xs sm:text-xs lg:text-sm">
                                  <span className="text-white mr-2 mt-0.5">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="card-result space-y-1 sm:space-y-2 lg:space-y-3">
                            <h3 className="text-xs sm:text-sm font-medium text-white">And the result?</h3>
                            <p className="text-gray-300 leading-relaxed text-xs sm:text-xs lg:text-sm">{card.result}</p>
                          </div>
                        </div>

                        <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                          <div className="card-image relative w-full max-w-[200px] sm:max-w-xs md:max-w-sm lg:max-w-sm xl:max-w-md">
                            <div className="relative">
                              <img
                                src={card.imageSrc}
                                alt={card.imageAlt ?? `${card.title} brand showcase`}
                                className="w-full h-auto object-contain rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-24 sm:w-32 lg:w-48 h-24 sm:h-32 lg:h-48 bg-blue-500/5 rounded-full blur-2xl sm:blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-purple-500/5 rounded-full blur-2xl sm:blur-3xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------- PAGE SECTION -------------------- */
export default function AdvartSection() {
  return (
    <section id="advart" className="scroll-mt-24 md:scroll-mt-32">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-8 sm:pb-10 md:pb-12 lg:pb-14">
        <div className="flex flex-col items-center justify-center text-black bg-[#F6F7F9] rounded-xl sm:rounded-2xl">
          <section className="w-full mb-6 sm:mb-8 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light mb-3 sm:mb-4 leading-tight">
                All exciting things we do at <span className="font-semibold">Advart...</span>
              </h2>
              <p className="text-sm sm:text-base text-black/70 leading-relaxed font-light whitespace-pre-line max-w-sm sm:max-w-xl lg:max-w-2xl mx-auto">
                From scaling a brand from ₹30K to ₹3Cr, to building a homegrown brand like Zing, to creating many more
                meaningful brand stories… We love doing it all, while nailing it right!
              </p>
            </div>
          </section>

          <div className="w-full">
            <GsapStackScroll />
          </div>
        </div>
      </div>
    </section>
  )
}
