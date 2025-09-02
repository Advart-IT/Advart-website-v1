"use client"

import { useEffect, useRef } from "react"

const Strategy = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        if (!sectionRef.current || !textRef.current) {
          ticking = false
          return
        }

        const section = sectionRef.current
        const text = textRef.current
        const rect = section.getBoundingClientRect()
        const windowHeight = window.innerHeight

        const isMobile = window.innerWidth < 768
        const startReveal = windowHeight * (isMobile ? 1.2 : 1.1)
        const endReveal = windowHeight * (isMobile ? 0.7 : 0.65)

        const elementTop = rect.top
        const elementHeight = rect.height

        let progress = 0
        if (elementTop < startReveal && elementTop > endReveal - elementHeight) {
          progress = Math.min(
            1,
            Math.max(0, (startReveal - elementTop) / (startReveal - endReveal + elementHeight))
          )
        } else if (elementTop <= endReveal - elementHeight) {
          progress = 1
        }

        const words = text.querySelectorAll<HTMLSpanElement>(".reveal-word")
        const total = words.length

        words.forEach((word, index) => {
          const wordProgress = Math.max(0, Math.min(1, progress * (total + 4) - index))
          const opacity = 0.3 + 0.7 * wordProgress
          const grayValue = Math.floor(100 + 155 * wordProgress)

          word.style.opacity = opacity.toString()
          word.style.color = `rgb(${grayValue}, ${grayValue}, ${grayValue})`
        })

        ticking = false
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  const strategyText =
    "Data is at the heart of everything we do, powered by creative fuel that sparks the impact you crave for your brand's growth."
  const words = strategyText.split(" ")

  return (
    <section id="strategy" ref={sectionRef}>
      <div className="w-full pt-6 sm:pt-8 md:pt-10 pb-8 sm:pb-10 md:pb-12">
        <div className="relative overflow-hidden bg-black text-white">
          <div className="max-w-4xl w-full mx-auto text-center relative z-10 py-12 sm:py-14 md:py-16 px-6">
            {/* Heading */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-white mb-4">
              Our Strategy
            </h2>

            {/* Subheading (animated line) */}
            <div
              ref={textRef}
              className="text-base sm:text-lg md:text-xl font-medium leading-tight"
            >
              {words.map((word, index) => (
                <span
                  key={index}
                  className="reveal-word inline-block mr-3 mb-2"
                  style={{
                    opacity: 0.3,
                    color: "rgb(100, 100, 100)",
                    transition: "all 0.3s ease-out",
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Strategy
