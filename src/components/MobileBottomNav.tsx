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
        className={`fixed bottom-4 inset-x-0 z-[95] md:hidden max-w-[365px] mx-auto transition-all duration-200 ease-out select-none px-3 ${
          isScrolledDown ? 'h-[52px]' : 'h-[60px]'
        }`}
        aria-label="Mobile Navigation Bar"
      >
        <div className="relative w-full h-full rounded-[26px] bg-ivory/95 backdrop-blur-[20px] border border-zariGold/30 shadow-[0_8px_30px_rgba(28,31,59,0.12)] p-1 flex items-center justify-between overflow-hidden">
          
          {/* 1. HOME */}
          <Link
            href="/"
            className={`flex-1 h-full flex flex-col items-center justify-center rounded-2xl transition-all duration-150 relative ${
              pathname === '/' ? 'text-zariGold font-bold' : 'text-inkNavy/70 hover:text-inkNavy'
            }`}
          >
            {pathname === '/' && (
              <motion.span
                layoutId="activeTabRing"
                className="absolute inset-x-2 inset-y-1 rounded-xl bg-zariGold/10 border border-zariGold/30 z-0"
                transition={{ duration: 0.15 }}
              />
            )}
            <Home className={`w-4 h-4 stroke-[1.5] relative z-10 transition-transform duration-150 ${pathname === '/' ? 'scale-110' : ''}`} />
            {!isScrolledDown && (
              <span className="text-[8.5px] font-sans font-bold uppercase tracking-wider mt-0.5 relative z-10">
                HOME
              </span>
            )}
          </Link>

          {/* 2. SHOP */}
          <Link
            href="/shop"
            className={`flex-1 h-full flex flex-col items-center justify-center rounded-2xl transition-all duration-150 relative ${
              pathname === '/shop' || pathname?.startsWith('/shop/')
                ? 'text-zariGold font-bold'
                : 'text-inkNavy/70 hover:text-inkNavy'
            }`}
          >
            {(pathname === '/shop' || pathname?.startsWith('/shop/')) && (
              <motion.span
                layoutId="activeTabRing"
                className="absolute inset-x-2 inset-y-1 rounded-xl bg-zariGold/10 border border-zariGold/30 z-0"
                transition={{ duration: 0.15 }}
              />
            )}
            <LayoutGrid className={`w-4 h-4 stroke-[1.5] relative z-10 transition-transform duration-150 ${pathname === '/shop' || pathname?.startsWith('/shop/') ? 'scale-110' : ''}`} />
            {!isScrolledDown && (
              <span className="text-[8.5px] font-sans font-bold uppercase tracking-wider mt-0.5 relative z-10">
                SHOP
              </span>
            )}
          </Link>

          {/* 3. DISCOVER — Integrated Interactive Personal Stylist Action */}
          <button
            onClick={() => setIsStyleQuizOpen(true)}
            className={`flex-1 h-full flex flex-col items-center justify-center rounded-2xl transition-all duration-150 relative cursor-pointer ${
              isStyleQuizOpen ? 'text-zariGold font-bold' : 'text-zariGold/80 hover:text-zariGold'
            }`}
            aria-label="Open Personal Stylist Discover Quiz"
          >
            {isStyleQuizOpen && (
              <motion.span
                layoutId="activeTabRing"
                className="absolute inset-x-2 inset-y-1 rounded-xl bg-zariGold/15 border border-zariGold/40 z-0"
                transition={{ duration: 0.15 }}
              />
            )}
            <SparkleStarIcon className={`w-4 h-4 relative z-10 transition-transform duration-150 ${isStyleQuizOpen ? 'scale-110 text-zariGold' : 'text-zariGold/80'}`} />
            {!isScrolledDown && (
              <span className="text-[8.5px] font-sans font-bold uppercase tracking-[0.16em] mt-0.5 relative z-10">
                DISCOVER
              </span>
            )}
          </button>

          {/* 4. WISHLIST */}
          <Link
            href="/wishlist"
            className={`flex-1 h-full flex flex-col items-center justify-center rounded-2xl relative transition-all duration-150 ${
              pathname === '/wishlist'
                ? 'text-zariGold font-bold'
                : 'text-inkNavy/70 hover:text-inkNavy'
            }`}
          >
            {pathname === '/wishlist' && (
              <motion.span
                layoutId="activeTabRing"
                className="absolute inset-x-2 inset-y-1 rounded-xl bg-zariGold/10 border border-zariGold/30 z-0"
                transition={{ duration: 0.15 }}
              />
            )}
            <div className="relative z-10">
              <Heart className={`w-4 h-4 stroke-[1.5] transition-transform duration-150 ${pathname === '/wishlist' ? 'scale-110' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-2 text-[8px] font-bold bg-zariGold text-white w-3.5 h-3.5 rounded-full flex items-center justify-center animate-badge-pop shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </div>
            {!isScrolledDown && (
              <span className="text-[8.5px] font-sans font-bold uppercase tracking-wider mt-0.5 relative z-10">
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
            className="flex-1 h-full flex flex-col items-center justify-center rounded-2xl relative text-inkNavy/70 hover:text-inkNavy transition-all duration-150 cursor-pointer"
          >
            <div className="relative z-10">
              <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 text-[8px] font-bold bg-zariGold text-white w-3.5 h-3.5 rounded-full flex items-center justify-center animate-badge-pop shadow-xs">
                  {cartCount}
                </span>
              )}
            </div>
            {!isScrolledDown && (
              <span className="text-[8.5px] font-sans font-bold uppercase tracking-wider mt-0.5 relative z-10">
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
