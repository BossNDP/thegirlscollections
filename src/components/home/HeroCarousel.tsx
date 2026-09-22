'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Slide {
  id: number;
  group: 'women' | 'kids';
  image: string;
  mobileImage: string;
  objectPosition?: string;
  mobileObjectPosition?: string;
  eyebrow: string;
  titlePrefix: string;
  titleAmp?: string;
  titleSuffix: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  watermarkText: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    group: 'women',
    image: '/bgimageladies1desktop.webp',
    mobileImage: '/bgimage1ladies.webp',
    objectPosition: 'center 28%',
    mobileObjectPosition: 'center 20%',
    eyebrow: "ROYAL FESTIVE COUTURE '26",
    titlePrefix: 'Handcrafted Silk Anarkalis',
    titleAmp: '&',
    titleSuffix: 'Royal Suits',
    subtitle: 'Woven by master artisans in pure silk with rich hand-embroidered gold zari borders.',
    ctaText: 'EXPLORE WOMEN ETHNIC',
    ctaLink: '/shop?target=women',
    watermarkText: 'THE GIRLS',
  },
  {
    id: 2,
    group: 'women',
    image: '/bgimageladies1desktop.webp',
    mobileImage: '/bgimage2ladies.webp',
    objectPosition: 'center 32%',
    mobileObjectPosition: 'center 22%',
    eyebrow: 'HERITAGE COUTURE EDIT',
    titlePrefix: 'Royal Silk Lehengas',
    titleAmp: '&',
    titleSuffix: 'Bridal Weaves',
    subtitle: 'Statement royal zari motifs woven with pure gold threads for timeless elegance.',
    ctaText: 'DISCOVER COUTURE',
    ctaLink: '/shop?target=women',
    watermarkText: 'COUTURE',
  },
  {
    id: 3,
    group: 'kids',
    image: '/bgimageladies1desktop.webp',
    mobileImage: '/bgimage1kids.webp',
    objectPosition: 'center 35%',
    mobileObjectPosition: 'center 25%',
    eyebrow: 'LITTLE ROYALTY COLLECTION',
    titlePrefix: 'Kids Pattu Langa',
    titleAmp: '&',
    titleSuffix: 'Royal Frocks',
    subtitle: 'Soft cotton-lined pure silk lehengas tailored for itch-free celebratory comfort.',
    ctaText: 'SHOP KIDS ETHNIC',
    ctaLink: '/shop?target=kids',
    watermarkText: 'THE LITTLES',
  },
  {
    id: 4,
    group: 'kids',
    image: '/bgimageladies1desktop.webp',
    mobileImage: '/bgimage1kids.webp',
    objectPosition: 'center 30%',
    mobileObjectPosition: 'center 20%',
    eyebrow: 'PARTY WEAR FROCKS',
    titlePrefix: 'Layered Tulle',
    titleAmp: '&',
    titleSuffix: 'Organza Frocks',
    subtitle: 'Dreamy celebratory frocks designed for birthdays, weddings, and special events.',
    ctaText: 'EXPLORE FROCKS',
    ctaLink: '/shop?category=party-wear-frocks&target=kids',
    watermarkText: 'FROCKS',
  },
];

interface HeroCarouselProps {
  filter?: 'all' | 'women' | 'kids';
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ filter = 'all' }) => {
  const activeSlides = useMemo(() => {
    if (filter === 'all') return HERO_SLIDES;
    return HERO_SLIDES.filter((s) => s.group === filter);
  }, [filter]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    setCurrentSlide(0);
  }, [filter]);

  useEffect(() => {
    if (isPaused || activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, activeSlides.length]);

  const slide = activeSlides[currentSlide] || activeSlides[0];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  if (!slide) return null;

  const sideArrowClass =
    'pointer-events-auto w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-inkNavy/40 backdrop-blur-md text-ivory/85 hover:text-ivory border border-white/25 hover:border-white/60 hover:bg-inkNavy/70 transition-all flex items-center justify-center cursor-pointer focus:outline-none active:scale-95 shadow-sm';

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-screen h-[100dvh] bg-[#0F0C14] overflow-hidden flex flex-col justify-end select-none p-0 m-0 rounded-none border-none shadow-none contain-paint"
      style={{ height: '100dvh' }}
    >
      {/* Hidden preloader for instant slide image switching with zero flash */}
      <div className="hidden" aria-hidden="true">
        {HERO_SLIDES.map((s) => (
          <React.Fragment key={`preload-${s.id}`}>
            <Image src={s.image} alt="" width={1920} height={1080} priority />
            <Image src={s.mobileImage} alt="" width={750} height={1000} priority />
          </React.Fragment>
        ))}
      </div>

      {/* Background Image Layer (Absolute y=0 Full Bleed) */}
      <Link
        href={slide.ctaLink}
        prefetch={true}
        className="absolute inset-0 z-0 block cursor-pointer bg-[#0F0C14]"
        aria-label={slide.titlePrefix}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="absolute inset-0 z-0 bg-[#0F0C14]"
          >
            {/* Mobile View */}
            <div className="block sm:hidden absolute inset-0">
              <Image
                src={slide.mobileImage}
                alt={slide.titlePrefix}
                fill
                priority
                className="object-cover filter brightness-[0.88]"
                style={{ objectPosition: slide.mobileObjectPosition || 'center 20%' }}
                sizes="100vw"
                quality={90}
              />
            </div>

            {/* Desktop View */}
            <div className="hidden sm:block absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.titlePrefix}
                fill
                priority
                className="object-cover filter brightness-[0.90]"
                style={{ objectPosition: slide.objectPosition || 'center 28%' }}
                sizes="100vw"
                quality={92}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* TOP SCRIM GRADIENT: Clean neutral dark navy fade for floating header contrast */}
        <div className="absolute top-0 inset-x-0 h-48 sm:h-60 bg-gradient-to-b from-[#0F0C14]/85 via-[#0F0C14]/30 to-transparent pointer-events-none z-10" />

        {/* BOTTOM SCRIM GRADIENT: Soft gradient for text legibility */}
        <div className="absolute bottom-0 inset-x-0 h-72 sm:h-96 bg-gradient-to-t from-[#0F0C14]/90 via-[#0F0C14]/45 to-transparent pointer-events-none z-10" />
      </Link>

      {/* OVERSIZED SLIDE WATERMARK: Strictly anchored in bottom quadrant, cannot bleed above y=50dvh */}
      <div className="absolute bottom-28 sm:bottom-36 inset-x-0 z-10 pointer-events-none overflow-hidden max-h-[35vh] px-6 sm:px-14">
        <AnimatePresence mode="wait">
          <motion.span
            key={`watermark-${slide.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45 }}
            className="text-[60px] xs:text-[90px] sm:text-[140px] lg:text-[170px] font-serif font-extrabold text-white/[0.04] leading-none uppercase tracking-tighter block select-none whitespace-nowrap"
            aria-hidden="true"
          >
            {slide.watermarkText}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Main Text Content Block (Strictly positioned in lower quadrant below y=200px, no overflow into navbar) */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full px-6 sm:px-14 lg:px-20 pb-4 sm:pb-6 text-ivory pointer-events-none max-h-[50vh] overflow-hidden flex flex-col justify-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl lg:max-w-2xl text-left space-y-3 sm:space-y-3.5 pointer-events-auto"
          >
            {/* Eyebrow Label */}
            <span className="text-ivory/80 text-[10px] sm:text-xs tracking-[0.25em] font-sans font-medium uppercase block drop-shadow-xs">
              {slide.eyebrow}
            </span>

            {/* Editorial Headline */}
            <div>
              <h1 className="text-2.5xl xs:text-3.5xl sm:text-5xl lg:text-6xl font-serif font-bold text-ivory leading-[1.08] tracking-tight drop-shadow-md">
                {slide.titlePrefix}{' '}
                {slide.titleAmp && (
                  <span className="font-serif italic font-normal text-ivory/90 px-0.5">
                    {slide.titleAmp}
                  </span>
                )}{' '}
                {slide.titleSuffix}
              </h1>
            </div>

            {/* Subtitle (Calm contrast against lower gradient) */}
            <p className="text-xs sm:text-base text-ivory/90 font-sans font-light leading-relaxed max-w-md sm:max-w-lg line-clamp-2 drop-shadow-xs">
              {slide.subtitle}
            </p>

            {/* Restrained Luxury Ghost CTA Button */}
            <div className="pt-2">
              <Link
                href={slide.ctaLink}
                prefetch={true}
                className="px-7 py-3 sm:py-3.5 border border-white/80 text-white hover:bg-white hover:text-inkNavy transition-all duration-200 text-[11px] sm:text-xs font-sans tracking-[0.22em] font-semibold uppercase inline-flex items-center space-x-3 group min-h-[44px] backdrop-blur-xs"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 text-current group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* UNDERSTATED CAROUSEL DOTS (Clear separation below CTA and above mobile bottom nav) */}
      <div className="relative z-30 max-w-[1440px] mx-auto w-full px-6 sm:px-14 pb-20 sm:pb-8 flex items-center justify-start pointer-events-auto">
        <div className="flex items-center space-x-2">
          {activeSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentSlide(idx);
              }}
              className="p-1 cursor-pointer focus:outline-none"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <span
                className={`h-1.5 block rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'w-6 bg-ivory shadow-xs' : 'w-1.5 bg-ivory/35 hover:bg-ivory/70'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* UNIFIED OUTLINED SIDE ARROWS */}
      <div className="absolute inset-y-0 left-0 right-0 z-30 pointer-events-none flex items-center justify-between px-3 sm:px-6">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handlePrev();
          }}
          className={sideArrowClass}
          aria-label="Previous banner"
        >
          <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleNext();
          }}
          className={sideArrowClass}
          aria-label="Next banner"
        >
          <ChevronRight className="w-5 h-5 stroke-[1.5]" />
        </button>
      </div>
    </section>
  );
};

export default HeroCarousel;




