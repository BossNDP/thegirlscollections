'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { OCCASIONS_DATA } from '@/data/shopData';

import { useGSAPScrollReveal } from '@/lib/useGSAPScrollReveal';

export const OccasionGrid: React.FC = () => {
  const sectionRef = useGSAPScrollReveal<HTMLElement>({ selector: '.grid > a', stagger: 0.08 });

  return (
    <section
      ref={sectionRef}
      id="shop-occasion"
      className="py-12 sm:py-16 bg-ivory text-navy border-b border-roseGold/20 scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Left-Aligned Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 sm:mb-10 border-b border-roseGold/20 pb-4">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-roseGold font-sans font-medium">
              Curated Occasions
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-navy leading-[0.98] tracking-tight mt-1">
              Shop By Occasion
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-roseGold hover:text-navy transition-colors shrink-0"
          >
            <span>All Occasions</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        {/* Editorial Occasion Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {OCCASIONS_DATA.map((occ) => (
            <Link
              key={occ.id}
              href={`/shop?occasion=${occ.id}`}
              className="group block space-y-3"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-roseGold/20 bg-ivory-muted shadow-sm group-hover:shadow-md transition-all">
                <Image
                  src={occ.image}
                  alt={occ.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Caption Text Block Below Image */}
              <div className="pt-1 space-y-1 border-b border-roseGold/20 pb-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-serif font-bold text-navy group-hover:text-roseGold transition-colors">
                    {occ.title}
                  </h3>
                  <span className="text-[11px] font-sans text-roseGold font-medium">
                    {occ.count}
                  </span>
                </div>
                <p className="text-xs text-charcoal-muted font-sans font-light line-clamp-2 min-h-[2.5rem]">
                  {occ.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OccasionGrid;
