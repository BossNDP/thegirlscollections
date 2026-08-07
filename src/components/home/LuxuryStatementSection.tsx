'use client';

import React from 'react';
import { useGSAPScrollReveal } from '@/lib/useGSAPScrollReveal';

export const LuxuryStatementSection: React.FC = () => {
  const containerRef = useGSAPScrollReveal<HTMLElement>({ yOffset: 20, duration: 0.8 });

  return (
    <section
      ref={containerRef}
      className="w-full bg-ivory text-navy py-20 sm:py-32 border-b border-navy/10 relative overflow-hidden select-none"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center space-y-4">
        {/* Subtle Decorative Diamond Icon */}
        <div className="flex justify-center items-center gap-2">
          <span className="w-8 h-[1px] bg-roseGold/50" />
          <span className="w-1.5 h-1.5 rotate-45 bg-roseGold inline-block" />
          <span className="w-8 h-[1px] bg-roseGold/50" />
        </div>

        {/* Large Editorial Serif Display Quote */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif italic text-navy leading-[1.12] tracking-tight max-w-3xl mx-auto font-normal">
          Crafted for women who appreciate timeless elegance.
        </h2>

        <p className="text-base sm:text-2xl font-serif font-light text-navy/70 tracking-tight pt-1">
          Every thread tells a story of royal South Indian heritage.
        </p>

        <div className="pt-3">
          <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-roseGold font-medium">
            THE GIRLS COLLECTION — EST. 2024
          </span>
        </div>
      </div>
    </section>
  );
};

export default LuxuryStatementSection;
