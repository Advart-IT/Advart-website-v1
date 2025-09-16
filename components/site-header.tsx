"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type NavItem = { href: string; label: string };

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/aboutus", label: "About" },
      { href: "/careers", label: "Careers" },
      { href: "/contactus", label: "Contact" },
    ],
    []
  );

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  // Lock body scroll when menu is open
  useEffect(() => {
    const { style } = document.body;
    const prev = style.overflow;
    if (isMenuOpen) style.overflow = "hidden";
    return () => {
      style.overflow = prev || "auto";
    };
  }, [isMenuOpen]);

  // Auto-close menu on desktop resize (>=768px)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[#F6F7F9] shadow-sm"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2 sm:py-3 md:py-2 text-black/90">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-light text-lg sm:text-xl"
          aria-label="Advart Home"
        >
          <Image
            src="/logo-1.png"
            alt="Advart Logo"
            width={64}
            height={64}
            priority
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
          />
        </Link>

        {/* Center: Desktop nav */}
        <div className="hidden md:flex flex-1 justify-center">
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40
                    ${
                      active
                        ? "bg-black text-white"
                        : "text-black/80 hover:text-black hover:bg-black/5"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Mobile toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-0 z-[100] bg-white/95 backdrop-blur-sm"
          aria-hidden={!isMenuOpen}
        >
          <div className="relative h-full w-full">
            <button
              onClick={toggleMenu}
              className="absolute right-4 top-4 p-3 rounded-full hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
              aria-label="Close navigation menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="flex flex-col items-center justify-center h-full w-full px-6 pt-24 pb-12 text-black">
              <Link
                href="/"
                onClick={toggleMenu}
                className="mb-12"
                aria-label="Go to home"
              >
                <Image
                  src="/logo-1.png"
                  alt="Advart Logo"
                  width={96}
                  height={96}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                />
              </Link>

              <nav className="flex flex-col items-center gap-8 text-center">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={toggleMenu}
                      aria-current={active ? "page" : undefined}
                      className={`text-2xl font-medium
                        ${
                          active
                            ? "text-black"
                            : "text-black/80 hover:text-black"
                        }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
