"use client"

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react"

interface Card {
  title: string
  iconPath: string
  tooltip: string
  src: string
  ctaLink: string
  content: (() => React.ReactNode) | React.ReactNode
}

/** Reusable ReadMore component (always shows the button) */
const ReadMore = React.memo(function ReadMore({
  text,
  maxChars = 120,
  onReadMore,
}: {
  text: string
  maxChars?: number
  onReadMore?: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const isOverflow = text.length > maxChars

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (onReadMore) onReadMore()
      else setExpanded((v) => !v)
    },
    [onReadMore]
  )

  const displayText =
    expanded || !isOverflow ? text : `${text.slice(0, maxChars)}… `

  return (
    <>
      {displayText}
      <button
        onClick={handleClick}
        className="underline underline-offset-2 font-medium hover:text-black transition-colors"
        aria-label="Read more"
      >
        {onReadMore ? "Read more" : expanded ? "Show less" : "Read more"}
      </button>
    </>
  )
})

export default function ServicesSection() {
  const [active, setActive] = useState<Card | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)

  const words = useMemo(
    () => ["Digital Marketing", "Brand Performance", "Performance Ads"],
    []
  )
  const interval = 2500

  // --- Lock rotating word width ---
  const [maxWordW, setMaxWordW] = useState<number | null>(null)
  const probeRef = useRef<HTMLSpanElement | null>(null)

  const measure = useCallback(() => {
    const probe = probeRef.current
    if (!probe) return
    let max = 0
    for (const w of words) {
      probe.textContent = w
      const width = probe.offsetWidth
      if (width > max) max = width
    }
    setMaxWordW(max || null)
  }, [words])

  useEffect(() => {
    const probe = document.createElement("span")
    probe.style.visibility = "hidden"
    probe.style.position = "absolute"
    probe.style.left = "-9999px"
    probe.className =
      "font-semibold text-black whitespace-nowrap text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight"
    document.body.appendChild(probe)
    probeRef.current = probe

    let raf = requestAnimationFrame(measure)
    ;(document as any).fonts?.ready?.then(() => measure()).catch(() => {})

    const onResize = () => measure()
    window.addEventListener("resize", onResize, { passive: true })
    window.addEventListener("orientationchange", onResize, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("orientationchange", onResize)
      probe.remove()
      probeRef.current = null
    }
  }, [measure])
  // ---------------------------------

  // Rotating word interval
  useEffect(() => {
    const timer = window.setInterval(() => {
      setIsFlipping(true)
      const t = window.setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
        setIsFlipping(false)
      }, 300)
      return () => window.clearTimeout(t)
    }, interval)

    return () => window.clearInterval(timer)
  }, [words.length, interval])

  const cards: Card[] = useMemo(
    () => [
      {
        title: "Social Media Marketing",
        iconPath: "/hero/services/bulb.webp",
        tooltip:
          "We help brands grow loyal communities that: Love your content, Spread your brand name organically, Drive real conversions through trust and engagement...",
        src: "/hero/services/Social Media Marketing.webp",
        ctaLink: "#",
        content: () => (
          <p>
            Because when a community truly believes in you, they don't just like
            your posts... they become your customers.
          </p>
        ),
      },
      {
        title: "Performance Marketing",
        iconPath: "/hero/services/boomerang.webp",
        tooltip:
          "Our performance marketing is driven by ROI and powered by data, with real-time analytics at its core. From conversion optimisation to precisely targeted campaigns, we focus on acquiring the right customers and delivering measurable growth.",
        src: "/hero/services/Performance Marketing.webp",
        ctaLink: "#",
        content: () => (
          <p>
            With a strategic multi-channel approach, every move is designed to
            scale impact, maximise returns and drive revenue that lasts.
          </p>
        ),
      },
      {
        title: "Business Consulting",
        iconPath: "/hero/services/puzzle.webp",
        tooltip:
          "Whether it's expanding your brand globally or growing meaningfully as a homegrown business, we specialise in providing strategic consultation that eliminates operational chaos & strengthens brand visibility.",
        src: "/hero/services/Business Consulting.webp",
        ctaLink: "#",
        content: () => <p></p>,
      },
      {
        title: "Branding & Designing",
        iconPath: "/hero/services/sling.webp",
        tooltip:
          "All our branding is rooted in research and audience insights, ensuring your brand voice stays consistent and powerful.",
        src: "/hero/services/Branding & Designing.webp",
        ctaLink: "#",
        content: () => (
          <p>
            From packaging to billboards, we design with consumer psychology in
            mind... creating not just moments, but memories that last.
          </p>
        ),
      },
    ],
    []
  )

  const handleCardClick = useCallback((card: Card) => setActive(card), [])
  const handleCloseModal = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseModal()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [active, handleCloseModal])

  return (
    <section id="services" className=" scroll-mt-24 md:scroll-mt-32">
      <div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16
                   pt-8 sm:pt-10 md:pt-12 pb-10 sm:pb-12 md:pb-14"
      >
        <div className="flex flex-col items-center justify-center text-black bg-[#F6F7F9] rounded-2xl">
          {/* Heading */}
          <section className="w-full mb-6 sm:mb-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-light leading-tight">
                <span className="inline-flex items-baseline justify-center gap-2">
                  <span>Trusted in</span>
                  <span
                    className="relative inline-block align-baseline overflow-hidden text-left font-semibold text-black whitespace-nowrap text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight"
                    style={{
                      width: maxWordW ? `${maxWordW}px` : undefined,
                      display: "inline-block",
                    }}
                  >
                    <span
                      className={`${
                        isFlipping
                          ? "animate-slide-up-out"
                          : "animate-slide-up-in"
                      } block`}
                    >
                      {words[currentIndex]}
                    </span>
                  </span>
                </span>
              </h2>

              <style jsx>{`
                @keyframes slide-up-out {
                  0% {
                    transform: translateY(0%);
                    opacity: 1;
                  }
                  100% {
                    transform: translateY(-100%);
                    opacity: 0;
                  }
                }
                @keyframes slide-up-in {
                  0% {
                    transform: translateY(100%);
                    opacity: 0;
                  }
                  100% {
                    transform: translateY(0%);
                    opacity: 1;
                  }
                }
                .animate-slide-up-out {
                  animation: slide-up-out 0.6s ease-in-out;
                }
                .animate-slide-up-in {
                  animation: slide-up-in 0.6s ease-in-out;
                }
              `}</style>
            </div>
          </section>

          {/* Mobile Cards */}
          <div className="lg:hidden w-full max-w-md px-2 sm:px-0">
            <div className="flex flex-col gap-4 sm:gap-6">
              {cards.map((card, index) => (
                <div key={index} className="relative">
                  <div
                    onClick={() => handleCardClick(card)}
                    className="w-full rounded-xl sm:rounded-2xl border border-gray-300 bg-white cursor-pointer overflow-hidden p-6 hover:shadow-lg transition-shadow duration-200"
                    title={card.tooltip}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full mb-4">
                        <img
                          src={card.iconPath || "/placeholder.svg"}
                          alt={`${card.title} icon`}
                          className="w-13 h-13"
                        />
                      </div>

                      <div className="text-center">
                        <h3 className="text-base sm:text-lg font-semibold mb-3">
                          {card.title}
                        </h3>
                        <p className="text-black/70 text-sm sm:text-base leading-relaxed">
                          <ReadMore
                            text={card.tooltip}
                            maxChars={120}
                            onReadMore={() => handleCardClick(card)}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Cards */}
          <div className="hidden lg:block w-full max-w-6xl px-4 lg:px-0">
            <div className="grid grid-cols-4 gap-6">
              {cards.map((card, index) => (
                <div key={index} className="relative">
                  <div
                    onClick={() => handleCardClick(card)}
                    className="w-full rounded-2xl border border-black/10 bg-white cursor-pointer p-6 min-h-72 flex items-center justify-center hover:shadow-lg transition-shadow duration-200"
                    title={card.tooltip}
                  >
                    <div className="flex flex-col items-center text-center h-full justify-center">
                      <div className="flex items-center justify-center w-14 h-14 rounded-full mb-5">
                        <img
                          src={card.iconPath || "/placeholder.svg"}
                          alt={`${card.title} icon`}
                          className="w-18 h-18"
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-3">
                        {card.title}
                      </h3>
                      <p className="text-black/70 text-sm">
                        <ReadMore
                          text={card.tooltip}
                          maxChars={120}
                          onReadMore={() => handleCardClick(card)}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal */}
          {active && (
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
            >
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleCloseModal}
              />
              <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col min-h-0 transform transition-all duration-300 ease-out scale-100 opacity-100">
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={handleCloseModal}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors"
                    aria-label="Close modal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex-shrink-0">
                  <img
                    src={active.src || "/placeholder.svg"}
                    alt={active.title}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />
                  <div className="p-6 pb-4">
                    <h3 className="font-bold text-black text-xl text-center">
                      {active.title}
                    </h3>
                  </div>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 pb-6">
                  <div className="space-y-4">
                    <div className="text-black/70 text-base leading-relaxed whitespace-pre-line">
                      {active.tooltip}
                    </div>
                    <div className="text-black/70 text-base leading-relaxed">
                      {typeof active.content === "function"
                        ? active.content()
                        : active.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
