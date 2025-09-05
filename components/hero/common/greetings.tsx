"use client";
import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

const greetings = ["• வணக்கம்", "• ഹലോ", "• Hello"];

interface GreetingsProps {
  onComplete: () => void;
}

export default function Greetings({ onComplete }: GreetingsProps) {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Check if we should show greeting at all
  useEffect(() => {
    const shouldShowGreeting = document.documentElement.getAttribute('data-intro') === '1';
    if (!shouldShowGreeting) {
      setShow(false);
      onComplete();
      return;
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animate text changes with GSAP
  useEffect(() => {
    if (!show || !textRef.current) return;

    // Animate in the new greeting
    gsap.fromTo(textRef.current, 
      { 
        opacity: 0, 
        y: 30,
        scale: 0.8
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.4)"
      }
    );

    // Set up next greeting or finish
    const timer = setTimeout(() => {
      if (index < greetings.length - 1) {
        // Animate out current greeting
        gsap.to(textRef.current, {
          opacity: 0,
          y: -30,
          scale: 0.8,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => setIndex(prev => prev + 1)
        });
      } else {
        // Final greeting shown, prepare to finish
        setTimeout(() => finish(), 1200);
      }
    }, index < greetings.length - 1 ? 1400 : 0);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, show]);

  function finish() {
    if (!containerRef.current) return;

    // Create timeline for ultra-smooth slide-up reveal
    const tl = gsap.timeline({
      onComplete: () => {
        // Clean up after animation - unlock scroll and remove overlay
        const root = document.documentElement;
        root.removeAttribute("data-intro");
        
        // Restore normal scrolling
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.height = "";

        // Clean up base style
        const base = document.getElementById("advart-base-style");
        if (base && base.parentNode) base.parentNode.removeChild(base);

        setShow(false);
        onComplete();
      }
    });

    // Ultra-smooth slide-up animation - content is already ready underneath!
    tl.to(containerRef.current, {
      y: "-100vh",
      duration: 1.4,
      ease: "power4.inOut"
    })
    // Simultaneous fade for extra smoothness
    .to(containerRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.6"); // Start fade earlier for seamless transition
  }

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      style={styles.container}
      aria-modal
      role="dialog"
    >
      <div
        ref={textRef}
        style={{ color: "#FFDC38", ...styles.text }}
        className="font-normal"
      >
        {greetings[index] || ""}
      </div>
      
      {/* Optional: Add a subtle pattern or gradient for visual interest */}
      <div style={styles.backgroundPattern} />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "fixed",
    inset: 0,
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2.5rem",
    fontWeight: "bold",
    zIndex: 10000, // Higher than content
    willChange: "transform, opacity",
  },
  text: {
    willChange: "transform, opacity",
    textAlign: "center",
    userSelect: "none",
    position: "relative",
    zIndex: 1,
  },
  backgroundPattern: {
    position: "absolute",
    inset: 0,
    opacity: 0.03,
    background: `
      radial-gradient(circle at 25% 25%, #FFDC38 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, #FFDC38 0%, transparent 50%)
    `,
    pointerEvents: "none",
  },
};