'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { SlidersHorizontal, ChevronDown, ChevronRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/shopData';
import { FilterSidebar, FilterState } from './FilterSidebar';
import { MobileFilterSheet } from './MobileFilterSheet';
import { ProductGrid } from './ProductGrid';

interface PLPPageContentProps {
  initialCategory?: string;
  initialTarget?: string;
  initialOccasion?: string;
}

const DEFAULT_FILTERS: FilterState = {
  category: [],
  target: [],
  occasion: [],
  size: [],
  fabric: [],
  priceRange: [0, 50000],
  inStockOnly: false,
};

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured Couture' },
  { value: 'newest', label: 'New Arrivals' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

export const PLPPageContent: React.FC<PLPPageContentProps> = ({
  initialCategory,
  initialTarget,
  initialOccasion,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    category: initialCategory ? [initialCategory] : [],
    target: initialTarget ? [initialTarget] : [],
    occasion: initialOccasion ? [initialOccasion] : [],
  });

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'newest'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  // Count active filter selections
  const activeFilterCount = useMemo(() => {
    return (
      filters.category.length +
      filters.target.length +
      filters.occasion.length +
      filters.size.length +
      filters.fabric.length +
      (filters.inStockOnly ? 1 : 0)
    );
  }, [filters]);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      if (filters.target.length > 0 && !filters.target.includes(product.target)) return false;
      if (filters.category.length > 0 && !filters.category.includes(product.category)) return false;
      if (filters.occasion.length > 0 && !filters.occasion.includes(product.occasion)) return false;
      if (filters.size.length > 0) {
        const hasMatchingSize = product.sizes.some((s) => filters.size.includes(s.size) && s.inStock);
        if (!hasMatchingSize) return false;
      }
      if (filters.fabric.length > 0 && !filters.fabric.some((f) => product.fabric.includes(f))) return false;
      if (filters.inStockOnly) {
        const hasStock = product.sizes.some((s) => s.inStock);
        if (!hasStock) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });
  }, [filters, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const currentSortLabel = SORT_OPTIONS.find((s) => s.value === sortBy)?.label || 'Featured Couture';

  return (
    <div className="bg-ivory text-inkNavy min-h-screen pb-28 select-none">
      
      {/* Top Banner & Breadcrumb Header */}
      <div className="bg-sand/20 border-b border-zariGold/15 py-6 sm:py-10 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto space-y-3">
          
          <nav className="flex items-center space-x-2 text-xs font-sans text-inkNavy/60">
            <Link href="/" className="hover:text-zariGold transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-zariGold/40" />
            <Link href="/shop" className="hover:text-zariGold transition-colors">Shop</Link>
            {initialCategory && (
              <>
                <ChevronRight className="w-3 h-3 text-zariGold/40" />
                <span className="text-inkNavy font-semibold capitalize">{initialCategory}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-1">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-sans font-semibold text-[10px] text-zariGold tracking-[0.2em] uppercase">
                  THE GIRLS COLLECTION CATALOG
                </span>
                <div className="h-[1px] w-6 bg-zariGold/40" />
              </div>
              <h1 className="text-2xl sm:text-5xl font-serif font-bold text-inkNavy tracking-tight leading-none capitalize">
                {initialCategory
                  ? `${initialCategory} Collection`
                  : initialTarget
                  ? `${initialTarget}'s Collection`
                  : initialOccasion
                  ? `${initialOccasion} Wear`
                  : 'All Couture Collections'}
              </h1>
            </div>
            <p className="text-xs text-inkNavy/70 font-sans font-medium">
              Showing {visibleProducts.length} of {filteredProducts.length} handcrafted pieces
            </p>
          </div>

        </div>
      </div>

      {/* Main Body Layout */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-10">
        
        {/* REFINED MOBILE-OPTIMIZED FILTER & SORT CONTROL BAR */}
        <div className="pb-5 border-b border-zariGold/20 mb-6 sm:mb-10">
          <div className="flex items-center justify-between gap-2.5 sm:gap-3 w-full">
            
            {/* Filter Trigger Button (Mobile Equal Split) */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex-1 flex items-center justify-center gap-2 h-[46px] px-3 sm:px-4 rounded-md border border-zariGold/35 bg-ivory text-[11px] sm:text-xs font-sans font-semibold uppercase tracking-[0.12em] text-inkNavy hover:border-zariGold hover:bg-sand/20 transition-all duration-200 shrink-0 group active:scale-[0.98] min-w-0"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-zariGold group-hover:rotate-45 transition-transform duration-300 shrink-0" />
              <span className="truncate">FILTER &amp; REFINE</span>
              {activeFilterCount > 0 && (
                <span className="ml-0.5 w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-zariGold text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Desktop Left Info Indicator */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="hidden flex items-center gap-2 px-4 h-[46px] rounded-md border border-zariGold/35 bg-ivory text-xs font-sans font-semibold uppercase tracking-[0.14em] text-inkNavy hover:border-zariGold transition-all duration-200"
              >
                <SlidersHorizontal className="w-4 h-4 text-zariGold" />
                <span>FILTER &amp; REFINE</span>
                {activeFilterCount > 0 && (
                  <span className="ml-1 w-5 h-5 rounded-full bg-zariGold text-white text-[10px] font-bold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              <span className="text-xs font-sans text-inkNavy/60 font-medium">
                Refine by size, fabric, occasion or department.
              </span>
            </div>

            {/* Total Piece Count Pill (Desktop) */}
            <span className="hidden lg:inline-block font-sans font-semibold text-xs text-zariGold tracking-[0.2em] uppercase">
              {filteredProducts.length} HANDCRAFTED PIECES
            </span>

            {/* Custom Luxury Sort Control Dropdown (Mobile Equal Split) */}
            <div className="relative flex-1 lg:flex-initial shrink-0 min-w-0">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full flex items-center justify-between gap-1.5 h-[46px] px-3 sm:px-4 rounded-md border border-zariGold/30 bg-ivory text-[11px] sm:text-xs font-sans font-semibold uppercase tracking-[0.1em] text-inkNavy/90 hover:border-zariGold hover:bg-sand/20 transition-all duration-200 active:scale-[0.98]"
              >
                <span className="hidden sm:inline text-inkNavy/50 uppercase tracking-wider font-normal shrink-0">SORT:</span>
                <span className="truncate">{currentSortLabel}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-zariGold shrink-0 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Sort Menu Overlay Dropdown */}
              {isSortOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setIsSortOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-52 sm:w-56 bg-ivory text-inkNavy border border-zariGold/30 rounded-lg shadow-xl z-30 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-1.5 border-b border-zariGold/15 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-zariGold">
                      SORT BY
                    </div>
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSortBy(opt.value as any);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-sans font-medium transition-colors flex items-center justify-between ${
                          sortBy === opt.value
                            ? 'bg-sand/40 text-inkNavy font-bold'
                            : 'text-inkNavy/70 hover:bg-sand/20 hover:text-inkNavy'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {sortBy === opt.value && (
                          <div className="w-1.5 h-1.5 rounded-full bg-zariGold" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

          </div>
        </div>

        {/* Content Layout (Desktop Sidebar + Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 bg-ivory p-6 rounded-xl border border-zariGold/25 shadow-xs">
              <FilterSidebar filters={filters} onChange={setFilters} onReset={resetFilters} />
            </div>
          </div>

          {/* Product Grid Stage */}
          <div className="lg:col-span-9">
            <ProductGrid
              products={visibleProducts}
              hasMore={hasMore}
              onLoadMore={() => setVisibleCount((prev) => prev + 8)}
            />
          </div>

        </div>

      </div>

      {/* Mobile Filter Sheet Component */}
      <MobileFilterSheet
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        filters={filters}
        onChange={setFilters}
        onReset={resetFilters}
        resultsCount={filteredProducts.length}
      />

    </div>
  );
};
