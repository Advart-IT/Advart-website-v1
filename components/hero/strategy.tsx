"use client";

import { useEffect, useRef } from "react";

function useReducedMotion() {
  const ref = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => (ref.current = mq.matches);
    set();
    if ("addEventListener" in mq) {
      mq.addEventListener("change", set);
      return () => mq.removeEventListener("change", set);
    } else {
      // @ts-ignore legacy Safari
      mq.addListener(set);
      return () => {
        // @ts-ignore
        mq.removeListener(set);
      };
    }
  }, []);
  return ref;
}

const Strategy = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const reducedRef = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    // Defer all work until section is near viewport
    let io: IntersectionObserver | null = null;
    let cleanupScroll: (() => void) | null = null;

    const onEnter = () => {
      // Already active — avoid double init
      if (cleanupScroll) return;

      // Cache word nodes once
      const words = Array.from(
        text.querySelectorAll<HTMLSpanElement>(".reveal-word")
      );
      const total = words.length;

      // If user prefers reduced motion: set final state and bail
      if (reducedRef.current) {
        for (let i = 0; i < total; i++) {
          words[i].style.opacity = "1";
          const gray = 255; // final grey
          words[i].style.color = `rgb(${gray}, ${gray}, ${gray})`;
        }
        return;
      }

      let ticking = false;
      let vh = window.innerHeight;
      let isMobile = window.matchMedia("(max-width: 767px)").matches;

      const computeProgress = () => {
        const rect = section.getBoundingClientRect();
        const startReveal = vh * (isMobile ? 1.2 : 1.1);
        const endReveal = vh * (isMobile ? 0.7 : 0.65);
        const elementTop = rect.top;
        const elementHeight = rect.height;

        let progress = 0;
        if (elementTop < startReveal && elementTop > endReveal - elementHeight) {
          progress = Math.min(
            1,
            Math.max(
              0,
              (startReveal - elementTop) /
                (startReveal - endReveal + elementHeight)
            )
          );
        } else if (elementTop <= endReveal - elementHeight) {
          progress = 1;
        }

        // Single loop write — avoids extra layout thrash
        const scaled = progress * (total + 4);
        for (let i = 0; i < total; i++) {
          const wp = Math.max(0, Math.min(1, scaled - i));
          const opacity = 0.3 + 0.7 * wp; // from 0.3 -> 1
          const gray = Math.floor(100 + 155 * wp); // from 100 -> 255
          const w = words[i];
          // Write only if changed enough to matter to avoid paint storms
          if (w.dataset._o !== opacity.toFixed(3)) {
            w.style.opacity = opacity.toString();
            w.dataset._o = opacity.toFixed(3);
          }
          const c = `rgb(${gray}, ${gray}, ${gray})`;
          if (w.dataset._c !== c) {
            w.style.color = c;
            w.dataset._c = c;
          }
        }
      };

      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          computeProgress();
          ticking = false;
        });
      };

      // Resize handling: recompute vh & breakpoint only when necessary
      const mm = window.matchMedia("(max-width: 767px)");
      const onMM = () => {
        isMobile = mm.matches;
        vh = window.innerHeight;
        // recompute immediately to avoid laggy state
        computeProgress();
      };

      const onResize = () => {
        vh = window.innerHeight;
        // schedule via rAF to coalesce with scroll
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(() => {
            computeProgress();
            ticking = false;
          });
        }
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });
      if ("addEventListener" in mm) {
        mm.addEventListener("change", onMM);
      } else {
        // @ts-ignore legacy Safari
        mm.addListener(onMM);
      }

      // Initial compute
      computeProgress();

      cleanupScroll = () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        if ("removeEventListener" in mm) {
          mm.removeEventListener("change", onMM);
        } else {
          // @ts-ignore
          mm.removeListener(onMM);
        }
      };
    };

    // Observe when the section is within 1 viewport (~start work early but not too early)
    io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e?.isIntersecting) {
          onEnter();
          // Once initialized, we can stop observing
          io && io.disconnect();
          io = null;
        }
      },
      { root: null, threshold: 0.01, rootMargin: "100% 0px 0% 0px" }
    );
    io.observe(section);

    return () => {
      io && io.disconnect();
      cleanupScroll && cleanupScroll();
    };
  }, [reducedRef]);

  const strategyText =
    "Data is at the heart of everything we do, powered by creative fuel that sparks the impact you crave for your brand's growth. We deliver it through systems built to scale by partnering with you every step of the way.";
  const words = strategyText.split(" ");

  return (
    <section
      id="strategy"
      ref={sectionRef}
      className="section"
      style={{
        // ⚡️ Massive win: browser skips layout/paint until near viewport
        contentVisibility: "auto" as any,
        containIntrinsicSize: "1200px 420px", // reserves space; tweak to your typical size
      }}
    >
      <div className="w-full">
        <div className="relative overflow-hidden bg-black text-white">
          <div className="section-container max-w-6xl text-center relative z-10 py-12 sm:py-14 md:py-16 px-6">
            <div ref={textRef} className="max-w-3xl mx-auto">
              <h2 className="heading2 text-gray-200 m-0">
                {words.map((word, index) => (
                  <span
                    key={index}
                    className="reveal-word inline-block mr-1 mb-1 transition-all duration-300 ease-out opacity-30 text-[rgb(100,100,100)]"
                  >
                    {word}
                  </span>
                ))}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Strategy;
