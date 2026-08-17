'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { DesktopMegaMenu, MobileMegaMenu } from './MegaMenu';
import FullScreenMenu from './FullScreenMenu';
import BrandLogo from './BrandLogo';

const AnimatedHamburgerIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const lineBg = isOpen ? 'bg-zariGold' : 'bg-inkNavy';

  return (
    <div className="w-5.5 h-5.5 flex flex-col justify-center items-center relative select-none">
      <span
        className={`w-5 h-[2px] rounded-full transition-all duration-300 transform ${lineBg} ${
          isOpen ? 'rotate-45 translate-y-[2px]' : '-translate-y-[5px]'
        }`}
      />
      <span
        className={`w-5 h-[2px] rounded-full transition-all duration-300 ${lineBg} ${
          isOpen ? 'opacity-0 scale-0' : 'opacity-100'
        }`}
      />
      <span
        className={`w-5 h-[2px] rounded-full transition-all duration-300 transform ${lineBg} ${
          isOpen ? '-rotate-45 -translate-y-[2px]' : 'translate-y-[5px]'
        }`}
      />
    </div>
  );
};

export default function Navbar() {
  const { cartCount, wishlist, setIsCartOpen, setIsSearchOpen } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heartPulsing, setHeartPulsing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerHeartPulse = () => {
    setHeartPulsing(true);
    setTimeout(() => setHeartPulsing(false), 250);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ease-out border-b border-zariGold/20 ${
          isScrolled
            ? 'h-[64px] sm:h-[70px] bg-ivory/95 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)]'
            : 'h-[76px] sm:h-[86px] bg-ivory'
        }`}
      >
        <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-8 lg:px-12 flex items-center justify-between relative">
          
          {/* Mobile Left: Hamburger Icon Only */}
          <div className="flex items-center shrink-0 lg:hidden">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 min-w-[24px] flex items-center justify-center focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              <AnimatedHamburgerIcon isOpen={mobileMenuOpen} />
            </motion.button>
          </div>

          {/* Mobile Center: Crest + Stacked Animated Wordmark Single Lockup */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center lg:hidden">
            <Link href="/" className="flex items-center gap-[7px] group py-1">
              {/* Crest / Monogram Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
                className="relative shrink-0 flex items-center justify-center"
              >
                <Image
                  src="/logo.png"
                  alt="The Girls Collections Crest"
                  width={322}
                  height={353}
                  className="h-[28px] xs:h-[30px] sm:h-[32px] w-auto object-contain filter drop-shadow-xs"
                  priority
                />
              </motion.div>

              {/* Two-Line Wordmark */}
              <div className="flex flex-col items-center text-center relative">
                <div className="relative overflow-hidden inline-block px-0.5">
                  {/* Single-Shot Foil Shimmer Sweep */}
                  <span className="animate-foil-once" />

                  <span className="font-serif text-[12.5px] xs:text-[13px] font-semibold tracking-[0.16em] uppercase leading-tight bg-gradient-to-r from-[#D8BC82] via-[#C9A24B] to-[#8B6A2E] bg-clip-text text-transparent block">
                    THE GIRLS
                  </span>
                  <span className="font-serif text-[11.5px] xs:text-[12px] font-semibold tracking-[0.2em] uppercase leading-tight bg-gradient-to-r from-[#C9A24B] via-[#D8BC82] to-[#8B6A2E] bg-clip-text text-transparent block">
                    COLLECTIONS
                  </span>
                </div>
                
                {/* Curtain Reveal Underline */}
                <div className="w-full h-[1px] bg-zariGold mt-0.5 animate-curtain-reveal" />
              </div>
            </Link>
          </div>

          {/* Desktop Left: Brand Logo */}
          <div className="hidden lg:flex items-center shrink-0 py-1">
            <Link href="/" className="flex items-center">
              <BrandLogo variant="horizontal" size="md" showText={true} />
            </Link>
          </div>

          {/* Desktop Center: Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10 font-sans">
            <div
              onMouseEnter={() => setActiveCategory('women')}
              className="relative py-2 group cursor-pointer"
            >
              <Link
                href="/shop?target=women"
                className={`text-[12.5px] font-semibold uppercase tracking-[0.15em] transition-colors relative py-1 ${
                  activeCategory === 'women' ? 'text-zariGold' : 'text-inkNavy hover:text-zariGold'
                }`}
              >
                Women
                <span
                  className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-zariGold origin-left transition-transform duration-300 ease-out ${
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
                className={`text-[12.5px] font-semibold uppercase tracking-[0.15em] transition-colors relative py-1 ${
                  activeCategory === 'kids' ? 'text-zariGold' : 'text-inkNavy hover:text-zariGold'
                }`}
              >
                Kids Ethnic
                <span
                  className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-zariGold origin-left transition-transform duration-300 ease-out ${
                    activeCategory === 'kids' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            </div>

            <div onMouseEnter={() => setActiveCategory(null)} className="relative py-2 group">
              <Link
                href="/shop?isNew=true"
                className="text-[12.5px] font-semibold uppercase tracking-[0.15em] text-inkNavy hover:text-zariGold transition-colors relative py-1"
              >
                New Arrivals
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-zariGold origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            </div>

            <div onMouseEnter={() => setActiveCategory(null)} className="relative py-2 group">
              <Link
                href="/shop?occasion=Festive"
                className="text-[12.5px] font-semibold uppercase tracking-[0.15em] text-inkNavy hover:text-zariGold transition-colors relative py-1"
              >
                Festive Edit
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-zariGold origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            </div>

            <div onMouseEnter={() => setActiveCategory(null)} className="relative py-2 group">
              <Link
                href="/shop?isSale=true"
                className="text-[12.5px] font-semibold uppercase tracking-[0.15em] text-oxblood hover:text-inkNavy transition-colors relative py-1"
              >
                Sale
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-oxblood origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            </div>
          </nav>

          {/* Right Action Icons (Tightly spaced icons) */}
          <div className="flex items-center gap-2.5 sm:gap-5 text-inkNavy">
            <motion.div whileTap={{ scale: 0.85 }}>
              <Link
                href="/account"
                className="w-7.5 h-7.5 sm:w-8 sm:h-8 min-w-[24px] hidden sm:flex items-center justify-center hover:text-zariGold transition-colors"
                title="Account"
              >
                <User className="w-5 h-5 stroke-[1.8]" />
              </Link>
            </motion.div>

            <motion.div whileTap={{ scale: 0.85 }} onClick={triggerHeartPulse}>
              <Link
                href="/wishlist"
                className="w-7.5 h-7.5 sm:w-8 sm:h-8 min-w-[24px] flex items-center justify-center hover:text-zariGold transition-colors relative"
                title="Wishlist"
              >
                <Heart
                  className={`w-[18px] h-[18px] sm:w-5 sm:h-5 stroke-[1.8] transition-all duration-200 ${
                    heartPulsing ? 'animate-heart-pulse' : ''
                  } ${
                    wishlist.length > 0 ? 'text-oxblood fill-oxblood' : 'text-inkNavy'
                  }`}
                />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold-gradient text-white text-[9px] font-bold flex items-center justify-center animate-badge-pop">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </motion.div>

            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setIsCartOpen(true)}
              className="w-7.5 h-7.5 sm:w-8 sm:h-8 min-w-[24px] flex items-center justify-center hover:text-zariGold transition-colors relative"
              title="Shopping Bag"
              aria-label="Cart"
            >
              <ShoppingBag className="w-[18px] h-[18px] sm:w-5 sm:h-5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold-gradient text-white text-[9px] font-bold flex items-center justify-center animate-badge-pop">
                  {cartCount}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Full-Screen Navigation Takeover Menu */}
      <FullScreenMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
