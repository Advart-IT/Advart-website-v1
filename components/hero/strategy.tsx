"use client"

import { useEffect, useRef } from "react"

const Strategy = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !textRef.current) return

      const section = sectionRef.current
      const text = textRef.current
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const isMobile = window.innerWidth < 768
      const startReveal = windowHeight * (isMobile ? 0.9 : 0.8)
      const endReveal = windowHeight * (isMobile ? 0.3 : 0.2)

      const elementTop = rect.top
      const elementHeight = rect.height

      let progress = 0
      if (elementTop < startReveal && elementTop > endReveal - elementHeight) {
        progress = Math.min(1, Math.max(0, (startReveal - elementTop) / (startReveal - endReveal + elementHeight)))
      } else if (elementTop <= endReveal - elementHeight) {
        progress = 1
      }

      const words = text.querySelectorAll(".reveal-word")
      words.forEach((word, index) => {
        const wordProgress = Math.max(0, Math.min(1, progress * words.length - index))
        const opacity = 0.3 + 0.7 * wordProgress
        const grayValue = Math.floor(100 + 155 * wordProgress)

        Object.assign((word as HTMLElement).style, {
          opacity: opacity.toString(),
          color: `rgb(${grayValue}, ${grayValue}, ${grayValue})`,
          transition: "all 0.3s ease-out",
        })
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const strategyText =
    "Data is at the heart of everything we do, powered by creative fuel that sparks the impact you crave for your brand's growth."
  const words = strategyText.split(" ")

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center bg-black text-white relative overflow-hidden py-20 sm:py-12 md:py-16 lg:pt-20 xl:py-24 px-8"
    >
      <div className="max-w-4xl w-full text-center relative z-10">
        <div
          ref={textRef}
          className="text-xl xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed font-light"
        >
          {words.map((word, index) => (
            <span
              key={index}
              className="reveal-word inline-block mr-3 mb-2"
              style={{
                opacity: 0.3,
                color: "rgb(100, 100, 100)",
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Strategy