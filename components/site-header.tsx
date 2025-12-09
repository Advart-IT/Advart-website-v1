"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, useRef } from "react";
import { gsap } from "gsap";

type NavItem = { href: string; label: string };

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const navLinksRef = useRef<HTMLAnchorElement[]>([]);
  const tl = useRef<GSAPTimeline | null>(null);

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

  const toggleMenu = () => setOpen((v) => !v);

  // GSAP MENU ANIMATION
  useEffect(() => {
    if (!menuRef.current || !contentRef.current) return;

    tl.current = gsap
      .timeline({ paused: true })
      .fromTo(
        menuRef.current,
        { opacity: 0, pointerEvents: "none" },
        {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.35,
          ease: "power2.out",
        }
      )
      .fromTo(
        contentRef.current,
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "expo.out",
        },
        "-=0.2"
      )
      .fromTo(
        navLinksRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: "power3.out",
        },
        "-=0.45"
      );
  }, []);

  useEffect(() => {
    if (!tl.current) return;
    open ? tl.current.play() : tl.current.reverse();
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F6F7F9] shadow-sm">

      {/* MOBILE HEADER (logo left, hamburger right) */}
      <div className="w-full flex items-center justify-between px-4 sm:px-6 py-3 text-black/90 md:hidden">

        {/* LEFT — LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-1.png"
            alt="Advart Logo"
            width={66}
            height={66}
            className=" object-contain"
          />
        </Link>

        {/* RIGHT — HAMBURGER */}
        <button
          onClick={toggleMenu}
          className="relative w-10 h-10 flex items-center justify-end z-[9999]"
        >
          {/* TOP BAR */}
          <span
            className={`
    absolute h-[3px] bg-black rounded transition-all duration-300
    ${open ? "w-8 rotate-45" : "w-6 -translate-y-[6px]"}
  `}
          />
          

          {/* BOTTOM BAR */}
          <span
            className={`absolute w-8 h-[3px] bg-black rounded transition-all duration-300 ${
              open ? "-rotate-45" : "translate-y-[6px]"
            }`}
          />
        </button>
      </div>

      {/* DESKTOP HEADER — LOGO LEFT / NAV CENTER / EMPTY RIGHT */}
      <div className="w-full hidden md:grid grid-cols-3 items-center px-4 sm:px-6 py-3 text-black/90">

        {/* LEFT — LOGO */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-1.png"
              alt="Advart Logo"
              width={56}
              height={56}
              className="w-14 h-14 object-contain"
            />
          </Link>
        </div>

        {/* CENTER — NAV LINKS */}
        <nav className="hidden md:flex justify-center gap-3">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                  active
                    ? "bg-black text-white"
                    : "text-black/80 hover:bg-black/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT — EMPTY (keeps nav perfectly centered) */}
        <div></div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {/* MOBILE MENU OVERLAY */}
<div
  ref={menuRef}
  className="fixed inset-0 bg-white/95 backdrop-blur-md opacity-0 pointer-events-none z-[100]"
>
  <div ref={contentRef} className="relative w-full h-full opacity-0 flex flex-col">

    {/* ─── TOP BAR (Logo Left + Close Button Right) ─── */}
    <div className="w-full flex items-center justify-between px-4 py-4">
      
      {/* LEFT — LOGO */}
      <Link href="/" onClick={toggleMenu}>
        <Image
          src="/logo-1.png"
          width={66}
          height={66}
          alt="Advart"
          className="object-contain"
        />
      </Link>


    </div>

    {/* ─── CENTER — NAV LINKS ─── */}
    <div className="flex flex-col items-center justify-start mt-40 flex-1 gap-10">
      <nav className="flex flex-col items-center gap-8 text-3xl font-medium">
        {navItems.map((item, i) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              ref={(el) => {
                if (el) navLinksRef.current[i] = el;
              }}
              onClick={toggleMenu}
              className={active ? "text-black" : "text-black/70 hover:text-black"}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  </div>
</div>

    </header>
  );
}
