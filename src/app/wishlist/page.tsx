'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { MOCK_PRODUCTS } from '@/data/shopData';
import { ProductCard } from '@/components/ProductCard';
import { ButterflyMotif } from '@/components/ui/Motifs';

export default function WishlistPage() {
  const { wishlist } = useShop();

  const wishlistProducts = MOCK_PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-ivory text-navy min-h-screen pb-24">
      
      {/* Header Banner */}
      <div className="bg-blush/20 border-b border-roseGold/20 py-12 px-4 sm:px-8 text-center">
        <div className="max-w-xl mx-auto space-y-3">
          <div className="flex items-center justify-center space-x-2 text-roseGold text-xs uppercase tracking-eyebrow font-semibold">
            <ButterflyMotif className="w-4 h-4" />
            <span>Your Personal Sanctuary</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-navy">
            Saved Couture Wishlist ({wishlistProducts.length})
          </h1>
          <p className="text-xs text-charcoal-muted font-sans">
            Keep track of your favorite handcrafted sarees, lehengas, and kids ethnic wear.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-12">
        {wishlistProducts.length === 0 ? (
          <div className="py-20 text-center space-y-6 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-blush/30 text-roseGold flex items-center justify-center mx-auto shadow-md">
              <Heart className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-navy">Your Wishlist is Empty</h2>
            <p className="text-xs text-charcoal-muted font-sans leading-relaxed">
              Explore our new arrivals and tap the heart icon on any saree or pattu frock to save it here.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-navy text-ivory text-xs font-bold uppercase tracking-widest hover:bg-roseGold hover:text-navy transition-all shadow-lg"
            >
              <span>Explore All Couture</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
