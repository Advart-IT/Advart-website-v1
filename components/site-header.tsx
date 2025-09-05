"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showNavbar, setShowNavbar] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isHoveringTop, setIsHoveringTop] = useState(false)

  const toggleMenu = () => setIsMenuOpen((v) => !v)

  // Lock body scroll when menu is open
  useEffect(() => {
    const { style } = document.body
    const prev = style.overflow
    style.overflow = isMenuOpen ? "hidden" : prev || "auto"
    return () => { style.overflow = prev || "auto" }
  }, [isMenuOpen])

  // Auto-close menu on desktop resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) setIsMenuOpen(false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [isMenuOpen])

  // Scroll detection
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    const onScroll = () => {
      setIsScrolling(true)
      clearTimeout(t)
      t = setTimeout(() => setIsScrolling(false), 1500)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t) }
  }, [])

  // Desktop: show when mouse near top
  useEffect(() => {
    const onMove = (e: MouseEvent) => setIsHoveringTop(e.clientY <= 100)
    document.addEventListener("mousemove", onMove)
    return () => document.removeEventListener("mousemove", onMove)
  }, [])

  useEffect(() => {
    setShowNavbar(isScrolling || isHoveringTop || isMenuOpen)
  }, [isScrolling, isHoveringTop, isMenuOpen])

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 shadow-sm transition-all duration-500 ease-out"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px))" }}
      >
        <div className="w-full flex items-center justify-between bg-[#F6F7F9] text-black/90 
                        px-4 sm:px-6 lg:px-8 py-2 sm:py-3 md:py-2">
          <Link
            href="/"
            className="flex items-center gap-2 font-light text-lg sm:text-xl transition-all duration-300 ease-out hover:scale-105 hover:text-black"
          >
            <img src="/logo-1.png" alt="Advart Logo" className="w-11 h-11 sm:w-16 sm:h-16 object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-4 lg:gap-6 items-center justify-center flex-grow">
            {[
              { href: "/", label: "Home", delay: "delay-100" },
              { href: "/aboutus", label: "About", delay: "delay-200" },
              { href: "/careers", label: "Careers", delay: "delay-300" },
              { href: "/contactus", label: "Contact", delay: "delay-500" },
            ].map((item) => (
              <div
                key={item.href}
                className={`${isVisible ? `animate-in fade-in slide-in-from-bottom-2 duration-500 ${item.delay}` : "opacity-0"}`}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-black/80 hover:text-black hover:underline underline-offset-4 transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-0.5"
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Mobile: animated hamburger */}
          <button
            onClick={toggleMenu}
            className={`md:hidden p-3 rounded-lg transition-all duration-300 ease-out active:scale-95
                       ${isMenuOpen ? "rotate-90" : "rotate-0"}`}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="relative h-6 w-6">
              <Menu className={`absolute inset-0 h-6 w-6 text-black transition-opacity duration-200 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
              <X className={`absolute inset-0 h-6 w-6 text-black transition-opacity duration-200 ${isMenuOpen ? "opacity-100" : "opacity-0"}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu overlay */}
        <div
          id="mobile-menu"
          className={`md:hidden fixed inset-0 z-[100] transition-opacity duration-300
            ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
          }}
          aria-hidden={!isMenuOpen}
        >
          <div className="relative h-full w-full">
            {/* Close button */}
            <button
              onClick={toggleMenu}
              className="absolute right-4 p-3 rounded-full hover:bg-gray-200 transition active:scale-95 pointer-events-auto z-[200]"
              style={{ top: "calc(env(safe-area-inset-top, 0px) + 8px)" }}
              aria-label="Close navigation menu"
            >
              <X className="h-6 w-6 text-black" />
            </button>

            {/* Sliding panel */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center w-full
                          px-6 pt-20 pb-12 text-black transform transition-all duration-300
                          ${isMenuOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-[0.99]"}`}
              style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 5rem)" }}
            >
              {/* Logo inside mobile menu */}
              <Link
                href="/"
                onClick={toggleMenu}
                className={`mb-14 transition-transform duration-200 hover:scale-105
                            ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
                style={{ transitionDelay: "80ms" }}
                aria-label="Go to home"
              >
                <img
                  src="/logo-1.png"
                  alt="Advart Logo"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                />
              </Link>

              <nav className="flex flex-col items-center gap-8 text-center">
                {[
                  { href: "/", label: "Home" },
                  { href: "/aboutus", label: "About us" },
                  { href: "/careers", label: "Careers" },
                  { href: "/contactus", label: "Contact Us" },
                ].map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={toggleMenu}
                    className={`text-2xl font-medium transition-all duration-300 hover:scale-105
                                ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                    style={{ transitionDelay: `${120 * (i + 2)}ms` }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
