"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type BrandCase = {
  imageSrc: string;
  title: string;
  description: string;
  whatTried?: string[];
  result?: string;
};

const CASES: BrandCase[] = [
  {
    imageSrc: "/hero/brand/bee-little.webp",
    title: "Beelittle",
    description:
      "10 YEARS OF BEELITTLE (A 4 yrs partnership we proudly celebrate) Beelittle turned 10, and we knew the celebration had to feel just as special as the journey.",
    whatTried: [
      "30-Day Strong Digital Campaign",
      "Private Screening & Celebration for Followers",
      "Custom Storybook",
    ],
    result:
      "A celebration that brought in strong community engagement, built deeper trust and skyrocketed brand awareness… all of which positively reflected in sales.",
  },
  {
    imageSrc: "/hero/brand/zing.webp",
    title: "Zing",
    description:
      "A homegrown kurta brand we built from scratch, turning failures into lessons and growth into success.",
    whatTried: [
      "Production to post-production...",
      "Everything it takes to make a brand stand tall.",
      "We tested and tried it all with Zing.",
    ],
    result: "From ₹30k to ₹3 crore turnover.",
  },
  {
    imageSrc: "/hero/brand/prathiksham.webp",
    title: "Prathiksham",
    description:
      "A renowned designer launched her own brand with us—now a go-to in every working woman's wardrobe.",
    whatTried: ["Business Consulting", "Branding & Website", "Social Presence"],
    result: "Sales peaked and the label is widely recognised.",
  },
];

function useOnceVisible<T extends Element>(threshold = 0.05, rootMargin = "15% 0px 0% 0px") {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver((entries, obs) => {
            if (entries[0]?.isIntersecting) {
              setVisible(true);
              obs.disconnect();
            }
          }, { threshold, rootMargin })
        : null;
    if (io) io.observe(el);
    else setTimeout(() => setVisible(true), 0);
    return () => io?.disconnect();
  }, [visible, threshold, rootMargin]);
  return { ref, visible } as const;
}

const BrandCardMobile: React.FC<{ item: BrandCase; first?: boolean }> = ({ item, first }) => (
  <article className="mx-auto overflow-hidden rounded-2xl bg-black lg:hover:shadow-xl transition-shadow duration-500">
    <div className="flex flex-col">
      <div className="relative overflow-hidden group flex items-center justify-center">
        <img
          src={item.imageSrc}
          alt={item.title}
          draggable={false}
          className="w-full h-56 sm:h-64 object-contain transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
          loading={first ? "eager" : "lazy"}
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-5 sm:p-6 text-white bg-black">
        <h3 className="text-xl sm:text-2xl font-bold">{item.title}</h3>
        <p className="mt-2 text-sm sm:text-base leading-relaxed">{item.description}</p>

        {item.whatTried?.length ? (
          <div className="mt-4 space-y-2">
            <h4 className="text-base sm:text-lg font-semibold">What We Did:</h4>
            <ul className="space-y-1 text-sm sm:text-base">
              {item.whatTried.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-white rounded-full mt-1.5 flex-shrink-0" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {item.result ? (
          <div className="mt-4 pt-3 border-t border-white/20">
            <h4 className="text-base sm:text-lg font-semibold">Result:</h4>
            <p className="text-sm sm:text-base font-medium">{item.result}</p>
          </div>
        ) : null}
      </div>
    </div>
  </article>
);

const BrandCaseStackDock: React.FC<{ items?: BrandCase[] }> = ({ items: ITEMS = CASES }) => {
  const items = useMemo(() => ITEMS, [ITEMS]);

  // ----- DESKTOP ANIMATION (unchanged) -----
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("animate-in")),
      { threshold: 0, rootMargin: "0px 0px -40% 0px" }
    );
    cardsRef.current.forEach((c) => c && io.observe(c));
    return () => io.disconnect();
  }, [items]);

  // ----- MOBILE SWIPE (FIXED) -----
  const { ref: mobileBlockRef, visible: mobileVisible } = useOnceVisible<HTMLDivElement>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Swipe state
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const initialScrollLeft = useRef(0);

  const slideWidth = useRef(0);

  // Update slide width on resize
  useEffect(() => {
    const updateSlideWidth = () => {
      if (scrollRef.current) {
        slideWidth.current = scrollRef.current.clientWidth;
      }
    };
    
    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);
    return () => window.removeEventListener('resize', updateSlideWidth);
  }, []);

  // Handle scroll events to update active index
  const handleScroll = useCallback(() => {
    if (isDragging) return; // Don't update during drag
    
    const el = scrollRef.current;
    if (!el) return;
    
    const scrollLeft = el.scrollLeft;
    const width = el.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    
    if (newIndex !== active && newIndex >= 0 && newIndex < items.length) {
      setActive(newIndex);
    }
  }, [active, items.length, isDragging]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !mobileVisible) return;
    
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [mobileVisible, handleScroll]);

  const goToSlide = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    
    const clampedIndex = Math.max(0, Math.min(items.length - 1, index));
    const targetScrollLeft = clampedIndex * el.clientWidth;
    
    el.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });
  }, [items.length]);

  // Touch/pointer event handlers
  const handleStart = useCallback((clientX: number) => {
    const el = scrollRef.current;
    if (!el) return;
    
    setIsDragging(true);
    startXRef.current = clientX;
    currentXRef.current = clientX;
    initialScrollLeft.current = el.scrollLeft;
    
    // Disable smooth scrolling during drag
    el.style.scrollBehavior = 'auto';
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    
    const el = scrollRef.current;
    if (!el) return;
    
    currentXRef.current = clientX;
    const deltaX = startXRef.current - clientX;
    const newScrollLeft = initialScrollLeft.current + deltaX;
    
    el.scrollLeft = newScrollLeft;
  }, [isDragging]);

  const handleEnd = useCallback(() => {
    if (!isDragging) return;
    
    const el = scrollRef.current;
    if (!el) return;
    
    setIsDragging(false);
    
    // Re-enable smooth scrolling
    el.style.scrollBehavior = 'smooth';
    
    const deltaX = startXRef.current - currentXRef.current;
    const threshold = el.clientWidth * 0.2; // 20% of slide width
    
    let targetIndex = active;
    
    if (deltaX > threshold && active < items.length - 1) {
      // Swiped left significantly - go to next slide
      targetIndex = active + 1;
    } else if (deltaX < -threshold && active > 0) {
      // Swiped right significantly - go to previous slide
      targetIndex = active - 1;
    }
    
    goToSlide(targetIndex);
  }, [isDragging, active, items.length, goToSlide]);

  // Touch events
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  }, [handleStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  const handleTouchEnd = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // Mouse events (for desktop testing)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only handle left click
    e.preventDefault();
    handleStart(e.clientX);
  }, [handleStart]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    handleMove(e.clientX);
  }, [handleMove]);

  const handleMouseUp = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      handleEnd();
    }
  }, [isDragging, handleEnd]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && active > 0) {
      e.preventDefault();
      goToSlide(active - 1);
    } else if (e.key === 'ArrowRight' && active < items.length - 1) {
      e.preventDefault();
      goToSlide(active + 1);
    }
  }, [active, items.length, goToSlide]);

  return (
    <section className="relative w-full section-container">
      <section className="w-full">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="heading2 pb-1">
            All exciting things we do at <span className="font-semibold">Advart...</span>
          </h2>
          <p className="paragraph mx-auto text-center whitespace-pre-line">
            From scaling a brand from ₹30K to ₹3Cr, to building a homegrown brand like Zing, to creating many more
            meaningful brand stories… We love doing it all, while nailing it right!
          </p>
        </div>
      </section>

      {/* ===== MOBILE/TABLET: swipe carousel ===== */}
      <div className="lg:hidden mt-8" ref={mobileBlockRef}>
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-scroll scrollbar-hide touch-pan-x"
            style={{
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label="Brand cases carousel"
          >
            {items.map((item, i) => (
              <div 
                key={item.title} 
                className="w-full flex-shrink-0 px-4"
                style={{ scrollSnapAlign: 'start' }}
              >
                <BrandCardMobile item={item} first={i === 0} />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6 mb-2" aria-label="Slide indicators">
            {items.map((_, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => goToSlide(i)}
                  className={`h-2.5 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50 ${
                    isActive ? "w-6 bg-black" : "w-2.5 bg-black/30 hover:bg-black/50"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={isActive ? "true" : "false"}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== DESKTOP: stacked sticky ===== */}
      <div className="hidden lg:block">
        <div className="relative space-y-32 mt-16">
          {items.map((item, index) => (
            <div
              key={item.title}
              ref={(el) => (cardsRef.current[index] = el!)}
              className={`case-card sticky top-20 transition-all duration-1000 ease-out ${
                hasMounted && index > 0 ? "opacity-0 translate-y-16" : ""
              }`}
              style={{ zIndex: 10 + index }}
            >
              <article className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-black hover:shadow-xl transition-shadow duration-500 h-[600px] flex">
                <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                  {/* Content */}
                  <div className="flex flex-col justify-center p-16 bg-black text-white overflow-hidden">
                    <div className="space-y-4">
                      <h3 className="text-4xl font-bold">{item.title}</h3>
                      <p className="text-xl leading-relaxed">{item.description}</p>

                      {item.whatTried?.length ? (
                        <div className="space-y-2">
                          <h4 className="text-xl font-semibold">What We Did:</h4>
                          <ul className="space-y-2 text-lg">
                            {item.whatTried.map((action, idx) => (
                              <li key={idx} className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {item.result ? (
                        <div className="pt-4 border-t border-white/20">
                          <h4 className="text-xl font-semibold">Result:</h4>
                          <p className="text-lg font-medium">{item.result}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative overflow-hidden group flex items-center justify-center">
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      draggable={false}
                      className="w-full h-[450px] object-contain transition-transform duration-700 group-hover:scale-105 mx-auto select-none pointer-events-none"
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .case-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default BrandCaseStackDock;