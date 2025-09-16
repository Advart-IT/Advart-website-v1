"use client"

import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { useRouter } from "next/navigation"
import Head from "next/head"

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}

type Tab = {
  title: string
  value: string
  content: React.ReactNode
}

/* small util: viewport detection with rootMargin to start loading earlier */
function useInViewport<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") {
      setInView(true) // graceful fallback
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [rootMargin])

  return { ref, inView }
}

/* Tabs with sliding pill + direction-aware content animation (memoized) */
const Tabs = React.memo(function Tabs({
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

  const prevIdxRef = useRef(0)
  const [direction, setDirection] = useState<number>(1)

  const switchTo = useCallback((idx: number) => {
    setDirection(idx > prevIdxRef.current ? 1 : -1)
    prevIdxRef.current = idx
    setActiveIdx(idx)
  }, [])

  const contentVariants = useMemo(
    () => ({
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
    }),
    []
  )

  return (
    <>
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

      <div className={cn("mt-6 sm:mt-8 relative w-full flex justify-center", contentClassName)}>
        <AnimatePresence mode="wait" custom={direction} initial={false} presenceAffectsLayout={false}>
          <motion.div
            key={active.value}
            className="w-full max-w-fit transform-gpu"
            variants={contentVariants}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ willChange: "transform, opacity, filter", transform: "translateZ(0)" }}
          >
            {active.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
})

/* Safari-like frame (memo) */
const SafariFrame = React.memo(function SafariFrame({
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
        "inline-block w-full max-w-2xl lg:max-w-3xl rounded-lg border border-gray-200 shadow-md overflow-hidden bg-white mx-auto",
        onClick && "cursor-pointer hover:shadow-lg transition-shadow duration-300"
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-1.5 px-2 py-1 border-b border-gray-200 bg-gray-100">
        <div className="flex-1 flex justify-center min-w-0">
          <div className="px-2.5 sm:px-3 py-0.5 text-[9px] sm:text-[10px] truncate text-gray-500 bg-white rounded-full border border-gray-300 max-w-[50%] sm:max-w-[60%]">
            {url}
          </div>
        </div>
      </div>
      <div className="bg-black">{children}</div>
    </div>
  )
})

/* Video: lazy load when near viewport; start with 'metadata' then play when ready */
const VideoContent = React.memo(function VideoContent({
  videoSrc,
  urlLabel,
  posterSrc,
}: {
  videoSrc: string
  urlLabel?: string
  posterSrc?: string
}) {
  const { ref, inView } = useInViewport<HTMLDivElement>("300px")
  const router = useRouter()

  // prefetch the target route as soon as this mounts (fast tap)
  useEffect(() => {
    router?.prefetch?.("/dot")
  }, [router])

  const type = useMemo(() => (videoSrc.endsWith(".webm") ? "video/webm" : "video/mp4"), [videoSrc])

  const handleClick = useCallback(() => {
    router.push("/dot")
  }, [router])

  return (
    <div ref={ref}>
      <SafariFrame url={urlLabel} onClick={handleClick}>
        <video
          key={videoSrc}
          autoPlay={inView}
          loop
          muted
          playsInline
          // start as light as possible; once inView, the browser will fetch progressively
          preload={inView ? "auto" : "metadata"}
          poster={posterSrc}
          className="block w-full h-auto object-cover max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] rounded-b-lg"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate"
          style={{ contain: "content", backfaceVisibility: "hidden" }}
        >
          <source src={videoSrc} type={type} />
          Your browser does not support the video tag.
        </video>
      </SafariFrame>
    </div>
  )
})

function DotTabs() {
  // memoize the tabs so we don’t recreate React elements on each render
  const tabs: Tab[] = useMemo(
    () => [
      {
        title: "Social Media",
        value: "social-media",
        content: (
          <VideoContent
            videoSrc="/dot/dot-social.webm"
            urlLabel="app.advartit.in/social"
            // posterSrc="/dot/dot-social-poster.jpg" // (optional: add a tiny poster for even faster first paint)
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
            // posterSrc="/dot/dot-data1-poster.jpg"
          />
        ),
      },
    ],
    []
  )

  return (
    <div className="relative flex flex-col w-full max-w-4xl mx-auto items-center justify-start">
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
    {/* (Optional but helpful) Preload the tab videos – safe for local static assets */}
    <Head>
      <link rel="preload" as="video" href="/dot/dot-social.webm" />
      <link rel="preload" as="video" href="/dot/dot-data1.webm" />
    </Head>

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
