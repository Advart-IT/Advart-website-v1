"use client"

import React, { memo } from "react"

/* ---------- constants outside render (no per-render allocations) ---------- */
const WHY_TEXT =
  "Because we see your brand's growth as our own… literally and figuratively. And as you know… Ads alone don't build brands. Design alone doesn't build communities. Strategy without execution doesn't build results. So at Advart, we give your brand everything it needs to breathe and grow. From business consulting to social media presence, we do the work that makes sales!"

const MARQUEE_ITEMS = [
  "Performance → ROI that speaks",
  "Strategy → Plans that work",
  "Social → Communities that buy",
  "Consulting → Clarity that scales",
]

// duplicate once for seamless loop (CSS anim shifts -50%)
const MARQUEE = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

/* -------------------------------- component -------------------------------- */
function WhyAdvartInner() {
  return (
    <section id="why-advart" className="section bg-black w-full text-white">
      <div
        className="section-container text-center relative z-10"
        // micro-optimization: keep offscreen work minimal when not visible
        // (supported in modern browsers; ignored where unsupported)
        style={{ contentVisibility: "auto", containIntrinsicSize: "600px" }}
      >
        <h2 className="heading2 text-white">
          Why trust us with your <span className="font-semibold">brand?</span>
        </h2>

        <p className="paragraph text-white/80 max-w-3xl mx-auto">{WHY_TEXT}</p>

        <div className="w-full mt-6 sm:mt-8 md:mt-10 overflow-hidden relative mask-fade">
          <div
            className="flex animate-marquee whitespace-nowrap will-change-transform transform-gpu"
            aria-hidden="true"
          >
            {MARQUEE.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="paragraph text-white/70 mx-2 sm:mx-3 md:mx-4 lg:mx-6"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* mask moved to CSS to avoid inline style re-parsing each render */
        .mask-fade {
          -webkit-mask-image: linear-gradient(
            to right,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 1) 8%,
            rgba(0, 0, 0, 1) 92%,
            rgba(0, 0, 0, 0)
          );
          mask-image: linear-gradient(
            to right,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 1) 8%,
            rgba(0, 0, 0, 1) 92%,
            rgba(0, 0, 0, 0)
          );
        }

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

        /* Prefer less motion: halt the animation cleanly (no layout jump) */
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
            transform: none;
          }
        }
      `}</style>
    </section>
  )
}

/* memo to avoid re-renders unless props change (none here) */
const WhyAdvart = memo(WhyAdvartInner)
export default WhyAdvart
