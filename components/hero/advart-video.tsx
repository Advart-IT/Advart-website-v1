"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"

/* ---------- Hook: prefers-reduced-motion ---------- */
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
  const srcAttachedRef = useRef(false)

  /* Preload the poster image early so we always have an instant paint */
  useEffect(() => {
    const posterHref = "/hero/real-poster.jpg"
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    // @ts-ignore: supported in modern Chromium; ignored elsewhere
    link.fetchPriority = "high"
    link.href = posterHref
    document.head.appendChild(link)
    return () => { document.head.removeChild(link) }
  }, [])

  /* (Optional) Warm up connection to the video host (DNS/TLS) */
  useEffect(() => {
    const origins: string[] = []
    const nodes: HTMLLinkElement[] = []
    origins.forEach((href) => {
      const l = document.createElement("link")
      l.rel = "preconnect"
      l.href = href
      l.crossOrigin = "anonymous"
      document.head.appendChild(l)
      nodes.push(l)
    })
    return () => nodes.forEach((n) => n.remove())
  }, [])

  /* Attach video sources EARLY (before visible) + switch to preload="auto" */
  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const attachSrcs = () => {
      if (srcAttachedRef.current) return
      const sources = Array.from(el.querySelectorAll("source")) as HTMLSourceElement[]
      sources.forEach((s) => {
        const dataSrc = s.getAttribute("data-src")
        if (dataSrc) s.src = dataSrc
      })
      el.preload = "auto"
      el.load()
      srcAttachedRef.current = true
    }

    const onNearViewport: IntersectionObserverCallback = (entries, obs) => {
      const entry = entries[0]
      if (!entry) return
      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        attachSrcs()

        const onCanPlay = () => el.play().catch(() => {})
        el.addEventListener("canplay", onCanPlay, { once: true })

        const t = setTimeout(() => el.play().catch(() => {}), 1200)

        obs.disconnect()
        const cleanup = () => {
          clearTimeout(t)
          el.removeEventListener("canplay", onCanPlay)
        }
        ;(el as any).__canplayCleanup = cleanup
      }
    }

    if (!("IntersectionObserver" in window)) {
      const t = setTimeout(attachSrcs, 300)
      return () => clearTimeout(t)
    }

    const io = new IntersectionObserver(onNearViewport, {
      rootMargin: "1200px 0px",
      threshold: 0,
    })
    io.observe(el)

    return () => {
      io.disconnect()
      const cleanup = (el as any).__canplayCleanup as undefined | (() => void)
      if (cleanup) cleanup()
    }
  }, [])

  /* Pause when far off-screen; play when visible (power/bandwidth saver) */
  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const onIntersect: IntersectionObserverCallback = (entries) => {
      const entry = entries[0]
      if (!entry) return
      if (entry.isIntersecting) {
        if (!srcAttachedRef.current) return
        el.play().catch(() => {})
      } else {
        if (!el.paused) el.pause()
      }
    }

    const io = new IntersectionObserver(onIntersect, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* -------- GSAP: defer to idle + keep on GPU-only path (was useLayoutEffect) -------- */
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap || reduced) return

    let cleanup = () => {}

    // 1) signal compositor early
    wrap.style.willChange = "transform"
    wrap.style.backfaceVisibility = "hidden"           // <-- avoid paint glitches
    wrap.style.transform = `${wrap.style.transform || ""} translateZ(0)` // <-- GPU promotion

    // tiny helper to wait for an idle-ish moment after first paint
    const rIC =
      (typeof window !== "undefined" && "requestIdleCallback" in window)
        ? (window.requestIdleCallback as (cb: () => void, opts?: { timeout?: number }) => number)
        : ((cb: () => void) => window.setTimeout(cb, 1))

    // Only initialize when close AND when we’ve had a breath on the main thread
    const initGSAP = async () => {
      // prefetch hint to keep it snappy on repeat visits
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import(/* webpackPrefetch: true */ "gsap"),
        import(/* webpackPrefetch: true */ "gsap/ScrollTrigger"),
      ])
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia()
        mm.add(
          { desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" },
          (ctx) => {
            const { mobile } = ctx.conditions!
            const start = mobile ? "top 92%" : "top 85%"
            const end = "center center"

            // keep animation on the compositor only
            const anim = gsap.to(wrap, {
              scale: 1,
              ease: "none",
              force3D: true,        // <-- prevents CPU fallbacks
            })

            const st = ScrollTrigger.create({
              trigger: wrap,
              start,
              end,
              scrub: true,
              animation: anim,
              fastScrollEnd: true,
            })

            return () => { st.kill(); anim.kill() }
          }
        )
      }, wrapRef)

      cleanup = () => ctx.revert()
    }

    const onFirstIntersect: IntersectionObserverCallback = (entries, obs) => {
      const entry = entries[0]
      if (!entry?.isIntersecting) return
      obs.disconnect()
      // give the browser one idle slice to finish painting/decoding
      rIC(() => {
        // and one more frame, for good measure
        requestAnimationFrame(() => initGSAP())
      })
    }

    const io = new IntersectionObserver(onFirstIntersect, { threshold: 0.1 })
    io.observe(wrap)

    return () => { io.disconnect(); cleanup() }
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
            // start at GPU scale; avoid layout; isolate the box
            transform: `translateZ(0) scale(${reduced ? 1 : 0.6})`,
            transformOrigin: "50% 50%",
            willChange: reduced ? undefined : "transform",
            contain: "layout paint size",        // <-- prevents expensive ancestor invalidations
            contentVisibility: "auto",           // <-- skip rendering work when offscreen
            backfaceVisibility: "hidden",
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
            preload="none"
            // @ts-ignore — supported in modern Chromium/Firefox; harmless elsewhere
            loading="lazy"
            poster="/hero/real-poster.jpg"
            crossOrigin="anonymous"
            // @ts-ignore older types
            disableRemotePlayback
          >
            <source media="(max-width: 767px)" data-src="/hero/advart-576p.mp4" type="video/mp4" />
            <source data-src="/hero/advart.webm" type="video/webm" />
            <source data-src="/hero/advart.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}
