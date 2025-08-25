"use client"

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react"
import Lenis from "@studio-freight/lenis"

type LenisContextValue = { lenis: Lenis | null }
const LenisContext = createContext<LenisContextValue>({ lenis: null })

export function useLenis() {
  return useContext(LenisContext).lenis
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
      gestureDirection: "vertical",
    })
    lenisRef.current = lenis

    const raf = (t: number) => {
      lenis.raf(t)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    // optional: restore scroll on route changes if using Next App Router
    const onHash = () => {
      const hash = decodeURIComponent(window.location.hash.replace("#", ""))
      if (!hash) return
      const el = document.getElementById(hash)
      if (el) lenis.scrollTo(el, { lock: true })
    }
    window.addEventListener("hashchange", onHash, false)
    onHash()

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("hashchange", onHash)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  )
}
