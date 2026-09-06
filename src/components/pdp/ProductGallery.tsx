'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollPosition = target.scrollLeft;
    const width = target.offsetWidth;
    if (width > 0) {
      const index = Math.round(scrollPosition / width);
      if (index >= 0 && index < images.length) {
        setSelectedIdx(index);
      }
    }
  };

  const hasMultipleImages = images && images.length > 1;

  return (
    <div id="pdp-primary-gallery" className="w-full select-none">
      {/* Desktop Gallery Layout: Thumbnail Rail + Clean Rectangular Main Image */}
      <div className="hidden lg:flex gap-5 items-start">
        {/* Left Thumbnail Rail */}
        {hasMultipleImages && (
          <div className="flex flex-col space-y-3.5 w-20 shrink-0">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`relative aspect-[3/4] w-full rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  idx === selectedIdx
                    ? 'border-zariGold ring-2 ring-zariGold/40 scale-[1.02] shadow-md'
                    : 'border-zariGold/20 opacity-60 hover:opacity-100 hover:border-zariGold/60'
                }`}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover object-top"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}

        {/* Main Display Image - Clean Normal Portrait Rectangle */}
        <div className="relative flex-1 aspect-[3/4] max-h-[680px] rounded-2xl overflow-hidden border border-zariGold/30 shadow-xl bg-sand/10">
          <Image
            src={images[selectedIdx] || images[0]}
            alt={productName}
            fill
            priority
            className="object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Mobile Gallery Layout: Clean Normal Portrait Rectangle Carousel */}
      <div className="lg:hidden w-full flex flex-col items-center">
        <div className="relative w-full aspect-[3/4] max-h-[540px] rounded-2xl overflow-hidden border border-zariGold/30 shadow-lg bg-sand/10">
          <div
            onScroll={handleMobileScroll}
            className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
          >
            {images.map((img, idx) => (
              <div key={idx} className="relative w-full h-full shrink-0 snap-start">
                <Image
                  src={img}
                  alt={`${productName} slide ${idx + 1}`}
                  fill
                  priority={idx === 0}
                  className="object-cover object-top"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots with Clear Vertical Spacing */}
        {hasMultipleImages && (
          <div className="mt-5 mb-2 flex justify-center items-center gap-2 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === selectedIdx
                    ? 'w-6 bg-zariGold shadow-sm'
                    : 'w-2 bg-inkNavy/30 hover:bg-inkNavy/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
