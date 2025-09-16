"use client"

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"

/* ---------- Hook: prefers-reduced-motion (instant read + Safari fallback) ---------- */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  const initial = useMemo(() => {
    if (typeof window === "undefined") return false
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    } catch {
      return false
    }
  }, [])
  useEffect(() => setReduced(initial), [initial])

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setReduced("matches" in e ? e.matches : mq.matches)

    if ("addEventListener" in mq) {
      mq.addEventListener("change", handler as EventListener)
      return () => mq.removeEventListener("change", handler as EventListener)
    } else {
      // @ts-ignore legacy Safari
      mq.addListener(handler)
      return () => {
        // @ts-ignore legacy Safari
        mq.removeListener(handler)
      }
    }
  }, [])

  return reduced
}

/* ---------- Component ---------- */
export default function VideoScrolling() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const videoLoadedRef = useRef(false)

  /* Lazy-attach video sources only when visible (prevents any network until in view) */
  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const attachSrcs = () => {
      if (videoLoadedRef.current) return
      const sources = Array.from(el.querySelectorAll("source")) as HTMLSourceElement[]
      sources.forEach((s) => {
        const dataSrc = s.getAttribute("data-src")
        if (dataSrc) s.src = dataSrc
      })
      // After setting src on sources, call load()
      el.load()
      videoLoadedRef.current = true
    }

    const onFirstIntersect: IntersectionObserverCallback = (entries, obs) => {
      const entry = entries[0]
      if (!entry?.isIntersecting) return
      obs.disconnect()
      attachSrcs()
      // Try to play when we first reveal it; browsers allow if muted + inline
      el.play().catch(() => {})
    }

    // If no IntersectionObserver (very rare), fall back to delayed load
    if (!("IntersectionObserver" in window)) {
      const t = setTimeout(() => {
        attachSrcs()
        el.play().catch(() => {})
      }, 500)
      return () => clearTimeout(t)
    }

    const io = new IntersectionObserver(onFirstIntersect, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* Play/pause while scrolling (saves CPU/battery) */
  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const onIntersect: IntersectionObserverCallback = (entries) => {
      const entry = entries[0]
      if (!entry) return
      if (entry.isIntersecting) {
        // If sources not yet attached (edge case), skip
        if (!videoLoadedRef.current) return
        el.play().catch(() => {})
      } else {
        if (!el.paused) el.pause()
      }
    }

    const io = new IntersectionObserver(onIntersect, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* Lazy-load GSAP + ScrollTrigger after wrapper becomes visible (and if motion allowed) */
  useLayoutEffect(() => {
    const wrap = wrapRef.current
    if (!wrap || reduced) return
    let cleanup = () => {}

    const initGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia()
        mm.add(
          { desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" },
          (ctx) => {
            const { mobile } = ctx.conditions!
            const start = mobile ? "top 92%" : "top 85%"
            const end = "center center"

            const anim = gsap.to(wrap, { scale: 1, ease: "none" })

            const st = ScrollTrigger.create({
              trigger: wrap,
              start,
              end,
              scrub: true,
              animation: anim,
              fastScrollEnd: true,
            })

            return () => {
              st.kill()
              anim.kill()
            }
          }
        )
      }, wrapRef)

      cleanup = () => ctx.revert()
    }

    const onFirstIntersect: IntersectionObserverCallback = (entries, obs) => {
      const entry = entries[0]
      if (!entry?.isIntersecting) return
      obs.disconnect()
      initGSAP()
    }

    const io = new IntersectionObserver(onFirstIntersect, { threshold: 0.1 })
    io.observe(wrap)
    return () => {
      io.disconnect()
      cleanup()
    }
  }, [reduced])

  return (
    <section id="video-scroll" className="section">
      <div className="section-container pt-0">
        <h2 className="heading2 pb-4 text-center">
          Building Brands <span className="font-semibold">Meaningfully</span>
        </h2>

        <div
          ref={wrapRef}
          style={{
            // Start small for animation; if reduced motion, start at 1 to avoid any pop-in.
            transform: `scale(${reduced ? 1 : 0.6})`,
            transformOrigin: "50% 50%",
            willChange: reduced ? undefined : "transform",
          }}
          className="w-full aspect-video sm:aspect-[16/9] md:h-[70vh] lg:h-[78vh] overflow-hidden bg-black rounded-2xl motion-reduce:transform-none"
        >
          <video
            ref={videoRef}
            className="w-full h-full object-contain md:object-cover"
            loop
            muted
            playsInline
            autoPlay
            preload="none"            // do not fetch until we attach sources
            // @ts-ignore — supported in modern Chromium/Firefox; harmless elsewhere
            loading="lazy"            // hint to lazy-load poster decode where supported
            poster="/hero/real-poster.jpg"
          >
            {/* We set data-src and attach src only when intersecting to truly lazy-load */}
            <source data-src="/hero/advart.webm" type="video/webm" />
            <source data-src="/hero/advart.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}
