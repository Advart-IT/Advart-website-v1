"use client"

import React, { forwardRef, useState, useMemo } from "react"
import { MotionConfig, motion } from "framer-motion"
import Link from "next/link"

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}

type Tab = {
  title: string
  value: string
  content?: React.ReactNode
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
  const [hovering, setHovering] = useState(false)

  const orderedTabs = useMemo(() => {
    const head = tabs[activeIdx]
    return [head, ...tabs.filter((_, i) => i !== activeIdx)]
  }, [tabs, activeIdx])

  const active = orderedTabs[0]

  return (
    <>
      <div
        className={cn(
          "relative flex flex-row flex-wrap items-center justify-start gap-3 sm:gap-4 [perspective:1000px] overflow-visible max-w-full w-full",
          containerClassName
        )}
      >
        {tabs.map((tab, idx) => {
          const isActive = tabs[activeIdx]?.value === tab.value
          return (
            <button
              key={tab.value}
              onClick={() => setActiveIdx(idx)}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className={cn(
                "relative px-4 py-2 rounded-full leading-none border border-transparent",
                tabClassName
              )}
              aria-pressed={isActive}
            >
              {isActive && (
                <motion.div
                  layoutId="clickedbutton"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.45 }}
                  className={cn(
                    "absolute inset-0 bg-black rounded-full border border-black",
                    activeTabClassName
                  )}
                />
              )}
              <span className={cn("relative block", isActive ? "text-white" : "text-black")}>
                {tab.title}
              </span>
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

      <FadeInStack
        tabs={orderedTabs}
        active={active}
        hovering={hovering}
        className={cn("mt-8", contentClassName)}
      />
    </>
  )
}

function FadeInStack({
  className,
  tabs,
  active,
  hovering,
}: {
  className?: string
  tabs: Tab[]
  active: Tab
  hovering?: boolean
}) {
  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => {
        const isActive = tab.value === active.value
        return (
          <motion.div
            key={tab.value}
            style={{
              scale: 1 - idx * 0.1,
              top: hovering ? idx * -50 : 0,
              zIndex: -idx,
              opacity: idx < 3 ? 1 - idx * 0.1 : 0,
            }}
            initial={false}
            animate={{
              y: isActive ? [0, 40, 0] : 0,
              opacity: isActive ? 1 : 0.85,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "w-full h-full absolute top-0 left-0 rounded-2xl overflow-hidden",
              className
            )}
          >
            {tab.content}
          </motion.div>
        )
      })}
    </div>
  )
}

function VideoContent({ videoSrc }: { videoSrc: string }) {
  const type = videoSrc.endsWith(".webm") ? "video/webm" : "video/mp4"
  return (
    <Link href="/dot" prefetch={false} className="block w-full h-full">
      <div className="w-full h-full flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-contain"
        >
          <source src={videoSrc} type={type} />
          Your browser does not support the video tag.
        </video>
      </div>
    </Link>
  )
}

function ProblemSolvingTabsDemo() {
  const tabs = useMemo<Tab[]>(
    () => [
      {
        title: "Social Media",
        value: "social-media",
        content: (
          <div className="w-full overflow-hidden relative h-full rounded-2xl">
            <VideoContent videoSrc="/dot/dot-social.webm" />
          </div>
        ),
      },
      {
        title: "Data",
        value: "data",
        content: (
          <div className="w-full overflow-hidden relative h-full rounded-2xl">
            <VideoContent videoSrc="/dot/dot-data.webm" />
          </div>
        ),
      },
    ],
    []
  )

  return (
    <div className="h-[24rem] md:h-[36rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-8">
      <Tabs tabs={tabs} />
    </div>
  )
}

interface ProblemSolvingSectionProps {
  isVisible?: boolean
}

const ProblemSolvingSection = forwardRef<HTMLElement, ProblemSolvingSectionProps>(
  ({ isVisible }, ref) => (
    <MotionConfig
      reducedMotion="user"
      transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
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
    </MotionConfig>
  )
)

ProblemSolvingSection.displayName = "ProblemSolvingSection"
export default ProblemSolvingSection
