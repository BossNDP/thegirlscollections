'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { Product } from '@/data/shopData';
import { useShop } from '@/context/ShopContext';
import { LuxuryHeartButton } from '@/components/LuxuryHeartButton';

interface ProductCardProps {
  product: Product;
  priorityImage?: boolean;
  variant?: 'rail' | 'grid';
  archShape?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  priorityImage = false,
  variant = 'grid',
  archShape = false,
}) => {
  const { toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);

  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  // Tap and hold quick view trigger for mobile
  const handleTouchStart = () => {
    touchTimerRef.current = setTimeout(() => {
      setQuickViewProduct(product);
    }, 450);
  };

  const handleTouchEnd = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
    }
  };

  const tagText = product.isNew ? 'NEW IN' : product.isSale ? 'SALE' : null;
  const isSaleTag = product.isSale && !product.isNew;
  const availableSizes = product.sizes?.filter((s) => s.inStock) || [];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`group relative flex flex-col bg-ivory overflow-hidden transition-all duration-300 select-none p-2 border border-zariGold/20 rounded-xl shadow-xs hover:shadow-md ${
        variant === 'rail' ? 'w-full h-full justify-between' : 'w-full h-full justify-between'
      }`}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] w-full overflow-hidden block rounded-lg bg-sand/20">
        <Link
          href={`/shop/${product.slug}`}
          className={`relative w-full h-full block overflow-hidden ${
            archShape ? 'arch-frame-sm arch-inner' : ''
          }`}
        >
          {/* Ribbon Tag Badge */}
          {tagText && (
            <div className="absolute top-2 left-2 z-10">
              <span
                className={`px-2.5 py-0.5 text-[9.5px] font-sans font-bold uppercase tracking-wider shadow-xs border border-zariGold/30 block rounded-xs ${
                  isSaleTag ? 'bg-oxblood text-white' : 'bg-gold-gradient text-white'
                }`}
              >
                {tagText}
              </span>
            </div>
          )}

          {/* Wishlist Heart Icon Button (Top-Right) */}
          <div className="absolute top-2 right-2 z-20">
            <LuxuryHeartButton
              isLiked={inWishlist}
              onToggle={handleWishlistClick}
              size="md"
            />
          </div>

          {/* Primary Image */}
          {product.images[0] ? (
            <>
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                priority={priorityImage}
                className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
                  isHovered && product.images[1] ? 'opacity-0' : 'opacity-100'
                }`}
                sizes="(max-width: 640px) 75vw, (max-width: 1024px) 33vw, 25vw"
              />

              {/* Hover Crossfade Image (Desktop) */}
              {product.images[1] && (
                <Image
                  src={product.images[1]}
                  alt={`${product.name} hover view`}
                  fill
                  className={`object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                  sizes="(max-width: 640px) 75vw, (max-width: 1024px) 33vw, 25vw"
                />
              )}
            </>
          ) : (
            <div className="w-full h-full bg-navy-silk flex flex-col items-center justify-center p-4 text-center text-ivory">
              <span className="eyebrow-text text-zariGoldLight text-[10px]">{product.category}</span>
              <p className="text-xs font-sans font-medium text-ivory mt-1">{product.name}</p>
            </div>
          )}
        </Link>

        {/* Quick View Trigger Affordance (Mobile & Desktop) */}
        <button
          onClick={handleQuickViewClick}
          className="absolute inset-x-2 bottom-2 z-20 hidden md:flex items-center justify-center gap-1.5 py-1.5 px-3 bg-ivory/95 backdrop-blur-md text-inkNavy border border-zariGold/40 rounded-md text-[10px] font-sans font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-zariGold hover:text-white"
          aria-label={`Quick view ${product.name}`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>

        {/* Mobile Small Quick View Icon Badge */}
        <button
          onClick={handleQuickViewClick}
          className="absolute bottom-2 right-2 z-20 flex md:hidden items-center justify-center w-7 h-7 bg-ivory/90 backdrop-blur-md text-inkNavy border border-zariGold/30 rounded-full shadow-xs active:scale-95 transition-transform"
          aria-label={`Quick view ${product.name}`}
        >
          <Eye className="w-3.5 h-3.5 text-zariGold" />
        </button>
      </div>

      {/* Product Details Section */}
      <div className="pt-2.5 pb-1 flex flex-col text-left shrink-0">
        
        {/* Subdued Size Pills (Free Size / Stitched Blouse) */}
        {availableSizes.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap mb-1">
            {availableSizes.slice(0, 3).map((s) => (
              <span
                key={s.size}
                className="text-[9px] font-sans font-semibold text-inkNavy/60 bg-sand/40 border border-zariGold/20 px-1.5 py-0.5 rounded-[3px] uppercase tracking-wider"
              >
                {s.size}
              </span>
            ))}
            {availableSizes.length > 3 && (
              <span className="text-[9px] font-sans text-zariGold font-semibold">
                +{availableSizes.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Product Title in CLEAN SANS-SERIF (font-sans font-medium) */}
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-xs sm:text-sm font-sans font-medium text-inkNavy group-hover:text-zariGold transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Pricing Hierarchy */}
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-sm sm:text-base font-sans font-bold text-zariGold font-tnum">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-xs font-sans text-inkNavy/40 line-through font-normal font-tnum">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
