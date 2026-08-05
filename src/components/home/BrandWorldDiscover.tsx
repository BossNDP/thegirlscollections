'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Heart, Award, ShieldCheck } from 'lucide-react';

export const BrandWorldDiscover: React.FC = () => {
  return (
    <section
      id="discover-brand-world"
      className="w-full bg-navy text-ivory py-20 sm:py-32 border-b border-roseGold/20 scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-16 sm:space-y-20">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 max-w-2xl mx-auto">
          <div className="flex items-center space-x-2 text-roseGold font-sans text-xs uppercase tracking-[0.22em] font-medium">
            <Sparkles className="w-4 h-4 text-roseGold" />
            <span>Our Heritage &amp; Craft</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-ivory leading-[0.98] tracking-tight">
            Discover The Girls Collection
          </h2>
          <p className="text-xs sm:text-sm font-sans font-light text-ivory/80 leading-relaxed">
            Where centuries-old Indian handloom weaving meets contemporary luxury silhouettes for women and little girls.
          </p>
          <div className="w-16 h-0.5 bg-roseGold mt-2" />
        </div>

        {/* Story Grid: 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Image Mosaic */}
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-roseGold/30 shadow-2xl group">
            <Image
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=1200"
              alt="Artisan Loom Weaving"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-navy/80 backdrop-blur-md border border-roseGold/30 text-ivory">
              <p className="text-xs font-serif italic text-roseGold">
                &ldquo;Every thread tells a story of royal South Indian zari heritage.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ivory">
                Handcrafted with Pure Pure Silks &amp; Authentic Zari
              </h3>
              <p className="text-xs sm:text-sm font-sans font-light text-ivory/80 leading-relaxed">
                Founded with a mission to preserve traditional weaving arts while designing ethereal festive ensembles, our garments are crafted by master weavers across Kanchipuram, Banaras, and Chanderi.
              </p>
            </div>

            {/* 3 Core Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              <div className="space-y-2 p-4 rounded-xl bg-ivory/5 border border-roseGold/20">
                <Award className="w-5 h-5 text-roseGold" />
                <h4 className="text-xs font-serif font-bold text-ivory">Master Weavers</h4>
                <p className="text-[11px] font-sans font-light text-ivory/70 leading-normal">
                  Supporting 120+ traditional weaver families directly.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-ivory/5 border border-roseGold/20">
                <Heart className="w-5 h-5 text-dustyBlush" />
                <h4 className="text-xs font-serif font-bold text-ivory">Kid-Gentle Lining</h4>
                <p className="text-[11px] font-sans font-light text-ivory/70 leading-normal">
                  Soft 100% breathable cotton lining under every frock.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-ivory/5 border border-roseGold/20">
                <ShieldCheck className="w-5 h-5 text-sage" />
                <h4 className="text-xs font-serif font-bold text-ivory">Certified Pure</h4>
                <p className="text-[11px] font-sans font-light text-ivory/70 leading-normal">
                  Authentic Silk Mark certified pure handloom weaves.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BrandWorldDiscover;
