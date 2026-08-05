'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  textPosition: 'left' | 'center' | 'right';
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=90&w=1800",
    eyebrow: "Festive Couture '26",
    title: "Handcrafted Sarees & Royal Weaves",
    subtitle: "Pure Chanderi silk & organza drapes in timeless golden-hour radiance.",
    ctaText: "Explore The Festive Edit",
    ctaLink: "/shop?occasion=Festive",
    textPosition: "left",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&q=90&w=1800",
    eyebrow: "Little Royalty Collection",
    title: "Pure Silk Kanjeevaram Pattu Frocks",
    subtitle: "Handcrafted with soft cotton lining for non-scratchy sensitive skin comfort.",
    ctaText: "Shop Kids Ethnic Wear",
    ctaLink: "/shop?target=kids",
    textPosition: "center",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=90&w=1800",
    eyebrow: "Royal Wedding Guest",
    title: "Statement Zari Lehengas & Gowns",
    subtitle: "Ornate silhouettes embellished with fine gold zari & fluid drapes.",
    ctaText: "View Wedding Collection",
    ctaLink: "/shop?category=lehengas",
    textPosition: "right",
  },
];

export const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full h-[75vh] sm:h-[88vh] min-h-[540px] max-h-[900px] overflow-hidden bg-navy">
      {/* Editorial Photography Banner Layers - Full Saturation & Clarity */}
      {HERO_SLIDES.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            priority={idx === 0}
            className="object-cover object-center scale-100 transition-transform duration-[10000ms] ease-out hover:scale-105"
            sizes="100vw"
            quality={92}
          />
        </div>
      ))}

      {/* Targeted Radial Text Scrim (Preserves full photo saturation while boosting copy readability) */}
      <div className="absolute inset-0 z-15 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent sm:bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] sm:from-navy/90 sm:via-navy/55 sm:to-transparent pointer-events-none" />

      {/* Hero Content Layer */}
      <div className="relative z-20 max-w-[1440px] mx-auto h-full px-6 sm:px-12 lg:px-16 flex flex-col justify-center text-ivory">
        <div
          key={slide.id}
          className={`max-w-xl sm:max-w-2xl lg:max-w-3xl space-y-2.5 sm:space-y-3.5 transition-all duration-700 animate-in fade-in slide-in-from-bottom-4 ${
            slide.textPosition === 'center'
              ? 'mx-auto text-center'
              : slide.textPosition === 'right'
              ? 'ml-auto text-left'
              : 'text-left'
          }`}
        >
          {/* Eyebrow Tag with Script Accent */}
          <div className="flex items-center gap-2">
            <span className="font-script text-roseGold text-2xl sm:text-3xl font-normal">
              {slide.eyebrow}
            </span>
          </div>

          {/* Dramatically Larger High-Contrast Headline (tighter line-height leading-[0.98]) */}
          <h1 className="text-3xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-ivory-cream leading-[0.98] tracking-tight drop-shadow-md">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-ivory/90 font-sans font-light leading-relaxed max-w-lg drop-shadow-sm pt-0.5">
            {slide.subtitle}
          </p>

          {/* Responsive CTAs (Slight scale lift on hover without harsh color inversion) */}
          <div className={`pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 ${
            slide.textPosition === 'center' ? 'justify-center' : 'justify-start'
          }`}>
            <Link
              href={slide.ctaLink}
              className="px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-roseGold text-navy text-xs font-bold uppercase tracking-widest hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 shadow-xl inline-flex items-center justify-center space-x-3 group"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-navy group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Low-Profile Luxury Chevron Controls */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 flex items-center gap-2 bg-navy/60 backdrop-blur-md border border-roseGold/20 rounded-full px-3 py-1.5 text-ivory/80 hover:text-ivory transition-colors">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="hover:text-roseGold transition-colors p-1"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="w-px h-3 bg-roseGold/30" />
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
          className="hover:text-roseGold transition-colors p-1"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default HeroCarousel;
