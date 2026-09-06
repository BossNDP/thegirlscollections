'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  mobileImage: string;
  eyebrow: string;
  titlePrefix: string;
  titleAmp?: string;
  titleSuffix: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    image: "/bgimageladies1desktop.webp",
    mobileImage: "/bgimage1ladies.webp",
    eyebrow: "ROYAL FESTIVE COUTURE '26",
    titlePrefix: "Handcrafted Silk Anarkalis",
    titleAmp: "&",
    titleSuffix: "Royal Suits",
    subtitle: "Woven by master artisans in pure silk with rich hand-embroidered gold zari borders.",
    ctaText: "EXPLORE COLLECTION",
    ctaLink: "/shop",
  },
  {
    id: 2,
    image: "/bgimageladies1desktop.webp",
    mobileImage: "/bgimage2ladies.webp",
    eyebrow: "HERITAGE COUTURE EDIT",
    titlePrefix: "Royal Silk Lehengas",
    titleAmp: "&",
    titleSuffix: "Bridal Weaves",
    subtitle: "Statement royal zari motifs woven with pure 24k gold threads for timeless elegance.",
    ctaText: "DISCOVER COUTURE",
    ctaLink: "/shop",
  },
  {
    id: 3,
    image: "/bgimageladies1desktop.webp",
    mobileImage: "/bgimage1kids.webp",
    eyebrow: "LITTLE ROYALTY COLLECTION",
    titlePrefix: "Kids Pattu Langa",
    titleAmp: "&",
    titleSuffix: "Royal Frocks",
    subtitle: "Soft cotton-lined pure silk lehengas tailored for itch-free celebratory comfort.",
    ctaText: "SHOP KIDS ETHNIC",
    ctaLink: "/shop",
  },
];

export const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full h-[72vh] min-h-[540px] max-h-[720px] sm:h-[480px] md:h-[500px] lg:h-[520px] sm:max-h-[560px] sm:min-h-[400px] bg-inkNavy overflow-hidden flex flex-col justify-between group">
      {/* Background Imagery — Clickable directly to /shop */}
      <Link href="/shop" prefetch={true} className="absolute inset-0 z-0 block cursor-pointer" aria-label="Explore Shop">
        <div className="absolute inset-0 bg-woven-texture">
          {HERO_SLIDES.map((s, idx) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Mobile View */}
              <div className="block sm:hidden absolute inset-0">
                {(idx === currentSlide || Math.abs(idx - currentSlide) === 1) && (
                  <Image
                    src={s.mobileImage}
                    alt={s.titlePrefix}
                    fill
                    priority={idx === 0}
                    className="object-cover object-top animate-hero-zoom opacity-90 transform-gpu will-change-transform"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    quality={85}
                  />
                )}
              </div>

              {/* Desktop View */}
              <div className="hidden sm:block absolute inset-0">
                {(idx === currentSlide || Math.abs(idx - currentSlide) === 1) && (
                  <Image
                    src={s.image}
                    alt={s.titlePrefix}
                    fill
                    priority={idx === 0}
                    className="object-cover object-center animate-hero-zoom opacity-85 transform-gpu will-change-transform"
                    sizes="100vw"
                    quality={85}
                  />
                )}
              </div>
            </div>
          ))}
          {/* Soft Radial Overlay Scrim */}
          <div className="absolute inset-0 z-15 bg-gradient-to-t from-inkNavy via-inkNavy/50 to-transparent sm:bg-gradient-to-r sm:from-inkNavy/90 sm:via-inkNavy/50 sm:to-transparent" />
        </div>
      </Link>

      {/* Main Hero Content Layer */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full px-6 sm:px-12 lg:px-16 flex-1 flex flex-col justify-end sm:justify-center pb-6 sm:pb-0 text-ivory pt-6 pointer-events-none">
        <div
          key={slide.id}
          className="max-w-xl lg:max-w-2xl text-left space-y-3 sm:space-y-4 transition-all duration-700 animate-in fade-in slide-in-from-left-4 pointer-events-auto"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="eyebrow-text text-zariGoldLight text-[10px] sm:text-xs tracking-[0.2em]">
              {slide.eyebrow}
            </span>
          </div>

          {/* Large Serif Display Headline */}
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-ivory leading-[1.05] tracking-tight">
              {slide.titlePrefix}{' '}
              {slide.titleAmp && (
                <span className="font-serif italic font-normal text-zariGold px-0.5">
                  {slide.titleAmp}
                </span>
              )}{' '}
              {slide.titleSuffix}
            </h1>
            <div className="w-[50px] h-[2px] bg-gold-gradient mt-2.5 sm:mt-3" />
          </div>

          {/* Subtitle */}
          <p className="text-xs sm:text-base text-ivory/80 font-sans font-light leading-relaxed max-w-md line-clamp-2">
            {slide.subtitle}
          </p>

          {/* CTA Button */}
          <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/shop"
              prefetch={true}
              className="px-6 py-3 sm:py-3.5 rounded-md bg-gold-gradient text-inkNavy font-sans text-xs font-bold uppercase tracking-[0.2em] inline-flex items-center justify-center space-x-2.5 group shadow-lg hover:shadow-zariGold/20 active:scale-98 transition-all duration-200"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 text-inkNavy group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Navigation Controls */}
      <div className="relative z-30 max-w-[1440px] mx-auto w-full px-6 sm:px-12 pb-4 sm:pb-5 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center space-x-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentSlide(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                idx === currentSlide ? 'w-8 bg-zariGold' : 'w-2 bg-ivory/30'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center space-x-2 text-ivory">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-zariGold/30 flex items-center justify-center hover:bg-zariGold hover:text-inkNavy transition-colors cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-zariGold/30 flex items-center justify-center hover:bg-zariGold hover:text-inkNavy transition-colors cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
