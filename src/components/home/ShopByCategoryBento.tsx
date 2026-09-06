'use client';

/**
 * SHAPE RULE GUIDELINE:
 * - CIRCLES = Category / discovery navigation (e.g. CircularCategoryScroller)
 * - ARCHES = Heritage / editorial storytelling sections (e.g. Arch Collection Coverflow / ShopByCategoryBento)
 * - RECTANGLES = Product / shopping grids (e.g. ProductRail, ProductGrid)
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import SectionHeader from '@/components/ui/SectionHeader';

interface CategoryItem {
  id: string;
  name: string;
  eyebrow: string;
  description?: string;
  slug: string;
  image?: string;
  gradientClass?: string;
}

const CATEGORY_ITEMS: CategoryItem[] = [
  {
    id: '1',
    name: 'Kurta Suit Ensembles',
    eyebrow: 'WOMEN EDIT',
    description: 'Anarkalis, straight-cut & palazzo suit sets for celebrations.',
    slug: 'all-kurta-sets',
    image: '/categories/all-kurta-sets.webp',
  },
  {
    id: '2',
    name: 'Silk Pattu Pavadai',
    eyebrow: 'LITTLE ROYALTY',
    description: 'Traditional Kanjeevaram pure silk drapes for young girls.',
    slug: 'kids-lehenga-blouse-or-pattu-pavadai',
    image: '/categories/kids-lehenga-blouse-or-pattu-pavadai.webp',
  },
  {
    id: '3',
    name: 'Co-ord Sets & Tunics',
    eyebrow: 'CONTEMPORARY',
    description: 'Matching festive tunic & trouser duos.',
    slug: 'co-ord-set',
    image: '/categories/co-ord-set.webp',
  },
  {
    id: '4',
    name: 'Party Wear Frocks',
    eyebrow: 'CELEBRATION',
    description: 'Layered tulle & organza birthday frocks.',
    slug: 'party-wear-frocks',
    image: '/categories/party-wear-frocks.webp',
  },
  {
    id: '5',
    name: 'Traditional Gowns',
    eyebrow: 'FESTIVE EDIT',
    description: 'Single-piece elegant ethnic gowns for kids.',
    slug: 'kids-traditional-gown-1-pc',
    image: '/categories/kids-traditional-gown-1-pc.webp',
  },
];

export const ShopByCategoryBento: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplayActive, setIsAutoplayActive] = useState(true);

  const sectionRef = useRef<HTMLElement | null>(null);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const desktopCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wiggleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lightSweepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasInteracted = useRef(false);

  // Check prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  const totalCards = CATEGORY_ITEMS.length;

  const goToNext = useCallback(() => {
    hasInteracted.current = true;
    setActiveIndex((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

  const goToPrev = useCallback(() => {
    hasInteracted.current = true;
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);

  // Autoplay support (pauses on hover/interaction)
  useEffect(() => {
    if (!isAutoplayActive || prefersReducedMotion) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalCards);
    }, 5500);

    return () => clearInterval(timer);
  }, [isAutoplayActive, prefersReducedMotion, totalCards]);

  // One-time CSS Keyframe Swipe Hint on Touch Devices
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const section = sectionRef.current || document.getElementById('arch-collection-section');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const touchDevice =
          window.matchMedia('(pointer: coarse)').matches ||
          window.matchMedia('(hover: none)').matches ||
          'ontouchstart' in window ||
          (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0);

        let alreadyShown = false;
        try {
          alreadyShown = sessionStorage.getItem('archSwipeHintShown') === 'true';
        } catch {
          alreadyShown = false;
        }

        if (
          touchDevice &&
          !alreadyShown &&
          !reducedMotion &&
          !hasInteracted.current &&
          activeIndex === 0
        ) {
          try {
            sessionStorage.setItem('archSwipeHintShown', 'true');
          } catch {
            // Ignore
          }

          const targetEl = wiggleRefs.current[0];
          if (targetEl) {
            const handleAnimationEnd = () => {
              targetEl.classList.remove('swipe-hint-active');
              targetEl.removeEventListener('animationend', handleAnimationEnd);
            };
            targetEl.addEventListener('animationend', handleAnimationEnd);
            targetEl.classList.add('swipe-hint-active');
          }

          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [activeIndex]);

  // Helper to calculate mobile card step
  const getMobileCardStep = useCallback(() => {
    const activeCard = mobileCardRefs.current[activeIndex];
    if (activeCard && activeCard.offsetWidth) {
      return activeCard.offsetWidth + 18;
    }
    if (typeof window !== 'undefined') {
      const vw = window.innerWidth;
      const cardW = Math.min(vw * 0.76, 330);
      return cardW + 18;
    }
    return 308;
  }, [activeIndex]);

  // Animate Mobile Carousel Cards
  const animateMobileCards = useCallback((customDuration?: number) => {
    const cardStep = getMobileCardStep();
    const duration = customDuration ?? 0.42;

    mobileCardRefs.current.forEach((cardEl, idx) => {
      if (!cardEl) return;

      let rIdx = idx - activeIndex;
      if (rIdx > totalCards / 2) rIdx -= totalCards;
      if (rIdx < -totalCards / 2) rIdx += totalCards;

      gsap.killTweensOf(cardEl);

      if (prefersReducedMotion) {
        gsap.to(cardEl, {
          opacity: rIdx === 0 ? 1 : 0,
          scale: 1,
          x: rIdx * cardStep,
          y: 0,
          duration: 0.3,
        });
        return;
      }

      if (rIdx === 0) {
        gsap.to(cardEl, {
          scale: 1,
          opacity: 1,
          x: 0,
          y: 0,
          zIndex: 30,
          duration: duration,
          ease: 'power3.out',
          force3D: true,
        });
      } else if (Math.abs(rIdx) === 1) {
        gsap.to(cardEl, {
          scale: 0.94,
          opacity: 0.65,
          x: rIdx * cardStep,
          y: 0,
          zIndex: 20,
          duration: duration,
          ease: 'power3.out',
          force3D: true,
        });
      } else {
        gsap.to(cardEl, {
          scale: 0.88,
          opacity: 0,
          x: rIdx * cardStep,
          y: 0,
          zIndex: 0,
          duration: duration,
          ease: 'power3.out',
          force3D: true,
        });
      }
    });
  }, [activeIndex, totalCards, prefersReducedMotion, getMobileCardStep]);

  // Animate Desktop 3D Coverflow Cards
  const animateDesktopCoverflow = useCallback((customDuration?: number) => {
    const duration = customDuration ?? 0.45;
    const isLg = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const sideOffset = isLg ? 340 : 280;
    const farOffset = isLg ? 540 : 460;

    desktopCardRefs.current.forEach((cardEl, idx) => {
      if (!cardEl) return;

      let rIdx = idx - activeIndex;
      if (rIdx > totalCards / 2) rIdx -= totalCards;
      if (rIdx < -totalCards / 2) rIdx += totalCards;

      gsap.killTweensOf(cardEl);

      if (prefersReducedMotion) {
        gsap.to(cardEl, {
          opacity: rIdx === 0 ? 1 : Math.abs(rIdx) === 1 ? 0.5 : 0,
          scale: rIdx === 0 ? 1 : 0.8,
          x: rIdx * sideOffset,
          filter: rIdx === 0 ? 'blur(0px)' : 'blur(3px)',
          duration: 0.3,
        });
        return;
      }

      if (rIdx === 0) {
        // Center Card: Full size, 100% opacity, sharp focus, zIndex 30
        gsap.to(cardEl, {
          x: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          zIndex: 30,
          duration: duration,
          ease: 'power3.out',
          force3D: true,
        });
      } else if (rIdx === 1) {
        // Right Adjacent Card: ~78% scale, 55% opacity, 3px blur, zIndex 20
        gsap.to(cardEl, {
          x: sideOffset,
          scale: 0.78,
          opacity: 0.55,
          filter: 'blur(3px)',
          zIndex: 20,
          duration: duration,
          ease: 'power3.out',
          force3D: true,
        });
      } else if (rIdx === -1) {
        // Left Adjacent Card: ~78% scale, 55% opacity, 3px blur, zIndex 20
        gsap.to(cardEl, {
          x: -sideOffset,
          scale: 0.78,
          opacity: 0.55,
          filter: 'blur(3px)',
          zIndex: 20,
          duration: duration,
          ease: 'power3.out',
          force3D: true,
        });
      } else {
        // Beyond immediate neighbors: Receding/Hidden, 0 opacity, 6px blur
        gsap.to(cardEl, {
          x: rIdx > 0 ? farOffset : -farOffset,
          scale: 0.62,
          opacity: 0,
          filter: 'blur(6px)',
          zIndex: 10,
          duration: duration,
          ease: 'power3.out',
          force3D: true,
        });
      }
    });
  }, [activeIndex, totalCards, prefersReducedMotion]);

  useEffect(() => {
    animateMobileCards();
    animateDesktopCoverflow();
  }, [activeIndex, animateMobileCards, animateDesktopCoverflow]);

  // Touch Drag Handlers (Mobile)
  const dragOffsetRef = useRef(0);
  const touchStartRef = useRef({ startX: 0, startY: 0, isDragging: false, isHorizontal: false });

  const handleTouchStart = (e: React.TouchEvent) => {
    hasInteracted.current = true;
    const touch = e.touches[0];
    touchStartRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      isDragging: true,
      isHorizontal: false,
    };
    dragOffsetRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current.isDragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartRef.current.startX;
    const dy = touch.clientY - touchStartRef.current.startY;

    if (!touchStartRef.current.isHorizontal) {
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 5) {
        touchStartRef.current.isHorizontal = true;
      } else if (Math.abs(dy) > 8) {
        touchStartRef.current.isDragging = false;
        return;
      }
    }

    if (!touchStartRef.current.isHorizontal) return;

    dragOffsetRef.current = dx;
    const cardStep = getMobileCardStep();

    mobileCardRefs.current.forEach((cardEl, idx) => {
      if (!cardEl) return;
      let rIdx = idx - activeIndex;
      if (rIdx > totalCards / 2) rIdx -= totalCards;
      if (rIdx < -totalCards / 2) rIdx += totalCards;

      if (Math.abs(rIdx) <= 1) {
        gsap.set(cardEl, {
          x: rIdx * cardStep + dx,
          force3D: true,
        });
      }
    });
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current.isDragging) return;
    touchStartRef.current.isDragging = false;

    const dx = dragOffsetRef.current;
    const threshold = 40;

    if (dx < -threshold) {
      goToNext();
    } else if (dx > threshold) {
      goToPrev();
    } else {
      animateMobileCards(0.35);
    }

    dragOffsetRef.current = 0;
  };

  const formattedCounter = `0${activeIndex + 1} / 0${totalCards}`;

  // SVG Arch Path Definition for Desktop Coverflow Cards
  const desktopCoverflowSvgPath = "M 1.5 175 A 173.5 173.5 0 0 1 348.5 175 L 348.5 532 A 6.5 6.5 0 0 1 342 538.5 L 8.5 538.5 A 6.5 6.5 0 0 1 1.5 532 Z";

  return (
    <section
      ref={sectionRef}
      id="arch-collection-section"
      className="w-full pt-12 pb-6 sm:pt-16 sm:pb-8 md:py-24 bg-ivory text-inkNavy border-b border-zariGold/15 overflow-hidden select-none"
      onMouseEnter={() => setIsAutoplayActive(false)}
      onMouseLeave={() => setIsAutoplayActive(true)}
    >
      <style>{`
        @keyframes swipeHintWiggle {
          0%   { transform: translateX(0); }
          25%  { transform: translateX(-8px); }
          55%  { transform: translateX(6px); }
          80%  { transform: translateX(-3px); }
          100% { transform: translateX(0); }
        }

        .swipe-hint-active {
          animation: swipeHintWiggle 900ms ease-in-out 1 !important;
          will-change: transform;
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Reusable Editorial Section Header */}
        <SectionHeader
          kicker="FEATURED OCCASIONS"
          title="Curated Fashion Collections"
          subtitle="Discover Women's and Kids' fashion spanning festive ethnic wear, party frocks, contemporary co-ord sets, and everyday luxury."
          actionLabel="EXPLORE ALL"
          actionHref="/shop"
        />

        {/* 4-Column Interactive Visual Category Chips Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-8 sm:mb-12">
          {[
            {
              title: "Festive Ethnic Wear",
              subtitle: "Anarkalis & Silk Suits",
              image: "/categories/anarkali-kurta-suit-sets.webp",
              href: "/shop?category=anarkali-kurta-suit-sets",
            },
            {
              title: "Party Wear Frocks",
              subtitle: "Girls Designer Frocks",
              image: "/categories/party-wear-frocks.webp",
              href: "/shop?category=party-wear-frocks",
            },
            {
              title: "Co-ord Sets",
              subtitle: "Contemporary Sets",
              image: "/categories/co-ord-set.webp",
              href: "/shop?category=co-ord-set",
            },
            {
              title: "Everyday Luxury",
              subtitle: "Pattu & Silk Ensembles",
              image: "/categories/kids-lehenga-blouse-or-pattu-pavadai.webp",
              href: "/shop?target=kids",
            },
          ].map((chip, cIdx) => (
            <Link
              key={cIdx}
              href={chip.href}
              className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-zariGold/30 hover:border-zariGold shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <div className="relative w-12 h-14 sm:w-14 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-zariGold/20 bg-sand/20">
                <Image
                  src={chip.image}
                  alt={chip.title}
                  fill
                  sizes="60px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-serif font-bold text-navy group-hover:text-zariGold transition-colors truncate">
                  {chip.title}
                </h4>
                <p className="text-[10px] sm:text-[11px] text-charcoal-muted font-sans truncate mt-0.5">
                  {chip.subtitle}
                </p>
                <span className="text-[9.5px] font-bold text-zariGold tracking-widest uppercase mt-1 inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  VIEW <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Counter Header Row (Mobile & Desktop) */}
        <div className="flex items-center justify-between mb-4 md:mb-6 px-1">
          <span className="font-serif font-bold text-xs sm:text-sm text-zariGold tracking-widest uppercase">
            ARCH COLLECTION
          </span>
          <span className="font-serif font-bold text-xs sm:text-sm text-inkNavy/70 tracking-widest font-tnum">
            {formattedCounter}
          </span>
        </div>

        {/* Carousel Container */}
        <div className="relative group/catScroll max-w-[420px] md:max-w-none mx-auto">
          {/* Desktop Chevron Navigation Arrows */}
          <button
            onClick={goToPrev}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToPrev();
              }
            }}
            className="hidden md:flex absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full border border-zariGold/50 bg-ivory/90 text-inkNavy opacity-80 backdrop-blur-md items-center justify-center hover:opacity-100 hover:bg-zariGold hover:border-zariGold hover:text-inkNavy hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-zariGold"
            aria-label="Previous Arch Collection category"
          >
            <ChevronLeft className="w-6 h-6 transition-colors" />
          </button>

          <button
            onClick={goToNext}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToNext();
              }
            }}
            className="hidden md:flex absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full border border-zariGold/50 bg-ivory/90 text-inkNavy opacity-80 backdrop-blur-md items-center justify-center hover:opacity-100 hover:bg-zariGold hover:border-zariGold hover:text-inkNavy hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-zariGold"
            aria-label="Next Arch Collection category"
          >
            <ChevronRight className="w-6 h-6 transition-colors" />
          </button>

          {/* ============================================================ */}
          {/* MOBILE VIEW: Touch Peek Preview Carousel (UNTOUCHED)          */}
          {/* ============================================================ */}
          <div className="block md:hidden overflow-hidden py-2">
            <div
              className="relative w-full flex justify-center items-center h-[480px] xs:h-[500px] mx-auto touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {CATEGORY_ITEMS.map((cat, idx) => {
                let rIdx = idx - activeIndex;
                if (rIdx > totalCards / 2) rIdx -= totalCards;
                if (rIdx < -totalCards / 2) rIdx += totalCards;

                const isActive = rIdx === 0;
                const isPeek = Math.abs(rIdx) === 1;

                return (
                  <div
                    key={cat.id}
                    ref={(el) => {
                      mobileCardRefs.current[idx] = el;
                    }}
                    className="absolute w-[76vw] xs:w-[78vw] max-w-[330px] h-full rounded-[240px_240px_8px_8px] overflow-hidden bg-ivory shadow-xl transition-shadow duration-300 origin-center will-change-transform transform-gpu"
                    style={{
                      zIndex: isActive ? 30 : isPeek ? 20 : 0,
                    }}
                  >
                    <div
                      ref={(el) => {
                        wiggleRefs.current[idx] = el;
                      }}
                      className="w-full h-full relative"
                    >
                      <Link
                        href={`/shop?category=${cat.slug}`}
                        className="relative block w-full h-full text-ivory group"
                        tabIndex={isActive ? 0 : -1}
                        onClick={(e) => {
                          if (!isActive) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <div className="arch-inner relative w-full h-full overflow-hidden rounded-[232px_232px_4px_4px] ring-[2.5px] ring-inset ring-[#D8BC82] border border-[#B4863C]/40 shadow-sm">
                          {cat.image ? (
                            <Image
                              src={cat.image}
                              alt={cat.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                              sizes="(max-width: 640px) 78vw, 330px"
                              priority={idx === 0}
                            />
                          ) : (
                            <div
                              className={`w-full h-full ${
                                cat.gradientClass || 'bg-navy-silk'
                              } flex flex-col justify-center items-center p-6 text-center`}
                            >
                              <span className="eyebrow-text text-zariGoldLight font-semibold text-xs tracking-[0.2em] mb-2">
                                {cat.eyebrow}
                              </span>
                              <h3 className="text-3xl font-serif font-bold text-ivory leading-tight">
                                {cat.name}
                              </h3>
                            </div>
                          )}

                          <div
                            className="absolute inset-0 bg-inkNavy transition-opacity duration-300 pointer-events-none"
                            style={{
                              opacity: isActive ? 0 : isPeek ? 0.35 : 0.7,
                            }}
                          />

                          <div
                            ref={(el) => {
                              lightSweepRefs.current[idx] = el;
                            }}
                            className="absolute inset-0 w-full h-full pointer-events-none opacity-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 z-20"
                          />

                          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-inkNavy/95 via-inkNavy/60 to-transparent p-6 flex flex-col justify-end z-10">
                            <span className="eyebrow-text text-zariGoldLight font-semibold text-[10px] tracking-[0.2em] mb-1">
                              {cat.eyebrow}
                            </span>
                            <h3 className="text-2xl font-serif font-bold text-ivory leading-tight group-hover:text-zariGoldLight transition-colors">
                              {cat.name}
                            </h3>
                            {cat.description && (
                              <p className="text-xs font-sans text-ivory/80 mt-1 line-clamp-2">
                                {cat.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ============================================================ */}
          {/* DESKTOP VIEW: 3D Coverflow Carousel with Arch Framing         */}
          {/* ============================================================ */}
          <div className="hidden md:flex justify-center items-center relative w-full h-[540px] lg:h-[580px] overflow-hidden py-4">
            {CATEGORY_ITEMS.map((cat, idx) => {
              let rIdx = idx - activeIndex;
              if (rIdx > totalCards / 2) rIdx -= totalCards;
              if (rIdx < -totalCards / 2) rIdx += totalCards;

              const isActive = rIdx === 0;

              return (
                <div
                  key={cat.id}
                  ref={(el) => {
                    desktopCardRefs.current[idx] = el;
                  }}
                  onClick={() => {
                    if (!isActive) {
                      hasInteracted.current = true;
                      setActiveIndex(idx);
                    }
                  }}
                  className={`absolute w-[320px] lg:w-[350px] h-[500px] lg:h-[540px] rounded-[260px_260px_8px_8px] overflow-hidden bg-ivory shadow-2xl origin-center will-change-transform transform-gpu cursor-pointer transition-shadow duration-300 ${
                    isActive ? 'shadow-2xl ring-1 ring-zariGold/40' : 'hover:opacity-80'
                  }`}
                >
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    className="relative block w-full h-full text-ivory group"
                    tabIndex={isActive ? 0 : -1}
                    onClick={(e) => {
                      if (!isActive) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <div className="arch-inner relative w-full h-full overflow-hidden rounded-[252px_252px_4px_4px]">
                      {cat.image ? (
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          className="object-cover group-hover:scale-[1.06] group-hover:translate-y-[-2%] transition-transform duration-[4000ms] cubic-bezier(0.25, 0.46, 0.45, 0.94) opacity-95"
                          sizes="350px"
                          priority={idx === 0}
                        />
                      ) : (
                        <div
                          className={`w-full h-full ${
                            cat.gradientClass || 'bg-navy-silk'
                          } flex flex-col justify-center items-center p-6 text-center`}
                        >
                          <span className="eyebrow-text text-zariGoldLight font-semibold text-xs tracking-[0.2em] mb-2">
                            {cat.eyebrow}
                          </span>
                          <h3 className="text-3xl font-serif font-bold text-ivory leading-tight">
                            {cat.name}
                          </h3>
                        </div>
                      )}

                      {/* Content Scrim & Typography with Parallax Depth Offset */}
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-inkNavy/95 via-inkNavy/60 to-transparent p-8 flex flex-col justify-end z-10 group-hover:translate-y-[-4px] transition-transform duration-300">
                        <span className="eyebrow-text text-zariGoldLight font-semibold text-xs tracking-[0.2em] mb-1.5">
                          {cat.eyebrow}
                        </span>
                        <h3 className="text-2xl lg:text-3xl font-serif font-bold text-ivory leading-tight group-hover:text-zariGoldLight transition-colors">
                          {cat.name}
                        </h3>
                        {cat.description && (
                          <p className="text-xs lg:text-sm font-sans text-ivory/80 mt-2 line-clamp-2">
                            {cat.description}
                          </p>
                        )}
                      </div>

                      {/* Desktop SVG Arch Frame Overlay */}
                      <svg
                        className="absolute inset-0 w-full h-full pointer-events-none z-30 drop-shadow-[0_1.5px_2.5px_rgba(13,14,26,0.6)]"
                        viewBox="0 0 350 540"
                        preserveAspectRatio="none"
                      >
                        <path
                          d={desktopCoverflowSvgPath}
                          fill="none"
                          stroke="#B4863C"
                          strokeWidth="3.5"
                          strokeOpacity="0.85"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopByCategoryBento;
