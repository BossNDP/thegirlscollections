'use client';

import React from 'react';
import { Product } from '@/data/shopData';
import { ProductCard } from '../ProductCard';
import { Sparkles, RefreshCw } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  hasMore = false,
  onLoadMore,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-xl bg-ivory border border-roseGold/20 p-4 space-y-4 shadow-sm">
            <div className="aspect-[3/4] w-full rounded-lg skeleton-shimmer" />
            <div className="h-3 w-1/3 rounded skeleton-shimmer" />
            <div className="h-4 w-3/4 rounded skeleton-shimmer" />
            <div className="h-4 w-1/2 rounded skeleton-shimmer" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-blush/40 text-roseGold flex items-center justify-center mx-auto border border-roseGold/30">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-serif font-bold text-navy">No Products Found</h3>
        <p className="text-xs text-charcoal-muted font-sans font-light">
          We couldn&apos;t find any pieces matching your current filter selection. 
          Try resetting filters or exploring our New Arrivals.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* 2-Column Mobile Grid, 3-Column Desktop Grid, 4-Column XL Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
        {products.map((product, idx) => (
          <ProductCard key={product.id} product={product} priorityImage={idx < 4} />
        ))}
      </div>

      {/* "Load More" Pagination Button */}
      {hasMore && onLoadMore && (
        <div className="text-center pt-8">
          <button
            onClick={onLoadMore}
            className="px-8 py-3.5 rounded-full border border-navy text-navy text-xs font-bold uppercase tracking-widest hover:bg-navy hover:text-ivory transition-all shadow-md inline-flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4 text-roseGold group-hover:text-ivory" />
            <span>Load More Products</span>
          </button>
        </div>
      )}
    </div>
  );
};
