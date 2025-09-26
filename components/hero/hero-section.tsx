"use client"

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
  useCallback,
} from "react"
import Image from "next/image"

/* ------------------------- Hook: prefers-reduced-motion ------------------------- */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setReduced(mq.matches)
    apply()
    if ("addEventListener" in mq) {
      mq.addEventListener("change", apply as EventListener)
      return () => mq.removeEventListener("change", apply as EventListener)
    } else {
      // @ts-ignore legacy Safari
      mq.addListener(apply)
      return () => {
        // @ts-ignore legacy Safari
        mq.removeListener(apply)
      }
    }
  }, [])
  return reduced
}

/* ------------------------- Hook: once-visible (IO) ------------------------- */
function useOnceVisible<T extends Element>(threshold = 0.1) {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return
    if (!("IntersectionObserver" in window)) {
      // Old browsers: assume visible quickly
      const t = setTimeout(() => setVisible(true), 0)
      return () => clearTimeout(t)
    }
    const io = new IntersectionObserver((entries, obs) => {
      if (entries[0]?.isIntersecting) {
        setVisible(true)
        obs.disconnect()
      }
    }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [visible])

  return { ref, visible } as const
}

/* ----------------------------- Typewriter ----------------------------- */
/** rAF-driven Typewriter with zero work offscreen and in background tabs */
const Typewriter = memo(function Typewriter({
  words,
  speed = 120,
  pause = 1500,
  loop = true,
  deleteEffect = true,
  enabled = true, // mount-time toggle to avoid rAF before visible
}: {
  words: string[]
  speed?: number
  pause?: number
  loop?: boolean
  deleteEffect?: boolean
  enabled?: boolean
}) {
  const reduced = useReducedMotion()
  const [text, setText] = useState("")
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef(0)
  const pauseUntilRef = useRef(0)

  // progress refs (avoid re-renders)
  const wordIndexRef = useRef(0)
  const charIndexRef = useRef(0)
  const deletingRef = useRef(false)
  const doneRef = useRef(false)

  // defer jumps until AFTER pause so word stays visible
  const advanceAfterPauseRef = useRef(false)
  const finishAfterPauseRef = useRef(false)

  const wordsSafe = useMemo(
    () => (Array.isArray(words) && words.length ? words : [""]),
    [words]
  )

  // Pause the animation entirely when the tab is hidden or reduced motion is on.
  const shouldAnimate = enabled && !reduced

  // Visibility API pause: cancels rAF in background; resumes on focus.
  useEffect(() => {
    if (!shouldAnimate) return
    const onVis = () => {
      // if hidden, cancel; if visible, kick rAF once (tick loop will continue)
      if (document.visibilityState === "hidden" && rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      } else if (document.visibilityState === "visible" && rafRef.current == null) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    document.addEventListener("visibilitychange", onVis)
    return () => document.removeEventListener("visibilitychange", onVis)
  }, [shouldAnimate])

  const tick = useCallback((now: number) => {
    if (doneRef.current || !shouldAnimate) return

    const idx = wordIndexRef.current
    const currentWord = wordsSafe[idx] || ""

    // finish or advance right when pause ends
    if (now >= pauseUntilRef.current) {
      if (finishAfterPauseRef.current) {
        doneRef.current = true
        finishAfterPauseRef.current = false
        setText((prev) => (prev === currentWord ? prev : currentWord))
        return
      }
      if (advanceAfterPauseRef.current) {
        let nextIdx = idx
        if (idx < wordsSafe.length - 1) nextIdx = idx + 1
        else if (loop) nextIdx = 0
        else {
          doneRef.current = true
          advanceAfterPauseRef.current = false
          setText((prev) => (prev === currentWord ? prev : currentWord))
          return
        }
        wordIndexRef.current = nextIdx
        charIndexRef.current = 0
        advanceAfterPauseRef.current = false
        lastRef.current = now
      }
    }

    // if still within pause window, continue waiting
    if (now < pauseUntilRef.current) {
      rafRef.current = requestAnimationFrame(tick)
      return
    }

    const deleting = deleteEffect && deletingRef.current
    const interval = deleting ? speed / 2 : speed
    if (now - lastRef.current < interval) {
      rafRef.current = requestAnimationFrame(tick)
      return
    }
    lastRef.current = now

    let nextIdx = wordIndexRef.current
    let nextChar = charIndexRef.current
    let nextDeleting = deleting

    if (!deleting && nextChar < currentWord.length) {
      nextChar++
    } else if (deleteEffect && deleting && nextChar > 0) {
      nextChar--
    } else if (!deleting && nextChar === currentWord.length) {
      // finished typing
      pauseUntilRef.current = now + pause
      if (deleteEffect) {
        nextDeleting = true
      } else {
        advanceAfterPauseRef.current = idx < wordsSafe.length - 1 || loop
        finishAfterPauseRef.current = !advanceAfterPauseRef.current
      }
    } else if (deleteEffect && deleting && nextChar === 0) {
      // finished deleting -> advance
      nextDeleting = false
      if (loop) nextIdx = (nextIdx + 1) % wordsSafe.length
      else if (nextIdx < wordsSafe.length - 1) nextIdx = nextIdx + 1
      else doneRef.current = true
    }

    wordIndexRef.current = nextIdx
    charIndexRef.current = nextChar
    deletingRef.current = nextDeleting

    const nextVisible = (wordsSafe[nextIdx] || "").slice(0, nextChar)
    setText((prev) => (prev === nextVisible ? prev : nextVisible))

    if (!doneRef.current) {
      rafRef.current = requestAnimationFrame(tick)
    }
  }, [deleteEffect, loop, pause, shouldAnimate, speed, wordsSafe])

  useEffect(() => {
    // reset whenever inputs change
    doneRef.current = false
    wordIndexRef.current = 0
    charIndexRef.current = 0
    deletingRef.current = false
    pauseUntilRef.current = 0
    lastRef.current = 0
    advanceAfterPauseRef.current = false
    finishAfterPauseRef.current = false
    setText("")

    if (!shouldAnimate) return
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [tick, shouldAnimate])

  return <span>{text}</span>
})

/* ---------------- TypeStable: hard-reserve width & height -------------- */
const TypeStable = memo(function TypeStable({
  words,
  speed,
  pause,
  loop = true,
  deleteEffect = true,
  enabled = true, // prevent measuring/Typewriter work until visible
}: {
  words: string[]
  speed?: number
  pause?: number
  loop?: boolean
  deleteEffect?: boolean
  enabled?: boolean
}) {
  const measureRef = useRef<HTMLSpanElement>(null)
  const [dims, setDims] = useState<{ w: number; h: number }>({ w: 0, h: 0 })
  const rafMeasure = useRef<number | null>(null)

  const longest = useMemo(() => {
    if (!Array.isArray(words) || words.length === 0) return ""
    let l = ""
    for (let i = 0; i < words.length; i++) if (words[i].length > l.length) l = words[i]
    return l
  }, [words])

  useEffect(() => {
    if (!enabled) return
    const el = measureRef.current
    if (!el) return

    const doMeasure = () => {
      const w = Math.ceil(el.offsetWidth)
      const h = Math.ceil(el.offsetHeight)
      setDims((prev) => (prev.w === w && prev.h === h ? prev : { w, h }))
    }

    const schedule = () => {
      if (rafMeasure.current != null) cancelAnimationFrame(rafMeasure.current)
      rafMeasure.current = requestAnimationFrame(doMeasure)
    }

    // Measure after fonts ready if available (no layout thrash)
    const ready = (document as any)?.fonts?.ready as Promise<unknown> | undefined
    if (ready) ready.then(schedule).catch(schedule)
    else schedule()

    const ro = new ResizeObserver(schedule)
    ro.observe(el)

    return () => {
      ro.disconnect()
      if (rafMeasure.current != null) cancelAnimationFrame(rafMeasure.current)
    }
  }, [longest, enabled])

  return (
    <span
      className="relative inline-block align-baseline whitespace-nowrap"
      style={{
        width: dims.w ? `${dims.w}px` : undefined,
        minWidth: dims.w ? `${dims.w}px` : undefined,
        height: dims.h ? `${dims.h}px` : undefined,
        minHeight: dims.h ? `${dims.h}px` : undefined,
      }}
    >
      {/* measuring node (invisible) */}
      <span ref={measureRef} className="invisible whitespace-pre block" aria-hidden="true">
        {longest}
      </span>

      {/* actual typewriter, mounted only when enabled */}
      <span className="absolute inset-0 block">
        {enabled ? (
          <Typewriter
            words={words}
            speed={speed}
            pause={pause}
            loop={loop}
            deleteEffect={deleteEffect}
            enabled={enabled}
          />
        ) : (
          // Keep initial paint identical in size without running any JS
          <span aria-hidden="true">{/* deferred until visible */}</span>
        )}
      </span>
    </span>
  )
})

/* ------------------------------ HeroSection ----------------------------- */
export default function HeroSection() {
  // Defer *all* work in the hero until it’s actually on screen
  const { ref: heroRef, visible: heroVisible } = useOnceVisible<HTMLElement>(0.1)

  return (
    <>
      <section
        id="hero"
        ref={heroRef}
        style={{
          marginTop: 88,
          // Big win: skip layout/paint work until hero is near viewport
          contentVisibility: "auto" as any,
          containIntrinsicSize: "1000px 600px", // reserve space to avoid layout shift
        }}
      >
        <div className="section-container">
          <section className="w-full overflow-visible flex flex-col">
            <div className="relative isolate grid place-items-center">
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-start justify-items-start">
                {/* Left image (desktop only) */}
                <div
                  className="hidden md:block pointer-events-none select-none md:justify-self-start order-2 md:order-1"
                  aria-hidden="true"
                >
                  <div className="relative mt-20 w-36 lg:w-44 xl:w-52 aspect-square">
                    <Image
                      src="/hero/girl.webp"
                      alt="girl"
                      fill
                      priority={false}
                      decoding="async"
                      loading="lazy"
                      fetchPriority="low"
                      sizes="(min-width: 1280px) 13rem, (min-width: 1024px) 11rem, (min-width: 768px) 9rem, 0px"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Center content */}
                <div className="order-1 md:order-2 justify-self-center">
                  <div className="relative z-10 text-center">
                    <p className="max-w-[720px] mx-auto mb-4 text-black text-md sm:text-xl md:text-lg/relaxed">
                      Performance Marketing
                    </p>

                    <h1 className="mx-auto text-[9.3vw] sm:text-[6vw] md:text-6xl lg:text-7xl font-normal tracking-normal md:tracking-tight leading-[1.1] sm:leading-tight text-black text-balance max-w-none">
                      <span className="block">Agency&nbsp;That's</span>
                      <span className="block">Obsessed&nbsp;About&nbsp;Your</span>
                      <span className="block text-[#ffdc38] font-semibold tracking-normal whitespace-nowrap">
                        <TypeStable
                          words={["Business Growth!", "Revenue Growth!"]}
                          speed={120}
                          pause={1500}
                          loop={true}
                          deleteEffect={false}
                          enabled={heroVisible} // ⟵ runs only when hero is visible
                        />
                      </span>
                    </h1>

                    {/* Mobile images FIRST */}
                    <div className="mt-6 md:hidden flex items-start justify-center gap-16">
                      <Image
                        src="/hero/girl.webp"
                        alt="girl"
                        width={200}
                        height={200}
                        decoding="async"
                        loading="lazy"
                        fetchPriority="low"
                        sizes="(max-width: 767px) 6rem, 0px"
                        className="w-24 sm:w-36 h-auto"
                        priority={false}
                      />
                      <Image
                        src="https://soundernarayanasamy.github.io/my-assets/hero/target.webp"
                        alt="target"
                        width={200}
                        height={200}
                        decoding="async"
                        loading="lazy"
                        fetchPriority="low"
                        sizes="(max-width: 767px) 9rem, 0px"
                        className="w-36 sm:w-36 h-auto"
                        priority={false}
                      />
                    </div>

                    {/* Button AFTER images on mobile */}
                    <div className="mt-6">
                      <a
                        href="/contactus"
                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-black text-white hover:bg-white hover:text-black border border-black shadow-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                      >
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right image (desktop only) */}
                <div
                  className="hidden md:block pointer-events-none select-none md:justify-self-end order-3"
                  aria-hidden="true"
                >
                  <Image
                    src="https://soundernarayanasamy.github.io/my-assets/hero/target.webp"
                    alt="target"
                    width={360}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    sizes="(min-width: 1280px) 18rem, (min-width: 1024px) 16rem, (min-width: 768px) 14rem, 0px"
                    className="w-56 lg:w-64 xl:w-72 h-auto"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  )
}
