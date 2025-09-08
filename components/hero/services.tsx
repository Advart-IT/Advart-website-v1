"use client"

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface Card {
  title: string
  iconPath: string
  tooltip: string
  src: string
  ctaLink: string
  content: (() => React.ReactNode) | React.ReactNode
}

/** ------- static data (prevents re-creation on every render) ------- */
const WORDS = ["Digital Marketing", "Brand Performance", "Performance Ads"] as const
const ROTATE_INTERVAL = 2500

const CARDS: Card[] = [
  {
    title: "Social Media Marketing",
    iconPath: "/hero/services/bulb.webp",
    tooltip:
      "We help brands grow loyal communities that: Love your content, Spread your brand name organically, Drive real conversions through trust and engagement...",
    src: "/hero/services/Social Media Marketing.webp",
    ctaLink: "#",
    content: () => (
      <p>
        Because when a community truly believes in you, they don't just like your posts... they
        become your customers.
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
        With a strategic multi-channel approach, every move is designed to scale impact, maximise
        returns and drive revenue that lasts.
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
        From packaging to billboards, we design with consumer psychology in mind... creating not
        just moments, but memories that last.
      </p>
    ),
  },
]

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

  const displayText = expanded || !isOverflow ? text : `${text.slice(0, maxChars)}… `

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

  const words = useMemo(() => WORDS, [])

  /** --- Lock rotating word width (probe matches typography) --- */
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
      // match heading font size/weight (line-height doesn't affect width)
      "font-semibold text-black whitespace-nowrap text-lg sm:text-xl md:text-2xl lg:text-3xl leading-none"
    document.body.appendChild(probe)
    probeRef.current = probe

    const raf = requestAnimationFrame(measure)
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
  /** ----------------------------------------------------------------- */

  // Rotate word with one interval (smooth)
  useEffect(() => {
    const id = window.setInterval(() => {
      setCurrentIndex((i) => (i + 1) % words.length)
    }, ROTATE_INTERVAL)
    return () => clearInterval(id)
  }, [words.length])

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
    <section id="services" className="section">
      <div className="section-container">
        <div>
          {/* Heading */}
          <section>
            <div>
              {/* nudge keeps baseline perfect after giving more room for descenders */}
              <h2
                className="heading2 text-center leading-none"
                style={{ ["--baseline-nudge" as any]: "-0.10em" }} // tweak between -0.12em..-0.04em if needed
              >
                <span className="whitespace-nowrap leading-none">
                  <span className="leading-none">Trusted in&nbsp;</span>

                  {/* OUTER: inline-block aligns on real baseline */}
                  <span
                    className="inline-block leading-none text-left"
                    style={{
                      verticalAlign: "var(--baseline-nudge)",
                    }}
                  >
                    {/* INNER: descender-safe clip box */}
                    <span
                      className="inline-block overflow-hidden leading-none"
                      style={{
                        width: maxWordW ? `${maxWordW}px` : "auto",
                        height: "1.04em",       // extra room for g/j/p/y
                        lineHeight: "1.2em",
                        WebkitFontSmoothing: "antialiased",
                        backfaceVisibility: "hidden",
                        transform: "translateZ(0)",
                        willChange: "transform, opacity",
                        paddingBottom: "0.04em", // avoid jump on exit
                      }}
                    >
                      <AnimatePresence initial={false} mode="popLayout">
                        <motion.span
                          key={currentIndex}
                          className="inline-block font-semibold text-black leading-none"
                          initial={{ y: 22, opacity: 0, filter: "blur(2px)" }}
                          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                          exit={{ y: -22, opacity: 0, filter: "blur(2px)" }}
                          transition={{ type: "spring", stiffness: 800, damping: 46, mass: 0.75 }}
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {words[currentIndex]}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </span>
                </span>
              </h2>

              <style jsx>{`
                @media (prefers-reduced-motion: reduce) {
                  :global([data-motion-reduce]),
                  :global(*[data-motion-reduce]) {
                    transition: none !important;
                    animation: none !important;
                  }
                }
              `}</style>
            </div>
          </section>

          {/* Cards Grid (1 on mobile, 4 on desktop) */}
          <div className="w-full max-w-6xl mx-auto px-2 sm:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
              {CARDS.map((card) => (
                <div key={card.title} className="relative">
                  <div
                    onClick={() => handleCardClick(card)}
                    className="w-full rounded-xl border border-black/10 bg-white cursor-pointer py-8 px-6 flex items-center justify-center hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="flex flex-col items-center text-center h-full justify-center">
                      <div className="flex items-center justify-center w-14 h-14 mb-5">
                        <img
                          src={card.iconPath}
                          alt={`${card.title} icon`}
                          className="max-w-full max-h-full"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <h3 className="heading3 font-semibold">{card.title}</h3>
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
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex-shrink-0">
                  <img
                    src={active.src || "/placeholder.svg"}
                    alt={active.title}
                    className="w-full h-48 object-cover rounded-t-2xl"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="p-6 pb-2">
                    <h3 className="heading3 font-semibold">{active.title}</h3>
                  </div>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 pb-6">
                  <div className="space-y-4">
                    <div className="text-black/70 text-base leading-relaxed whitespace-pre-line">
                      {active.tooltip}
                    </div>
                    <div className="text-black/70 text-base leading-relaxed">
                      {typeof active.content === "function" ? active.content() : active.content}
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
