"use client"

import React, { useEffect, useRef } from "react"

export default function VideoScrolling() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoWrapRef = useRef<HTMLDivElement>(null)
  const reducedRef = useRef(false)

  /* Prefers-reduced-motion */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    reducedRef.current = mq.matches
    const apply = (e: MediaQueryListEvent) => {
      reducedRef.current = e.matches
    }
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  /* GSAP scroll animation */
  useEffect(() => {
    if (!videoWrapRef.current || reducedRef.current) return
    let cleanup = () => {}

    ;(async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      const wrap = videoWrapRef.current!
      gsap.set(wrap, { scale: 0.6 })

      const mm = gsap.matchMedia()

      mm.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
        },
        (ctx) => {
          const { mobile } = ctx.conditions!

          const start = mobile ? "top 92%" : "top 80%"
          const end = mobile ? "top 58%" : "center center" // earlier end on mobile
          const scrub = mobile ? 0.5 : 1

          const anim = gsap.to(wrap, { scale: 1, ease: "none" })
          const st = ScrollTrigger.create({
            trigger: wrap,
            start,
            end,
            scrub,
            animation: anim,
          })

          return () => {
            st.kill()
            anim.kill()
          }
        }
      )

      cleanup = () => {
        mm.revert()
      }
    })()

    return () => cleanup()
  }, [])

  /* Attempt autoplay when idle */
  useEffect(() => {
    const play = () => videoRef.current?.play().catch(() => {})
    if ("requestIdleCallback" in window) {
      ;(window as any).requestIdleCallback(play)
    } else {
      setTimeout(play, 200)
    }
  }, [])

  return (
    <section id="video-scroll" className="section">
      <div className="section-container pt-0">
        <h2 className="heading2 pb-4 text-center">
          Building Brands <span className="font-semibold">Meaningfully</span>
        </h2>

        <div
          ref={videoWrapRef}
          className="w-full aspect-video sm:aspect-[16/9] md:h-[70vh] lg:h-[78vh] overflow-hidden bg-black rounded-2xl"
        >
          <video
            ref={videoRef}
            className="w-full h-full object-contain md:object-cover"
            loop
            muted
            playsInline
            autoPlay
            preload="metadata"
            poster="/hero/real-poster.jpg"
          >
            <source src="/hero/advart.webm" type="video/webm" />
            <source src="/hero/advart.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}
