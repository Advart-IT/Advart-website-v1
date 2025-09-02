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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMenuOpen])

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      setIsScrolling(true)
      clearTimeout(scrollTimeout)

      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 1500) // Hide after 1.5 seconds of no scrolling
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Show navbar when mouse is in top 100px of viewport
      setIsHoveringTop(e.clientY <= 100)
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    setShowNavbar(isScrolling || isHoveringTop || isMenuOpen)
  }, [isScrolling, isHoveringTop, isMenuOpen])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <header
        className="fixed top-0 w-full flex items-center justify-center transition-all duration-500 ease-out z-50 shadow-sm"
      >
        <div
          className="w-full  flex items-center justify-between text-black/90 px-4 sm:px-6 lg:px-8  bg-[#F6F7F9]"
        >
          <Link
            href="/home"
            className="flex items-center gap-2 font-light text-lg sm:text-xl transition-all duration-300 ease-out hover:scale-105 hover:text-black"
          >
            <img src="/logo.png" alt="Advart Logo" className="w-11 h-11 sm:w-16 sm:h-16 object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-4 lg:gap-6 items-center justify-center flex-grow py-4">
            {[
              {
                href: "/home",
                label: "Home",
                delay: "delay-100",
              },
              {
                href: "/aboutus",
                label: "About us",
                delay: "delay-200",
              },
              {
                href: "/careers",
                label: "Careers",
                delay: "delay-300",
              },
              {
                href: "/contactus",
                label: "Contact Us",
                delay: "delay-500",
              },
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

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-white/20 rounded-lg transition-all duration-300 ease-out touch-manipulation hover:scale-110 active:scale-95"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <div className="transition-transform duration-300 ease-out">
              {isMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6 text-black animate-in spin-in-180 duration-300" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
              )}
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`fixed inset-0 z-[100] transition-all duration-500 ease-out ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          } md:hidden`}
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(40px) saturate(200%)",
            WebkitBackdropFilter: "blur(40px) saturate(200%)",
          }}
        >
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition-all duration-300 ease-out z-10 hover:scale-110 active:scale-95 hover:rotate-90"
            aria-label="Close navigation menu"
          >
            <X className="h-6 w-6 text-black" />
          </button>

          <div
            className={`flex flex-col items-center justify-center min-h-screen w-full px-6 py-20 bg-white text-black transition-all duration-500 ease-out ${
              isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <Link
              href="/home"
              className={`font-bold text-2xl mb-16 transition-all duration-300 ease-out hover:scale-110 ${
                isMenuOpen ? "animate-in zoom-in-50 duration-600 delay-200" : ""
              }`}
              onClick={toggleMenu}
            >
              Advart
            </Link>

            <nav className="flex flex-col items-center gap-8 text-center mb-16">
              {[
                {
                  href: "/home",
                  label: "Home",
                  delay: "delay-300",
                },
                {
                  href: "/aboutus",
                  label: "About us",
                  delay: "delay-400",
                },
                {
                  href: "/careers",
                  label: "Careers",
                  delay: "delay-500",
                },
                {
                  href: "/contactus",
                  label: "Contact Us",
                  delay: "delay-600",
                },
              ].map((item) => (
                <div
                  key={item.href}
                  className={`${isMenuOpen ? `animate-in slide-in-from-right-8 fade-in duration-500 ${item.delay}` : "opacity-0 translate-x-8"}`}
                >
                  <Link
                    href={item.href}
                    onClick={toggleMenu}
                    className="text-2xl font-medium hover:underline underline-offset-4 transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
