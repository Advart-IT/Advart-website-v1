"use client"

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
} from "react"
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

/* Viewport detection (eager) */
function useInViewport<T extends HTMLElement>(rootMargin = "300px") {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") {
      setInView(true)
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

/* Tabs (controlled) */
type TabsProps = {
  tabs: Tab[]
  containerClassName?: string
  activeTabClassName?: string
  tabClassName?: string
  contentClassName?: string
  activeIndex?: number
  onChange?: (index: number) => void
}

const Tabs = memo(function Tabs({
  tabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
  activeIndex,
  onChange,
}: TabsProps) {
  const isControlled = typeof activeIndex === "number"
  const [internalIdx, setInternalIdx] = useState(0)
  const activeIdx = isControlled ? (activeIndex as number) : internalIdx

  const prevIdxRef = useRef(activeIdx)
  const [direction, setDirection] = useState<number>(1)

  const switchTo = useCallback(
    (idx: number) => {
      setDirection(idx > prevIdxRef.current ? 1 : -1)
      prevIdxRef.current = idx
      if (isControlled) onChange?.(idx)
      else setInternalIdx(idx)
    },
    [isControlled, onChange]
  )

  const contentVariants = useMemo(
    () => ({
      enter: (dir: number) => ({ opacity: 0, x: dir * 12 }),
      center: { opacity: 1, x: 0, transition: { duration: 0.28, ease: "easeInOut" as const } },
      exit: (dir: number) => ({ opacity: 0, x: -dir * 12, transition: { duration: 0.22, ease: "easeInOut" as const } }),
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
            const isActive = idx === activeIdx
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
        {/* Keep all tab content mounted; only animate which one is visible */}
        <div className="w-full max-w-fit relative">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            {tabs.map((tab, idx) => {
              const isActive = idx === activeIdx
              return (
                <motion.div
                  key={tab.value}
                  className="w-full max-w-fit transform-gpu"
                  variants={contentVariants}
                  custom={direction}
                  initial={false}
                  animate={isActive ? "center" : undefined}
                  exit={undefined}
                  style={{
                    willChange: isActive ? "transform, opacity" : undefined,
                    transform: "translateZ(0)",
                    position: isActive ? "relative" as const : "absolute" as const,
                    inset: 0,
                    pointerEvents: isActive ? "auto" : "none",
                    opacity: isActive ? 1 : 0,
                  }}
                  aria-hidden={!isActive}
                >
                  {tab.content}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
})

/* Safari-like frame */
const SafariFrame = memo(function SafariFrame({
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

/* Video: mounted-once, eager-preloaded, resume buffering, force autoplay */
const VideoContent = memo(function VideoContent({
  videoSrc,
  urlLabel,
  posterSrc,
  active, // true when its tab is visible
}: {
  videoSrc: string
  urlLabel?: string
  posterSrc?: string
  active?: boolean
}) {
  const { ref, inView } = useInViewport<HTMLDivElement>("400px")
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Prefetch target route early
  useEffect(() => {
    router?.prefetch?.("/dot")
  }, [router])

  const type = useMemo(
    () => (videoSrc.endsWith(".webm") ? "video/webm" : "video/mp4"),
    [videoSrc]
  )

  const handleClick = useCallback(() => {
    router.push("/dot")
  }, [router])

  // Robust autoplay control
  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    // Ensure properties are set (iOS can ignore attributes alone)
    el.muted = true
    el.playsInline = true

    if (inView) el.preload = "auto"

    const tryPlay = () => {
      if (!videoRef.current) return
      if (active) {
        const p = videoRef.current.play()
        if (p?.catch) p.catch(() => {
          // ignore rejections; we retry on various signals
        })
      } else {
        videoRef.current.pause()
      }
    }

    tryPlay()

    const onCanPlay = () => tryPlay()
    const onLoadedData = () => tryPlay()
    const onVisibility = () => tryPlay()

    el.addEventListener("canplay", onCanPlay, { passive: true })
    el.addEventListener("loadeddata", onLoadedData, { passive: true })
    document.addEventListener("visibilitychange", onVisibility, { passive: true })

    return () => {
      el.removeEventListener("canplay", onCanPlay)
      el.removeEventListener("loadeddata", onLoadedData)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [active, inView])

  return (
    <div ref={ref}>
      <SafariFrame url={urlLabel} onClick={handleClick}>
        <video
          ref={videoRef}
          autoPlay      // let browser try; effect will enforce
          loop
          muted
          playsInline
          preload={inView ? "auto" : "metadata"}
          poster={posterSrc}
          className="block w-full h-auto object-cover max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] rounded-b-lg"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate"
          style={{ contain: "content", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
        >
          <source src={videoSrc} type={type} />
          Your browser does not support the video tag.
        </video>
      </SafariFrame>
    </div>
  )
})

function DotTabs() {
  const [activeIdx, setActiveIdx] = useState(0)

  // Memoized tab data; pass "active" down so only the visible video plays
  const tabs: Tab[] = useMemo(
    () => [
      {
        title: "Social Media",
        value: "social-media",
        content: (
          <VideoContent
            videoSrc="/dot/dot-social.webm"
            urlLabel="app.advartit.in/social"
            active={activeIdx === 0}
            // posterSrc="/dot/dot-social-poster.jpg"
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
            active={activeIdx === 1}
            // posterSrc="/dot/dot-data1-poster.jpg"
          />
        ),
      },
    ],
    [activeIdx]
  )

  return (
    <div className="relative flex flex-col w-full max-w-4xl mx-auto items-center justify-start">
      <Tabs
        tabs={tabs}
        activeIndex={activeIdx}
        onChange={setActiveIdx}
      />
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
    {/* Eager preloads for instant fetch */}
    <Head>
      <link rel="preload" as="video" href="/dot/dot-social.webm" />
      <link rel="preload" as="video" href="/dot/dot-data1.webm" />
      {/* If you have posters, uncomment:
          <link rel="preload" as="image" href="/dot/dot-social-poster.jpg" />
          <link rel="preload" as="image" href="/dot/dot-data1-poster.jpg" />
      */}
      {/* Optional connection warmups if CDN-hosted:
          <link rel="preconnect" href="https://cdn.yourdomain.com" crossOrigin="" />
      */}
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
