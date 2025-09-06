"use client"

import React, { forwardRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}

type Tab = {
  title: string
  value: string
  content: React.ReactNode
}

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

  return (
    <>
      {/* Tab buttons */}
      <div
        className={cn(
          "relative flex flex-row flex-wrap items-center justify-start gap-3 sm:gap-4 max-w-full w-full",
          containerClassName
        )}
      >
        {tabs.map((tab, idx) => {
          const isActive = active.value === tab.value
          return (
            <button
              key={tab.value}
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "relative px-4 py-2 rounded-full leading-none border",
                isActive
                  ? cn("bg-black text-white", activeTabClassName)
                  : cn("text-black border-transparent", tabClassName)
              )}
              aria-pressed={isActive}
            >
              {tab.title}
            </button>
          )
        })}

        <Link
          href="/dot"
          prefetch={false}
          className="px-1 py-2 text-sm font-medium text-black hover:underline"
        >
          Know More
        </Link>
      </div>

      {/* Content area with fixed height */}
      <div
        className={cn(
          "mt-8 relative w-full aspect-video md:h-[36rem] rounded-2xl overflow-hidden",
          contentClassName
        )}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={active.value}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {active.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}

function VideoContent({ videoSrc }: { videoSrc: string }) {
  const type = videoSrc.endsWith(".webm") ? "video/webm" : "video/mp4"
  return (
    <video
      key={videoSrc} // force reload when switching
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className="w-full h-full object-cover md:object-contain"
    >
      <source src={videoSrc} type={type} />
      Your browser does not support the video tag.
    </video>
  )
}

function ProblemSolvingTabsDemo() {
  const tabs: Tab[] = [
    {
      title: "Social Media",
      value: "social-media",
      content: <VideoContent videoSrc="/dot/dot-social.webm" />,
    },
    {
      title: "Data",
      value: "data",
      content: <VideoContent videoSrc="/dot/dot-data.webm" />,
    },
  ]

  return (
    <div className="relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-8">
      <Tabs tabs={tabs} />
    </div>
  )
}

interface ProblemSolvingSectionProps {
  isVisible?: boolean
}

const ProblemSolvingSection = forwardRef<HTMLElement, ProblemSolvingSectionProps>(
  ({ isVisible }, ref) => (
    <section
      id="problem-solving"
      ref={ref}
      data-section="3"
      className={cn(
        "text-black bg-white scroll-mt-24 md:scroll-mt-32",
        isVisible && "visible"
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-10 md:pt-12 pb-10 sm:pb-12 md:pb-14">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-2 lg:mb-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal tracking-tight mb-4 leading-tight">
                We treat your <span className="font-semibold">business</span> problems as ours!
              </h2>
              <p className="text-base sm:text-lg text-black/70 leading-relaxed font-light whitespace-pre-line max-w-xl lg:max-w-2xl mx-auto">
                Because when we saw entrepreneurs struggling to figure out their own product data,
                we cracked it and made it simple with Dot.
              </p>
            </div>
          </div>
          <div className="flex flex-col overflow-visible">
            <ProblemSolvingTabsDemo />
          </div>
        </div>
      </div>
    </section>
  )
)

ProblemSolvingSection.displayName = "ProblemSolvingSection"
export default ProblemSolvingSection
