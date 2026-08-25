'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    name: 'Kanjeevaram Silk Sarees',
    eyebrow: 'PRIMARY COLLECTION',
    description: 'Bridal drapes, zari borders, & handcrafted festive weaves.',
    slug: 'sarees',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=1200',
  },
  {
    id: '2',
    name: 'Kids Pure Silk Pattu',
    eyebrow: 'LITTLE ROYALTY',
    description: 'Cotton-lined festive frocks.',
    slug: 'pattu-frocks',
    image: 'https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&q=85&w=800',
  },
  {
    id: '3',
    name: 'Organza & Chanderi Weaves',
    eyebrow: 'SILK EDIT',
    description: 'Ethereal sheer festive drapes.',
    slug: 'organza-sarees',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=85&w=800',
    gradientClass: 'bg-oxblood-silk',
  },
  {
    id: '4',
    name: 'Bridal Zari Lehengas',
    eyebrow: 'CELEBRATION',
    description: 'Royal palace heritage embroidery.',
    slug: 'lehengas',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=85&w=800',
  },
  {
    id: '5',
    name: 'Designer Zari Gowns',
    eyebrow: 'COUTURE',
    description: 'Contemporary silhouetted drapes.',
    slug: 'gowns',
    image: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&q=85&w=800',
    gradientClass: 'bg-navy-silk',
  },
];

export const ShopByCategoryBento: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchState, setTouchState] = useState({ startX: 0, startY: 0, currentX: 0, isDragging: false });
  const [dragOffset, setDragOffset] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wiggleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const borderPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const cometPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const lightSweepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isInitialMount = useRef(true);
  const hasInteracted = useRef(false);
  const cometTween = useRef<gsap.core.Tween | null>(null);

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

  // One-time CSS Keyframe Swipe Hint on Touch Devices (with Debug Logging)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const section = sectionRef.current || document.getElementById('arch-collection-section');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('section visible', entry.isIntersecting);

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

        console.log('hint conditions', {
          touchDevice,
          alreadyShown,
          reducedMotion,
          activeIndex,
          hasInteracted: hasInteracted.current,
        });

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

    console.log('observer created');
    observer.observe(section);
    return () => observer.disconnect();
  }, [activeIndex]);

  // Threshold Fill Progress & Hand-Drawn Gold Border Reveal
  const getTargetOffsetForIndex = useCallback((index: number) => {
    const fillRatio = (index + 1) / totalCards;
    return Math.round(1000 * (1 - fillRatio));
  }, [totalCards]);

  useEffect(() => {
    const activeBorder = borderPathRefs.current[activeIndex];
    const activeSweep = lightSweepRefs.current[activeIndex];

    if (!activeBorder) return;

    const targetOffset = getTargetOffsetForIndex(activeIndex);

    if (isInitialMount.current) {
      // First card on initial mount: set target fill directly without animation to avoid jank on first paint
      gsap.set(activeBorder, { strokeDashoffset: targetOffset });
      isInitialMount.current = false;
      return;
    }

    if (prefersReducedMotion) {
      gsap.set(activeBorder, { strokeDashoffset: targetOffset });
      return;
    }

    // Animate stroke border fill transition over ~550ms, synced with card stack animation
    gsap.killTweensOf(activeBorder);
    if (activeSweep) gsap.killTweensOf(activeSweep);

    gsap.to(activeBorder, {
      strokeDashoffset: targetOffset,
      duration: 0.55,
      ease: 'power2.inOut',
      onComplete: () => {
        // Run diagonal light-sweep shimmer immediately after border fill completes
        if (activeSweep) {
          gsap.fromTo(
            activeSweep,
            { xPercent: -120, opacity: 0 },
            {
              xPercent: 220,
              opacity: 0.35,
              duration: 0.4,
              ease: 'power1.inOut',
              onComplete: () => {
                gsap.to(activeSweep, { opacity: 0, duration: 0.1 });
              },
            }
          );
        }
      },
    });
  }, [activeIndex, getTargetOffsetForIndex, prefersReducedMotion, totalCards]);

  // Continuous "Living Thread" Comet Loop on currently active card
  useEffect(() => {
    if (cometTween.current) {
      cometTween.current.kill();
      cometTween.current = null;
    }

    if (prefersReducedMotion) return;

    const activeComet = cometPathRefs.current[activeIndex];
    if (activeComet) {
      gsap.set(activeComet, { strokeDashoffset: 0 });
      cometTween.current = gsap.to(activeComet, {
        strokeDashoffset: -1000,
        duration: 5.5,
        ease: 'none',
        repeat: -1,
      });
    }

    return () => {
      if (cometTween.current) {
        cometTween.current.kill();
        cometTween.current = null;
      }
    };
  }, [activeIndex, prefersReducedMotion]);

  // Helper to calculate card step (card width + horizontal gap)
  const getCardStep = useCallback(() => {
    const activeCard = cardRefs.current[activeIndex];
    if (activeCard && activeCard.offsetWidth) {
      return activeCard.offsetWidth + 18; // card width + 18px gap
    }
    if (typeof window !== 'undefined') {
      const vw = window.innerWidth;
      const cardW = Math.min(vw * 0.76, 330);
      return cardW + 18;
    }
    return 308;
  }, [activeIndex]);

  // Animate Carousel depth & peek positioning on activeIndex / drag update
  useEffect(() => {
    const cardStep = getCardStep();

    cardRefs.current.forEach((cardEl, idx) => {
      if (!cardEl) return;

      let rIdx = idx - activeIndex;
      if (rIdx > totalCards / 2) rIdx -= totalCards;
      if (rIdx < -totalCards / 2) rIdx += totalCards;

      gsap.killTweensOf(cardEl);

      if (prefersReducedMotion) {
        // Fallback simple crossfade for reduced motion
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
        // Active Center Card
        gsap.to(cardEl, {
          scale: 1,
          opacity: 1,
          x: dragOffset,
          y: 0,
          zIndex: 30,
          duration: 0.38,
          ease: 'cubic-bezier(0.25, 1, 0.5, 1)',
        });
      } else if (Math.abs(rIdx) === 1) {
        // 1st Adjacent Peeking Card (Left or Right)
        gsap.to(cardEl, {
          scale: 0.94,
          opacity: 0.65,
          x: rIdx * cardStep + dragOffset,
          y: 0,
          zIndex: 20,
          duration: 0.38,
          ease: 'cubic-bezier(0.25, 1, 0.5, 1)',
        });
      } else {
        // Off-screen / Hidden cards
        gsap.to(cardEl, {
          scale: 0.88,
          opacity: 0,
          x: rIdx * cardStep + dragOffset,
          y: 0,
          zIndex: 0,
          duration: 0.38,
          ease: 'cubic-bezier(0.25, 1, 0.5, 1)',
        });
      }
    });
  }, [activeIndex, dragOffset, totalCards, prefersReducedMotion, getCardStep]);

  // Mobile Touch Swipe Gesture Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    hasInteracted.current = true;
    const touch = e.touches[0];
    setTouchState({
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      isDragging: true,
    });
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchState.isDragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchState.startX;
    const dy = touch.clientY - touchState.startY;

    // Apply live drag offset if horizontal movement dominates
    if (Math.abs(dx) > Math.abs(dy)) {
      setDragOffset(dx);
    }
  };

  const handleTouchEnd = () => {
    if (!touchState.isDragging) return;
    const threshold = 45;

    if (dragOffset < -threshold) {
      goToNext();
    } else if (dragOffset > threshold) {
      goToPrev();
    }

    setDragOffset(0);
    setTouchState((prev) => ({ ...prev, isDragging: false }));
  };

  const formattedCounter = `0${activeIndex + 1} / 0${totalCards}`;

  // Mathematical SVG path derivation matching border-radius: 232px 232px 4px 4px
  // Inset pad = 1.5px for 3.5px strokeWidth alignment
  // Mobile Card: W = 300, H = 480 => w' = 297, R = 148.5, Rb = 6.5
  const mobileSvgPath = "M 1.5 148.5 A 148.5 148.5 0 0 1 298.5 148.5 L 298.5 472 A 6.5 6.5 0 0 1 292 478.5 L 8.5 478.5 A 6.5 6.5 0 0 1 1.5 472 Z";
  
  // Desktop Featured Large Card: W = 300, H = 560 => w' = 297, R = 148.5, Rb = 6.5
  const desktopLargeSvgPath = "M 1.5 150 A 148.5 148.5 0 0 1 298.5 150 L 298.5 552 A 6.5 6.5 0 0 1 292 558.5 L 8.5 558.5 A 6.5 6.5 0 0 1 1.5 552 Z";
  
  // Desktop Grid Card: W = 200, H = 268 => w' = 197, R = 98.5, Rb = 6.5
  const desktopGridSvgPath = "M 1.5 100 A 98.5 98.5 0 0 1 198.5 100 L 198.5 260 A 6.5 6.5 0 0 1 192 266.5 L 8.5 266.5 A 6.5 6.5 0 0 1 1.5 260 Z";

  return (
    <section
      ref={sectionRef}
      id="arch-collection-section"
      className="w-full pt-12 pb-4 sm:pt-16 sm:pb-6 md:py-24 bg-ivory text-inkNavy border-b border-zariGold/15 overflow-hidden"
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
          kicker="CURATED TAXONOMY"
          title="Shop by Category"
          subtitle="Architectural Temple Arch silhouettes framing pure silk bridal drapes and handcrafted heritage ensembles."
          actionLabel="EXPLORE ALL"
          actionHref="/shop"
        />

        {/* Counter Above Mobile Rail */}
        <div className="flex md:hidden items-center justify-between mb-4 px-1">
          <span className="font-serif font-bold text-xs text-zariGold tracking-widest uppercase">
            ARCH COLLECTION
          </span>
          <span className="font-serif font-bold text-xs text-inkNavy/70 tracking-widest font-tnum">
            {formattedCounter}
          </span>
        </div>

        {/* Carousel Container */}
        <div className="relative group/catScroll max-w-[420px] md:max-w-none mx-auto">
          {/* Pointer-Fine Desktop Navigation Arrows (Only on Mouse/Trackpad Devices) */}
          <button
            onClick={goToPrev}
            className="hidden [@media(pointer:fine)]:flex absolute -left-5 lg:-left-7 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full border border-zariGold/50 bg-ivory/80 text-inkNavy/70 opacity-60 backdrop-blur-sm items-center justify-center hover:opacity-100 hover:bg-zariGold hover:border-zariGold hover:text-inkNavy hover:scale-105 transition-all duration-200 ease-out shadow-md"
            aria-label="Previous category card"
          >
            <ChevronLeft className="w-5 h-5 transition-colors" />
          </button>

          <button
            onClick={goToNext}
            className="hidden [@media(pointer:fine)]:flex absolute -right-5 lg:-right-7 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full border border-zariGold/50 bg-ivory/80 text-inkNavy/70 opacity-60 backdrop-blur-sm items-center justify-center hover:opacity-100 hover:bg-zariGold hover:border-zariGold hover:text-inkNavy hover:scale-105 transition-all duration-200 ease-out shadow-md"
            aria-label="Next category card"
          >
            <ChevronRight className="w-5 h-5 transition-colors" />
          </button>

          {/* ============================================================ */}
          {/* MOBILE VIEW: Centered Peek Preview Carousel with Arch Framing */}
          {/* ============================================================ */}
          <div className="block md:hidden overflow-hidden py-2">
            <div
              className="relative w-full flex justify-center items-center h-[480px] xs:h-[500px] mx-auto select-none touch-pan-y"
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
                      cardRefs.current[idx] = el;
                    }}
                    className="absolute w-[76vw] xs:w-[78vw] max-w-[330px] h-full rounded-[240px_240px_8px_8px] overflow-hidden bg-ivory shadow-xl transition-shadow duration-300 origin-center"
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
                          {/* Base Image or Gradient */}
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

                          {/* Dimmed Navy Overlay for Peeking Cards */}
                          <div
                            className="absolute inset-0 bg-inkNavy transition-opacity duration-300 pointer-events-none"
                            style={{
                              opacity: isActive ? 0 : isPeek ? 0.35 : 0.7,
                            }}
                          />

                          {/* Diagonal Light-Sweep Overlay */}
                          <div
                            ref={(el) => {
                              lightSweepRefs.current[idx] = el;
                            }}
                            className="absolute inset-0 w-full h-full pointer-events-none opacity-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 z-20"
                          />

                          {/* Content Scrim & Typography */}
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
          {/* DESKTOP VIEW: Asymmetric Grid Layout with Arch SVG Framing */}
          {/* ============================================================ */}
          <div className="hidden md:grid grid-cols-12 gap-6 items-stretch">
            {/* Main Featured Large Arch Card */}
            <Link
              href={`/shop?category=${CATEGORY_ITEMS[0].slug}`}
              className="col-span-5 h-[560px] arch-frame shadow-xl group relative block text-ivory overflow-hidden transition-transform duration-500 hover:-translate-y-1.5"
            >
              <div className="arch-inner relative w-full h-full overflow-hidden">
                <Image
                  src={CATEGORY_ITEMS[0].image!}
                  alt={CATEGORY_ITEMS[0].name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                  sizes="40vw"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-inkNavy/95 via-inkNavy/60 to-transparent p-8 flex flex-col justify-end">
                  <span className="eyebrow-text text-zariGoldLight font-semibold text-xs tracking-[0.2em] mb-1">
                    {CATEGORY_ITEMS[0].eyebrow}
                  </span>
                  <h3 className="text-3xl font-serif font-bold text-ivory leading-tight group-hover:text-zariGoldLight transition-colors">
                    {CATEGORY_ITEMS[0].name}
                  </h3>
                  <p className="text-sm font-sans text-ivory/80 mt-2">
                    {CATEGORY_ITEMS[0].description}
                  </p>
                </div>

                {/* Desktop SVG Arch Frame Overlay */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-30 drop-shadow-[0_1.5px_2.5px_rgba(13,14,26,0.6)]"
                  viewBox="0 0 300 560"
                  preserveAspectRatio="none"
                >
                  <path
                    d={desktopLargeSvgPath}
                    fill="none"
                    stroke="#B4863C"
                    strokeWidth="3"
                    strokeOpacity="0.85"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
            </Link>

            {/* Remaining Category Arch Cards (2x2 Grid) */}
            <div className="col-span-7 grid grid-cols-2 gap-6">
              {CATEGORY_ITEMS.slice(1).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${cat.slug}`}
                  className="h-[268px] arch-frame shadow-md group relative block text-ivory overflow-hidden transition-transform duration-500 hover:-translate-y-1"
                >
                  <div className="arch-inner relative w-full h-full overflow-hidden">
                    {cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                        sizes="25vw"
                      />
                    ) : (
                      <div className={`w-full h-full ${cat.gradientClass || 'bg-navy-silk'} p-6 flex flex-col justify-end`} />
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-inkNavy/95 via-inkNavy/50 to-transparent p-5 flex flex-col justify-end">
                      <span className="eyebrow-text text-zariGoldLight font-semibold text-[10px] tracking-[0.2em] mb-0.5">
                        {cat.eyebrow}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-ivory leading-tight group-hover:text-zariGoldLight transition-colors">
                        {cat.name}
                      </h3>
                    </div>

                    {/* Desktop Arch SVG Frame Overlay */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none z-30 drop-shadow-[0_1.5px_2.5px_rgba(13,14,26,0.6)]"
                      viewBox="0 0 200 268"
                      preserveAspectRatio="none"
                    >
                      <path
                        d={desktopGridSvgPath}
                        fill="none"
                        stroke="#B4863C"
                        strokeWidth="3"
                        strokeOpacity="0.85"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopByCategoryBento;
