'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/shopData';
import { ProductCard } from '../ProductCard';

import { useGSAPScrollReveal } from '@/lib/useGSAPScrollReveal';

export const NewArrivalsCarousel: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useGSAPScrollReveal<HTMLElement>({ selector: '.product-grid-item', stagger: 0.05 });

  const newProducts = MOCK_PRODUCTS.filter((p) => p.isNew || p.isBestSeller).slice(0, 8);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="new-arrivals"
      className="py-16 sm:py-24 bg-white text-navy overflow-hidden scroll-mt-24 sm:scroll-mt-28 border-b border-navy/10 relative"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Left-Aligned Section Heading */}
        <div className="flex items-center justify-between mb-8 sm:mb-12 border-b border-navy/10 pb-4">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy tracking-tight">
            Trending This Week
          </h2>
        </div>

        {/* 4-Column Product Grid (Desktop) / Carousel with Vertical-Centered White Circular Arrows */}
        <div className="relative group/grid">
          {/* Left Circular White Navigation Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white text-navy shadow-md border border-navy/15 flex items-center justify-center hover:bg-navy hover:text-white transition-all duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Right Circular White Navigation Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white text-navy shadow-md border border-navy/15 flex items-center justify-center hover:bg-navy hover:text-white transition-all duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Product Grid / Row */}
          <div
            ref={scrollContainerRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 overflow-x-auto no-scrollbar md:overflow-visible pb-4"
          >
            {newProducts.map((product, idx) => (
              <div key={product.id} className="product-grid-item w-full shrink-0">
                <ProductCard product={product} priorityImage={idx < 2} />
              </div>
            ))}
          </div>
        </div>

        {/* Centered Solid Navy Pill "VIEW ALL" CTA */}
        <div className="mt-10 sm:mt-14 flex justify-center">
          <Link
            href="/shop?sort=newest"
            className="px-9 py-3.5 rounded-full bg-navy text-white text-xs font-semibold uppercase tracking-[0.16em] hover:bg-roseGold hover:text-navy transition-all duration-300 shadow-sm inline-flex items-center justify-center"
          >
            VIEW ALL
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsCarousel;
