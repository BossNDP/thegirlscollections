'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, User, Menu } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { DesktopMegaMenu, MobileMegaMenu } from './MegaMenu';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const { cartCount, wishlist, setIsSearchOpen, setIsCartOpen } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
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
      {/* Sticky Desktop/Mobile Header (z-50) (~72px mobile / ~88-104px desktop) */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 h-18 sm:h-22 lg:h-26 flex items-center ${
          isScrolled
            ? 'bg-navy/95 backdrop-blur-md shadow-md border-b border-roseGold/25 text-ivory'
            : 'bg-navy border-b border-roseGold/15 text-ivory'
        }`}
      >
        <div className="max-w-[1440px] mx-auto w-full px-3 sm:px-8 lg:px-12 flex items-center justify-between gap-2 sm:gap-6">
          
          {/* Left Side: Navigation Links & Mobile Hamburger */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-ivory hover:text-roseGold transition-colors focus:outline-none shrink-0"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop Navigation Links (Center-Out Underline Draw) */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <div
                onMouseEnter={() => setActiveCategory('women')}
                className="relative py-2 group"
              >
                <Link
                  href="/shop?target=women"
                  className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.18em] text-ivory/90 hover:text-roseGold transition-colors relative py-1"
                >
                  Women
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-roseGold origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              </div>

              <div
                onMouseEnter={() => setActiveCategory('kids')}
                className="relative py-2 group"
              >
                <Link
                  href="/shop?target=kids"
                  className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.18em] text-ivory/90 hover:text-roseGold transition-colors relative py-1"
                >
                  Kids Ethnic
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-roseGold origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              </div>

              <div onMouseEnter={() => setActiveCategory(null)} className="relative py-2 group">
                <Link
                  href="/shop?isNew=true"
                  className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.18em] text-ivory/90 hover:text-roseGold transition-colors relative py-1"
                >
                  New Arrivals
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-roseGold origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              </div>

              <div onMouseEnter={() => setActiveCategory(null)} className="relative py-2 group">
                <Link
                  href="/shop?occasion=Festive"
                  className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.18em] text-ivory/90 hover:text-roseGold transition-colors relative py-1"
                >
                  Festive Edit
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-roseGold origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              </div>

              <div onMouseEnter={() => setActiveCategory(null)} className="relative py-2 group">
                <Link
                  href="/shop?isSale=true"
                  className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-blush hover:text-roseGold transition-colors relative py-1"
                >
                  Sale
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blush origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              </div>

              <div onMouseEnter={() => setActiveCategory(null)} className="relative py-2 group">
                <Link
                  href="/#discover-brand-world"
                  className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.18em] text-ivory/90 hover:text-roseGold transition-colors relative py-1"
                >
                  Discover
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-roseGold origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              </div>
            </nav>
          </div>

          {/* Center: Horizontal Brand Logo Lockup */}
          <div className="flex items-center justify-center px-2 sm:px-4">
            <BrandLogo variant="horizontal" size="md" />
          </div>

          {/* Right Side: Action Icons */}
          <div className="flex items-center gap-1 sm:gap-4 lg:gap-6 shrink-0">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-ivory hover:text-roseGold transition-all relative group shrink-0"
              title="Search"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-roseGold transition-all duration-200 group-hover:w-3" />
            </button>

            <Link
              href="/account"
              className="w-10 h-10 hidden sm:flex items-center justify-center text-ivory hover:text-roseGold transition-all relative group shrink-0"
              title="Account"
            >
              <User className="w-5 h-5" />
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-roseGold transition-all duration-200 group-hover:w-3" />
            </Link>

            <Link
              href="/wishlist"
              className="w-10 h-10 flex items-center justify-center text-ivory hover:text-roseGold transition-all relative group shrink-0"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-roseGold text-navy text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-roseGold transition-all duration-200 group-hover:w-3" />
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-ivory hover:text-roseGold transition-all relative group shrink-0"
              title="Shopping Bag"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4.5 h-4.5 rounded-full bg-roseGold text-navy text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-roseGold transition-all duration-200 group-hover:w-3" />
            </button>
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
