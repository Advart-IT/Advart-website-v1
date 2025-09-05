"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

/* ----------------------------- RotatingWords ----------------------------- */
function RotatingWords({ words, interval = 3000 }: { words: string[]; interval?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (words.length <= 1) return
    const id = window.setInterval(() => setCurrentIndex((p) => (p + 1) % words.length), interval)
    return () => window.clearInterval(id)
  }, [words, interval])

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          className="inline-block"
          initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* --------------------------- WhyAdvartSection --------------------------- */
function WhyAdvartSection() {
  const whyText =
    "Because we see your brand's growth as our own… literally and figuratively. And as you know… Ads alone don't build brands. Design alone doesn't build communities. Strategy without execution doesn't build results. So at Advart, we give your brand everything it needs to breathe and grow. From business consulting to social media presence, we do the work that makes sales!"

  const marqueeItems = useMemo(
    () => [
      "Performance → ROI that speaks",
      "Strategy → Plans that work",
      "Social → Communities that buy",
      "Consulting → Clarity that scales",
    ],
    []
  )
  const marquee = useMemo(() => [...marqueeItems, ...marqueeItems], [marqueeItems])

  return (
    <div className="bg-black text-white relative overflow-hidden p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-4xl w-full text-center relative z-10 mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-normal tracking-tight text-white pb-2 md:pb-4">
          Why trust us with your <span className="font-semibold">brand?</span>
        </h2>

        <p className="text-sm sm:text-base leading-relaxed text-gray-200 max-w-3xl mx-auto lg:text-lg">
          {whyText}
        </p>
      </div>

      <div
        className="w-full mt-8 sm:mt-10 md:mt-12 overflow-hidden relative"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, rgba(0,0,0,0))",
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, rgba(0,0,0,0))",
        }}
      >
        <div className="flex animate-marquee whitespace-nowrap will-change-transform">
          {marquee.map((item, i) => (
            <span
              key={i}
              className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg font-light mx-2 sm:mx-3 md:mx-4 lg:mx-6"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation-duration: 0.001ms;
            animation-iteration-count: 1;
          }
        }
      `}</style>
    </div>
  )
}

/* ------------------------------ HeroSection ----------------------------- */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoWrapRef = useRef<HTMLDivElement>(null)

  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setReduced(mq.matches)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  // set ready after mount (triggers the reveal transitions)
  useEffect(() => {
    if (sectionRef.current) sectionRef.current.dataset.ready = "1"
  }, [])

  // gsap scroll scale
  useEffect(() => {
    if (!videoWrapRef.current || reduced) return
    let cleanup = () => {}
    ;(async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)
      const wrap = videoWrapRef.current!
      // start smaller; gsap animates to 1
      gsap.set(wrap, { scale: 0.6 })
      const anim = gsap.to(wrap, { scale: 1, ease: "none" })
      const st = ScrollTrigger.create({
        trigger: wrap,
        start: "top 80%",
        end: "center center",
        scrub: 1,
        animation: anim,
      })
      cleanup = () => {
        st.kill()
        anim.kill()
      }
    })()
    return () => cleanup()
  }, [reduced])

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  return (
    <>
      {/* HERO SECTION */}
      <section id="hero" className="scroll-mt-[80px]" style={{ marginTop: 88 }}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8 md:pb-10">
          <section ref={sectionRef} className="w-full overflow-hidden flex flex-col">
            <div className="relative isolate grid place-items-center">
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-start justify-items-start gap-6 md:gap-8">
                <div className="hidden md:block pointer-events-none select-none md:justify-self-start order-2 md:order-1" aria-hidden="true">
                  <Image
                    src="/hero/girl.svg"
                    alt=""
                    width={360}
                    height={360}
                    loading="lazy"
                    sizes="(min-width: 768px) 14rem, 0px"
                    className="w-56 lg:w-64 xl:w-72 h-auto mt-20"
                  />
                </div>

                <div className="order-1 md:order-2 justify-self-center">
                  <div className="relative z-10 text-center">
                    <span
                      data-anim="badge"
                      className="block mx-auto text-sm sm:text-base md:text-lg text-center text-black mb-2"
                    >
                      Performance Marketing
                    </span>

                    <h1 className="mx-auto text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tighter leading-tight text-black text-balance max-w-[22ch]">
                      <span className="block md:whitespace-nowrap">
                        <span className="mask-line inline-block overflow-hidden align-top px-[0.08em] -mx-[0.08em] py-[0.18em] -my-[0.18em]">
                          <span className="mask-content inline-block will-change-transform">
                            Agency&nbsp;That's&nbsp;
                          </span>
                        </span>
                      </span>
                      <span className="block md:whitespace-nowrap">
                        <span className="mask-line inline-block overflow-hidden align-top px-[0.08em] -mx-[0.08em] py-[0.18em] -my-[0.18em]">
                          <span className="mask-content inline-block will-change-transform">
                            Obsessed&nbsp;About&nbsp;Your
                          </span>
                        </span>
                      </span>
                      <span className="block">
                        <span className="mask-line inline-block overflow-hidden align-top px-[0.08em] -mx-[0.08em] py-[0.18em] -my-[0.18em]">
                          <span className="mask-content inline-block will-change-transform text-[#ffdc38] font-semibold tracking-normal">
                            <RotatingWords words={["Business Growth!", "Revenue Growth!"]} />
                          </span>
                        </span>
                      </span>
                    </h1>

                    <p
                      data-anim="subtitle"
                      className="max-w-[720px] mx-auto mt-4 mb-6 text-black text-lg sm:text-xl md:text-lg/relaxed"
                    >
                      Scaling Business since 2019
                    </p>

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

                <div className="hidden md:block pointer-events-none select-none md:justify-self-end order-3" aria-hidden="true">
                  <Image
                    src="/hero/target-3.svg"
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

      {/* VIDEO SECTION */}
      <section id="video-scroll">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-normal tracking-tight text-black pb-2 md:pb-4 text-center">
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
              <source src="/hero/real.webm" type="video/webm" />
              <source src="/hero/real.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* WHY ADVART SECTION */}
      <section id="why-advart">
        <div className="w-full pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10">
          <WhyAdvartSection />
        </div>
      </section>

      {/* ----------------- GLOBAL STYLES ----------------- */}
      <style jsx global>{`
        /* Default (SSR / no JS): content is visible to avoid blank flash */
        .mask-line {
          clip-path: inset(-0.4em -0.28em -0.55em -0.28em);
        }
        .mask-content {
          transform: translateY(0%);
        }
        [data-anim="badge"],
        [data-anim="subtitle"] {
          opacity: 1;
          transform: none;
        }

        /* If JS is enabled (set pre-paint), start from hidden masked state */
        html[data-js="1"] .mask-line {
          clip-path: inset(100% -0.28em -0.55em -0.28em);
        }
        html[data-js="1"] .mask-content {
          transform: translateY(120%);
        }
        html[data-js="1"] [data-anim="badge"],
        html[data-js="1"] [data-anim="subtitle"] {
          opacity: 0;
          transform: translateY(8px);
        }

        /* After mount, reveal with transitions (mask slides open, text slides up) */
        [data-ready="1"] .mask-line {
          clip-path: inset(-0.4em -0.28em -0.55em -0.28em);
          transition: clip-path 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        [data-ready="1"] .mask-content {
          transform: translateY(0%);
          transition: transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        [data-ready="1"] [data-anim="badge"] {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.4s ease-out;
        }
        [data-ready="1"] [data-anim="subtitle"] {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.4s ease-out 0.15s;
        }

        @media (prefers-reduced-motion: reduce) {
          [data-ready="1"] .mask-line,
          [data-ready="1"] .mask-content,
          [data-ready="1"] [data-anim="badge"],
          [data-ready="1"] [data-anim="subtitle"] {
            transition-duration: 0.001ms !important;
            transition-delay: 0s !important;
          }
        }
      `}</style>
    </>
  )
}
