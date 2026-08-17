'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import StyleQuizSheet from '@/components/StyleQuizSheet';

// Clean 4-point luxury sparkle icon
const SparkleStarIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4771 12 22C12 16.4771 16.4771 12 22 12C16.4771 12 12 7.52285 12 2Z" />
  </svg>
);

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { cartCount, wishlist, setIsCartOpen } = useShop();

  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isStyleQuizOpen, setIsStyleQuizOpen] = useState(false);

  // Scroll listener for collapse/expand behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 120 && currentScrollY > lastScrollY) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isExcluded = pathname?.startsWith('/admin') || pathname === '/checkout';
  if (isExcluded) return null;

  const wishlistCount = wishlist.length;

  return (
    <>
      <nav
        className={`fixed bottom-4 inset-x-0 z-[95] md:hidden max-w-[375px] mx-auto transition-all duration-300 ease-out select-none px-3 ${
          isScrolledDown ? 'h-[52px]' : 'h-[62px]'
        }`}
        aria-label="Mobile Navigation Bar"
      >
        <div className="relative w-full h-full rounded-[28px] bg-ivory/95 backdrop-blur-[20px] border border-zariGold/40 shadow-[0_8px_32px_rgba(13,14,26,0.14)] p-1 flex items-center justify-between overflow-hidden">
          
          {/* 1. HOME */}
          <Link
            href="/"
            className={`flex-1 h-full flex flex-col items-center justify-center rounded-full transition-all ${
              pathname === '/' ? 'bg-gold-gradient text-white shadow-xs' : 'text-inkNavy/70 hover:text-inkNavy'
            }`}
          >
            <Home className="w-4 h-4" />
            {!isScrolledDown && (
              <span className="text-[8.5px] font-sans font-bold uppercase tracking-wider mt-0.5">
                HOME
              </span>
            )}
          </Link>

          {/* 2. SHOP */}
          <Link
            href="/shop"
            className={`flex-1 h-full flex flex-col items-center justify-center rounded-full transition-all ${
              pathname === '/shop' || pathname?.startsWith('/shop/')
                ? 'bg-gold-gradient text-white shadow-xs'
                : 'text-inkNavy/70 hover:text-inkNavy'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            {!isScrolledDown && (
              <span className="text-[8.5px] font-sans font-bold uppercase tracking-wider mt-0.5">
                SHOP
              </span>
            )}
          </Link>

          {/* 3. STYLE — Refined Integrated Centerpiece Action */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsStyleQuizOpen(true)}
            className={`flex-1 h-full flex flex-col items-center justify-center rounded-full transition-all relative ${
              isStyleQuizOpen
                ? 'bg-inkNavy text-zariGoldLight shadow-xs'
                : 'text-zariGold hover:text-inkNavy'
            }`}
            aria-label="Open Personal Stylist Quiz"
          >
            <motion.div
              animate={{
                rotate: isStyleQuizOpen ? 12 : 0,
                scale: isStyleQuizOpen ? 1.08 : 1,
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center"
            >
              <SparkleStarIcon className={`w-4 h-4 transition-colors ${isStyleQuizOpen ? 'text-zariGoldLight' : 'text-zariGold'}`} />
            </motion.div>
            {!isScrolledDown && (
              <span className={`text-[8.5px] font-sans font-bold uppercase tracking-[0.18em] mt-0.5 transition-colors ${
                isStyleQuizOpen ? 'text-zariGoldLight font-extrabold' : 'text-zariGold'
              }`}>
                STYLE
              </span>
            )}
          </motion.button>

          {/* 4. WISHLIST */}
          <Link
            href="/wishlist"
            className={`flex-1 h-full flex flex-col items-center justify-center rounded-full relative transition-all ${
              pathname === '/wishlist'
                ? 'bg-gold-gradient text-white shadow-xs'
                : 'text-inkNavy/70 hover:text-inkNavy'
            }`}
          >
            <div className="relative">
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-2 text-[8px] font-bold bg-oxblood text-white w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>
            {!isScrolledDown && (
              <span className="text-[8.5px] font-sans font-bold uppercase tracking-wider mt-0.5">
                WISHLIST
              </span>
            )}
          </Link>

          {/* 5. BAG */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsCartOpen(true);
            }}
            className="flex-1 h-full flex flex-col items-center justify-center rounded-full relative text-inkNavy/70 hover:text-inkNavy transition-all"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 text-[8px] font-bold bg-zariGold text-white w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            {!isScrolledDown && (
              <span className="text-[8.5px] font-sans font-bold uppercase tracking-wider mt-0.5">
                BAG
              </span>
            )}
          </button>

        </div>
      </nav>

      {/* Style Quiz Sheet Component */}
      <StyleQuizSheet
        isOpen={isStyleQuizOpen}
        onClose={() => setIsStyleQuizOpen(false)}
      />
    </>
  );
}
