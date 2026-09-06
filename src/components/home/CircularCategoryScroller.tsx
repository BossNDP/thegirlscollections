'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  CategoryItem,
  WOMEN_CATEGORIES,
  KIDS_CATEGORIES,
  getFeaturedCategories,
  getCategoryHref,
} from '@/data/categoryTaxonomy';

const MOBILE_CATEGORY_CONFIG: Record<
  string,
  { line1: string; line2?: string; objectPos?: string; topOffset?: string }
> = {
  'all-kurta-sets': { line1: 'KURTA', line2: 'SETS', objectPos: 'object-[center_-2%]', topOffset: '7.7%' },
  'anarkali-kurta-suit-sets': { line1: 'ANARKALI', objectPos: 'object-[center_-2%]', topOffset: '7.7%' },
  'co-ord-set': { line1: 'CO-ORD', line2: 'SETS', objectPos: 'object-[center_-2%]', topOffset: '7.7%' },
  'skirt-and-top': { line1: 'SKIRT &', line2: 'TOP', objectPos: 'object-[center_-2%]', topOffset: '7.7%' },
  'kids-lehenga-blouse-or-pattu-pavadai': { line1: 'LEHENGA', line2: '& PATTU', objectPos: 'object-[center_-2%]', topOffset: '7.7%' },
  'kids-traditional-gown-1-pc': { line1: 'TRADITIONAL', line2: 'GOWNS', objectPos: 'object-[center_-2%]', topOffset: '7.7%' },
  'party-wear-frocks': { line1: 'PARTY WEAR', line2: 'FROCKS', objectPos: 'object-[center_-2%]', topOffset: '7.7%' },
  'children-co-ord-set': { line1: 'KIDS CO-ORD', line2: 'SETS', objectPos: 'object-[center_-2%]', topOffset: '7.7%' },
};

interface CategoryCircleProps {
  category: CategoryItem;
}

const CategoryCircle: React.FC<CategoryCircleProps> = ({ category }) => {
  const href = getCategoryHref(category);
  const config = MOBILE_CATEGORY_CONFIG[category.id] || {
    line1: category.name.toUpperCase(),
    topOffset: '7.7%',
  };
  const cutoutPath = `/categories/cutouts/${category.slug}.webp`;
  const topOffset = config.topOffset || '7.7%';

  return (
    <Link
      href={href}
      className="group relative flex flex-col items-center shrink-0 snap-start select-none outline-none focus-visible:ring-2 focus-visible:ring-zariGold rounded-full transition-all duration-300 active:scale-[1.05] hover:scale-[1.03] pt-4"
      aria-label={`Shop ${category.name}`}
    >
      {/* BASE CIRCLE WRAPPER WITH ROSE GOLD RING & SHADOW */}
      <div className="relative p-[3px] rounded-full border border-zariGold/40 group-hover:border-zariGold group-hover:shadow-[0_8px_24px_rgba(180,134,60,0.3)] transition-all bg-ivory shadow-sm shrink-0">
        
        {/* INNER CREATIVE LIGHT BABY PINK CIRCLE WITH ROSE GOLD SATIN GLOW (NO DOTS) */}
        <div className="relative w-[110px] h-[110px] xs:w-[120px] xs:h-[120px] sm:w-[125px] sm:h-[125px] md:w-[135px] md:h-[135px] lg:w-[140px] lg:h-[140px] rounded-full overflow-hidden bg-[radial-gradient(circle_at_40%_30%,_#FFF2F5_0%,_#FDE2E8_50%,_#F7C5D3_100%)] flex items-center justify-center shrink-0 border border-zariGold/30 shadow-[inset_0_2px_12px_rgba(235,170,185,0.4)] group-hover:border-zariGold/60 transition-all duration-500">
          
          {/* Ethereal Soft Pearl Satin Glow Center Highlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(255,255,255,0.85)_0%,_rgba(244,185,200,0.35)_55%,_transparent_80%)] pointer-events-none group-hover:scale-110 transition-transform duration-700" />

          {/* Delicate Concentric Rose-Gold Micro Aura Rings */}
          <div className="absolute inset-0 rounded-full border border-zariGold/20 scale-[0.80] pointer-events-none" />
          <div className="absolute inset-0 rounded-full border border-white/60 scale-[0.55] pointer-events-none" />

          {!category.image && (
            <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-zariGold drop-shadow-[0_1px_4px_rgba(0,0,0,0.15)]">
              {category.name.charAt(0)}
            </span>
          )}
        </div>

        {/* SINGLE POPPING MODEL IMAGE OVERLAY (NO DUPLICATE IMAGE BEHIND) */}
        {category.image && (
          <div
            className="absolute -top-4 sm:-top-5 md:-top-6 left-[3px] right-[3px] bottom-[3px] overflow-hidden pointer-events-none z-10 rounded-b-full"
            aria-hidden="true"
          >
            <div
              className="absolute left-0 w-full aspect-[339/484]"
              style={{ top: `calc(16px - ${topOffset})` }}
            >
              <Image
                src={cutoutPath}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 120px, (max-width: 1024px) 135px, 140px"
                className="object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.18)] transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
          </div>
        )}
      </div>

      {/* TYPOGRAPHY LABEL */}
      <div className="mt-2.5 flex flex-col items-center justify-start text-center w-[110px] xs:w-[120px] sm:w-[125px] md:w-[135px] lg:w-[140px] min-h-[2.6em] overflow-hidden leading-[1.2]">
        <span className="font-sans text-xs md:text-[13px] font-bold tracking-wider uppercase text-inkNavy group-hover:text-zariGold transition-colors truncate w-full">
          {config.line1}
        </span>
        {config.line2 && (
          <span className="font-sans text-xs md:text-[13px] font-bold tracking-wider uppercase text-inkNavy group-hover:text-zariGold transition-colors truncate w-full">
            {config.line2}
          </span>
        )}
      </div>
    </Link>
  );
};

/* VIBRANT ANIMATED SHOP MORE CIRCLE FOR THE END OF THE RAIL */
interface ShopMoreCircleProps {
  total: number;
}

const ShopMoreCircle: React.FC<ShopMoreCircleProps> = ({ total }) => {
  const handleOpenGroupMenu = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-category-menu'));
    }
  };

  return (
    <button
      onClick={handleOpenGroupMenu}
      className="group relative flex flex-col items-center shrink-0 snap-start select-none outline-none focus-visible:ring-2 focus-visible:ring-zariGold rounded-full transition-all duration-300 active:scale-[0.95] hover:scale-[1.03] cursor-pointer pt-3"
      aria-label={`Shop more categories (${total} total)`}
    >
      {/* Outer Animated Gradient Ring */}
      <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-zariGold via-[#D8BC82] to-zariGold shadow-[0_0_16px_rgba(180,134,60,0.4)] group-hover:shadow-[0_0_24px_rgba(180,134,60,0.75)] transition-all shrink-0">
        {/* Inner Dark Luxury Circle */}
        <div className="relative w-[110px] h-[110px] xs:w-[120px] xs:h-[120px] sm:w-[125px] sm:h-[125px] md:w-[135px] md:h-[135px] lg:w-[140px] lg:h-[140px] rounded-full overflow-hidden bg-gradient-to-br from-navy via-[#2A2E54] to-navy-dark flex flex-col items-center justify-center text-ivory shrink-0 border border-zariGold/60 group-hover:border-zariGold transition-colors">

          {/* Glowing Arrow Badge */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full bg-zariGold/25 border border-zariGold/60 flex items-center justify-center mb-1 group-hover:bg-zariGold group-hover:text-navy transition-all duration-300 shadow-sm">
            <ArrowRight className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#D8BC82] group-hover:text-navy group-hover:translate-x-0.5 transition-transform" />
          </div>

          <span className="font-sans text-[11px] sm:text-xs font-extrabold tracking-widest uppercase text-ivory group-hover:text-zariGold-light transition-colors leading-tight">
            SHOP
          </span>
          <span className="font-serif text-xs sm:text-sm md:text-base font-bold tracking-wider uppercase text-[#D8BC82] group-hover:text-white transition-colors leading-tight">
            MORE
          </span>
        </div>
      </div>

      {/* Label Below */}
      <div className="mt-2.5 flex flex-col items-center justify-start text-center w-[110px] xs:w-[120px] sm:w-[125px] md:w-[135px] lg:w-[140px] min-h-[2.6em] overflow-hidden leading-[1.2]">
        <span className="font-sans text-xs md:text-[13px] font-bold tracking-wider uppercase text-zariGold group-hover:text-inkNavy transition-colors truncate w-full">
          ALL ({total})
        </span>
      </div>
    </button>
  );
};

export const CircularCategoryScroller: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'women' | 'kids'>('all');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const womenFeatured = getFeaturedCategories('women');
  const kidsFeatured = getFeaturedCategories('kids');

  const displayedCategories =
    activeTab === 'women'
      ? womenFeatured
      : activeTab === 'kids'
        ? kidsFeatured
        : [...womenFeatured, ...kidsFeatured];

  const totalCount =
    activeTab === 'women'
      ? WOMEN_CATEGORIES.length
      : activeTab === 'kids'
        ? KIDS_CATEGORIES.length
        : WOMEN_CATEGORIES.length + KIDS_CATEGORIES.length;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const totalScroll = scrollWidth - clientWidth;
    if (totalScroll > 0) {
      setScrollProgress(scrollLeft / totalScroll);
    }
  };

  const scrollRail = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="w-full bg-ivory pt-6 pb-8 sm:pt-10 sm:pb-14 border-b border-zariGold/15 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">

        {/* SEGMENTED TAB FILTER CONTROL: SHOP ALL | WOMEN | KIDS */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 border-b border-zariGold/15 pb-4">
          <div className="flex items-center gap-1.5 sm:gap-3 bg-ivory-muted/60 p-1 rounded-full border border-zariGold/25">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-[11px] sm:text-xs font-sans font-bold uppercase tracking-widest transition-all cursor-pointer ${activeTab === 'all'
                ? 'bg-navy text-ivory shadow-sm'
                : 'text-inkNavy/70 hover:text-inkNavy'
                }`}
            >
              SHOP ALL
            </button>
            <button
              onClick={() => setActiveTab('women')}
              className={`px-4 py-2 rounded-full text-[11px] sm:text-xs font-sans font-bold uppercase tracking-widest transition-all cursor-pointer ${activeTab === 'women'
                ? 'bg-navy text-ivory shadow-sm'
                : 'text-inkNavy/70 hover:text-inkNavy'
                }`}
            >
              WOMEN ({WOMEN_CATEGORIES.length})
            </button>
            <button
              onClick={() => setActiveTab('kids')}
              className={`px-4 py-2 rounded-full text-[11px] sm:text-xs font-sans font-bold uppercase tracking-widest transition-all cursor-pointer ${activeTab === 'kids'
                ? 'bg-navy text-ivory shadow-sm'
                : 'text-inkNavy/70 hover:text-inkNavy'
                }`}
            >
              KIDS ({KIDS_CATEGORIES.length})
            </button>
          </div>

          {/* Desktop Arrow Controls */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => scrollRail('left')}
              className="w-9 h-9 rounded-full border border-zariGold/30 hover:border-zariGold hover:bg-zariGold/10 flex items-center justify-center text-inkNavy transition-all cursor-pointer"
              aria-label="Scroll left categories"
            >
              <ChevronLeft className="w-4.5 h-4.5 text-zariGold" />
            </button>
            <button
              onClick={() => scrollRail('right')}
              className="w-9 h-9 rounded-full border border-zariGold/30 hover:border-zariGold hover:bg-zariGold/10 flex items-center justify-center text-inkNavy transition-all cursor-pointer"
              aria-label="Scroll right categories"
            >
              <ChevronRight className="w-4.5 h-4.5 text-zariGold" />
            </button>
          </div>
        </div>

        {/* PROMINENT CIRCULAR CATEGORY ROW WITH SHOP MORE CIRCLE AT END */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex items-start gap-4 sm:gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 no-scrollbar scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch', scrollSnapType: 'x mandatory' }}
        >
          {displayedCategories.map((cat) => (
            <CategoryCircle key={cat.id} category={cat} />
          ))}

          {/* SHOP MORE CIRCLE AT THE END */}
          <ShopMoreCircle total={totalCount} />
        </div>

        {/* DASH SCROLL PROGRESS INDICATOR */}
        <div className="w-full max-w-[140px] mx-auto mt-3 h-1 bg-zariGold/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-zariGold rounded-full transition-all duration-150"
            style={{ width: `${Math.max(20, Math.min(100, (scrollProgress + 0.2) * 100))}%` }}
          />
        </div>

      </div>
    </section>
  );
};

export default CircularCategoryScroller;
