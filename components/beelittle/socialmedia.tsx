"use client";
import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CurvedArcProps {
  imageUrls: string[];
  className?: string;
}

export default function CurvedArc({ imageUrls }: CurvedArcProps) {
  const [isMobile, setIsMobile] = useState(false);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const imgSize = isMobile ? 130 : 230;

  const spread = Math.min(190, 60 + imageUrls.length * 12);
  const radius = isMobile
    ? 160 + imageUrls.length * 10
    : 240 + imageUrls.length * 18;

  const arcHeight = radius * 0.78;

  useEffect(() => {
    const ctx = gsap.context(() => {
      imageRefs.current.forEach((card, i) => {
        if (!card) return;

        const angle = -spread / 2 + (spread / (imageUrls.length - 1)) * i;
        const rad = (angle * Math.PI) / 180;

        const x = radius * Math.sin(rad);
        const y = -radius * Math.cos(rad);

        gsap.fromTo(
          card,
          { x: 0, y: 0, rotation: 0, scale: 0.74 },
          {
            x,
            y,
            rotation: angle / 3,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: i * 0.05,
            scrollTrigger: {
              trigger: containerRef.current,
              start: isMobile ? "top 90%" : "center 95%",
              end: "center 40%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [imageUrls.length, radius, spread, isMobile]);

  return (
    <div className="w-full flex justify-center items-center overflow-visible">
      <div
        ref={containerRef}
        className="relative flex items-center justify-center"
        style={{
          width: radius * 2,
          height: arcHeight,
        }}
      >
        <img
          src="/beelittle/beee-01.svg"
          className="absolute z-20 pointer-events-none"
          style={{
            width: isMobile ? 60 : 110,
            height: isMobile ? 60 : 110,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {imageUrls.map((url, i) => (
          <div
            key={i}
            ref={(el) => (imageRefs.current[i] = el)}
            className="absolute rounded-xl shadow-xl bg-white overflow-hidden"
            style={{
              width: imgSize,
              height: imgSize,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <img
              src={url}
              className="w-full h-full object-cover"
              alt={`arc-img-${i}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
