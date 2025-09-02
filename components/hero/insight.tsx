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


// import React, { useEffect, useMemo, useRef, useState } from "react";

// /* ---------- utils ---------- */
// const clamp = (n: number, min = 0, max = 1) => Math.max(min, Math.min(max, n));

// /* ---------- types ---------- */
// type Slide = {
//   imageSrc: string;
//   category: string;
//   title: string;
//   description: string;
//   services: string[];
//   outcome: string;
// };

// /* ---------- scroll-reveal + slider ---------- */
// const HeroScrollSlider = ({
//   slides,
//   autoInterval = 6000,
// }: {
//   slides: Slide[];
//   autoInterval?: number;
// }) => {
//   const trackRef = useRef<HTMLDivElement | null>(null);
//   const [p, setP] = useState(0); // scroll progress
//   const [i, setI] = useState(0); // active slide
//   const len = slides.length;

//   // scroll progress
//   useEffect(() => {
//     const el = trackRef.current;
//     if (!el) return;
//     const onScroll = () => {
//       const rect = el.getBoundingClientRect();
//       const vh = window.innerHeight;
//       const raw = 1 - (rect.bottom - vh) / rect.height;
//       setP(clamp(raw));
//     };
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     window.addEventListener("resize", onScroll);
//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", onScroll);
//     };
//   }, []);

//   // slider controls
//   const go = (next: number) => setI((s) => (next + len) % len);
//   const next = () => go(i + 1);
//   const prev = () => go(i - 1);

//   // keyboard
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "ArrowRight") next();
//       if (e.key === "ArrowLeft") prev();
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [i, len]);

//   // auto scroll
//   useEffect(() => {
//     const id = setInterval(() => {
//       next();
//     }, autoInterval);
//     return () => clearInterval(id);
//   }, [i, autoInterval]);

//   // animation values
//   const inset = 25 * (1 - p);
//   const scale = 1.12 - 0.12 * p;
//   const textOpacity = 0.35 + 0.65 * p;

//   // render slides
//   const renderedSlides = useMemo(
//     () =>
//       slides.map((s, idx) => {
//         const active = idx === i;
//         return (
//           <div
//             key={idx}
//             className="absolute inset-0"
//             style={{
//               opacity: active ? 1 : 0,
//               transform: `translateX(${
//                 active ? "0%" : idx < i ? "-4%" : "4%"
//               }) scale(${scale})`,
//               transition:
//                 "opacity 600ms ease, transform 700ms cubic-bezier(.22,.61,.36,1)",
//               clipPath: `inset(${inset}% ${inset}% ${inset}% ${inset}%)`,
//               willChange: "transform, opacity, clip-path",
//             }}
//           >
//             <img
//               src={s.imageSrc}
//               alt=""
//               className="w-full h-full object-cover"
//             />
//             {/* slightly dim overlay */}
//             <div className="absolute inset-0 bg-black/35" />
//           </div>
//         );
//       }),
//     [slides, i, inset, scale]
//   );

//   const slide = slides[i];

//   return (
//     <section ref={trackRef} className="h-[160vh] bg-[#F6F7F9]">
//       <div className="sticky top-0 h-screen overflow-hidden">
//         {/* background slides */}
//         <div className="absolute inset-0">{renderedSlides}</div>

//         {/* overlay content */}
//         <div className="relative z-10 h-full flex items-end md:items-center">
//           <div
//             className="w-full max-w-5xl mx-auto px-6 py-12 md:py-16"
//             style={{ opacity: textOpacity, transition: "opacity 150ms linear" }}
//           >
//             <p className="text-xs uppercase tracking-widest text-neutral-300 mb-3">
//               {slide.category}
//             </p>
//             <h2 className="text-3xl md:text-5xl font-medium mb-4 leading-tight text-white">
//               {slide.title}
//             </h2>
//             <p className="text-base md:text-xl text-neutral-200 max-w-2xl leading-relaxed mb-6">
//               {slide.description}
//             </p>

//             <div className="grid md:grid-cols-2 gap-8">
//               <div>
//                 <h4 className="text-xs font-medium text-neutral-300 mb-2">
//                   Services
//                 </h4>
//                 <ul className="space-y-2">
//                   {slide.services.map((sv, k) => (
//                     <li
//                       key={k}
//                       className="flex items-start gap-3 text-sm text-neutral-200"
//                     >
//                       <span className="w-1 h-1 rounded-full bg-white/70 mt-2.5 flex-shrink-0" />
//                       <span>{sv}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div>
//                 <h4 className="text-xs font-medium text-neutral-300 mb-2">
//                   Outcome
//                 </h4>
//                 <p className="text-sm md:text-base text-neutral-200/90 leading-relaxed">
//                   {slide.outcome}
//                 </p>
//               </div>
//             </div>

//             {/* nav */}
//             <div className="mt-8 flex items-center justify-between">
//               <div className="flex gap-2">
//                 {slides.map((_, d) => (
//                   <button
//                     key={d}
//                     onClick={() => go(d)}
//                     aria-label={`Go to slide ${d + 1}`}
//                     className={`h-1.5 rounded-full transition-all ${
//                       d === i
//                         ? "w-8 bg-white"
//                         : "w-3 bg-white/40 hover:bg-white/70"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={prev}
//                   className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 transition text-white"
//                 >
//                   ‹
//                 </button>
//                 <button
//                   onClick={next}
//                   className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 transition text-white"
//                 >
//                   ›
//                 </button>
//               </div>
//             </div>

//             <div className="mt-8 h-px w-full bg-white/20" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// /* ---------- page ---------- */
// const AdvartShowcase = () => {
//   const slides: Slide[] = [
//     {
//       imageSrc:
//         "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&q=80",
//       category: "Community • Campaign • IP",
//       title: "Beelittle",
//       description:
//         "Beelittle turned 10, and the celebration had to feel as special as the journey. We transformed the milestone into moments that reached every tiny one's home.",
//       services: [
//         "30-day digital campaign",
//         "Private screening & celebration",
//         "Custom storybook",
//       ],
//       outcome:
//         "Strong community engagement, deeper trust, and a visible lift in brand awareness—reflected directly in sales.",
//     },
//     {
//       imageSrc:
//         "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80",
//       category: "Consulting • Brand • Commerce",
//       title: "Prathiksham",
//       description:
//         "A homegrown designer with 15 years of experience wanted to launch her own label. She came with a dream—we built the brand and the engine behind it.",
//       services: ["Business consulting", "Branding & website", "Social presence"],
//       outcome:
//         "A go-to kurta line for working women; peak sales and a label people now recognise and seek out.",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-[#F6F7F9] text-black">
//       <header className="max-w-5xl mx-auto px-6 py-12 md:py-16 text-center">
//         <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">
//           What we do
//         </p>
//         <h1 className="text-2xl md:text-3xl font-medium text-black">
//           Work at <span className="font-semibold">Advart</span>
//         </h1>
//         <p className="text-sm md:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed mt-3">
//           From scaling brands to building meaningful stories—our focus is doing
//           fewer things exceptionally well.
//         </p>
//       </header>

//       {/* one animated hero with auto slider */}
//       <HeroScrollSlider slides={slides} autoInterval={6000} />

//       <div className="max-w-5xl mx-auto px-6 pb-24">
//         {/* more content here */}
//       </div>
//     </div>
//   );
// };

// export default AdvartShowcase;








// export default function ClientProjectsReel() {
//   return (
//     <main className="bg-[#F6F7F9] text-black">
//       {/* Header */}
//       <header className="px-8 py-20 sm:py-12 md:py-16 lg:pt-20 xl:py-24">
//         <div className="max-w-6xl w-full mx-auto text-center">
//           <h1 className="text-xl xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-tight mb-3">
//             Client Projects
//           </h1>
//           <p className="text-black/70">Selected work and case studies</p>
//         </div>
//       </header>

//       {/* Layout */}
//       <section className="px-8 pb-20 sm:pb-12 md:pb-16 xl:pb-24">
//         <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-12 items-stretch gap-12 xl:gap-16">
//           {/* Reel (left) */}
//           <div className="lg:col-span-4">
//             <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white">
//               <video
//                 className="absolute inset-0 h-full w-full object-cover"
//                 playsInline
//                 autoPlay
//                 muted
//                 loop
//                 controls={false}
//                 poster="/portrait-video-placeholder.png"
//                 preload="metadata"
//                 disablePictureInPicture
//                 controlsList="nodownload nofullscreen noplaybackrate"
//               >
//                 <source src="/hero/zing/three.webm" type="video/webm" />
//               </video>
//               {/* Fixed portrait (reel) aspect */}
//               <div className="invisible pt-[140%]" />
//             </div>
//           </div>

//           {/* Right column */}
//           <div className="lg:col-span-8 min-h-0">
//             <div className="h-full min-h-0 flex flex-col">
//               {/* Main content */}
//               <article className="space-y-6">
//                 <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight">
//                   Prathiksham
//                 </h2>
//                 <p className="text-black/70 leading-relaxed">
//                   Transforming a 15-year design veteran&apos;s vision into a
//                   recognized fashion label through strategic branding and digital
//                   presence.
//                 </p>

//                 <div className="grid sm:grid-cols-2 gap-6">
//                   <div className="space-y-3 text-black/80">
//                     <h3 className="text-sm font-medium tracking-wide uppercase">
//                       Our Approach
//                     </h3>
//                     <ul className="space-y-2">
//                       <li className="flex gap-3">
//                         <span className="w-1.5 h-1.5 rounded-full bg-black/30 mt-2" />
//                         Strategic business consulting
//                       </li>
//                       <li className="flex gap-3">
//                         <span className="w-1.5 h-1.5 rounded-full bg-black/30 mt-2" />
//                         Complete brand identity system
//                       </li>
//                       <li className="flex gap-3">
//                         <span className="w-1.5 h-1.5 rounded-full bg-black/30 mt-2" />
//                         Digital presence &amp; social strategy
//                       </li>
//                     </ul>
//                   </div>

//                   <div className="space-y-3">
//                     <h3 className="text-sm font-medium tracking-wide uppercase">
//                       Impact
//                     </h3>
//                     <p className="text-black/70 leading-relaxed">
//                       The kurta line became essential in working women&apos;s
//                       wardrobes. Peak sales achieved with strong brand recognition
//                       across the market.
//                     </p>
//                   </div>
//                 </div>
//               </article>

//               {/* Bento images (side by side, fills remaining height) */}
//               <div className="grow min-h-0 mt-8">
//                 <div className="grid grid-cols-2 gap-4 h-full">
//                   <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white">
//                     <img
//                       src="/your-image-1.jpg"
//                       alt="Bento image 1"
//                       className="h-full w-full object-cover"
//                       draggable={false}
//                     />
//                   </div>
//                   <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white">
//                     <img
//                       src="hero/contact/spotlight.png"
//                       alt="Bento image 2"
//                       className="h-full w-full object-cover"
//                       draggable={false}
//                     />
//                   </div>
//                 </div>
//               </div>
//               {/* End bento */}
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }


"use client"

import type React from "react"
import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/* -------------------- CARD STACK WITH CONTENT LAYOUT -------------------- */
type Card = { 
  imageSrc: string
  imageAlt?: string
  title: string
  description: string
  whatTried: string[]
  result: string
}

const GsapStackScroll: React.FC = () => {
  const cards: Card[] = [
    {
      imageSrc: "hero/zing/bee-little.png",
      title: "Beelittle",
      description: "10 YEARS OF BEELITTLE (A campaign that stays close to our heart) Beelittle turned 10, and we knew the celebration had to feel just as special as the journey. So, we went above and beyond to make this milestone a part of every tiny one’s home.",
      whatTried: [
        "30-Day Strong Digital Campaign",
        "Private Screening & Celebration for Followers",
        "Custom Storybook",
      ],
      result: "A celebration that brought in strong community engagement, built deeper trust and skyrocketed brand awareness… all of which positively reflected in sales."
    },
    { 
      imageSrc: "/hero/zing/zing.png",
      title: "Zing",
      description: "A homegrown kurta brand that feels like home to us... because we built it from scratch, turning failures into lessons and growth into success.",
      whatTried: [
        "Almost everything...",
        "From consulting to strategy.",
        "Production to post-production...",
        "Everything it takes to make a brand stand tall.",
        "We tested and tried it all with Zing."
      ],
      result: "A celebration that brought in strong community engagement, built deeper trust and skyrocketed brand awareness... all of which positively reflected in sales."
    },
    
    {
      imageSrc: "hero/zing/prathiksham.png",
      title: "Prathiksham",
      description: "A well-known homegrown designer with 15 years of experience wanted to launch her own brand. She came to us with a dream and together, we made it real.",
      whatTried: [
        "Business Consulting",
        "Branding & Website Presence",
        "Social Media Presence",
      ],
      result: "Her kurta line is now a go-to in every working woman’s wardrobe. Sales have peaked and the label has grown into a name that many proudly recognise."
    },
  ]

  const wrapRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<HTMLDivElement[]>([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const steps = cards.length - 1
      const isMobile = window.innerWidth < 768
      const stepPx = isMobile ? window.innerHeight * 1.5 : Math.max(window.innerHeight * 1.25, 1000)
      const endDistance = steps > 0 ? `+=${Math.round(stepPx * steps)}` : "+=0"

      cardRefs.current.forEach((el, i) => {
        gsap.set(el, {
          yPercent: i === 0 ? 0 : 100,
          opacity: i === 0 ? 1 : 0,
          zIndex: 10 + i,
          willChange: "transform, opacity, filter",
          force3D: true,
          scale: 1,
          filter: "blur(0px)"
        })

        // Animate content within each card
        const heading = el.querySelector('.card-heading')
        const description = el.querySelector('.card-description')
        const whatTried = el.querySelector('.card-what-tried')
        const result = el.querySelector('.card-result')
        const image = el.querySelector('.card-image')

        if (i === 0) {
          // First card starts visible, animate content in
          gsap.set([heading, description, whatTried, result], {
            y: isMobile ? 30 : 50,
            opacity: 0
          })
          gsap.set(image, {
            x: isMobile ? 30 : 50,
            opacity: 0,
            rotation: isMobile ? 3 : 5
          })

          gsap.to([heading, description, whatTried, result], {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out",
            delay: 0.5
          })

          gsap.to(image, {
            x: 0,
            opacity: 1,
            rotation: 0,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.3
          })
        } else {
          // Other cards animate in when they become active
          gsap.set([heading, description, whatTried, result], {
            y: isMobile ? 60 : 100,
            opacity: 0
          })
          gsap.set(image, {
            x: isMobile ? 60 : 100,
            opacity: 0,
            rotation: isMobile ? 7 : 10
          })
        }
      })

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 1 },
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: endDistance,
          pin: true,
          pinSpacing: true,
          scrub: isMobile ? 2 : 3,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: steps > 0 ? {
            snapTo: (v) => Math.round(v * steps) / steps,
            duration: { min: 0.4, max: 1 },
            ease: "power2.out",
          } : false,
        },
      })

      cards.forEach((_, i) => {
        const curr = cardRefs.current[i]
        const prev = cardRefs.current[i - 1]

        if (curr && i > 0) {
          // Animate current card in
          tl.fromTo(
            curr,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1 },
            ">"
          )

          // Animate content within the new card
          const heading = curr.querySelector('.card-heading')
          const description = curr.querySelector('.card-description')
          const whatTried = curr.querySelector('.card-what-tried')
          const result = curr.querySelector('.card-result')
          const image = curr.querySelector('.card-image')

          tl.to([heading, description, whatTried, result], {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out"
          }, "<+0.3")

          tl.to(image, {
            x: 0,
            opacity: 1,
            rotation: 0,
            duration: 1.2,
            ease: "power2.out"
          }, "<+0.2")
        }

        if (prev && i > 0) {
          // Enhanced previous card animation with blur and shrink
          tl.to(prev, { 
            scale: isMobile ? 0.85 : 0.92, 
            yPercent: isMobile ? -12 : -8, 
            opacity: 0.3,
            filter: "blur(8px)",
            duration: 0.8 
          }, "<+0.1")
          .set(prev, { 
            zIndex: 1, 
            pointerEvents: "none",
            filter: "blur(12px)",
            opacity: 0
          }, ">-0.2")
        }
      })

      ScrollTrigger.refresh()
    }, wrapRef)

    return () => ctx.revert()
  }, [cards.length])

  cardRefs.current = []

  return (
    <section className="relative w-full">
      <div
        ref={wrapRef}
        className="relative min-h-screen w-full overflow-visible"
      >
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="relative w-[95%] sm:w-[97%] lg:w-[99%] max-w-7xl mx-auto h-[85vh] sm:h-[88vh] lg:h-[90vh]">
            {cards.map((card, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) cardRefs.current[i] = el
                }}
                className="absolute inset-0"
                style={{ zIndex: 10 + i }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl ring-1 ring-black/5 will-change-transform bg-black text-white">
                  
                  {/* Card Content Layout */}
                  <div className="h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                    <div className="max-w-7xl mx-auto w-full">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
                        
                        {/* Left Content */}
                        <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
                          {/* Main Heading */}
                          <div className="card-heading">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light mb-3 sm:mb-4 lg:mb-6 leading-tight">
                              {card.title}
                            </h1>
                            <div className="card-description">
                              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light leading-relaxed text-gray-200">
                                {card.description}
                              </p>
                            </div>
                          </div>

                          {/* What did we try? */}
                          <div className="card-what-tried space-y-2 sm:space-y-3 lg:space-y-4">
                            <h3 className="text-xs sm:text-sm font-medium text-white">What did we try?</h3>
                            <ul className="space-y-1 sm:space-y-2 text-gray-300">
                              {card.whatTried.map((item, idx) => (
                                <li key={idx} className="flex items-start text-xs sm:text-xs lg:text-sm">
                                  <span className="text-white mr-2 mt-0.5">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* And the result? */}
                          <div className="card-result space-y-2 sm:space-y-3 lg:space-y-4">
                            <h3 className="text-xs sm:text-sm font-medium text-white">And the result?</h3>
                            <p className="text-gray-300 leading-relaxed text-xs sm:text-xs lg:text-sm">
                              {card.result}
                            </p>
                          </div>
                        </div>

                        {/* Right Image */}
                        <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                          <div className="card-image relative w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg">
                            <div className="relative">
                              <img 
                                src={card.imageSrc}
                                alt={card.imageAlt ?? `${card.title} brand showcase`}
                                className="w-full h-auto object-contain rounded-lg"
                              />
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Background Elements */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-blue-500/5 rounded-full blur-2xl sm:blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-purple-500/5 rounded-full blur-2xl sm:blur-3xl"></div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------- PAGE SECTION -------------------- */

export default function AdvartSection() {
  return (
    <section id="advart" className="scroll-mt-24 md:scroll-mt-32">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-8 sm:pb-10 md:pb-12 lg:pb-14">
        <div className="flex flex-col items-center justify-center text-black bg-[#F6F7F9] rounded-xl sm:rounded-2xl">
          {/* Heading block */}
          <section className="w-full mb-6 sm:mb-8 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light mb-3 sm:mb-4 leading-tight">
                All exciting things we do at{" "}
                <span className="font-semibold">Advart...</span>
              </h2>
              <p className="text-sm sm:text-base text-black/70 leading-relaxed font-light whitespace-pre-line max-w-sm sm:max-w-xl lg:max-w-2xl mx-auto">
                From scaling a brand from ₹30K to ₹3Cr, to building a homegrown
                brand like Zing, to creating many more meaningful brand stories…
                We love doing it all, while nailing it right!
              </p>
            </div>
          </section>

          {/* Enhanced Animation with content layout */}
          <div className="w-full">
            <GsapStackScroll />
          </div>
        </div>
      </div>
    </section>
  )
}