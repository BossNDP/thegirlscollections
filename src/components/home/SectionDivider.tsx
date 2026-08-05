'use client';

import React from 'react';
import { useGSAPScrollReveal } from '@/lib/useGSAPScrollReveal';

interface SectionDividerProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  eyebrow = 'Signature Heritage',
  title = 'Handcrafted Luxury & Royal Indian Weaves',
  subtitle = 'Every drape is thoughtfully curated with pure Kanjeevaram silks, Chanderi weaves, and fine Zardosi handwork.',
}) => {
  const containerRef = useGSAPScrollReveal<HTMLElement>({ stagger: 0.1, yOffset: 20 });

  return (
    <section
      ref={containerRef}
      className="w-full bg-navy text-ivory-cream py-14 sm:py-20 relative overflow-hidden my-4 border-y border-roseGold/30"
    >
      {/* Background Subtle Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-roseGold/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        {/* Original Line-Art Floral Motif SVG in Gold & Blush */}
        <div className="mb-4 text-roseGold flex items-center gap-3">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-roseGold/60" />
          <svg className="w-7 h-7 fill-none stroke-current stroke-[1.2]" viewBox="0 0 40 40">
            {/* Center Petal Flower Motif */}
            <path d="M20 5 C22 12, 28 18, 35 20 C28 22, 22 28, 20 35 C18 28, 12 22, 5 20 C12 18, 18 12, 20 5 Z" stroke="#C9A567" fill="none" />
            <circle cx="20" cy="20" r="3.5" fill="#D8A7A0" />
            <circle cx="20" cy="20" r="1.5" fill="#1B1F3B" />
          </svg>
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-roseGold/60" />
        </div>

        {/* Eyebrow */}
        <span className="text-xs font-sans font-medium uppercase tracking-[0.25em] text-roseGold block mb-2">
          {eyebrow}
        </span>

        {/* Serif Headline in Cream #F5F0E8 */}
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-ivory-cream leading-tight tracking-tight max-w-2xl">
          {title}
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-ivory/80 font-sans font-light leading-relaxed max-w-xl mt-3">
          {subtitle}
        </p>

        {/* Bottom Small Accent Dot */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-roseGold/50" />
          <span className="w-2.5 h-2.5 rounded-full bg-blush/80 shadow-sm" />
          <span className="w-1.5 h-1.5 rounded-full bg-roseGold/50" />
        </div>
      </div>
    </section>
  );
};

export default SectionDivider;
