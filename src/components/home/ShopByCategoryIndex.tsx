'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SHOP_BY_CATEGORY_ITEMS } from '@/data/categoryTaxonomy';

import { useGSAPScrollReveal } from '@/lib/useGSAPScrollReveal';

export const ShopByCategoryIndex: React.FC = () => {
  const sectionRef = useGSAPScrollReveal<HTMLElement>({ selector: '.editorial-tile', stagger: 0.08 });

  return (
    <section
      ref={sectionRef}
      id="shop-category-index"
      className="w-full bg-ivory py-14 sm:py-22 border-b border-roseGold/20 scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 sm:mb-12 border-b border-roseGold/20 pb-4">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-roseGold font-sans font-medium">
              Lookbook Index
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-navy leading-[0.98] tracking-tight mt-1">
              Shop By Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-roseGold hover:text-navy transition-colors shrink-0 group"
          >
            <span>Explore Full Index</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>

        {/* --- DESKTOP ASYMMETRIC EDITORIAL GRID (Hidden on mobile) --- */}
        <div className="hidden md:grid grid-cols-4 gap-5 lg:gap-6 auto-rows-[260px] lg:auto-rows-[300px]">
          {SHOP_BY_CATEGORY_ITEMS.map((item, idx) => {
            // Mixed-scale bento spans for authentic magazine lookbook
            const spanClass =
              idx === 0
                ? 'col-span-2 row-span-2' // Hero Category Tile
                : idx === 1
                ? 'col-span-2 row-span-1' // Wide Landscape Tile
                : idx === 2 || idx === 3
                ? 'col-span-1 row-span-1' // Standard Portrait Tiles
                : 'col-span-1 row-span-1'; // Supporting Tiles

            return (
              <Link
                key={item.id}
                href={`/shop?category=${item.slug}`}
                className={`editorial-tile group relative rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-navy ${spanClass}`}
              >
                {/* Full-Bleed Imagery */}
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  priority={idx === 0}
                />

                {/* Bottom Scrim & Serif Display Typography */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent p-5 lg:p-7 flex flex-col justify-end text-ivory">
                  <h3 className="text-xl lg:text-3xl font-serif font-bold text-ivory tracking-tight group-hover:text-roseGold transition-colors leading-tight">
                    {item.name}
                  </h3>
                  <div className="mt-1 flex items-center text-xs font-sans font-medium text-roseGold uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* --- MOBILE SINGLE-COLUMN EDITORIAL FLOW (No Horizontal Scroll) --- */}
        <div className="flex flex-col md:hidden space-y-4">
          {SHOP_BY_CATEGORY_ITEMS.map((item, idx) => (
            <Link
              key={item.id}
              href={`/shop?category=${item.slug}`}
              className={`editorial-tile group relative w-full rounded-sm overflow-hidden shadow-sm active:scale-[0.99] transition-all bg-navy ${
                idx === 0 ? 'aspect-[4/5]' : 'aspect-[16/10]'
              }`}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="100vw"
                className="object-cover"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/35 to-transparent p-5 flex flex-col justify-end text-ivory">
                <h3 className="text-2xl font-serif font-bold text-ivory tracking-tight">
                  {item.name}
                </h3>
                <span className="text-xs font-sans font-medium text-roseGold uppercase tracking-widest block mt-1">
                  Explore Collection →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategoryIndex;
