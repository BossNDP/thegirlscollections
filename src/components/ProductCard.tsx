'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/data/shopData';
import { useShop } from '@/context/ShopContext';

interface ProductCardProps {
  product: Product;
  priorityImage?: boolean;
  dispatchType?: 'ready-to-ship' | 'made-to-order';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  priorityImage = false,
  dispatchType = 'ready-to-ship',
}) => {
  const { toggleWishlist, isInWishlist } = useShop();
  const [isHovered, setIsHovered] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const imageHoverSrc = product.images[1] || product.images[0];

  const badgeText = product.isSale ? 'SALE' : product.isNew ? 'NEW' : null;
  const badgeBg = product.isSale ? 'bg-mutedMauve text-ivory' : 'bg-navy text-ivory';

  // Determine dispatch badge text
  const dispatchBadgeText = dispatchType === 'ready-to-ship' ? 'Ready to Ship' : 'Made to Order';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-transparent border-0 rounded-none overflow-hidden transition-all duration-300"
    >
      {/* Product Image Container */}
      <Link href={`/shop/${product.slug}`} className="relative aspect-[3/4] w-full overflow-hidden bg-ivory-muted block rounded-sm border border-roseGold/20">
        {/* Top Badges Layer */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-wrap items-center gap-1.5 max-w-[85%]">
          {badgeText && (
            <span className={`px-2 py-0.5 text-[8px] sm:text-[9px] font-sans font-medium uppercase tracking-[0.18em] rounded-full backdrop-blur-md shadow-sm ${
              product.isSale
                ? 'bg-blush/25 text-navy border border-blush/60 font-semibold'
                : 'bg-ivory/85 text-navy border border-roseGold/40'
            }`}>
              {badgeText}
            </span>
          )}
          {/* Dispatch Badge */}
          <span className="px-2 py-0.5 text-[8px] sm:text-[9px] font-sans font-medium uppercase tracking-[0.16em] bg-navy/85 text-ivory border border-roseGold/30 rounded-full backdrop-blur-md shadow-sm">
            {dispatchBadgeText}
          </span>
        </div>

        {/* Floating Minimal Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 z-10 w-9 h-9 min-w-[36px] min-h-[36px] rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 ${
            inWishlist
              ? 'bg-ivory text-blush scale-110 shadow-md border border-blush/60'
              : 'bg-navy/40 text-ivory hover:bg-ivory hover:text-blush border border-roseGold/20'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-current text-blush' : 'text-ivory'}`} />
        </button>

        {/* Primary Image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priorityImage}
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            isHovered && product.images[1] ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Secondary Crossfade Image */}
        {product.images[1] && (
          <Image
            src={imageHoverSrc}
            alt={`${product.name} alternate view`}
            fill
            className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
      </Link>

      {/* Editorial Caption with Tabular Numerals (No Divider Line) */}
      <div className="pt-3 pb-1 flex-1 flex flex-col justify-between bg-transparent">
        <div>
          <span className="text-[9px] uppercase tracking-[0.2em] text-roseGold font-sans font-medium block mb-1">
            {product.subcategory}
          </span>
          <Link href={`/shop/${product.slug}`}>
            <h3 className="text-xs sm:text-sm font-serif font-bold text-navy hover:text-roseGold transition-colors line-clamp-2 min-h-[2.4rem] leading-[1.15]">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-2 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2 font-mono tabular-nums">
            <span className="text-sm sm:text-base font-bold text-navy tracking-tight font-tnum">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-charcoal-muted/70 line-through font-normal font-tnum">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
