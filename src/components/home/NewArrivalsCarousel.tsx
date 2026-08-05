'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/shopData';
import { ProductCard } from '../ProductCard';

import { useGSAPScrollReveal } from '@/lib/useGSAPScrollReveal';

export const NewArrivalsCarousel: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useGSAPScrollReveal<HTMLElement>({ selector: '.snap-start', stagger: 0.06 });

  const newProducts = MOCK_PRODUCTS.filter((p) => p.isNew || p.isBestSeller);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="new-arrivals"
      className="py-14 sm:py-20 bg-ivory text-navy overflow-hidden scroll-mt-24 sm:scroll-mt-28 border-b border-roseGold/20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Left-Aligned Section Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-10 border-b border-roseGold/20 pb-4">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-roseGold font-sans font-medium">
              Fresh Dropped
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-navy leading-[0.98] tracking-tight mt-1">
              New Arrivals
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full border border-navy/20 text-navy hover:bg-navy hover:text-ivory transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full border border-navy/20 text-navy hover:bg-navy hover:text-ivory transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <Link
              href="/shop?sort=newest"
              className="hidden sm:inline-flex items-center text-xs font-semibold uppercase tracking-widest text-roseGold hover:text-navy ml-4 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </div>

        {/* Scroll-snap Horizontal Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-6 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {newProducts.map((product, idx) => (
            <div
              key={product.id}
              className="w-[240px] sm:w-[300px] flex-shrink-0 snap-start"
            >
              <ProductCard product={product} priorityImage={idx < 2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsCarousel;
