'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

interface CategoryItem {
  id: string;
  name: string;
  eyebrow: string;
  description?: string;
  slug: string;
  image?: string;
  gradientClass?: string;
}

const CATEGORY_ITEMS: CategoryItem[] = [
  {
    id: '1',
    name: 'Kanjeevaram Silk Sarees',
    eyebrow: 'PRIMARY COLLECTION',
    description: 'Bridal drapes, zari borders, & handcrafted festive weaves.',
    slug: 'sarees',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=1200',
  },
  {
    id: '2',
    name: 'Kids Pure Silk Pattu',
    eyebrow: 'LITTLE ROYALTY',
    description: 'Cotton-lined festive frocks.',
    slug: 'pattu-frocks',
    image: 'https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&q=85&w=800',
  },
  {
    id: '3',
    name: 'Organza & Chanderi Weaves',
    eyebrow: 'SILK EDIT',
    description: 'Ethereal sheer festive drapes.',
    slug: 'organza-sarees',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=85&w=800',
    gradientClass: 'bg-oxblood-silk',
  },
  {
    id: '4',
    name: 'Bridal Zari Lehengas',
    eyebrow: 'CELEBRATION',
    description: 'Royal palace heritage embroidery.',
    slug: 'lehengas',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=85&w=800',
  },
  {
    id: '5',
    name: 'Designer Zari Gowns',
    eyebrow: 'COUTURE',
    description: 'Contemporary silhouetted drapes.',
    slug: 'gowns',
    image: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&q=85&w=800',
    gradientClass: 'bg-navy-silk',
  },
];

export const ShopByCategoryBento: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll listener to update active index for mobile swipeable rail
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.firstElementChild?.getBoundingClientRect().width || 280;
    const index = Math.round(scrollLeft / (cardWidth + 16));
    setActiveIndex(Math.max(0, Math.min(index, CATEGORY_ITEMS.length - 1)));
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const formattedCounter = `0${activeIndex + 1} / 0${CATEGORY_ITEMS.length}`;
  const progressPercent = ((activeIndex + 1) / CATEGORY_ITEMS.length) * 100;

  return (
    <section className="w-full py-16 sm:py-20 md:py-24 bg-ivory text-inkNavy border-b border-zariGold/15 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Reusable Editorial Section Header */}
        <SectionHeader
          kicker="CURATED TAXONOMY"
          title="Shop by Category"
          subtitle="Architectural Temple Arch silhouettes framing pure silk bridal drapes and handcrafted heritage ensembles."
          actionLabel="EXPLORE ALL"
          actionHref="/shop"
        />

        {/* Counter Above Mobile Rail */}
        <div className="flex md:hidden items-center justify-between mb-3 px-1">
          <span className="font-serif font-bold text-xs text-zariGold tracking-widest uppercase">
            ARCH COLLECTION
          </span>
          <span className="font-serif font-bold text-xs text-inkNavy/70 tracking-widest font-tnum">
            {formattedCounter}
          </span>
        </div>

        {/* Desktop Controls + Rail Container */}
        <div className="relative group/catScroll">
          {/* Desktop Slider Arrows */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-inkNavy/90 text-ivory border border-zariGold/40 shadow-lg items-center justify-center hover:bg-zariGold hover:text-white transition-all duration-300"
            aria-label="Scroll category left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-inkNavy/90 text-ivory border border-zariGold/40 shadow-lg items-center justify-center hover:bg-zariGold hover:text-white transition-all duration-300"
            aria-label="Scroll category right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* MOBILE VIEW: Swipeable Carousel with Restrained Active Scale (1 vs 0.94) & Peek */}
          <div className="block md:hidden">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-4 px-4 -mx-4"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {CATEGORY_ITEMS.map((cat, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <Link
                    key={cat.id}
                    href={`/shop?category=${cat.slug}`}
                    className={`snap-center shrink-0 w-[78vw] sm:w-[320px] h-[460px] arch-frame shadow-md group relative block text-ivory overflow-hidden transition-all duration-300 ${
                      isActive
                        ? 'scale-100 opacity-100 z-10 border-zariGold/50'
                        : 'scale-[0.94] opacity-[0.72] z-0'
                    }`}
                  >
                    <div className="arch-inner relative w-full h-full overflow-hidden">
                      {cat.image ? (
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                          sizes="(max-width: 640px) 80vw, 320px"
                        />
                      ) : (
                        <div
                          className={`w-full h-full ${
                            cat.gradientClass || 'bg-navy-silk'
                          } flex flex-col justify-center items-center p-6 text-center`}
                        >
                          <span className="eyebrow-text text-zariGoldLight font-semibold text-xs tracking-[0.2em] mb-2">
                            {cat.eyebrow}
                          </span>
                          <h3 className="text-3xl font-serif font-bold text-ivory leading-tight">
                            {cat.name}
                          </h3>
                        </div>
                      )}

                      {/* Scrim Overlay */}
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-inkNavy/95 via-inkNavy/60 to-transparent p-6 flex flex-col justify-end">
                        <span className="eyebrow-text text-zariGoldLight font-semibold text-[10px] tracking-[0.2em] mb-1">
                          {cat.eyebrow}
                        </span>
                        <h3 className="text-2xl font-serif font-bold text-ivory leading-tight group-hover:text-zariGoldLight transition-colors">
                          {cat.name}
                        </h3>
                        {cat.description && (
                          <p className="text-xs font-sans text-ivory/80 mt-1 line-clamp-2">
                            {cat.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Thin Progress Line */}
            <div className="w-full h-[2px] bg-zariGold/20 mt-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-zariGold transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* DESKTOP VIEW: Asymmetric Grid Layout (1 Large Hero Arch + Medium Arch Cards) */}
          <div className="hidden md:grid grid-cols-12 gap-6 items-stretch">
            {/* Main Featured Large Arch Card (Occupies 5 columns, full height) */}
            <Link
              href={`/shop?category=${CATEGORY_ITEMS[0].slug}`}
              className="col-span-5 h-[560px] arch-frame shadow-xl group relative block text-ivory overflow-hidden transition-transform duration-500 hover:-translate-y-1.5"
            >
              <div className="arch-inner relative w-full h-full overflow-hidden">
                <Image
                  src={CATEGORY_ITEMS[0].image!}
                  alt={CATEGORY_ITEMS[0].name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                  sizes="40vw"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-inkNavy/95 via-inkNavy/60 to-transparent p-8 flex flex-col justify-end">
                  <span className="eyebrow-text text-zariGoldLight font-semibold text-xs tracking-[0.2em] mb-1">
                    {CATEGORY_ITEMS[0].eyebrow}
                  </span>
                  <h3 className="text-3xl font-serif font-bold text-ivory leading-tight group-hover:text-zariGoldLight transition-colors">
                    {CATEGORY_ITEMS[0].name}
                  </h3>
                  <p className="text-sm font-sans text-ivory/80 mt-2">
                    {CATEGORY_ITEMS[0].description}
                  </p>
                </div>
              </div>
            </Link>

            {/* Remaining Category Arch Cards (2x2 Grid occupying 7 columns) */}
            <div className="col-span-7 grid grid-cols-2 gap-6">
              {CATEGORY_ITEMS.slice(1).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${cat.slug}`}
                  className="h-[268px] arch-frame shadow-md group relative block text-ivory overflow-hidden transition-transform duration-500 hover:-translate-y-1"
                >
                  <div className="arch-inner relative w-full h-full overflow-hidden">
                    {cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                        sizes="25vw"
                      />
                    ) : (
                      <div className={`w-full h-full ${cat.gradientClass || 'bg-navy-silk'} p-6 flex flex-col justify-end`} />
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-inkNavy/95 via-inkNavy/50 to-transparent p-5 flex flex-col justify-end">
                      <span className="eyebrow-text text-zariGoldLight font-semibold text-[10px] tracking-[0.2em] mb-0.5">
                        {cat.eyebrow}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-ivory leading-tight group-hover:text-zariGoldLight transition-colors">
                        {cat.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ShopByCategoryBento;
