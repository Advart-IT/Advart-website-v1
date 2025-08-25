"use client"

import type React from "react"
import { forwardRef, useState, useMemo } from "react"
import { MotionConfig, motion } from "framer-motion"
import Link from "next/link"

function cn(...classes: (string | undefined | false)[]): string {
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
    const tail = tabs.filter((_, i) => i !== activeIdx)
    return [head, ...tail]
  }, [tabs, activeIdx])

  const active = orderedTabs[0]

  return (
    <>
      <div
        className={cn(
          "relative flex flex-row flex-wrap items-center justify-start gap-3 sm:gap-4 [perspective:1000px] overflow-visible max-w-full w-full",
          containerClassName,
        )}
      >
        {tabs.map((tab, idx) => {
          const isActive = tabs[activeIdx]?.value === tab.value
          return (
            <button
              key={tab.title}
              onClick={() => setActiveIdx(idx)}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className={cn("relative px-4 py-2 rounded-full leading-none border border-transparent", tabClassName)}
              aria-pressed={isActive}
            >
              {isActive && (
                <motion.div
                  layoutId="clickedbutton"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.45 }}
                  className={cn("absolute inset-0 bg-black rounded-full border border-black", activeTabClassName)}
                />
              )}
              <span className={cn("relative block", isActive ? "text-white" : "text-black")}>{tab.title}</span>
            </button>
          )
        })}

        <Link href="/dot" prefetch={false} className="px-1 py-2 text-sm font-medium text-black hover:underline">
          Know More
        </Link>
      </div>

      <FadeInStack tabs={orderedTabs} active={active} hovering={hovering} className={cn("mt-8", contentClassName)} />
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
            className={cn("w-full h-full absolute top-0 left-0", className)}
          >
            {tab.content}
          </motion.div>
        )
      })}
    </div>
  )
}

function VideoContent({ videoSrc }: { videoSrc: string }) {
  return (
    <Link href="/dot" prefetch={false} className="block w-full h-full group">
      <div className="w-full h-full rounded-2xl overflow-hidden hover:border-black/50 transition-colors duration-300">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        >
          <source src={videoSrc} type="video/mp4" />
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
          <div className="w-full overflow-hidden relative h-full rounded-2xl bg-white">
            <VideoContent videoSrc="/dot/dot-social.webm" />
          </div>
        ),
      },
      {
        title: "Data",
        value: "data",
        content: (
          <div className="w-full overflow-hidden relative h-full rounded-2xl bg-white">
            <VideoContent videoSrc="/dot/dot-data.webm" />
          </div>
        ),
      },
    ],
    [],
  )

  return (
    <div className="h-[20rem] md:h-[32rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-8 bg-white">
      <Tabs tabs={tabs} />
    </div>
  )
}

interface ProblemSolvingSectionProps {
  isVisible?: boolean
}

const ProblemSolvingSection = forwardRef<HTMLElement, ProblemSolvingSectionProps>(({ isVisible }, ref) => {
  return (
    <MotionConfig reducedMotion="user" transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
      <section
        ref={ref}
        data-section="3"
        className={cn(
          "section py-20 sm:py-12 md:py-16 lg:pt-20 xl:py-24 px-8 text-black bg-white",
          isVisible && "visible",
        )}
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-2 lg:mb-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-light mb-2 fade-up text-black text-xl xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                We treat your <span className="text-black font-semibold">business</span> problems as ours!
              </h2>
              <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-black/70 leading-relaxed font-light fade-up stagger-1">
                Because when we saw entrepreneurs struggling to figure out their own product data, we cracked it and
                made it simple with Dot.
              </p>
            </div>
          </div>

          <div className="flex flex-col overflow-visible">
            <ProblemSolvingTabsDemo />
          </div>
        </div>
      </section>
    </MotionConfig>
  )
})

ProblemSolvingSection.displayName = "ProblemSolvingSection"
export default ProblemSolvingSection