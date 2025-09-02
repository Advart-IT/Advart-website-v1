// "use client"

// import type React from "react"
// import Image from "next/image"
// import { useEffect, useLayoutEffect, useRef, useState } from "react"
// import { gsap } from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import { motion, AnimatePresence } from "framer-motion"

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger)
// }

// function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
//   return (
//     <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ${className}`}>{children}</div>
//   )
// }

// function RotatingWords({ words, interval = 3000 }: { words: string[]; interval?: number }) {
//   const [currentIndex, setCurrentIndex] = useState(0)

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % words.length)
//     }, interval)
//     return () => clearInterval(timer)
//   }, [words.length, interval])

//   return (
//     <div className="relative inline-block">
//       <AnimatePresence mode="wait">
//         <motion.span
//           key={currentIndex}
//           className="inline-block"
//           initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
//           animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
//           exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
//           transition={{
//             duration: 0.4,
//             ease: [0.25, 0.46, 0.45, 0.94],
//             filter: { duration: 0.3 },
//           }}
//         >
//           {words[currentIndex]}
//         </motion.span>
//       </AnimatePresence>
//     </div>
//   )
// }

// function WhyAdvartSection() {
//   const whyText = `Because we see your brand's growth as our own… literally and figuratively.
// And as you know… Ads alone don't build brands. Design alone doesn't build communities. Strategy without execution doesn't build results. So at Advart, we give your brand everything it needs to breathe and grow. From business consulting to social media presence, we do the work that makes sales work!`;

//   const marqueeItems = [
//     "Performance → ROI that speaks",
//     "Strategy → Plans that work", 
//     "Social → Communities that buy",
//     "Consulting → Clarity that scales"
//   ];

//   return (
//     <section className="flex flex-col items-center justify-center bg-black text-white relative overflow-hidden py-16 sm:py-12 md:py-16 lg:pt-20 xl:py-24 px-6">
      
//       {/* ✅ Heading + Text FIRST */}
//       <div className="max-w-3xl w-full text-center relative z-10">
//         <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-4 leading-tight">
//           Why trust us with your <span className="font-semibold">brand?</span>
//         </h2>
//         <p className="text-base text-gray-200 leading-relaxed font-light whitespace-pre-line">
//           {whyText}
//         </p>
//       </div>

//       {/* ✅ Marquee AFTER */}
//       <div className="w-full mt-12 overflow-hidden">
//         <div className="flex animate-marquee whitespace-nowrap">
//           {/* First set */}
//           <div className="flex items-center">
//             {marqueeItems.map((item, index) => (
//               <span
//                 key={index}
//                 className="text-gray-400 text-lg sm:text-xl md:text-2xl font-light mx-8 md:mx-12"
//               >
//                 {item}
//               </span>
//             ))}
//           </div>
//           {/* Duplicate set for seamless loop */}
//           <div className="flex items-center">
//             {marqueeItems.map((item, index) => (
//               <span
//                 key={`dup-${index}`}
//                 className="text-gray-400 text-lg sm:text-xl md:text-2xl font-light mx-8 md:mx-12"
//               >
//                 {item}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes marquee {
//           0% {
//             transform: translateX(0%);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }
//         .animate-marquee {
//           animation: marquee 25s linear infinite;
//         }
//       `}</style>
//     </section>
//   );
// }




// export default function HeroSection() {
//   const sectionRef = useRef<HTMLElement>(null)
//   const videoRef = useRef<HTMLVideoElement>(null)
//   const videoWrapRef = useRef<HTMLDivElement>(null)
//   const leftImageRef = useRef<HTMLDivElement>(null)
//   const rightImageRef = useRef<HTMLDivElement>(null)
//   const badgeRef = useRef<HTMLDivElement>(null)
//   const subtitleRef = useRef<HTMLParagraphElement>(null)

//   const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

//   useEffect(() => {
//     const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
//     setPrefersReducedMotion(mq.matches)
//     const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
//     mq.addEventListener("change", onChange)
//     return () => mq.removeEventListener("change", onChange)
//   }, [])

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.set(sectionRef.current, { autoAlpha: 1 })
//       gsap.set([leftImageRef.current, rightImageRef.current], { opacity: 0 })
//       gsap.set(leftImageRef.current, { x: -40 })
//       gsap.set(rightImageRef.current, { x: 40 })
//       gsap.set(badgeRef.current, { opacity: 0, y: -10 })
//       gsap.set(subtitleRef.current, { opacity: 0, y: 10 })

//       const lines = gsap.utils.toArray<HTMLElement>(".mask-line")
//       const contents = lines.map((l) => l.querySelector<HTMLElement>(".mask-content")).filter(Boolean) as HTMLElement[]

//       const H_PAD = 0.28
//       const TOP_PAD = 0.4
//       const BOTTOM_PAD = 0.55

//       gsap.set(lines, { clipPath: `inset(100% -${H_PAD}em -${BOTTOM_PAD}em -${H_PAD}em)` })
//       gsap.set(contents, { yPercent: 120 })

//       const tl = gsap.timeline()
//       tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
//         .to(
//           lines,
//           {
//             clipPath: `inset(-${TOP_PAD}em -${H_PAD}em -${BOTTOM_PAD}em -${H_PAD}em)`,
//             duration: 0.8,
//             ease: "power3.out",
//             stagger: 0.15,
//           },
//           "-=0.05",
//         )
//         .to(contents, { yPercent: 0, duration: 0.8, ease: "power3.out", stagger: 0.15 }, "<")
//         .to(leftImageRef.current, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, "-=0.35")
//         .to(rightImageRef.current, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, "-=0.45")
//         .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.25")
//     }, sectionRef)

//     return () => ctx.revert()
//   }, [])

//   useLayoutEffect(() => {
//     if (!videoWrapRef.current || prefersReducedMotion) return

//     const ctx = gsap.context(() => {
//       gsap.set(videoWrapRef.current, { scale: 0.6 })
//       ScrollTrigger.create({
//         trigger: videoWrapRef.current,
//         start: "top 80%",
//         end: "center center",
//         scrub: 1,
//         animation: gsap.to(videoWrapRef.current, { scale: 1, ease: "none" }),
//       })
//     }, videoWrapRef)

//     return () => ctx.revert()
//   }, [prefersReducedMotion])

//   useEffect(() => {
//     videoRef.current?.play().catch(() => {})
//   }, [])

//   return (
//     <>
//       <section
//         ref={sectionRef}
//         className="w-full overflow-hidden bg-[#F6F7F9] flex flex-col pt-20 pb-0 sm:pt-12 sm:pb-0 md:pt-16 md:pb-0 lg:pt-20 lg:pb-0 xl:pt-24 xl:pb-0"
//         style={{ visibility: "hidden" }}
//       >
//         <div className="relative isolate grid place-items-center">
//           <Container>
//             <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center justify-items-center gap-6 md:gap-8">
//               {/* Left image */}
//               <div
//                 ref={leftImageRef}
//                 className="hidden md:block pointer-events-none select-none md:justify-self-start order-2 md:order-1"
//                 aria-hidden="true"
//               >
//                 <Image
//                   src="/hero/papergirl.png"
//                   alt=""
//                   width={360}
//                   height={360}
//                   loading="lazy"
//                   sizes="(min-width: 768px) 14rem, 0px"
//                   className="w-56 lg:w-64 xl:w-72 h-auto"
//                   decoding="async"
//                 />
//               </div>

//               {/* Centered text */}
//               <div className="order-1 md:order-2 justify-self-center">
//                 <div className="relative z-10 text-center">
//                   {/* <div
//                     ref={badgeRef}
//                     className="inline-block rounded-full bg-black/90 px-3 py-1 text-sm font-medium text-white mb-3 -rotate-6"
//                   >
//                     Tech first
//                   </div> */}

//                   <h1 className="mx-auto text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tighter leading-tight text-black text-balance max-w-[22ch]">
//                     <span className="block md:whitespace-nowrap">
//                       <span className="mask-line inline-block overflow-hidden align-top px-[0.08em] -mx-[0.08em] py-[0.18em] -my-[0.18em]">
//                         <span className="mask-content inline-block">Agency&nbsp;That's&nbsp;</span>
//                       </span>
//                     </span>
//                     <span className="block md:whitespace-nowrap">
//                       <span className="mask-line inline-block overflow-hidden align-top px-[0.08em] -mx-[0.08em] py-[0.18em] -my-[0.18em]">
//                         <span className="mask-content inline-block">Obsessed&nbsp;About&nbsp;Your</span>
//                       </span>
//                     </span>
//                     <span className="block">
//                       <span className="mask-line inline-block overflow-hidden align-top px-[0.08em] -mx-[0.08em] py-[0.18em] -my-[0.18em]">
//                         <span className="mask-content inline-block">
//                           <RotatingWords words={["Business Growth!", "Revenue Growth!"]} />
//                         </span>
//                       </span>
//                     </span>
//                   </h1>

//                   <p
//                     ref={subtitleRef}
//                     className="max-w-[720px] mx-auto mt-4 mb-8 text-black text-lg sm:text-xl md:text-lg/relaxed"
//                   >
//                     Building Brands Meaningfully...
//                   </p>

//                   <div className="mt-8 mb-12">
//                     <a
//                       href="/contactus"
//                       className="inline-block rounded-full bg-black px-4 py-2 text-base sm:text-lg font-medium text-white 
//                                  hover:bg-white hover:text-black border-2 border-black transition-all duration-300 ease-in-out
//                                   focus:outline-none focus:ring-4 focus:ring-black/20 disabled:opacity-50
//                                  shadow-lg hover:shadow-xl"
//                     >
//                       Contact Us
//                     </a>
//                   </div>
//                 </div>
//               </div>

//               {/* Right image */}
//               <div
//                 ref={rightImageRef}
//                 className="hidden md:block pointer-events-none select-none md:justify-self-end order-3"
//                 aria-hidden="true"
//               >
//                 <Image
//                   src="/hero/targetboard.png"
//                   alt=""
//                   width={360}
//                   height={360}
//                   loading="lazy"
//                   sizes="(min-width: 768px) 14rem, 0px"
//                   className="w-56 lg:w-64 xl:w-72 h-auto"
//                   decoding="async"
//                 />
//               </div>
//             </div>
//           </Container>
//         </div>

//         {/* Video */}
//         <Container className="mt-8">
//           <div
//             ref={videoWrapRef}
//             className="w-full h-[42vh] sm:h-[56vh] md:h-[70vh] lg:h-[78vh] overflow-hidden bg-black rounded-3xl will-change-transform transform-gpu"
//           >
//             <video
//               ref={videoRef}
//               className="w-full h-full object-cover"
//               loop
//               muted
//               playsInline
//               autoPlay
//               preload="metadata"
//               poster="/hero/real-poster.jpg"
//             >
//               <source src="/hero/real.webm" type="video/webm" />
//               <source src="/hero/real.mp4" type="video/mp4" />
//             </video>
//           </div>
//         </Container>
//       </section>

//       {/* Gap between video and WhyAdvart section */}
//       <div className="bg-[#F6F7F9] h-12 sm:h-16 md:h-20 lg:h-24"></div>

//       {/* WhyAdvart Section integrated directly into Hero */}
//       <WhyAdvartSection />
//     </>
//   )
// }
"use client"

import type React from "react"
import Image from "next/image"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

function RotatingWords({ words, interval = 3000 }: { words: string[]; interval?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setCurrentIndex((p) => (p + 1) % words.length), interval)
    return () => clearInterval(t)
  }, [words.length, interval])
  return (
    <div className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          className="inline-block"
          initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], filter: { duration: 0.3 } }}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

function WhyAdvartSection() {
  const whyText =
    "Because we see your brand's growth as our own… literally and figuratively. And as you know… Ads alone don't build brands. Design alone doesn't build communities. Strategy without execution doesn't build results. So at Advart, we give your brand everything it needs to breathe and grow. From business consulting to social media presence, we do the work that makes sales!"

  const marqueeItems = [
    "Performance → ROI that speaks",
    "Strategy → Plans that work",
    "Social → Communities that buy",
    "Consulting → Clarity that scales",
  ]

  return (
    <div className="bg-black text-white relative overflow-hidden p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-4xl w-full text-center relative z-10 mx-auto">
        {/* Heading with Heading style applied inline */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-white pb-2 md:pb-4">
          Why trust us with your <span className="font-bold">brand?</span>
        </h2>

        {/* Paragraph with Paragraph style inline */}
        <p className="text-sm sm:text-base leading-relaxed text-gray-200 max-w-3xl mx-auto lg:text-lg">
          {whyText}
        </p>
      </div>

      {/* Marquee */}
      <div className="w-full mt-8 sm:mt-10 md:mt-12 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg font-light mx-4 sm:mx-6 md:mx-8 lg:mx-12"
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
      `}</style>
    </div>
  )
}


export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoWrapRef = useRef<HTMLDivElement>(null)
  const leftImageRef = useRef<HTMLDivElement>(null)
  const rightImageRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [headerH, setHeaderH] = useState(0)

  // Measure fixed header height and keep it updated
  useEffect(() => {
    const header = document.querySelector("header")
    if (!header) return
    const setH = () => setHeaderH(Math.ceil(header.getBoundingClientRect().height))
    setH()
    const ro = new ResizeObserver(setH)
    ro.observe(header)
    const onResize = () => setH()
    window.addEventListener("resize", onResize)
    window.addEventListener("orientationchange", onResize)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", onResize)
      window.removeEventListener("orientationchange", onResize)
    }
  }, [])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(sectionRef.current, { autoAlpha: 1 })
      gsap.set([leftImageRef.current, rightImageRef.current], { opacity: 0 })
      gsap.set(leftImageRef.current, { x: -40 })
      gsap.set(rightImageRef.current, { x: 40 })
      gsap.set(badgeRef.current, { opacity: 0, y: -10 })
      gsap.set(subtitleRef.current, { opacity: 0, y: 10 })

      const lines = gsap.utils.toArray<HTMLElement>(".mask-line")
      const contents = lines.map((l) => l.querySelector<HTMLElement>(".mask-content")).filter(Boolean) as HTMLElement[]

      const H_PAD = 0.28
      const TOP_PAD = 0.4
      const BOTTOM_PAD = 0.55

      gsap.set(lines, { clipPath: `inset(100% -${H_PAD}em -${BOTTOM_PAD}em -${H_PAD}em)` })
      gsap.set(contents, { yPercent: 120 })

      const tl = gsap.timeline()
      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
        .to(
          lines,
          {
            clipPath: `inset(-${TOP_PAD}em -${H_PAD}em -${BOTTOM_PAD}em -${H_PAD}em)`,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
          },
          "-=0.05",
        )
        .to(contents, { yPercent: 0, duration: 0.8, ease: "power3.out", stagger: 0.15 }, "<")
        .to(leftImageRef.current, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, "-=0.35")
        .to(rightImageRef.current, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, "-=0.45")
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.25")
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    if (!videoWrapRef.current || prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.set(videoWrapRef.current, { scale: 0.6 })
      ScrollTrigger.create({
        trigger: videoWrapRef.current,
        start: "top 80%",
        end: "center center",
        scrub: 1,
        animation: gsap.to(videoWrapRef.current, { scale: 1, ease: "none" }),
      })
    }, videoWrapRef)
    return () => ctx.revert()
  }, [prefersReducedMotion])

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  return (
    <>
      {/* HERO SECTION */}
      {/* marginTop equals the measured header height + a small breathing gap */}
      <section
        id="hero"
        style={{
          marginTop: headerH ? headerH + 8 : 72, // fallback 72px if header not yet measured
          scrollMarginTop: headerH || 72,
        }}
      >
        <div className="w-full max-w-7xl mx-auto
                        px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16
                        pt-8 sm:pt-10 md:pt-12
                        pb-6 sm:pb-8 md:pb-10">
          <section
            ref={sectionRef}
            className="w-full overflow-hidden flex flex-col pt-0 pb-0"
            style={{ visibility: "hidden" }}
          >
            <div className="relative isolate grid place-items-center">
              <div>
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-start justify-items-start gap-6 md:gap-8">
                  {/* Left image */}
                  <div
                    ref={leftImageRef}
                    className="hidden md:block pointer-events-none select-none md:justify-self-start order-2 md:order-1"
                    aria-hidden="true"
                  >
                    <Image
                      src="/hero/papergirl.png"
                      alt=""
                      width={360}
                      height={360}
                      loading="lazy"
                      sizes="(min-width: 768px) 14rem, 0px"
                      className="w-56 lg:w-64 xl:w-72 h-auto mt-20"
                      decoding="async"
                    />
                  </div>

                  {/* Center text */}
                  <div className="order-1 md:order-2 justify-self-center">
                    <div className="relative z-10 text-center">
                      <span className="block mx-auto text-sm sm:text-base md:text-lg text-center text-black mb-2">
                        Performance Marketing
                      </span>

                      <h1 className="mx-auto text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tighter leading-tight text-black text-balance max-w-[22ch]">
                        <span className="block md:whitespace-nowrap">
                          <span className="mask-line inline-block overflow-hidden align-top px-[0.08em] -mx-[0.08em] py-[0.18em] -my-[0.18em]">
                            <span className="mask-content inline-block">Agency&nbsp;That's&nbsp;</span>
                          </span>
                        </span>
                        <span className="block md:whitespace-nowrap">
                          <span className="mask-line inline-block overflow-hidden align-top px-[0.08em] -mx-[0.08em] py-[0.18em] -my-[0.18em]">
                            <span className="mask-content inline-block">Obsessed&nbsp;About&nbsp;Your</span>
                          </span>
                        </span>
                        <span className="block">
                          <span className="mask-line inline-block overflow-hidden align-top px-[0.08em] -mx-[0.08em] py-[0.18em] -my-[0.18em]">
                            <span className="mask-content inline-block text-[#ffdc38] font-semibold tracking-normal">
                              <RotatingWords words={["Business Growth!", "Revenue Growth!"]} />
                            </span>
                          </span>
                        </span>
                      </h1>

                      <p
                        ref={subtitleRef}
                        className="max-w-[720px] mx-auto mt-4 mb-6 text-black text-lg sm:text-xl md:text-lg/relaxed"
                      >
                        Scaling Business since 2019
                      </p>

                      <div className="mt-6">
                        <a
                          href="/contactus"
                          className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-black text-white hover:bg-white hover:text-black border border-black shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                        >
                          Contact Us
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right image */}
                  <div
                    ref={rightImageRef}
                    className="hidden md:block pointer-events-none select-none md:justify-self-end order-3"
                    aria-hidden="true"
                  >
                    <Image
                      src="/hero/targetboard3.png"
                      alt=""
                      width={360}
                      height={360}
                      loading="lazy"
                      sizes="(min-width: 768px) 14rem, 0px"
                      className="w-56 lg:w-64 xl:w-72 h-auto"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section id="video-scroll">
        <div className="w-full max-w-7xl mx-auto
                        px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16
                        pt-6 sm:pt-8 md:pt-10
                        pb-6 sm:pb-8 md:pb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-black pb-2 md:pb-4 text-center">
  Building Brands <span className="font-bold">Meaningfully</span>
</h2>


          <div
            ref={videoWrapRef}
            className="w-full h-[42vh] sm:h-[56vh] md:h-[70vh] lg:h-[78vh] overflow-hidden bg-black rounded-2xl will-change-transform transform-gpu"
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
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
    </>
  )
}
