'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, User, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { useAuthSession } from '@/context/AuthContext';
import { DesktopMegaMenu, MobileMegaMenu } from './MegaMenu';
import FullScreenMenu from './FullScreenMenu';
import BrandLogo from './BrandLogo';

const AnimatedHamburgerIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const lineBg = isOpen ? 'bg-zariGold' : 'bg-inkNavy';

  return (
    <div className="w-5.5 h-5.5 flex flex-col justify-center items-center relative select-none">
      <span
        className={`w-5 h-[1.5px] rounded-full transition-all duration-300 transform ${lineBg} ${
          isOpen ? 'rotate-45 translate-y-[2px]' : '-translate-y-[5px]'
        }`}
      />
      <span
        className={`w-5 h-[1.5px] rounded-full transition-all duration-300 ${lineBg} ${
          isOpen ? 'opacity-0 scale-0' : 'opacity-100'
        }`}
      />
      <span
        className={`w-5 h-[1.5px] rounded-full transition-all duration-300 transform ${lineBg} ${
          isOpen ? '-rotate-45 -translate-y-[2px]' : 'translate-y-[5px]'
        }`}
      />
    </div>
  );
};

export default function Navbar() {
  const { cartCount, wishlist, setIsCartOpen, setIsSearchOpen } = useShop();
  const { user, isSignedIn, openAuthModal, logout } = useAuthSession();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
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
        <div className="max-w-[1440px] mx-auto h-full px-3 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Mobile Left: Hamburger Button */}
          <div className="flex items-center shrink-0 lg:hidden w-8">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 flex items-center justify-center focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              <AnimatedHamburgerIcon isOpen={mobileMenuOpen} />
            </motion.button>
          </div>

          {/* Mobile Center: Crest + Stacked Wordmark Single Lockup (Non-overlapping Flex item) */}
          <div className="flex-1 flex justify-center items-center px-1 overflow-hidden min-w-0 lg:hidden">
            <Link href="/" className="flex items-center gap-[6px] xs:gap-[8px] group py-0.5 max-w-full">
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
                  className="h-[28px] xs:h-[32px] sm:h-[36px] w-auto object-contain filter drop-shadow-xs"
                  priority
                />
              </motion.div>

              {/* Two-Line Wordmark */}
              <div className="flex flex-col items-center text-center relative shrink min-w-0">
                <div className="relative overflow-hidden inline-block px-0.5">
                  <span className="animate-foil-once" />

                  <span className="font-serif text-[13px] xs:text-[14.5px] font-semibold tracking-[0.14em] uppercase leading-tight bg-gradient-to-r from-[#D8BC82] via-[#C9A24B] to-[#8B6A2E] bg-clip-text text-transparent block truncate">
                    THE GIRLS
                  </span>
                  <span className="font-serif text-[11px] xs:text-[12.5px] font-semibold tracking-[0.18em] uppercase leading-tight bg-gradient-to-r from-[#C9A24B] via-[#D8BC82] to-[#8B6A2E] bg-clip-text text-transparent block truncate">
                    COLLECTIONS
                  </span>
                </div>
                
                {/* Temple Arch Hairline Curve Accent */}
                <svg
                  viewBox="0 0 100 8"
                  fill="none"
                  className="w-full h-[5px] text-zariGold/80 mt-0.5"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 0 7 Q 50 -2 100 7"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
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
                className="text-[12.5px] font-semibold uppercase tracking-[0.15em] text-zariGold hover:text-inkNavy transition-colors relative py-1"
              >
                Sale
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-zariGold origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            </div>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-5 text-inkNavy">
            {/* Search Icon Trigger */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setIsSearchOpen(true)}
              className="w-8 h-8 flex items-center justify-center hover:text-zariGold transition-colors cursor-pointer"
              title="Search"
              aria-label="Search Collection"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </motion.button>

            {/* Desktop Account Trigger */}
            <div className="hidden lg:block relative">
              {isSignedIn ? (
                <div className="relative group">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="w-8 h-8 flex items-center justify-center hover:text-zariGold transition-colors cursor-pointer"
                    title="Account Options"
                    aria-label="Account Options"
                  >
                    <User className="w-5 h-5 stroke-[1.5] text-zariGold" />
                  </button>

                  {userDropdownOpen && (
                    <div
                      onMouseLeave={() => setUserDropdownOpen(false)}
                      className="absolute right-0 top-full mt-2 w-52 bg-ivory border border-zariGold/30 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    >
                      <div className="px-4 py-2.5 border-b border-zariGold/15">
                        <p className="text-xs font-serif font-bold text-inkNavy truncate">
                          {user?.name || user?.email || user?.phone || 'Valued Guest'}
                        </p>
                        <p className="text-[10px] font-sans text-zariGold tracking-wider uppercase">
                          {user?.phone ? 'Verified Phone' : 'Google Account'}
                        </p>
                      </div>

                      <Link
                        href="/account/orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-xs font-sans text-inkNavy hover:bg-zariGold/10 hover:text-zariGold transition-colors"
                      >
                        My Orders
                      </Link>

                      <Link
                        href="/wishlist"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-xs font-sans text-inkNavy hover:bg-zariGold/10 hover:text-zariGold transition-colors"
                      >
                        My Wishlist
                      </Link>

                      <div className="border-t border-zariGold/15 my-1" />

                      <button
                        onClick={async () => {
                          setUserDropdownOpen(false);
                          await logout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-sans text-zariGold hover:bg-zariGold/10 transition-colors cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => openAuthModal('phone')}
                  className="flex items-center gap-1.5 text-inkNavy hover:text-zariGold transition-colors py-1 cursor-pointer"
                  title="Sign In"
                  aria-label="Sign In"
                >
                  <User className="w-5 h-5 stroke-[1.5]" />
                  <span className="font-sans text-[11px] font-semibold tracking-[0.15em] uppercase">
                    Sign In
                  </span>
                </motion.button>
              )}
            </div>

            {/* Wishlist Icon */}
            <motion.div whileTap={{ scale: 0.85 }} onClick={triggerHeartPulse}>
              <Link
                href="/wishlist"
                className="w-8 h-8 flex items-center justify-center hover:text-zariGold transition-colors relative"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <Heart
                  className={`w-5 h-5 stroke-[1.5] transition-all duration-200 ${
                    heartPulsing ? 'animate-heart-pulse' : ''
                  } ${
                    wishlist.length > 0 ? 'text-zariGold fill-zariGold/20' : 'text-inkNavy'
                  }`}
                />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-zariGold text-white text-[9px] font-bold flex items-center justify-center animate-badge-pop shadow-xs">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </motion.div>

            {/* Cart / Bag Icon */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setIsCartOpen(true)}
              className="w-8 h-8 flex items-center justify-center hover:text-zariGold transition-colors relative"
              title="Shopping Bag"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-zariGold text-white text-[9px] font-bold flex items-center justify-center animate-badge-pop shadow-xs">
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
