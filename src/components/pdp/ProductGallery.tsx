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
      {/* Desktop Gallery: Vertical Thumbnail Rail + Temple Arch Main Image */}
      <div className="hidden lg:flex gap-5 items-start">
        {hasMultipleImages && (
          <div className="flex flex-col space-y-3.5 w-20 shrink-0">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`arch-frame-sm relative aspect-[3/4] w-full transition-all ${
                  idx === selectedIdx
                    ? 'ring-2 ring-zariGold opacity-100'
                    : 'opacity-50 hover:opacity-100'
                }`}
              >
                <div className="arch-inner relative w-full h-full">
                  <Image src={img} alt={`${productName} thumb ${idx + 1}`} fill className="object-cover" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Main Display Image wrapped in Temple Arch Frame */}
        <div className="arch-frame relative aspect-[3/4] max-h-[660px] flex-1 shadow-2xl">
          <div className="arch-inner relative w-full h-full bg-woven-texture">
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
      </div>

      {/* Mobile Gallery: Full-Bleed Temple Arch Swipeable Carousel */}
      <div className="lg:hidden arch-frame relative w-full aspect-[3/4] shadow-xl">
        <div className="arch-inner relative w-full h-full">
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

          {hasMultipleImages && (
            <div className="absolute bottom-4 inset-x-0 flex justify-center items-center space-x-2 z-20 pointer-events-none">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === selectedIdx ? 'w-6 bg-zariGold' : 'w-2 bg-ivory/70 border border-inkNavy/20'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
