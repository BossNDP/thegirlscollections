'use client';

import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '@/data/shopData';
import { useShop } from '@/context/ShopContext';

interface StickyAddToCartBarProps {
  product: Product;
  selectedSize: string;
  onAddToCart: () => void;
}

export const StickyAddToCartBar: React.FC<StickyAddToCartBarProps> = ({
  product,
  selectedSize,
  onAddToCart,
}) => {
  const { toggleWishlist, isInWishlist } = useShop();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-ivory/95 backdrop-blur-md border-t border-roseGold/30 p-2.5 sm:p-3 lg:hidden shadow-2xl animate-slide-in-bottom">
      <div className="flex items-center justify-between gap-2.5 max-w-md mx-auto">
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-serif font-bold text-navy truncate">
            {product.name}
          </h4>
          <div className="flex items-baseline space-x-1 mt-0.5">
            <span className="text-xs font-bold text-roseGold font-sans shrink-0">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-charcoal-muted font-sans font-light truncate">
              • {selectedSize}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => toggleWishlist(product.id)}
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full border border-roseGold/40 flex items-center justify-center transition-colors text-navy bg-ivory shrink-0"
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current text-mutedMauve' : ''}`} />
          </button>

          <button
            onClick={onAddToCart}
            className="py-2.5 px-4 min-h-[40px] rounded-full bg-navy text-ivory text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:bg-roseGold hover:text-navy transition-all shadow-lg flex items-center justify-center space-x-1.5 shrink-0 whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-roseGold shrink-0" />
            <span className="shrink-0">Add To Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyAddToCartBar;
