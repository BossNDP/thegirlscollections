'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/shopData';
import { useShop } from '@/context/ShopContext';
import { LuxuryHeartButton } from '@/components/LuxuryHeartButton';

interface ProductCardProps {
  product: Product;
  priorityImage?: boolean;
  dispatchType?: 'ready-to-ship' | 'made-to-order';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  priorityImage = false,
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

  // Single Tag Logic ("NEW IN" or "SALE")
  const tagText = product.isNew ? 'NEW IN' : product.isSale ? 'SALE' : null;

  // Filter sizes for overlay chips
  const availableSizes = product.sizes?.filter((s) => s.inStock) || [];

  // Helper to shorten verbose mobile labels
  const formatMobileChipLabel = (sizeName: string) => {
    if (sizeName.includes('Stitched Blouse')) {
      return sizeName.replace('Stitched Blouse ', 'Blouse ');
    }
    return sizeName;
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white rounded-none overflow-hidden transition-all duration-300"
    >
      {/* Product Image Stage (90-95% Visual Weight Dominance) */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#F9F8F6] block border border-navy/5"
      >
        {/* Simple Corner Tag */}
        {tagText && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="px-2 py-0.5 text-[8.5px] font-sans font-semibold uppercase tracking-[0.14em] bg-navy text-white shadow-xs">
              {tagText}
            </span>
          </div>
        )}

        {/* Iconic Animated Organic Heart Button */}
        <div className="absolute top-2.5 right-2.5 z-20">
          <LuxuryHeartButton
            isLiked={inWishlist}
            onToggle={handleWishlistClick}
            size="md"
          />
        </div>

        {/* Primary Image with Subtle Scale Zoom on Hover */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priorityImage}
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
            isHovered && product.images[1] ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Secondary Crossfade Image */}
        {product.images[1] && (
          <Image
            src={imageHoverSrc}
            alt={`${product.name} hover view`}
            fill
            className={`object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}

        {/* --- MOBILE SIZE CHIPS OVERLAY --- */}
        {availableSizes.length > 0 && (
          <div className="sm:hidden absolute bottom-2 left-1.5 right-1.5 z-10 flex items-center justify-center pointer-events-none">
            <div className="px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-navy/10 flex items-center gap-1 shadow-xs max-w-full overflow-hidden">
              {availableSizes.slice(0, 2).map((s) => (
                <span
                  key={s.size}
                  className="text-[8.5px] font-sans font-semibold text-navy tracking-tight truncate max-w-[65px]"
                >
                  {formatMobileChipLabel(s.size)}
                </span>
              ))}
              {availableSizes.length > 2 && (
                <span className="text-[8.5px] font-sans font-bold text-roseGold pl-0.5 shrink-0">
                  +{availableSizes.length - 2}
                </span>
              )}
            </div>
          </div>
        )}

        {/* --- DESKTOP SIZE CHIPS OVERLAY --- */}
        {availableSizes.length > 0 && (
          <div className="hidden sm:flex absolute bottom-2.5 left-2 right-2 z-10 items-center justify-center transition-all duration-300 opacity-90 group-hover:opacity-100">
            <div className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-navy/10 flex items-center gap-1 shadow-xs">
              {availableSizes.slice(0, 5).map((s) => (
                <span
                  key={s.size}
                  className="text-[9px] font-sans font-semibold text-navy hover:text-roseGold transition-colors px-1"
                >
                  {s.size}
                </span>
              ))}
            </div>
          </div>
        )}
      </Link>

      {/* Compact Info Block (Subtle & Restrained) */}
      <div className="pt-2 pb-1.5 flex flex-col justify-between bg-white text-left">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-xs sm:text-[13px] font-sans font-medium uppercase tracking-[0.05em] text-navy hover:text-roseGold transition-colors truncate">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-xs sm:text-sm font-sans font-semibold text-navy font-tnum">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-[10px] sm:text-[11px] text-navy/40 line-through font-tnum">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
