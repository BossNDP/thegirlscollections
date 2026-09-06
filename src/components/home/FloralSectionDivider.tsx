'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ButterflyMotif } from '@/components/ui/Motifs';

export type FloralVariant = 'marigold' | 'pink' | 'western' | 'whiterose';

interface FloralDividerConfig {
  imageSrc: string;
  bgGradient: string;
  defaultKicker: string;
}

const DIVIDER_CONFIGS: Record<FloralVariant, FloralDividerConfig> = {
  marigold: {
    imageSrc: '/dividers/marigold.webp',
    bgGradient: 'from-sand/40 via-ivory to-sand/40',
    defaultKicker: 'ROYAL HERITAGE & ARTISANAL CRAFT',
  },
  pink: {
    imageSrc: '/dividers/pink.webp',
    bgGradient: 'from-[#F4E3DD]/50 via-ivory to-[#F4E3DD]/50',
    defaultKicker: 'CURATED SILK & FESTIVE EDITS',
  },
  western: {
    imageSrc: '/dividers/western.webp',
    bgGradient: 'from-[#EAE5D9]/50 via-ivory to-[#EAE5D9]/50',
    defaultKicker: 'SIGNATURE OCCASIONS & CELEBRATIONS',
  },
  whiterose: {
    imageSrc: '/dividers/whiterose.webp',
    bgGradient: 'from-[#F7F2E4]/50 via-ivory to-[#F7F2E4]/50',
    defaultKicker: 'HANDCRAFTED WITH INTENT',
  },
};

interface FloralSectionDividerProps {
  id?: string;
  variant?: FloralVariant;
  kicker?: string;
  className?: string;
}

export const FloralSectionDivider: React.FC<FloralSectionDividerProps> = ({
  id,
  variant = 'marigold',
  kicker,
  className = '',
}) => {
  const config = DIVIDER_CONFIGS[variant] || DIVIDER_CONFIGS.marigold;
  const displayText = kicker || config.defaultKicker;

  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full relative py-5 sm:py-7 my-4 select-none overflow-hidden bg-gradient-to-r ${config.bgGradient} border-y border-zariGold/30 shadow-xs ${className}`}
      aria-label="Section Divider"
    >
      {/* Decorative Gold Accent Lines (Top & Bottom hairline) */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-zariGold/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-zariGold/60 to-transparent pointer-events-none" />

      <div className="max-w-[1440px] mx-auto h-[95px] sm:h-[115px] md:h-[135px] relative flex items-center justify-center px-4">
        
        {/* LEFT FLORAL GARLAND (Hanging gracefully from top-left, 100% steady GPU acceleration) */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-24 sm:w-40 md:w-52 pointer-events-none transition-[opacity,transform] duration-500 ease-out transform-gpu will-change-transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}
        >
          <Image
            src={config.imageSrc}
            alt=""
            fill
            sizes="(max-width: 640px) 96px, 208px"
            className="object-contain object-left-top drop-shadow-xs"
            priority
          />
        </div>

        {/* RIGHT FLORAL GARLAND (Horizontally mirrored hanging from top-right) */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-24 sm:w-40 md:w-52 pointer-events-none transition-[opacity,transform] duration-500 ease-out transform-gpu will-change-transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}
        >
          <Image
            src={config.imageSrc}
            alt=""
            fill
            sizes="(max-width: 640px) 96px, 208px"
            className="object-contain object-right-top scale-x-[-1] drop-shadow-xs"
            priority
          />
        </div>

        {/* CENTER ROYAL CREST & TYPOGRAPHY — Rock Solid Layout */}
        <div
          className={`relative z-10 flex flex-col items-center justify-center text-center transition-[opacity,transform] duration-500 ease-out transform-gpu will-change-transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          {/* Floating Luxury Arch Badge Frame */}
          <div className="relative px-5 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white/95 border border-zariGold/40 shadow-md flex flex-col items-center gap-0.5 group">
            {/* Top Centered Butterfly Motif */}
            <div className="flex items-center gap-2 mb-0.5">
              <span className="h-[1px] w-5 sm:w-7 bg-gradient-to-r from-transparent to-zariGold/60" />
              <ButterflyMotif className="w-4 h-4 sm:w-5 sm:h-5 text-zariGold" />
              <span className="h-[1px] w-5 sm:w-7 bg-gradient-to-l from-transparent to-zariGold/60" />
            </div>

            {/* Regal Cormorant Garamond Title */}
            <h2 className="font-serif text-xs sm:text-base md:text-lg lg:text-xl font-bold tracking-[0.2em] uppercase text-navy leading-tight">
              {displayText}
            </h2>

            {/* Bottom Hairline Accent */}
            <div className="flex items-center gap-2 mt-0.5">
              <span className="h-[1px] w-10 sm:w-14 bg-gradient-to-r from-transparent via-zariGold to-transparent" />
              <span className="text-zariGold text-[9px] leading-none">❖</span>
              <span className="h-[1px] w-10 sm:w-14 bg-gradient-to-r from-transparent via-zariGold to-transparent" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FloralSectionDivider;
