"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"

/* ----------------------------- Typewriter ----------------------------- */
function Typewriter({
  words,
  speed = 120,
  pause = 1500,
  loop = true,
  deleteEffect = true,
}: {
  words: string[]
  speed?: number
  pause?: number
  loop?: boolean
  deleteEffect?: boolean
}) {
  const [text, setText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    let timeout: NodeJS.Timeout

    if (!deleting && charIndex < currentWord.length) {
      timeout = setTimeout(() => {
        setText((prev) => prev + currentWord[charIndex])
        setCharIndex(charIndex + 1)
      }, speed)
    } else if (deleteEffect && deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setText((prev) => prev.slice(0, -1))
        setCharIndex(charIndex - 1)
      }, speed / 2)
    } else if (!deleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => {
        if (deleteEffect) {
          setDeleting(true)
        } else {
          if (wordIndex < words.length - 1) {
            setWordIndex((prev) => prev + 1)
            setText("")
            setCharIndex(0)
          } else if (loop) {
            setWordIndex(0)
            setText("")
            setCharIndex(0)
          }
        }
      }, pause)
    } else if (deleteEffect && deleting && charIndex === 0) {
      setDeleting(false)
      if (loop) {
        setWordIndex((prev) => (prev + 1) % words.length)
      } else if (wordIndex < words.length - 1) {
        setWordIndex((prev) => prev + 1)
      }
    }

    return () => clearTimeout(timeout)
  }, [charIndex, deleting, wordIndex, words, speed, pause, loop, deleteEffect])

  return <span>{text}</span>
}

/* ---------------- TypeStable: hard-reserve width & height -------------- */
function TypeStable({
  words,
  speed,
  pause,
  loop = true,
  deleteEffect = true,
}: {
  words: string[]
  speed?: number
  pause?: number
  loop?: boolean
  deleteEffect?: boolean
}) {
  const measureRef = useRef<HTMLSpanElement>(null)
  const [dims, setDims] = useState<{ w: number; h: number }>({ w: 0, h: 0 })

  const longest = useMemo(
    () => words.reduce((a, b) => (b.length > a.length ? b : a), ""),
    [words]
  )

  useEffect(() => {
    const el = measureRef.current
    if (!el) return
    const compute = () => {
      const w = Math.ceil(el.offsetWidth)
      const h = Math.ceil(el.offsetHeight)
      if (w && h) setDims({ w, h })
    }

    compute()
    const onResize = () => compute()
    window.addEventListener("resize", onResize)

    if (document?.fonts && document.fonts.ready) {
      document.fonts.ready.then(compute).catch(() => {})
    }

    const ro = new ResizeObserver(() => compute())
    ro.observe(el)

    return () => {
      window.removeEventListener("resize", onResize)
      ro.disconnect()
    }
  }, [longest])

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
      <span ref={measureRef} className="invisible whitespace-pre block" aria-hidden="true">
        {longest}
      </span>

      <span className="absolute inset-0 block">
        <Typewriter
          words={words}
          speed={speed}
          pause={pause}
          loop={loop}
          deleteEffect={deleteEffect}
        />
      </span>
    </span>
  )
}

/* ------------------------------ HeroSection ----------------------------- */
export default function HeroSection() {
  return (
    <>
      <section id="hero" className="scroll-mt-[80px]" style={{ marginTop: 88 }}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8 md:pb-10">
          <section className="w-full overflow-visible flex flex-col">
            <div className="relative isolate grid place-items-center">
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-start justify-items-start gap-6 md:gap-8">
                {/* Left image (desktop only) */}
                <div
                  className="hidden md:block pointer-events-none select-none md:justify-self-start order-2 md:order-1"
                  aria-hidden="true"
                >
                  <Image
                    src="/hero/girl.webp"
                    alt=""
                    width={360}
                    height={360}
                    loading="lazy"
                    sizes="(min-width: 768px) 14rem, 0px"
                    className="w-56 lg:w-64 xl:w-72 h-auto mt-20"
                  />
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
                        />
                      </span>
                    </h1>

                    <div className="mt-6">
                      <a
                        href="/contactus"
                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-black text-white hover:bg-white hover:text-black border border-black shadow-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                      >
                        Contact Us
                      </a>
                    </div>

                    {/* Mobile-only image */}
                    <div className="block md:hidden">
                      <Image
                        src="/hero/team-2.webp"
                        alt="Mobile only visual"
                        width={400}
                        height={300}
                        className="mx-auto w-68 sm:w-72 h-auto"
                      />
                    </div>
                  </div>
                </div>

                {/* Right image (desktop only) */}
                <div
                  className="hidden md:block pointer-events-none select-none md:justify-self-end order-3"
                  aria-hidden="true"
                >
                  <Image
                    src="/hero/target.webp"
                    alt=""
                    width={360}
                    height={360}
                    loading="lazy"
                    sizes="(min-width: 768px) 14rem, 0px"
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
