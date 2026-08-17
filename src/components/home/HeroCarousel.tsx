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
    image: "/hero/hero-saree-1.png",
    mobileImage: "/bgimage1ladies.webp",
    eyebrow: "ROYAL FESTIVE COUTURE '26",
    titlePrefix: "Handcrafted Silk Sarees",
    titleAmp: "&",
    titleSuffix: "Zari Drapes",
    subtitle: "Timeless champagne & gold drapes sculpted in pure Kanjeevaram & Chanderi silk.",
    ctaText: "Explore Collection",
    ctaLink: "/shop?category=sarees",
  },
  {
    id: 2,
    image: "/hero/hero-kids-2.png",
    mobileImage: "/bgimage1lkids.webp",
    eyebrow: "LITTLE ROYALTY COLLECTION",
    titlePrefix: "Kids Pattu Langa",
    titleAmp: "&",
    titleSuffix: "Royal Frocks",
    subtitle: "Soft cotton-lined pure silk lehengas tailored for itch-free celebratory comfort.",
    ctaText: "Shop Kids Ethnic",
    ctaLink: "/shop?target=kids",
  },
  {
    id: 3,
    image: "/hero/hero-saree-3.png",
    mobileImage: "/bgimage2ladies.webp",
    eyebrow: "TARUNI LUXURY EDITION",
    titlePrefix: "Designer Zari Gowns",
    titleAmp: "&",
    titleSuffix: "Festive Couture",
    subtitle: "Exquisite blush & gold silhouettes adorned with royal palace heritage embroidery.",
    ctaText: "View Festive Edit",
    ctaLink: "/shop?occasion=Festive",
  },
  {
    id: 4,
    image: "/hero/hero-saree-1.png",
    mobileImage: "/bgimage3ladies.webp",
    eyebrow: "HERITAGE COUTURE EDIT",
    titlePrefix: "Royal Silk Lehengas",
    titleAmp: "&",
    titleSuffix: "Bridal Weaves",
    subtitle: "Statement royal zari motifs woven with pure 24k gold threads for timeless elegance.",
    ctaText: "Discover Couture",
    ctaLink: "/shop?category=lehengas",
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
    <section className="relative w-full h-[85vh] min-h-[580px] max-h-[920px] bg-inkNavy overflow-hidden flex flex-col justify-between">
      {/* Background Imagery with Woven Texture Fallback */}
      <div className="absolute inset-0 bg-woven-texture z-0">
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Mobile Optimized High-Res WebP View */}
            <div className="block sm:hidden absolute inset-0">
              <Image
                src={s.mobileImage}
                alt={s.titlePrefix}
                fill
                priority={idx === 0}
                className="object-cover object-center animate-hero-zoom opacity-90"
                sizes="(max-width: 640px) 100vw, 50vw"
                quality={90}
              />
            </div>

            {/* Desktop View */}
            <div className="hidden sm:block absolute inset-0">
              <Image
                src={s.image}
                alt={s.titlePrefix}
                fill
                priority={idx === 0}
                className="object-cover object-[75%_center] animate-hero-zoom opacity-85"
                sizes="100vw"
                quality={92}
              />
            </div>
          </div>
        ))}
        {/* Soft Radial Scrim Overlay */}
        <div className="absolute inset-0 z-15 bg-gradient-to-t from-inkNavy via-inkNavy/60 to-transparent sm:bg-gradient-to-r sm:from-inkNavy/95 sm:via-inkNavy/65 sm:to-transparent" />
      </div>

      {/* Main Hero Content Layer */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full px-6 sm:px-12 lg:px-16 flex-1 flex flex-col justify-end sm:justify-center pb-12 sm:pb-0 text-ivory pt-8">
        <div
          key={slide.id}
          className="max-w-xl lg:max-w-3xl text-left space-y-4 sm:space-y-6 transition-all duration-700 animate-in fade-in slide-in-from-left-4"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="eyebrow-text text-zariGoldLight">{slide.eyebrow}</span>
          </div>

          {/* Large Serif Display Headline */}
          <div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-[84px] font-serif font-semibold text-ivory leading-[1.02] tracking-[-0.02em]">
              {slide.titlePrefix}{' '}
              {slide.titleAmp && (
                <span className="font-serif italic font-normal text-zariGold px-1">
                  {slide.titleAmp}
                </span>
              )}{' '}
              {slide.titleSuffix}
            </h1>
            {/* Static Gold Underline Accent (60px wide, no animation) */}
            <div className="w-[60px] h-[2px] bg-gold-gradient mt-3 sm:mt-4" />
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-ivory/80 font-sans font-light leading-relaxed max-w-lg">
            {slide.subtitle}
          </p>

          {/* CTA Button */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href={slide.ctaLink}
              className="px-8 py-4 rounded-[2px] btn-gold-gradient text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] inline-flex items-center justify-center space-x-3 group shadow-xl"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Navigation Controls */}
      <div className="relative z-30 max-w-[1440px] mx-auto w-full px-6 sm:px-12 pb-6 sm:pb-8 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentSlide ? 'w-8 bg-zariGold' : 'w-2 bg-ivory/30'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center space-x-2 text-ivory">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="w-10 h-10 rounded-full border border-zariGold/30 flex items-center justify-center hover:bg-zariGold hover:text-inkNavy transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="w-10 h-10 rounded-full border border-zariGold/30 flex items-center justify-center hover:bg-zariGold hover:text-inkNavy transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
