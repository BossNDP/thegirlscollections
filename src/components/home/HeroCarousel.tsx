'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  eyebrow: string;
  titlePrefix: string;
  titleAmp?: string;
  titleSuffix: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  textPosition: 'left' | 'right';
  theme: 'dark' | 'light';
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    image: "/hero/hero-saree-1.png",
    eyebrow: "Royal Bridal & Festive Edit '26",
    titlePrefix: "Handcrafted Silk Sarees ",
    titleAmp: "&",
    titleSuffix: " Zari Drapes",
    subtitle: "Timeless champagne & gold weaves sculpted in pure Kanjeevaram & Chanderi silk.",
    ctaText: "Explore Sarees",
    ctaLink: "/shop?category=sarees",
    textPosition: "left",
    theme: "dark",
  },
  {
    id: 2,
    image: "/hero/hero-kids-2.png",
    eyebrow: "Little Royalty Collection",
    titlePrefix: "Kids Pattu Langa ",
    titleAmp: "&",
    titleSuffix: " Royal Frocks",
    subtitle: "Soft cotton-lined pure silk lehengas & festive davanis tailored for itch-free comfort.",
    ctaText: "Shop Kids Ethnic",
    ctaLink: "/shop?target=kids",
    textPosition: "left",
    theme: "dark",
  },
  {
    id: 3,
    image: "/hero/hero-saree-3.png",
    eyebrow: "Taruni Luxury Edition",
    titlePrefix: "Designer Peach Zari ",
    titleAmp: "&",
    titleSuffix: " Festive Couture",
    subtitle: "Exquisite blush & peach silk drapes adorned with royal palace heritage embroidery.",
    ctaText: "View Luxury Edit",
    ctaLink: "/shop?occasion=Festive",
    textPosition: "left",
    theme: "dark",
  },
];

export const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full h-[75vh] sm:h-[82vh] min-h-[520px] max-h-[850px] overflow-hidden bg-navy">
      {/* Hero Banner Imagery */}
      {HERO_SLIDES.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <Image
            src={s.image}
            alt={s.titlePrefix + (s.titleAmp || '') + s.titleSuffix}
            fill
            priority={idx === 0}
            onLoadingComplete={() => handleImageLoad(s.id)}
            className={`object-cover object-right sm:object-[75%_center] animate-hero-zoom transition-all duration-700 ease-out ${
              loadedImages[s.id] ? 'blur-0 opacity-100' : 'blur-md opacity-0'
            }`}
            sizes="100vw"
            quality={92}
          />
        </div>
      ))}

      {/* Asymmetric Radial Scrim Overlay */}
      <div className="absolute inset-0 z-15 bg-gradient-to-t from-navy/95 via-navy/60 to-transparent sm:bg-gradient-to-r sm:from-navy/90 sm:via-navy/50 sm:to-transparent pointer-events-none" />

      {/* Hero Content Layer */}
      <div className="relative z-20 max-w-[1440px] mx-auto h-full px-6 sm:px-12 lg:px-16 flex flex-col justify-end sm:justify-center pb-16 sm:pb-0 text-ivory">
        <div
          key={slide.id}
          className="max-w-md sm:max-w-xl lg:max-w-2xl text-left space-y-3 sm:space-y-4 transition-all duration-700 animate-in fade-in slide-in-from-left-4"
        >
          {/* Eyebrow Label */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-roseGold font-sans font-medium">
              {slide.eyebrow}
            </span>
          </div>

          {/* Large Display Serif Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-ivory leading-[1.04] tracking-tight drop-shadow-sm">
            {slide.titlePrefix}
            {slide.titleAmp && (
              <span className="font-serif italic font-normal text-roseGold px-0.5">{slide.titleAmp}</span>
            )}
            {slide.titleSuffix}
          </h1>

          {/* Single-Line Subhead */}
          <p className="text-xs sm:text-base text-ivory/85 font-sans font-light leading-relaxed max-w-md pt-0.5">
            {slide.subtitle}
          </p>

          {/* Pill CTA Button */}
          <div className="pt-3 sm:pt-4 flex items-center justify-start">
            <Link
              href={slide.ctaLink}
              className="px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-roseGold text-navy text-xs font-semibold uppercase tracking-[0.15em] hover:bg-white hover:text-navy transition-all duration-300 shadow-md inline-flex items-center justify-center space-x-3 group"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-navy group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Low-Profile Corner Slide Indicators */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-30 flex items-center gap-3 bg-navy/75 backdrop-blur-md border border-roseGold/20 rounded-full px-3.5 py-1.5 text-ivory/80">
        <div className="flex items-center space-x-1.5 pr-2 border-r border-roseGold/20">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-5 bg-roseGold' : 'w-1.5 bg-ivory/40 hover:bg-ivory/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="hover:text-roseGold transition-colors p-1"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="hover:text-roseGold transition-colors p-1"
            aria-label="Next slide"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
