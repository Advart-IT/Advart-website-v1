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



// "use client"
// import { useEffect, useRef } from "react"
// import type React from "react"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import type { JSX } from "react/jsx-runtime"

// gsap.registerPlugin(ScrollTrigger)

// interface VideoSource {
//   src: string
//   poster: string
// }

// export default function InsightHero(): JSX.Element {
//   const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

//   useEffect(() => {
//     const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

//     if (reduceMotion) {
//       document.querySelectorAll<HTMLElement>(".zing").forEach((el) => {
//         el.style.opacity = "1"
//         el.style.transform = "none"
//       })
//       return
//     }

//     const ctx = gsap.context(() => {
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
//       src: "/hero/zing/one.webm",
//       poster:
//         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='360'%3E%3Crect width='100%25' height='100%25' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fill='%23666' fontFamily='Arial' fontSize='14'%3EBig Buck Bunny%3C/text%3E%3C/svg%3E",
//     },
//     {
//       src: "/hero/zing/two.webm",
//       poster:
//         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='360'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fill='%23666' fontFamily='Arial' fontSize='14'%3EElephants Dream%3C/text%3E%3C/svg%3E",
//     },
//     {
//       src: "/hero/zing/three-1.webm",
//       poster:
//         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='360'%3E%3Crect width='100%25' height='100%25' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fill='%23666' fontFamily='Arial' fontSize='14'%3EBigger Blazes%3C/text%3E%3C/svg%3E",
//     },
//     {
//       src: "/hero/zing/four-1.webm",
//       poster:
//         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='360'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fill='%23666' fontFamily='Arial' fontSize='14'%3EBigger Escapes%3C/text%3E%3C/svg%3E",
//     },
//   ]

//   return (
//     <section className="relative flex flex-col justify-center items-center min-h-screen px-8 overflow-hidden text-center">
//       {/* Video Background - mobile 2x2, desktop 4 across */}
//       <div className="absolute inset-0 w-full h-full grid grid-cols-2 grid-rows-2 sm:grid-cols-4 sm:grid-rows-1 gap-0">
//         {videoSources.map((video, i) => (
//           <video
//             key={i}
//             ref={(el) => (videoRefs.current[i] = el)}
//             src={video.src}
//             poster={video.poster}
//             loop
//             muted
//             playsInline
//             preload="auto"
//             className="w-full h-full object-cover"
//           />
//         ))}
//       </div>

//       {/* Overlay for readability */}
//       <div className="absolute inset-0 bg-black/40"></div>

//       {/* Foreground Text */}
//       <div className="relative z-10 max-w-6xl mx-auto text-white">
//         <h2 className="font-light mb-2 fade-up text-xl xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl">
//           We scaled a business from <span className="font-semibold">30K to 3Cr</span>...
//         </h2>
//         <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-white/80 leading-relaxed font-light">
//           All while building a brand called <span className="text-[#A91724] zing">ZING.</span>
//         </p>
//       </div>
//     </section>
//   )
// }


import React from "react";

/** Small, reusable bullet list */
const Bullets = ({
  items,
  dotClass = "bg-white",
}: {
  items: string[];
  dotClass?: string;
}) => (
  <ul className="space-y-1.5">
    {items.map((item, i) => (
      <li
        key={i}
        className="flex items-start gap-2 text-sm md:text-base text-neutral-200"
      >
        <span
          className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${dotClass}`}
        />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

/** Card shell for each case study (text + visual layout) */
const CaseStudyCard = ({
  title,
  subtitle,
  kicker,
  description,
  left,
  right,
  reverseOnLg = false,
}: {
  title: string;
  subtitle?: string;
  kicker?: string;
  description: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  reverseOnLg?: boolean;
}) => (
  <div className="group relative">
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] p-4 md:p-6 transition-transform duration-500 hover:scale-[1.01]">
      <div
        className={`grid gap-4 md:gap-6 lg:grid-cols-2 items-center ${
          reverseOnLg ? "lg:[&>div:first-child]:order-2" : ""
        }`}
      >
        {/* Content */}
        <div className="space-y-3">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1.5">
              {title}
            </h2>
            {subtitle && (
              <h3 className="text-lg md:text-2xl font-bold text-neutral-200 leading-snug">
                {subtitle}
              </h3>
            )}
            {kicker && (
              <p className="text-xs md:text-sm text-neutral-400 mt-1.5 italic">
                {kicker}
              </p>
            )}
          </div>

          <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
            {description}
          </p>

          {left}
        </div>

        {/* Visual */}
        <div className="relative flex justify-center">{right}</div>
      </div>
    </div>
  </div>
);

/** Overlapping 2-image layout — centered inside the card */
const OverlapMedia = ({
  a,
  b,
}: {
  a: { src: string; alt: string; label?: string; sublabel?: string };
  b: { src: string; alt: string; label?: string; sublabel?: string };
}) => {
  return (
    <div className="relative w-full flex justify-center">
      {/* Centered wrapper that both images anchor to */}
      <div className="relative w-[80%] max-w-md">
        {/* Image A (bottom, larger) */}
        <figure className="group relative w-full aspect-[5/3] rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
          <img
            src={a.src}
            alt={a.alt}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <figcaption className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white">
            {a.label && (
              <div className="text-xs sm:text-sm font-semibold">{a.label}</div>
            )}
            {a.sublabel && (
              <div className="text-[10px] sm:text-xs text-white/80">
                {a.sublabel}
              </div>
            )}
          </figcaption>
        </figure>

        {/* Image B (smaller, overlapping, aligned to the right of the centered wrapper) */}
        <figure className="group absolute -top-6 right-0 w-[52%] aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.55)] rotate-3 hover:rotate-0 transition-[transform,box-shadow] duration-500">
          <img
            src={b.src}
            alt={b.alt}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/20 to-transparent text-white">
            {b.label && (
              <div className="text-xs sm:text-sm font-semibold">{b.label}</div>
            )}
            {b.sublabel && (
              <div className="text-[10px] sm:text-xs text-white/80">
                {b.sublabel}
              </div>
            )}
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

const AdvartShowcase = () => {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* Ambient background effects (monochrome) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60rem_40rem_at_80%_-10%,rgba(255,255,255,0.08),transparent)]" />
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,transparent_0,transparent_23%,rgba(255,255,255,0.15)_24%,transparent_25%,transparent_100%),linear-gradient(to_bottom,transparent_0,transparent_23%,rgba(255,255,255,0.15)_24%,transparent_25%,transparent_100%)] bg-[length:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(100rem_40rem_at_50%_120%,rgba(0,0,0,0.6),transparent)]" />
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-8 md:pt-12 text-center">
        <h1 className="font-light mb-2 text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          All exciting things we do at{" "}
          <span className="text-white font-semibold">Advart...</span>
        </h1>
        <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-neutral-400 leading-relaxed font-light mt-3 max-w-4xl mx-auto">
          From scaling a brand from ₹30K to ₹3Cr, to building a homegrown brand
          like Zing, to creating many more meaningful brand stories… We love
          doing it all, while nailing it right!
        </p>
      </div>

      {/* Case Studies */}
      <div className="max-w-6xl mx-auto px-6 py-8 md:py-12">
        <div className="space-y-8 md:space-y-12">
          {/* Beelittle */}
          <CaseStudyCard
            title="Beelittle"
            description="Beelittle turned 10, and we knew the celebration had to feel just as special as the journey. So, we went above and beyond to make this milestone a part of every tiny one's home."
            left={
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    What did Advart do?
                  </h4>
                  <Bullets
                    items={[
                      "30-Day Strong Digital Campaign",
                      "Private Screening & Celebration for Followers",
                      "Custom Storybook",
                    ]}
                    dotClass="bg-white"
                  />
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    And the result?
                  </h4>
                  <p className="text-sm md:text-base text-neutral-200 leading-relaxed">
                    A celebration that brought in strong community engagement,
                    built deeper trust and skyrocketed brand awareness… all of
                    which positively reflected in sales.
                  </p>
                </div>
              </div>
            }
            right={
              <OverlapMedia
                a={{
                  src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1400&q=80",
                  alt: "Beelittle anniversary crowd moment",
                  label: "10 Years",
                  sublabel: "Milestone Celebration",
                }}
                b={{
                  src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
                  alt: "Storybook & screening event",
                  label: "Community Love",
                  sublabel: "Storybook • Screening",
                }}
              />
            }
          />

          {/* Prathiksham */}
          <CaseStudyCard
            title="Prathiksham"
            description="A well-known homegrown designer with 15 years of experience wanted to launch her own brand. She came to us with a dream and together, we made it real."
            reverseOnLg
            left={
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    What did we help her with?
                  </h4>
                  <Bullets
                    items={[
                      "Business Consulting",
                      "Branding & Website Presence",
                      "Social Media Presence",
                    ]}
                    dotClass="bg-white"
                  />
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    And what happened?
                  </h4>
                  <p className="text-sm md:text-base text-neutral-200 leading-relaxed">
                    Her kurta line is now a go-to in every working woman's
                    wardrobe. Sales have peaked and the label has grown into a
                    name that many proudly recognise.
                  </p>
                </div>
              </div>
            }
            right={
              <OverlapMedia
                a={{
                  src: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=80",
                  alt: "Editorial lookbook shoot",
                  label: "Fashion Brand",
                  sublabel: "Brand Launch",
                }}
                b={{
                  src: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
                  alt: "E-commerce & social grid",
                  label: "Presence",
                  sublabel: "Web • Social",
                }}
              />
            }
          />
        </div>
      </div>      
    </section>
  );
};

export default AdvartShowcase;
