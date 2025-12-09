"use client"
import React, { memo } from "react"

/* Constants are already hoisted — no runtime cost */
const WHY_TEXT =
  "Because we see your brand's growth as our own… literally and figuratively. And as you know… Ads alone don't build brands. Design alone doesn't build communities. Strategy without execution doesn't build results. So at Advart, we give your brand everything it needs to breathe and grow. From business consulting to social media presence, we do the work that makes sales!"

const ITEMS = [
  "Performance → ROI that speaks",
  "Strategy → Plans that work",
  "Social → Communities that buy",
  "Consulting → Clarity that scales",
]

const SEP = "•"

/* ---------- Marquee content (pure, memoized) ---------- */
const MarqueeContent = memo(function MarqueeContent() {
  return (
    <div className="inline-flex items-center whitespace-nowrap">
      {ITEMS.map((text, idx) => (
        <React.Fragment key={idx}>
          <span className="text-white/30 text-lg font-medium">{text}</span>
          <span className="mx-8 text-white/30 text-xl" aria-hidden="true">
            {SEP}
          </span>
        </React.Fragment>
      ))}
    </div>
  )
})

function WhyAdvartInner() {
  return (
    <div className="bg-black">
      <section
        /* ⚡️ Skip layout/paint until near viewport; reserve space to avoid CLS */
        style={{
          contentVisibility: "auto" as any,
          containIntrinsicSize: "1200px 560px",
        }}
      >
        <div className="section-container max-w-6xl text-center mb-0 pb-0">
          <h2 className="heading2 text-white">
            Why trust us with your <span className="font-semibold">brand?</span>
          </h2>
          <p className="paragraph text-white/80 max-w-3xl mx-auto leading-relaxed">
            {WHY_TEXT}
          </p>
        </div>

        {/* Seamless Marquee Container */}
        <div className="overflow-hidden section-container w-full max-w-full">
          <div
            className="marquee-container flex"
            style={{
              width: "max-content",
              animation: "marquee 30s linear infinite",
            }}
            /* isolate GPU work to this element */
            role="presentation"
          >
            {/* First instance (announced) */}
            <MarqueeContent />
            {/* Duplicates for seamless loop — hidden from AT to avoid extra work/readout */}
            <div aria-hidden="true">
              <MarqueeContent />
            </div>
            <div aria-hidden="true">
              <MarqueeContent />
            </div>
          </div>
        </div>

        <style jsx>{`
          .marquee-container {
            will-change: transform;
            backface-visibility: hidden;
            transform: translateZ(0); /* promote layer for smoothness */
            contain: content; /* isolate layout/paint for this sub-tree */
          }

          @keyframes marquee {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-33.333%, 0, 0);
            }
          }

          /* Pause on hover for better UX */
          .marquee-container:hover {
            animation-play-state: paused;
          }

          /* Respect user's motion preferences */
          @media (prefers-reduced-motion: reduce) {
            .marquee-container {
              animation: none !important;
            }
          }

          /* Speed variations for different screen sizes (visual unchanged) */
          @media (max-width: 768px) {
            .marquee-container {
              animation-duration: 20s;
            }
          }

          @media (min-width: 1200px) {
            .marquee-container {
              animation-duration: 40s;
            }
          }
        `}</style>
      </section>
    </div>
  )
}

export default memo(WhyAdvartInner)
