"use client";
import { useEffect, useRef } from "react";

interface Props {
  videoUrls: string[];
  className?: string;
}

export default function SocialArcReels({ videoUrls, className }: Props) {
  const desktopRefs = useRef<HTMLVideoElement[]>([]);
  const mobileRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    const vids = [...desktopRefs.current, ...mobileRefs.current].filter(Boolean);
    vids.forEach(v => {
      v.muted = true;
      v.play().catch(() => {});
    });
  }, []);

  const desktopOffsets = [-20, 20, -20, 20, -20];

  return (
    <section className={`w-full bg-white ${className || ""}`}>

      {/* Desktop Zig-Zag */}
      <div className="hidden sm:flex justify-center items-end gap-10">
        {videoUrls.map((url, i) => (
          <div
            key={i}
            className="relative w-52 h-[460px] overflow-hidden rounded-md flex justify-center items-center"
            style={{ transform: `translateY(${desktopOffsets[i] ?? 0}px)` }}
          >
            <video
              ref={el => el && (desktopRefs.current[i] = el)}
              src={url}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="sm:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 pb-4 scrollbar-hide">
        {videoUrls.map((url, i) => (
          <div
            key={i}
            className="snap-center flex-shrink-0 relative w-40 h-[350px] rounded-2xl overflow-hidden flex justify-center items-center"
          >
            <video
              ref={el => el && (mobileRefs.current[i] = el)}
              src={url}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

    </section>
  );
}
