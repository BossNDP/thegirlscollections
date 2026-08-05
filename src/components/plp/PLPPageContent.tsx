'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { SlidersHorizontal, ArrowUpDown, ChevronRight } from 'lucide-react';
import { MOCK_PRODUCTS, Product } from '@/data/shopData';
import { FilterSidebar, FilterState } from './FilterSidebar';
import { MobileFilterSheet } from './MobileFilterSheet';
import { ProductGrid } from './ProductGrid';
import { ButterflyMotif } from '../ui/Motifs';

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
  const [visibleCount, setVisibleCount] = useState(8);

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // Department filter
      if (filters.target.length > 0 && !filters.target.includes(product.target)) {
        return false;
      }
      // Category filter
      if (filters.category.length > 0 && !filters.category.includes(product.category)) {
        return false;
      }
      // Occasion filter
      if (filters.occasion.length > 0 && !filters.occasion.includes(product.occasion)) {
        return false;
      }
      // Size filter
      if (filters.size.length > 0) {
        const hasMatchingSize = product.sizes.some(
          (s) => filters.size.includes(s.size) && s.inStock
        );
        if (!hasMatchingSize) return false;
      }
      // Fabric filter
      if (filters.fabric.length > 0 && !filters.fabric.some((f) => product.fabric.includes(f))) {
        return false;
      }
      // Stock filter
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

  return (
    <div className="bg-ivory text-navy min-h-screen pb-24">
      
      {/* Top Banner / Breadcrumb */}
      <div className="bg-blush/20 border-b border-roseGold/20 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-xs font-sans text-charcoal-muted">
            <Link href="/" className="hover:text-roseGold transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-roseGold/40" />
            <Link href="/shop" className="hover:text-roseGold transition-colors">Shop</Link>
            {initialCategory && (
              <>
                <ChevronRight className="w-3 h-3 text-roseGold/40" />
                <span className="text-navy font-semibold capitalize">{initialCategory}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between">
            <div>
              <div className="flex items-center space-x-2 text-roseGold text-xs uppercase tracking-eyebrow font-semibold">
                <ButterflyMotif className="w-4 h-4" />
                <span>The Girls Collection Catalog</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-navy mt-1 capitalize">
                {initialCategory
                  ? `${initialCategory} Collection`
                  : initialTarget
                  ? `${initialTarget}'s Collection`
                  : initialOccasion
                  ? `${initialOccasion} Wear`
                  : 'All Couture Collections'}
              </h1>
            </div>
            <p className="text-xs text-charcoal-muted font-sans mt-2 sm:mt-0 font-medium">
              Showing {visibleProducts.length} of {filteredProducts.length} handcrafted pieces
            </p>
          </div>

        </div>
      </div>

      {/* Main Body Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        
        {/* Controls Bar (Mobile Filter Trigger & Sort Dropdown) */}
        <div className="flex items-center justify-between pb-6 border-b border-roseGold/20 mb-8">
          
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center space-x-2 px-4 py-2 rounded-full border border-roseGold text-xs font-bold uppercase tracking-wider text-navy hover:bg-roseGold hover:text-navy transition-all"
          >
            <SlidersHorizontal className="w-4 h-4 text-roseGold" />
            <span>Filter & Refine</span>
          </button>

          <div className="hidden lg:block text-xs font-sans text-charcoal-muted">
            Refine selection by size, fabric, occasion or department.
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2 text-xs font-sans">
            <ArrowUpDown className="w-3.5 h-3.5 text-roseGold" />
            <span className="hidden sm:inline text-charcoal-muted">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-roseGold/30 rounded-full px-3 py-1.5 text-xs text-navy font-semibold focus:outline-none focus:border-roseGold"
            >
              <option value="featured">Featured Couture</option>
              <option value="newest">New Arrivals First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Persistent Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 bg-white p-6 rounded-2xl border border-roseGold/20 shadow-card">
              <FilterSidebar filters={filters} onChange={setFilters} onReset={resetFilters} />
            </div>
          </div>

          {/* Right Column: Product Grid */}
          <div className="lg:col-span-9">
            <ProductGrid
              products={visibleProducts}
              hasMore={hasMore}
              onLoadMore={() => setVisibleCount((prev) => prev + 8)}
            />
          </div>

        </div>

      </div>

      {/* Mobile Filter Sheet */}
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
