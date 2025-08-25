"use client";

import type React from "react";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ${className}`}>
      {children}
    </div>
  );
}

function RotatingWords({ words, interval = 3000 }: { words: string[]; interval?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <div className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          className="inline-block"
          initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
            filter: { duration: 0.3 },
          }}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(sectionRef.current, { autoAlpha: 1 });
      gsap.set([leftImageRef.current, rightImageRef.current], { opacity: 0 });
      gsap.set(leftImageRef.current, { x: -40 });
      gsap.set(rightImageRef.current, { x: 40 });
      gsap.set(badgeRef.current, { opacity: 0, y: -10 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 10 });

      const lines = gsap.utils.toArray<HTMLElement>(".mask-line");
      const contents = lines
        .map((l) => l.querySelector<HTMLElement>(".mask-content"))
        .filter(Boolean) as HTMLElement[];

      const H_PAD = 0.28;
      const TOP_PAD = 0.4;
      const BOTTOM_PAD = 0.55;

      gsap.set(lines, { clipPath: `inset(100% -${H_PAD}em -${BOTTOM_PAD}em -${H_PAD}em)` });
      gsap.set(contents, { yPercent: 120 });

      const tl = gsap.timeline();
      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
        .to(
          lines,
          {
            clipPath: `inset(-${TOP_PAD}em -${H_PAD}em -${BOTTOM_PAD}em -${H_PAD}em)`,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
          },
          "-=0.05"
        )
        .to(contents, { yPercent: 0, duration: 0.8, ease: "power3.out", stagger: 0.15 }, "<")
        .to(leftImageRef.current, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, "-=0.35")
        .to(rightImageRef.current, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, "-=0.45")
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.25");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!videoWrapRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set(videoWrapRef.current, { scale: 0.6 });
      ScrollTrigger.create({
        trigger: videoWrapRef.current,
        start: "top 80%",
        end: "center center",
        scrub: 1,
        animation: gsap.to(videoWrapRef.current, { scale: 1, ease: "none" }),
      });
    }, videoWrapRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#F6F7F9] flex flex-col pt-20 pb-0 sm:pt-12 sm:pb-0 md:pt-16 md:pb-0 lg:pt-20 lg:pb-0 xl:pt-24 xl:pb-0"
      style={{ visibility: "hidden" }}
    >
      <div className="relative isolate grid place-items-center">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center justify-items-center gap-6 md:gap-8">
            {/* Left image */}
            <div
              ref={leftImageRef}
              className="hidden md:block pointer-events-none select-none md:justify-self-start order-2 md:order-1"
              aria-hidden="true"
            >
              <Image
                src="/hero/boat.png"
                alt=""
                width={360}
                height={360}
                loading="lazy"
                sizes="(min-width: 768px) 14rem, 0px"
                className="w-56 lg:w-64 xl:w-72 h-auto"
                decoding="async"
              />
            </div>

            {/* Centered text */}
            <div className="order-1 md:order-2 justify-self-center">
              <div className="relative z-10 text-center">
                <div
                  ref={badgeRef}
                  className="inline-block rounded-full bg-black/90 px-3 py-1 text-sm font-medium text-white mb-3 -rotate-6"
                >
                  Tech first
                </div>

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
                      <span className="mask-content inline-block">
                        <RotatingWords words={["Business Growth!", "Revenue Growth!"]} />
                      </span>
                    </span>
                  </span>
                </h1>

                <p
                  ref={subtitleRef}
                  className="max-w-[720px] mx-auto mt-4 mb-6 sm:mb-0 text-black text-lg sm:text-xl md:text-lg/relaxed"
                >
                  Building Brands Meaningfully...
                </p>
              </div>
            </div>

            {/* Right image */}
            <div
              ref={rightImageRef}
              className="hidden md:block pointer-events-none select-none md:justify-self-end order-3"
              aria-hidden="true"
            >
              <Image
                src="/hero/target-1.png"
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
        </Container>
      </div>

      {/* Video */}
      <Container className="mt-0">
        <div
          ref={videoWrapRef}
          className="w-full h-[42vh] sm:h-[56vh] md:h-[70vh] lg:h-[78vh] overflow-hidden bg-black rounded-3xl will-change-transform transform-gpu"
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
      </Container>
    </section>
  );
}
