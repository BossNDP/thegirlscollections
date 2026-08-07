'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { DesktopMegaMenu, MobileMegaMenu } from './MegaMenu';
import BrandLogo from './BrandLogo';

/* Smooth Animated Hamburger-to-X Icon Component */
const AnimatedHamburgerIcon: React.FC<{ isOpen: boolean; isScrolled: boolean }> = ({
  isOpen,
}) => {
  const lineBg = isOpen ? 'bg-roseGold' : 'bg-[#1C2544]';

  return (
    <div className="w-5.5 h-5.5 flex flex-col justify-center items-center relative select-none">
      <span
        className={`w-5 h-[2.2px] rounded-full transition-all duration-300 transform ${lineBg} ${
          isOpen ? 'rotate-45 translate-y-[2px]' : '-translate-y-[5px]'
        }`}
      />
      <span
        className={`w-5 h-[2.2px] rounded-full transition-all duration-300 ${lineBg} ${
          isOpen ? 'opacity-0 scale-0' : 'opacity-100'
        }`}
      />
      <span
        className={`w-5 h-[2.2px] rounded-full transition-all duration-300 transform ${lineBg} ${
          isOpen ? '-rotate-45 -translate-y-[2px]' : 'translate-y-[5px]'
        }`}
      />
    </div>
  );
};

export default function Navbar() {
  const { cartCount, wishlist, setIsSearchOpen, setIsCartOpen } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Sticky Floating Navbar Header:
          - Top of Page (Mobile): Soft Powder Blue #EEF1F7 background (76px)
          - Scrolled (Mobile Round 9f): Detached Light Frosted Glass Capsule (bg-white/92 backdrop-blur-[18px] border border-white/70 shadow-[0_12px_32px_rgba(20,20,30,0.15)])
          - Scrolled (Desktop): White/Ivory blur backdrop, shrinking to 72px with floating shadow
      */}
      <header
        className={`sticky top-0 z-50 transition-all duration-350 ease-out ${
          isScrolled
            ? 'w-full lg:w-full pt-2 lg:pt-0 px-3 lg:px-0'
            : 'w-full px-0'
        }`}
      >
        <div
          className={`mx-auto w-full transition-all duration-350 ease-out flex items-center justify-between relative ${
            isScrolled
              ? 'h-[56px] sm:h-[64px] lg:h-[72px] rounded-full lg:rounded-none bg-white/92 backdrop-blur-[18px] lg:bg-white/95 lg:backdrop-blur-md shadow-[0_12px_32px_rgba(20,20,30,0.15)] lg:shadow-[0_10px_35px_rgba(20,20,30,0.08)] border border-white/70 lg:border-none lg:border-b lg:border-navy/10 px-4 sm:px-6 lg:px-12 max-w-[1440px]'
              : 'h-[76px] sm:h-[84px] lg:h-[96px] bg-[#EEF1F7] border-b border-navy/10 px-4 sm:px-8 lg:px-12 max-w-[1440px]'
          }`}
        >
          {/* Mobile Only: Hamburger Menu Toggle Button */}
          <div className="flex items-center shrink-0 z-10 lg:hidden pl-0.5 sm:pl-2">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 flex items-center justify-center transition-colors focus:outline-none shrink-0"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              <AnimatedHamburgerIcon isOpen={mobileMenuOpen} isScrolled={isScrolled} />
            </motion.button>
          </div>

          {/* Mobile Only: Perfectly Centered Logo Emblem */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center shrink-0 py-1 z-10 lg:hidden">
            <div className={`transition-all duration-300 ${isScrolled ? 'scale-90 drop-shadow-xs' : ''}`}>
              <BrandLogo variant="horizontal" size="sm" showText={false} />
            </div>
          </div>

          {/* Desktop Only: Brand Logo + 'The Girls Collections' Brand Name Pushed to Far Left */}
          <div className="hidden lg:flex items-center shrink-0 z-10 py-1">
            <div className={`transition-all duration-300 ${isScrolled ? 'scale-95 drop-shadow-xs' : ''}`}>
              <BrandLogo variant="horizontal" size="md" showText={true} />
            </div>
          </div>

          {/* Zone 3 (Right): Desktop Navigation Links + Uniformly Spaced Action Icons */}
          <div className="flex items-center justify-end space-x-5 lg:space-x-10 shrink-0 z-10 pr-0.5 sm:pr-2">
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9 text-navy font-sans">
              <div
                onMouseEnter={() => setActiveCategory('women')}
                className="relative py-2 group cursor-pointer"
              >
                <Link
                  href="/shop?target=women"
                  className={`text-[13px] font-medium uppercase tracking-[0.08em] transition-colors relative py-1 ${
                    activeCategory === 'women' ? 'text-roseGold' : 'text-navy/90 hover:text-roseGold'
                  }`}
                >
                  Women
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-roseGold origin-left transition-transform duration-300 ease-out ${
                      activeCategory === 'women' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              </div>

              <div
                onMouseEnter={() => setActiveCategory('kids')}
                className="relative py-2 group cursor-pointer"
              >
                <Link
                  href="/shop?target=kids"
                  className={`text-[13px] font-medium uppercase tracking-[0.08em] transition-colors relative py-1 ${
                    activeCategory === 'kids' ? 'text-roseGold' : 'text-navy/90 hover:text-roseGold'
                  }`}
                >
                  Kids Ethnic
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-roseGold origin-left transition-transform duration-300 ease-out ${
                      activeCategory === 'kids' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              </div>

              <div onMouseEnter={() => setActiveCategory(null)} className="relative py-2 group">
                <Link
                  href="/shop?isNew=true"
                  className="text-[13px] font-medium uppercase tracking-[0.08em] text-navy/90 hover:text-roseGold transition-colors relative py-1"
                >
                  New Arrivals
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-roseGold origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              </div>

              <div onMouseEnter={() => setActiveCategory(null)} className="relative py-2 group">
                <Link
                  href="/shop?occasion=Festive"
                  className="text-[13px] font-medium uppercase tracking-[0.08em] text-navy/90 hover:text-roseGold transition-colors relative py-1"
                >
                  Festive Edit
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-roseGold origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              </div>

              <div onMouseEnter={() => setActiveCategory(null)} className="relative py-2 group">
                <Link
                  href="/shop?isSale=true"
                  className="text-[13px] font-semibold uppercase tracking-[0.08em] text-roseGold hover:text-navy transition-colors relative py-1"
                >
                  Sale
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-roseGold origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              </div>

              <div onMouseEnter={() => setActiveCategory(null)} className="relative py-2 group">
                <Link
                  href="/#discover-brand-world"
                  className="text-[13px] font-medium uppercase tracking-[0.08em] text-navy/90 hover:text-roseGold transition-colors relative py-1"
                >
                  Discover
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-roseGold origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              </div>
            </nav>

            {/* Action Icons: Wishlist & Shopping Bag */}
            <div className="flex items-center gap-3.5 sm:gap-4 lg:gap-7 shrink-0 text-navy">

              <motion.div whileTap={{ scale: 0.92 }}>
                <Link
                  href="/account"
                  className="w-8 h-8 sm:w-9 sm:h-9 hidden sm:flex items-center justify-center hover:text-roseGold transition-colors relative group focus:outline-none"
                  title="Account"
                >
                  <User className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.2]" />
                </Link>
              </motion.div>

              <motion.div whileTap={{ scale: 0.92 }}>
                <Link
                  href="/wishlist"
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:text-roseGold transition-colors relative group focus:outline-none"
                  title="Wishlist"
                >
                  <Heart
                    className={`w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.2] transition-colors ${
                      wishlist.length > 0
                        ? 'text-roseGold fill-roseGold/20'
                        : ''
                    }`}
                  />
                  {wishlist.length > 0 && (
                    <span className="absolute top-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-roseGold text-navy text-[8.5px] sm:text-[9px] font-bold flex items-center justify-center shadow-xs">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
              </motion.div>

              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsCartOpen(true)}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:text-roseGold transition-colors relative group focus:outline-none"
                title="Shopping Bag"
                aria-label="Cart"
              >
                <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.2]" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-roseGold text-navy text-[8.5px] sm:text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </motion.button>
            </div>
          </div>

        </div>

        {/* Desktop Mega Menu Dropdown */}
        <DesktopMegaMenu
          activeCategory={activeCategory}
          onClose={() => setActiveCategory(null)}
        />
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMegaMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
