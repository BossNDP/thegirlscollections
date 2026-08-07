'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const SecondaryCampaignBanner: React.FC = () => {
  return (
    <section className="w-full relative py-12 sm:py-20 bg-ivory overflow-hidden border-b border-navy/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-sm overflow-hidden border border-navy/10 shadow-lg bg-navy text-ivory flex items-center justify-center">
          {/* Background Campaign Image */}
          <Image
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=90&w=1800"
            alt="Festive Edit Campaign"
            fill
            className="object-cover object-center opacity-85 hover:scale-105 transition-transform duration-1000 ease-out"
            sizes="100vw"
          />

          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-transparent" />

          {/* Campaign Narrative Box */}
          <div className="relative z-10 max-w-xl px-6 sm:px-12 text-left space-y-2 sm:space-y-4">
            <span className="text-[10px] sm:text-xs font-sans font-medium uppercase tracking-[0.22em] text-roseGold">
              Seasonal Spotlight
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif italic text-ivory tracking-tight leading-tight">
              Festive Edit &apos;26
            </h2>
            <p className="text-xs sm:text-sm font-sans font-light text-ivory/85 max-w-md line-clamp-2">
              Opulent zari handwork and fluid silk drapes designed for celebratory radiance.
            </p>
            <div className="pt-2">
              <Link
                href="/shop?occasion=Festive"
                className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-roseGold text-navy text-xs font-semibold uppercase tracking-[0.14em] hover:bg-white transition-all duration-300 shadow-sm inline-block"
              >
                Discover the Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondaryCampaignBanner;
