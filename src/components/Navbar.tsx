'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { useAuthSession } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import SlideInDrawer from './SlideInDrawer';

const HairlineButterfly: React.FC<{ className?: string }> = ({ className = 'w-4 h-3.5 text-current' }) => (
  <svg
    viewBox="0 0 24 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 4C10 1 4 2 5 8C6 12 11 12 12 10" />
    <path d="M12 10C11 12 7 17 10 18C12 19 12 15 12 10" />
    <path d="M12 4C14 1 20 2 19 8C18 12 13 12 12 10" />
    <path d="M12 10C13 12 17 17 14 18C12 19 12 15 12 10" />
    <path d="M12 3v13" />
  </svg>
);

const SmallCircularLogoCrest: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative flex items-center justify-center select-none shrink-0 w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 ${className}`}>
    {/* Ivory circular backing — lifts the crest off the navy navbar */}
    <span
      className="absolute inset-0 rounded-full"
      style={{
        background: 'radial-gradient(circle, #FAF7F2 60%, #F0EBE1 100%)',
        boxShadow: '0 0 0 1.5px #C9A84C, 0 2px 8px rgba(0,0,0,0.22)',
      }}
    />
    <Image
      src="/logo.png"
      alt="The Girls Collections Emblem"
      width={56}
      height={60}
      className="relative w-[82%] h-[82%] object-contain hover:scale-105 transition-transform duration-300 z-10"
      priority
    />
  </div>
);


const WORDMARK_THE = ['T', 'H', 'E'];
const WORDMARK_GIRLS = ['G', 'I', 'R', 'L', 'S'];

const AnimatedWordmark: React.FC<{
  isScrolled: boolean;
}> = ({ isScrolled }) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const animated = sessionStorage.getItem('tgc_wordmark_theatrical_v2');
      if (animated) {
        setHasAnimated(true);
      } else {
        sessionStorage.setItem('tgc_wordmark_theatrical_v2', 'true');
        const timer = setTimeout(() => setHasAnimated(true), 1600);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <Link
      href="/"
      className="group focus:outline-none select-none"
      aria-label="The Girls Collections - Haute Couture"
    >
      {/* Outer: scale on scroll — NOT overflow-hidden, so nothing ever clips */}
      <div
        className={`flex flex-col items-center justify-center transition-transform duration-300 ease-out origin-center ${
          isScrolled ? 'scale-[0.9]' : 'scale-100'
        }`}
      >
        {/* ── ROW 1: THE  |  GIRLS ───────────────────────── */}
        {/* `whitespace-nowrap` keeps everything on one line;
            no overflow:hidden anywhere so the text is never clipped */}
        <div className="flex items-baseline justify-center gap-1.5 xs:gap-2 sm:gap-3 whitespace-nowrap">

          {/* "THE" — Fraunces Light, gold accent, deliberately smaller for hierarchy */}
          <span className="font-serif font-light leading-none text-[10px] xs:text-[11.5px] sm:text-[14px] lg:text-[15px] tracking-[0.22em] text-zariGold/80 group-hover:text-zariGoldLight transition-colors duration-300 inline-block">
            {hasAnimated
              ? 'THE'
              : WORDMARK_THE.map((char, i) => (
                  <motion.span
                    key={`the-${i}`}
                    initial={{ opacity: 0, y: 6, filter: 'blur(3px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.38, delay: 0.04 + i * 0.038, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
          </span>

          {/* Fine vertical gold hairline separator */}
          <motion.span
            initial={hasAnimated ? false : { opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.4, delay: 0.16, ease: 'easeOut' }}
            className="inline-block w-[0.75px] h-[11px] xs:h-[13px] sm:h-[16px] bg-zariGold/50 origin-top self-center shrink-0"
          />

          {/* "GIRLS" — Fraunces Semibold, ivory, the headline */}
          <div className="relative inline-flex items-center">
            <span className="font-serif font-semibold leading-none text-[15px] xs:text-[17.5px] sm:text-[22px] lg:text-[26px] tracking-[0.12em] xs:tracking-[0.14em] sm:tracking-[0.18em] text-ivory group-hover:text-zariGoldLight transition-colors duration-300 inline-block">
              {hasAnimated
                ? 'GIRLS'
                : WORDMARK_GIRLS.map((char, i) => (
                    <motion.span
                      key={`girls-${i}`}
                      initial={{ opacity: 0, y: 14, rotateX: 50, filter: 'blur(5px)' }}
                      animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.5, delay: 0.14 + i * 0.048, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
            </span>

            {/* Gold shimmer sweep — fires once on mount, never re-triggers on scroll */}
            {!hasAnimated && (
              <motion.span
                initial={{ x: '-130%', opacity: 0 }}
                animate={{ x: '230%', opacity: [0, 1, 1, 0] }}
                transition={{ duration: 0.85, delay: 0.52, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-zariGoldLight/95 to-transparent skew-x-[-22deg] pointer-events-none mix-blend-overlay rounded-sm"
              />
            )}
          </div>
        </div>

        {/* ── ROW 2: — COLLECTIONS — ───────────────────── */}
        <div className="flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2.5 mt-[3px] xs:mt-1">
          <motion.span
            initial={hasAnimated ? false : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.7 }}
            transition={{ duration: 0.55, delay: 0.42, ease: 'easeOut' }}
            className="block w-3 xs:w-4 sm:w-7 h-[0.75px] bg-zariGold origin-right shrink-0"
          />
          <motion.span
            initial={hasAnimated ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-medium text-[7px] xs:text-[8px] sm:text-[9px] lg:text-[10.5px] tracking-[0.26em] xs:tracking-[0.3em] sm:tracking-[0.42em] text-zariGold uppercase whitespace-nowrap shrink-0"
          >
            COLLECTIONS
          </motion.span>
          <motion.span
            initial={hasAnimated ? false : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.7 }}
            transition={{ duration: 0.55, delay: 0.42, ease: 'easeOut' }}
            className="block w-3 xs:w-4 sm:w-7 h-[0.75px] bg-zariGold origin-left shrink-0"
          />
        </div>
      </div>
    </Link>
  );
};

interface NavbarProps {
  isFloating?: boolean;
}

export default function Navbar({ isFloating = false }: NavbarProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const { cartCount, wishlist, setIsCartOpen } = useShop();
  const { user, isSignedIn, openAuthModal, logout } = useAuthSession();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchInputRef = useRef<HTMLInputElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // RAF Throttled Scroll listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    const handleOpenCategoryMenu = () => {
      setMobileMenuOpen(true);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('open-category-menu', handleOpenCategoryMenu);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('open-category-menu', handleOpenCategoryMenu);
    };
  }, []);

  // Auto focus inline search input when expanded
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const q = searchQuery.trim();
      setIsSearchExpanded(false);
      setSearchQuery('');
      window.location.href = `/shop?search=${encodeURIComponent(q)}`;
    }
  };

  return (
    <>
      <header
        className={`w-full select-none bg-[#1C1F3B] text-ivory border-b border-white/10 transition-all duration-300 ease-out ${
          isScrolled ? 'h-[62px] sm:h-[74px] shadow-md' : 'h-[74px] sm:h-[90px]'
        }`}
      >
        {/* TRUE 3-COLUMN CSS GRID LAYOUT */}
        <div className="max-w-[1440px] mx-auto h-full px-2 xs:px-2.5 sm:px-8 lg:px-12 grid grid-cols-[auto_1fr_auto] items-center gap-0.5 xs:gap-1 sm:gap-4 relative">
          
          {/* COLUMN 1 (LEFT): HAMBURGER ICON + SCALED UP LOGO CREST */}
          <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-3 justify-start shrink-0 z-20">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1 hover:opacity-75 transition-opacity cursor-pointer focus:outline-none min-w-[34px] min-h-[34px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center -ml-0.5"
              aria-label="Open Navigation Menu"
              title="Menu"
            >
              <div className="w-[18px] xs:w-[20px] sm:w-[22px] h-[13px] xs:h-[14px] sm:h-[15px] flex flex-col justify-between group-hover:translate-y-[-1px] transition-transform duration-200">
                <span className="w-full h-[1.75px] rounded-full transition-all bg-ivory" />
                <span className="w-full h-[1.75px] rounded-full transition-all bg-ivory" />
                <span className="w-full h-[1.75px] rounded-full transition-all bg-ivory" />
              </div>
            </button>

            <Link href="/" className="hover:opacity-85 transition-opacity flex items-center shrink-0" title="The Girls Collections">
              <SmallCircularLogoCrest />
            </Link>
          </div>

          {/* COLUMN 2 (CENTER — no min-w-0, no overflow-hidden — wordmark never clips) */}
          <div className="flex items-center justify-center pointer-events-auto z-10">
            <AnimatedWordmark isScrolled={isScrolled} />
          </div>

          {/* COLUMN 3 (RIGHT): SEARCH, ACCOUNT, BAG */}
          <div className="flex items-center justify-end gap-0.5 xs:gap-1 sm:gap-2.5 shrink-0 z-20">

            {/* Search Trigger / Inline Field */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchExpanded ? (
                  <motion.form
                    initial={{ width: 36, opacity: 0 }}
                    animate={{ width: 140, opacity: 1 }}
                    exit={{ width: 36, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    onSubmit={handleSearchSubmit}
                    className="relative flex items-center border-b py-1 pr-1 bg-[#1C1F3B] border-white/40 text-ivory"
                  >
                    <Search className="w-[17px] h-[17px] sm:w-[20px] sm:h-[20px] shrink-0 mr-1 stroke-[1.5]" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full bg-transparent text-xs font-sans placeholder-current opacity-70 focus:outline-none truncate"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchExpanded(false);
                        setSearchQuery('');
                      }}
                      className="p-1 opacity-60 hover:opacity-100 shrink-0 cursor-pointer"
                      aria-label="Close search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.form>
                ) : (
                  <button
                    onClick={() => setIsSearchExpanded(true)}
                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center hover:opacity-75 transition-opacity cursor-pointer focus:outline-none min-w-[40px] min-h-[40px]"
                    title="Search Collection"
                    aria-label="Search Collection"
                  >
                    <Search className="w-[19px] h-[19px] sm:w-[22px] sm:h-[22px] stroke-[1.5]" />
                  </button>
                )}
              </AnimatePresence>
            </div>

            {/* Account Icon */}
            <div className="relative">
              {isSignedIn ? (
                <div ref={userDropdownRef} className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center hover:opacity-75 transition-opacity cursor-pointer focus:outline-none min-w-[40px] min-h-[40px]"
                    title="Account Options"
                    aria-label="Account Options"
                  >
                    <User className="w-[19px] h-[19px] sm:w-[22px] sm:h-[22px] stroke-[1.5]" />
                  </button>

                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-52 bg-ivory border border-stone-300 py-2 z-50 shadow-lg text-inkNavy"
                      >
                        <div className="px-4 py-2 border-b border-stone-200">
                          <p className="text-xs font-serif font-bold truncate">
                            {user?.name || user?.email || user?.phone || 'Valued Member'}
                          </p>
                          <p className="text-[10px] font-sans text-inkNavy/60 truncate">
                            {user?.email || user?.phone || 'Account Member'}
                          </p>
                        </div>

                        <div className="py-1">
                          <Link
                            href="/account/orders"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-4 py-1.5 text-xs font-sans hover:bg-stone-100 transition-colors"
                          >
                            My Profile
                          </Link>

                          <Link
                            href="/account/orders"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-4 py-1.5 text-xs font-sans hover:bg-stone-100 transition-colors"
                          >
                            My Orders
                          </Link>

                          <Link
                            href="/track"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-4 py-1.5 text-xs font-sans hover:bg-stone-100 transition-colors"
                          >
                            Track Order
                          </Link>

                          <Link
                            href="/wishlist"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-4 py-1.5 text-xs font-sans hover:bg-stone-100 transition-colors"
                          >
                            My Wishlist ({wishlist.length})
                          </Link>
                        </div>

                        <div className="border-t border-stone-200 my-1" />

                        <button
                          onClick={async () => {
                            setUserDropdownOpen(false);
                            await logout();
                          }}
                          className="w-full text-left px-4 py-1.5 text-xs font-sans text-red-700 hover:bg-red-50 transition-colors font-medium"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => openAuthModal('google')}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center hover:opacity-75 transition-opacity cursor-pointer focus:outline-none min-w-[40px] min-h-[40px]"
                  title="Sign In"
                  aria-label="Sign In"
                >
                  <User className="w-[19px] h-[19px] sm:w-[22px] sm:h-[22px] stroke-[1.5]" />
                </button>
              )}
            </div>

            {/* Shopping Bag Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center hover:opacity-75 transition-opacity relative cursor-pointer focus:outline-none min-w-[40px] min-h-[40px]"
              title="Shopping Bag"
              aria-label="Cart"
            >
              <ShoppingBag className="w-[19px] h-[19px] sm:w-[22px] sm:h-[22px] stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center font-sans bg-ivory text-inkNavy">
                  {cartCount}
                </span>
              )}
            </button>

          </div>

        </div>
      </header>

      {/* Slide-In Navigation Drawer */}
      <SlideInDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}



