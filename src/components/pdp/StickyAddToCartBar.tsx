'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
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

  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hides when near top of page (below 300px) or scrolling up
      if (currentScrollY > 300 && currentScrollY > lastScrollY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[80] bg-ivory/95 backdrop-blur-md border-t border-zariGold/30 px-4 py-2.5 shadow-xl transition-all duration-300 animate-in slide-in-from-bottom">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        
        {/* Product Title & Price Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-sans font-medium text-inkNavy truncate">
              {product.name}
            </h4>
            <div className="flex items-baseline gap-2">
              <span className="text-xs sm:text-sm font-sans font-bold text-zariGold font-tnum">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] font-sans text-inkNavy/60 uppercase">
                • Size {selectedSize}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onAddToCart}
            className="px-5 py-2.5 bg-inkNavy text-white hover:bg-zariGold transition-colors rounded-md text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>ADD TO BAG</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default StickyAddToCartBar;
