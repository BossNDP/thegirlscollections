'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/shopData';
import { ProductGallery } from '@/components/pdp/ProductGallery';
import { ProductInfo } from '@/components/pdp/ProductInfo';
import { StickyAddToCartBar } from '@/components/pdp/StickyAddToCartBar';
import { ProductCard } from '@/components/ProductCard';
import { useShop } from '@/context/ShopContext';
import { ButterflyMotif } from '@/components/ui/Motifs';

interface PDPProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: PDPProps) {
  const { addToCart } = useShop();

  const product = MOCK_PRODUCTS.find((p) => p.slug === params.slug) || MOCK_PRODUCTS[0];

  if (!product) {
    notFound();
  }

  const selectedSize = product.sizes.find((s) => s.inStock)?.size || 'Free Size';

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.target === product.target)
  ).slice(0, 4);

  return (
    <div className="bg-ivory text-navy min-h-screen pb-24">
      {/* Breadcrumbs Navigation */}
      <div className="bg-sand/20 border-b border-roseGold/20 py-3.5 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-1.5 text-xs font-sans text-navy/60 overflow-hidden whitespace-nowrap">
            <Link href="/" className="hover:text-roseGold transition-colors shrink-0">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-roseGold/40 shrink-0" />
            <Link href="/shop" className="hover:text-roseGold transition-colors shrink-0">
              Shop
            </Link>
            <ChevronRight className="w-3 h-3 text-roseGold/40 shrink-0" />
            <span className="capitalize shrink-0 text-navy font-medium">{product.target}</span>
            <span className="hidden sm:inline-flex items-center space-x-1.5 shrink-0">
              <ChevronRight className="w-3 h-3 text-roseGold/40 shrink-0" />
              <span className="text-navy font-semibold truncate max-w-[280px]">
                {product.name}
              </span>
            </span>
          </nav>
        </div>
      </div>

      {/* Main PDP Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Full-Bleed Clean Image Gallery */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Product Information Panel */}
          <div className="lg:col-span-5">
            <ProductInfo product={product} />
          </div>
        </div>
      </div>

      {/* "You May Also Like" Grid at Page Bottom */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 sm:pt-20 border-t border-roseGold/20 mt-16 sm:mt-20">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center space-x-2 text-roseGold text-xs uppercase tracking-eyebrow font-semibold">
              <ButterflyMotif className="w-4 h-4" />
              <span>Curated Recommendations</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-navy mt-1">
              You May Also Like
            </h2>
          </div>

          {/* Borderless Product Cards with Desktop Hover-Lift */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel, idx) => (
              <div
                key={rel.id}
                className="transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-floating rounded-2xl p-1"
              >
                <ProductCard product={rel} index={idx} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Add To Bag Bar */}
      <StickyAddToCartBar
        product={product}
        selectedSize={selectedSize}
        onAddToCart={() => addToCart(product, selectedSize)}
      />
    </div>
  );
}
