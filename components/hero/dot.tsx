"use client"

import React, { forwardRef, useRef, useState } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { useRouter } from "next/navigation"

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}

type Tab = {
  title: string
  value: string
  content: React.ReactNode
}

/* Tabs with sliding pill + direction-aware content animation */
function Tabs({
  tabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[]
  containerClassName?: string
  activeTabClassName?: string
  tabClassName?: string
  contentClassName?: string
}) {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = tabs[activeIdx]

  // track direction for nicer content transitions
  const prevIdxRef = useRef(0)
  const [direction, setDirection] = useState<number>(1)
  function switchTo(idx: number) {
    setDirection(idx > prevIdxRef.current ? 1 : -1)
    prevIdxRef.current = idx
    setActiveIdx(idx)
  }

  const contentVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir * 20,
      filter: "blur(4px)",
    }),
    center: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: -dir * 20,
      filter: "blur(4px)",
      transition: { duration: 0.25, ease: [0.4, 0.0, 1, 1] },
    }),
  }

  return (
    <>
      {/* Tab buttons */}
      <LayoutGroup id="dot-tabs">
        <div
          className={cn(
            "relative flex justify-center flex-wrap items-center gap-2 sm:gap-3 md:gap-4 w-full pt-4",
            containerClassName
          )}
        >
          {tabs.map((tab, idx) => {
            const isActive = active.value === tab.value
            return (
              <motion.button
                layout
                key={tab.value}
                onClick={() => switchTo(idx)}
                className={cn(
                  "relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full leading-none border text-sm sm:text-base transition-colors",
                  "border-transparent",
                  isActive
                    ? cn("text-white", activeTabClassName)
                    : cn("text-black hover:text-gray-700", tabClassName)
                )}
                aria-pressed={isActive}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-black transform-gpu"
                    style={{ willChange: "transform, opacity" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.4 }}
                  />
                )}
                <span className="relative z-10">{tab.title}</span>
              </motion.button>
            )
          })}
        </div>
      </LayoutGroup>

      {/* Content area – responsive height driven by video */}
      <div className={cn("mt-6 sm:mt-8 relative w-full", contentClassName)}>
        <AnimatePresence
          mode="wait"
          custom={direction}
          initial={false}
          presenceAffectsLayout={false}
        >
          <motion.div
            key={active.value}
            className="w-full transform-gpu"
            variants={contentVariants}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              willChange: "transform, opacity, filter",
              transform: "translateZ(0)",
            }}
          >
            {active.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}

/* Safari-like frame for video (responsive, never crops video) */
function SafariFrame({
  children,
  url = "app.advartit.in",
  onClick,
}: {
  children: React.ReactNode
  url?: string
  onClick?: () => void
}) {
  return (
    <div 
      className={cn(
        "inline-block w-full max-w-full rounded-xl border border-gray-200 shadow-lg overflow-hidden bg-white",
        onClick && "cursor-pointer hover:shadow-xl transition-shadow duration-300"
      )}
      onClick={onClick}
    >
      {/* Safari top bar */}
      <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 border-b border-gray-200 bg-gray-100">
        {/* address bar */}
        <div className="flex-1 flex justify-center min-w-0">
          <div className="px-3 sm:px-4 py-0.5 sm:py-1 text-[10px] sm:text-xs truncate text-gray-500 bg-white rounded-full border border-gray-300 max-w-[60%] sm:max-w-[70%]">
            {url}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="bg-black">{children}</div>
    </div>
  )
}

/* Video content wrapped inside Safari frame */
function VideoContent({
  videoSrc,
  urlLabel,
}: {
  videoSrc: string
  urlLabel?: string
}) {
  const router = useRouter()
  const type = videoSrc.endsWith(".webm") ? "video/webm" : "video/mp4"
  
  const handleClick = () => {
    router.push('/dot')
  }

  return (
    <SafariFrame url={urlLabel} onClick={handleClick}>
      <video
        key={videoSrc} // force reload when switching
        autoPlay
        loop
        muted
        playsInline
        preload="auto"           // reduce blank frame risk on switch
        className="block w-full h-auto object-contain"
      >
        <source src={videoSrc} type={type} />
        Your browser does not support the video tag.
      </video>
    </SafariFrame>
  )
}

function DotTabs() {
  const tabs: Tab[] = [
    {
      title: "Social Media",
      value: "social-media",
      content: (
        <VideoContent
          videoSrc="/dot/dot-social.webm"
          urlLabel="app.advartit.in/social"
        />
      ),
    },
    {
      title: "Data",
      value: "data",
      content: (
        <VideoContent
          videoSrc="/dot/dot-data1.webm"
          urlLabel="app.advartit.in/data"
        />
      ),
    },
  ]

  return (
    <div className="relative flex flex-col w-full max-w-5xl mx-auto items-start justify-start">
      <Tabs tabs={tabs} />
    </div>
  )
}

interface DotSectionProps {
  isVisible?: boolean
}

const DotSection = forwardRef<HTMLElement, DotSectionProps>(({ isVisible }, ref) => (
  <section
    id="dot"
    ref={ref}
    data-section="3"
    className={cn("section scroll-mt-24 md:scroll-mt-32", isVisible && "visible")}
    style={{ ["--section-bg" as any]: "#ffffff" }}
  >
    <div className="section-container">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-2 sm:mb-4 lg:mb-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading2 pb-1 text-black font-normal">
              We treat your <span className="font-semibold">business</span> problems as ours!
            </h2>
            <p className="paragraph font-light whitespace-pre-line mx-auto">
              Because when we saw entrepreneurs struggling to figure out their own product data,
              we cracked it and made it simple with Dot.
            </p>
          </div>
        </div>

        <div className="flex flex-col overflow-visible">
          <DotTabs />
        </div>
      </div>
    </div>
  </section>
))

DotSection.displayName = "DotSection"
export default DotSection