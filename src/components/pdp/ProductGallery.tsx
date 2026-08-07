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
    <div className="w-full">
      {/* Desktop Gallery: Vertical Thumbnail Rail + Main Image */}
      <div className="hidden lg:flex gap-5 items-start">
        {/* Vertical Thumbnail Rail (Rendered ONLY when > 1 image exists) */}
        {hasMultipleImages && (
          <div className="flex flex-col space-y-3.5 w-20 flex-shrink-0">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`relative aspect-[3/4] w-full rounded-sm overflow-hidden border transition-all ${
                  idx === selectedIdx
                    ? 'border-roseGold ring-1 ring-roseGold/40 opacity-100'
                    : 'border-roseGold/20 opacity-50 hover:opacity-100'
                }`}
              >
                <Image src={img} alt={`${productName} thumb ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Main Display Image */}
        <div className="relative aspect-[3/4] max-h-[660px] flex-1 rounded-sm overflow-hidden bg-ivory border border-roseGold/20 img-zoom-hover shadow-xs">
          <Image
            src={images[selectedIdx] || images[0]}
            alt={productName}
            fill
            priority
            className="object-cover transition-transform duration-700"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Mobile Gallery: Full-Bleed Swipeable Carousel with Dot Indicators */}
      <div className="lg:hidden relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-ivory border border-roseGold/25">
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
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        {/* Dots Pagination Bar (Rendered ONLY when > 1 image exists) */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 inset-x-0 flex justify-center items-center space-x-2 z-20 pointer-events-none">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === selectedIdx ? 'w-6 bg-roseGold' : 'w-2 bg-ivory/70 border border-navy/20'
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
