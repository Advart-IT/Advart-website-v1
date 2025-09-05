"use client"

import { useEffect, useState, type ReactNode } from "react"
// Core Lenis (no React wrapper) — version-safe.
import Lenis from "lenis"

export default function LenisProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Respect reduced motion; enable only for mouse/trackpad
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    const pointerFine = window.matchMedia?.("(pointer: fine)")?.matches ?? false
    setEnabled(pointerFine && !prefersReduced)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({
       duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      // @ts-ignore - lenis may not expose a destroy type in some versions
      lenis.destroy?.()
    }
  }, [enabled])

  return <>{children}</>
}
