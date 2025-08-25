// "use client"
// import { useEffect, useRef } from "react"
// import type React from "react"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import Link from "next/link"
// import type { JSX } from "react/jsx-runtime"

// gsap.registerPlugin(ScrollTrigger)

// interface VideoSource {
//   src: string
//   poster: string
// }

// interface VideoCardProps {
//   video: VideoSource
//   index: number
//   className?: string
//   cardClass: string
//   size?: "desktop" | "mobile"
// }

// export default function InsightHero(): JSX.Element {
//   const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

//   useEffect(() => {
//     const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

//     if (reduceMotion) {
//       document.querySelectorAll<HTMLElement>(".row, .card, .button, .zing").forEach((el) => {
//         el.style.opacity = "1"
//         el.style.transform = "none"
//       })
//       return
//     }

//     const ctx = gsap.context(() => {
//       if (window.innerWidth >= 640) {
//         gsap.utils.toArray<HTMLElement>(".card-left").forEach((card, i) => {
//           gsap.fromTo(
//             card,
//             { xPercent: -130, rotation: -4, opacity: 0 },
//             {
//               xPercent: 0,
//               rotation: 0,
//               opacity: 1,
//               ease: "power2.out",
//               duration: 1,
//               delay: i * 0.06,
//               scrollTrigger: { trigger: card, start: "top 85%", end: "top 40%", scrub: true },
//             },
//           )
//         })

//         gsap.utils.toArray<HTMLElement>(".card-right").forEach((card, i) => {
//           gsap.fromTo(
//             card,
//             { xPercent: 130, rotation: 4, opacity: 0 },
//             {
//               xPercent: 0,
//               rotation: 0,
//               opacity: 1,
//               ease: "power2.out",
//               duration: 1,
//               delay: i * 0.06,
//               scrollTrigger: { trigger: card, start: "top 85%", end: "top 40%", scrub: true },
//             },
//           )
//         })

//         gsap.utils.toArray<HTMLElement>(".row").forEach((row, idx) => {
//           gsap.fromTo(
//             row,
//             { yPercent: idx % 2 ? 2 : -2 },
//             {
//               yPercent: 0,
//               ease: "none",
//               scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: 0.5 },
//             },
//           )
//         })
//       } else {
//         gsap.utils.toArray<HTMLElement>(".card").forEach((card, i) => {
//           gsap.fromTo(
//             card,
//             { opacity: 0, y: 20 },
//             {
//               opacity: 1,
//               y: 0,
//               duration: 0.6,
//               delay: i * 0.1,
//               ease: "power2.out",
//               scrollTrigger: { trigger: card, start: "top 90%", once: true },
//             },
//           )
//         })
//       }

//       gsap.fromTo(
//         ".zing",
//         { yPercent: -20, opacity: 0 },
//         {
//           yPercent: 0,
//           opacity: 1,
//           duration: 0.8,
//           ease: "power2.out",
//           scrollTrigger: { trigger: ".zing", start: "top 85%", once: true },
//         },
//       )
//     })

//     const handleScroll = () => {
//       videoRefs.current.forEach((video) => {
//         if (video) {
//           const rect = video.getBoundingClientRect()
//           const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2

//           if (isInView && video.paused) {
//             video.play().catch(() => {})
//           } else if (!isInView && !video.paused) {
//             video.pause()
//           }
//         }
//       })
//     }

//     window.addEventListener("scroll", handleScroll)
//     setTimeout(handleScroll, 500)

//     return () => {
//       ctx.revert()
//       ScrollTrigger.getAll().forEach((t) => t.kill())
//       window.removeEventListener("scroll", handleScroll)
//     }
//   }, [])

//   const videoSources: VideoSource[] = [
//     {
//       src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
//       poster:
//         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='360'%3E%3Crect width='100%25' height='100%25' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fill='%23666' fontFamily='Arial' fontSize='14'%3EBig Buck Bunny%3C/text%3E%3C/svg%3E",
//     },
//     {
//       src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
//       poster:
//         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='360'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fill='%23666' fontFamily='Arial' fontSize='14'%3EElephants Dream%3C/text%3E%3C/svg%3E",
//     },
//     {
//       src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
//       poster:
//         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='360'%3E%3Crect width='100%25' height='100%25' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fill='%23666' fontFamily='Arial' fontSize='14'%3EBigger Blazes%3C/text%3E%3C/svg%3E",
//     },
//     {
//       src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
//       poster:
//         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='360'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fill='%23666' fontFamily='Arial' fontSize='14'%3EBigger Escapes%3C/text%3E%3C/svg%3E",
//     },
//   ]

//   const VideoCard: React.FC<VideoCardProps> = ({ video, index, className = "", cardClass, size = "desktop" }) => {
//     // Responsive dimensions that fit within 6xl container
//     const dimensions = size === "desktop" 
//       ? "w-full max-w-[240px] h-[360px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[240px] xl:max-w-[260px]" 
//       : "w-full aspect-[3/4]"

//     const handleVideoRef = (el: HTMLVideoElement | null): void => {
//       videoRefs.current[index] = el

//       if (el) {
//         const playVideo = () => {
//           setTimeout(() => {
//             const rect = el.getBoundingClientRect()
//             const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2

//             if (isInView) {
//               el.play().catch(() => {})
//             }
//           }, 100)
//         }

//         el.addEventListener("loadeddata", playVideo)
//         el.addEventListener("canplay", playVideo)
//       }
//     }

//     return (
//       <div
//         className={`card ${cardClass} relative ${dimensions} rounded-xl overflow-hidden will-change-transform flex-shrink-0 ${className}`}
//       >
//         <Link href="https://www.instagram.com/reel/DLHC8jxRXi-/?igsh=MWJoYzVyanEwbnZheg==" passHref>
//           <video
//             ref={handleVideoRef}
//             src={video.src}
//             poster={video.poster}
//             loop
//             muted
//             playsInline
//             preload="auto"
//             className="w-full h-full object-cover cursor-pointer bg-white"
//             onError={() => console.warn(`Video ${index} failed to load`)}
//             onClick={(e) => {
//               e.preventDefault()
//               const target = e.currentTarget
//               if (target.paused) {
//                 target.play().catch(() => {})
//               } else {
//                 target.pause()
//               }
//             }}
//           >
//             Your browser does not support the video tag.
//           </video>
//         </Link>
//       </div>
//     )
//   }

//   return (
//     <section className="flex flex-col py-20 sm:py-12 md:py-16 lg:pt-20 xl:py-24 px-8 bg-white text-black overflow-x-hidden">
//       <section className="w-full text-black">
//         <div className="container px-4 md:px-6 text-center max-w-6xl mx-auto">
//           <h2 className="font-light mb-2 fade-up text-black text-xl xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl">
//             We scaled a business from <span className="text-black font-semibold">30K to 3Cr</span>...
//           </h2>
//           <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-black/70 leading-relaxed font-light">
//             All while building a brand called <span className="text-[#A91724]">ZING.</span>
//           </p>
//         </div>
//       </section>

//       {/* Mobile: 2x2 Grid */}
//       <div className="block sm:hidden w-full">
//         <div className="row grid grid-cols-2 gap-3 my-4 will-change-transform max-w-sm mx-auto">
//           <VideoCard video={videoSources[0]} index={0} cardClass="card-left" size="mobile" />
//           <VideoCard video={videoSources[1]} index={1} cardClass="card-right" size="mobile" />
//           <VideoCard video={videoSources[2]} index={2} cardClass="card-left" size="mobile" />
//           <VideoCard video={videoSources[3]} index={3} cardClass="card-right" size="mobile" />
//         </div>
//       </div>

//       {/* Desktop/Tablet: Single Row - Now properly constrained within 6xl */}
//       <div className="hidden sm:block">
//         <div className="row relative w-full my-4 flex justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 will-change-transform max-w-6xl mx-auto px-4">
//           <VideoCard video={videoSources[0]} index={4} cardClass="card-left" size="desktop" />
//           <VideoCard video={videoSources[1]} index={5} cardClass="card-left" size="desktop" />
//           <VideoCard video={videoSources[2]} index={6} cardClass="card-right" size="desktop" />
//           <VideoCard video={videoSources[3]} index={7} cardClass="card-right" size="desktop" />
//         </div>
//       </div>
//     </section>
//   )
// }
"use client"
import { useEffect, useRef } from "react"
import type React from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { JSX } from "react/jsx-runtime"

gsap.registerPlugin(ScrollTrigger)

interface VideoSource {
  src: string
  poster: string
}

export default function InsightHero(): JSX.Element {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduceMotion) {
      document.querySelectorAll<HTMLElement>(".zing").forEach((el) => {
        el.style.opacity = "1"
        el.style.transform = "none"
      })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".zing",
        { yPercent: -20, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".zing", start: "top 85%", once: true },
        },
      )
    })

    const handleScroll = () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          const rect = video.getBoundingClientRect()
          const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2

          if (isInView && video.paused) {
            video.play().catch(() => {})
          } else if (!isInView && !video.paused) {
            video.pause()
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    setTimeout(handleScroll, 500)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const videoSources: VideoSource[] = [
    {
      src: "/hero/zing/one.webm",
      poster:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='360'%3E%3Crect width='100%25' height='100%25' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fill='%23666' fontFamily='Arial' fontSize='14'%3EBig Buck Bunny%3C/text%3E%3C/svg%3E",
    },
    {
      src: "/hero/zing/two.webm",
      poster:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='360'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fill='%23666' fontFamily='Arial' fontSize='14'%3EElephants Dream%3C/text%3E%3C/svg%3E",
    },
    {
      src: "/hero/zing/three-1.webm",
      poster:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='360'%3E%3Crect width='100%25' height='100%25' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fill='%23666' fontFamily='Arial' fontSize='14'%3EBigger Blazes%3C/text%3E%3C/svg%3E",
    },
    {
      src: "/hero/zing/four-1.webm",
      poster:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='360'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fill='%23666' fontFamily='Arial' fontSize='14'%3EBigger Escapes%3C/text%3E%3C/svg%3E",
    },
  ]

  return (
    <section className="relative flex flex-col justify-center items-center min-h-screen px-8 overflow-hidden text-center">
      {/* Video Background - mobile 2x2, desktop 4 across */}
      <div className="absolute inset-0 w-full h-full grid grid-cols-2 grid-rows-2 sm:grid-cols-4 sm:grid-rows-1 gap-0">
        {videoSources.map((video, i) => (
          <video
            key={i}
            ref={(el) => (videoRefs.current[i] = el)}
            src={video.src}
            poster={video.poster}
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
        ))}
      </div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Foreground Text */}
      <div className="relative z-10 max-w-6xl mx-auto text-white">
        <h2 className="font-light mb-2 fade-up text-xl xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          We scaled a business from <span className="font-semibold">30K to 3Cr</span>...
        </h2>
        <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-white/80 leading-relaxed font-light">
          All while building a brand called <span className="text-[#A91724] zing">ZING.</span>
        </p>
      </div>
    </section>
  )
}
