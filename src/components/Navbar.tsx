'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, User, Search, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { useAuthSession } from '@/context/AuthContext';
import FullScreenMenu from './FullScreenMenu';
import FlyingButterfly from './FlyingButterfly';

const silkEase = [0.16, 1, 0.3, 1] as const;

// Delicate Animated Gold Butterfly Accent for Middle Navbar Lockup
const WordmarkButterfly: React.FC<{ shouldReduceMotion?: boolean }> = ({ shouldReduceMotion = false }) => {
  return (
    <motion.svg
      viewBox="0 0 40 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-3.5 sm:w-5 sm:h-4 text-zariGold inline-block filter drop-shadow-[0_1px_5px_rgba(201,162,75,0.45)] mb-0.5"
      animate={!shouldReduceMotion ? { y: [-1, 1, -1] } : {}}
      transition={{ duration: 3.5, ease: 'easeInOut', repeat: Infinity }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wmButterflyGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E4B8" />
          <stop offset="40%" stopColor="#C9A24B" />
          <stop offset="80%" stopColor="#D8BC82" />
          <stop offset="100%" stopColor="#8B6A2E" />
        </linearGradient>
      </defs>

      {/* Left Wing (Hinge at center) */}
      <motion.g
        style={{ transformOrigin: '20px 16px' }}
        animate={!shouldReduceMotion ? { rotate: [-5, 2, -5] } : {}}
        transition={{ duration: 2.8, ease: 'easeInOut', repeat: Infinity }}
      >
        <path
          d="M 20 12 C 12 2 2 6 5 16 C 8 22 16 20 20 17 Z"
          fill="url(#wmButterflyGold)"
          opacity="0.95"
        />
        <path
          d="M 20 17 C 12 18 6 26 12 29 C 17 31 19 23 20 18 Z"
          fill="url(#wmButterflyGold)"
          opacity="0.85"
        />
      </motion.g>

      {/* Right Wing (Hinge at center) */}
      <motion.g
        style={{ transformOrigin: '20px 16px' }}
        animate={!shouldReduceMotion ? { rotate: [5, -2, 5] } : {}}
        transition={{ duration: 2.8, ease: 'easeInOut', repeat: Infinity }}
      >
        <path
          d="M 20 12 C 28 2 38 6 35 16 C 32 22 24 20 20 17 Z"
          fill="url(#wmButterflyGold)"
          opacity="0.95"
        />
        <path
          d="M 20 17 C 28 18 34 26 28 29 C 23 31 21 23 20 18 Z"
          fill="url(#wmButterflyGold)"
          opacity="0.85"
        />
      </motion.g>

      {/* Center Body & Antennae */}
      <g>
        <path d="M 19 12 Q 15 5 12 4 M 21 12 Q 25 5 28 4" stroke="url(#wmButterflyGold)" strokeWidth="1" strokeLinecap="round" fill="none" />
        <circle cx="12" cy="4" r="0.8" fill="url(#wmButterflyGold)" />
        <circle cx="28" cy="4" r="0.8" fill="url(#wmButterflyGold)" />
        <ellipse cx="20" cy="16" rx="1.2" ry="7" fill="url(#wmButterflyGold)" stroke="#14172E" strokeWidth="0.4" />
      </g>
    </motion.svg>
  );
};

export default function Navbar() {
  const { cartCount, wishlist, setIsCartOpen } = useShop();
  const { user, isSignedIn, openAuthModal, logout } = useAuthSession();
  const shouldReduceMotion = !!useReducedMotion();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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

  // Check initial entry animation state (runs once per session)
  useEffect(() => {
    try {
      const animated = sessionStorage.getItem('tgc_header_wordmark_animated_v5');
      if (animated || shouldReduceMotion) {
        setHasAnimated(true);
      } else {
        sessionStorage.setItem('tgc_header_wordmark_animated_v5', 'true');
        const timer = setTimeout(() => {
          setHasAnimated(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      setHasAnimated(true);
    }
  }, [shouldReduceMotion]);

  // RAF Throttled Scroll listener for sticky header compression
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 35);
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

  const wordmarkLine1 = 'THE GIRLS'.split('');

  const line1Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.035, delayChildren: 0.08 },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: silkEase },
    },
  };

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
        className={`sticky top-0 z-[100] transition-all duration-350 ease-out border-b border-zariGold/20 select-none transform-gpu will-change-transform ${
          isScrolled
            ? 'h-[60px] sm:h-[70px] bg-ivory/95 backdrop-blur-md shadow-[0_4px_20px_rgba(28,31,59,0.05)]'
            : 'h-[74px] sm:h-[86px] bg-ivory'
        }`}
      >
        <div className="max-w-[1440px] mx-auto h-full px-3.5 sm:px-6 lg:px-10 flex items-center justify-between relative">
          
          {/* ZONE 1 (LEFT): BRAND LOGO EMBLEM (UNTOUCHED ORIGINAL) */}
          <div className="flex items-center shrink-0 py-1 z-20">
            <Link
              href="/"
              className="flex items-center group focus:outline-none"
              aria-label="The Girls Collections Home"
            >
              <motion.div
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="relative shrink-0 flex items-center justify-center"
              >
                <Image
                  src="/logo.webp"
                  alt="The Girls Collections Emblem"
                  width={160}
                  height={175}
                  className={`w-auto object-contain transition-all duration-300 filter drop-shadow-xs group-hover:scale-105 ${
                    isScrolled
                      ? 'h-[42px] xs:h-[46px] sm:h-[52px] lg:h-[58px]'
                      : 'h-[52px] xs:h-[60px] sm:h-[70px] lg:h-[78px]'
                  }`}
                  priority
                />
              </motion.div>
            </Link>
          </div>

          {/* ZONE 2 (ABSOLUTE VIEWPORT CENTER): THE HERO BRAND WORDMARK LOCKUP WITH CONTINUOUS FLYING BUTTERFLY */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center flex flex-col items-center justify-center pointer-events-auto">
            {/* Real 3D Flying Swallowtail/Monarch Butterfly continuous flight path */}
            <FlyingButterfly />

            <Link
              href="/"
              className="flex flex-col items-center justify-center group focus:outline-none py-0.5"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => {
                setIsHovered(true);
                setTimeout(() => setIsHovered(false), 700);
              }}
            >
              {/* Floating Delicate Gold Butterfly Icon */}
              <div className="-mb-1 flex items-center justify-center">
                <WordmarkButterfly shouldReduceMotion={shouldReduceMotion} />
              </div>

              {!hasAnimated && !shouldReduceMotion ? (
                <div className="flex flex-col items-center justify-center overflow-hidden">
                  
                  {/* Line 1: THE GIRLS (Character-Staggered Reveal) */}
                  <motion.div
                    variants={line1Variants}
                    initial="hidden"
                    animate="visible"
                    className={`flex items-center justify-center transition-all duration-300 ${
                      isScrolled ? 'scale-92 origin-center' : 'scale-100'
                    }`}
                  >
                    {wordmarkLine1.map((char, index) => (
                      <motion.span
                        key={`l1-${index}`}
                        variants={charVariants}
                        className="font-serif text-[12.5px] xs:text-[14px] sm:text-[16px] lg:text-[18px] font-bold uppercase leading-none text-inkNavy tracking-[0.18em] inline-block"
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Line 2: COLLECTIONS */}
                  <motion.div
                    initial={{ opacity: 0, y: 4, letterSpacing: '0.32em' }}
                    animate={{ opacity: 1, y: 0, letterSpacing: '0.26em' }}
                    transition={{ duration: 0.6, ease: silkEase, delay: 0.18 }}
                    className={`relative mt-0.5 flex flex-col items-center transition-all duration-300 ${
                      isScrolled ? 'scale-92 origin-center' : 'scale-100'
                    }`}
                  >
                    <span className="font-serif text-[11px] xs:text-[12.5px] sm:text-[14.5px] lg:text-[16.5px] font-bold uppercase leading-none bg-gradient-to-r from-[#C9A24B] via-[#D8BC82] to-[#8B6A2E] bg-clip-text text-transparent relative z-10">
                      COLLECTIONS
                    </span>

                    {/* Hairline Underline Stroke Reveal (~400ms) */}
                    <svg
                      viewBox="0 0 120 4"
                      fill="none"
                      className="w-24 xs:w-28 sm:w-32 lg:w-36 h-[3px] mt-0.5 text-zariGold"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <motion.path
                        d="M 0 2 L 120 2"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.85 }}
                        transition={{ duration: 0.5, ease: silkEase, delay: 0.48 }}
                      />
                    </svg>

                    {/* Zari Gold Light Sweep Shimmer across COLLECTIONS */}
                    <motion.span
                      initial={{ x: '-100%', opacity: 0 }}
                      animate={{ x: '100%', opacity: [0, 0.45, 0] }}
                      transition={{ duration: 0.75, ease: 'easeInOut', delay: 0.75 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-20"
                    />
                  </motion.div>

                </div>
              ) : (
                <div className="flex flex-col items-center justify-center relative overflow-hidden">
                  <span className={`font-serif text-[12.5px] xs:text-[14px] sm:text-[16px] lg:text-[18px] font-bold uppercase leading-none text-inkNavy tracking-[0.18em] transition-all duration-300 ${
                    isScrolled ? 'scale-92 origin-center' : 'scale-100'
                  }`}>
                    THE GIRLS
                  </span>
                  <div className={`relative mt-0.5 flex flex-col items-center transition-all duration-300 ${
                    isScrolled ? 'scale-92 origin-center' : 'scale-100'
                  }`}>
                    <span className="font-serif text-[11px] xs:text-[12.5px] sm:text-[14.5px] lg:text-[16.5px] font-bold uppercase leading-none bg-gradient-to-r from-[#C9A24B] via-[#D8BC82] to-[#8B6A2E] bg-clip-text text-transparent tracking-[0.26em] relative z-10">
                      COLLECTIONS
                    </span>

                    {/* Settled Underline with Idle Breathing Glow Pulse */}
                    <motion.svg
                      viewBox="0 0 120 4"
                      fill="none"
                      className="w-24 xs:w-28 sm:w-32 lg:w-36 h-[3px] mt-0.5 text-zariGold"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                      animate={
                        !shouldReduceMotion
                          ? {
                              opacity: [0.65, 0.95, 0.65],
                            }
                          : { opacity: 0.8 }
                      }
                      transition={{
                        duration: 4.8,
                        ease: 'easeInOut',
                        repeat: Infinity,
                      }}
                    >
                      <path
                        d="M 0 2 L 120 2"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </motion.svg>

                    {/* Hover/Tap Replay Zari Gold Shimmer Sweep */}
                    <AnimatePresence>
                      {isHovered && !shouldReduceMotion && (
                        <motion.span
                          initial={{ x: '-100%', opacity: 0 }}
                          animate={{ x: '100%', opacity: [0, 0.55, 0] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6, ease: 'easeInOut' }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-20"
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </Link>
          </div>

          {/* ZONE 3 (RIGHT): ACTION CONTROLS (SEARCH & BAG) */}
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-4 shrink-0 text-inkNavy z-20">

            {/* Inline Expanding Search Field */}
            <AnimatePresence>
              {isSearchExpanded ? (
                <motion.form
                  initial={{ width: 36, opacity: 0 }}
                  animate={{ width: 135, opacity: 1 }}
                  exit={{ width: 36, opacity: 0 }}
                  transition={{ duration: 0.35, ease: silkEase }}
                  onSubmit={handleSearchSubmit}
                  className="relative flex items-center bg-ivory border border-zariGold/60 rounded-full px-2 py-1 shadow-md z-30 sm:w-[190px]"
                >
                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zariGold shrink-0 mr-1 stroke-[1.8]" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-transparent text-[11px] sm:text-xs font-sans text-inkNavy placeholder-inkNavy/50 focus:outline-none truncate"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchExpanded(false);
                      setSearchQuery('');
                    }}
                    className="p-0.5 text-inkNavy/60 hover:text-inkNavy shrink-0 ml-0.5 cursor-pointer"
                    aria-label="Close search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.form>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setIsSearchExpanded(true)}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:text-zariGold transition-colors cursor-pointer focus:outline-none"
                  title="Search Collection"
                  aria-label="Search Collection"
                >
                  <Search className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] stroke-[1.5]" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Account / Sign In Trigger (Mobile & Desktop) */}
            <div className="relative">
              {isSignedIn ? (
                <div ref={userDropdownRef} className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:text-zariGold transition-colors cursor-pointer focus:outline-none rounded-full bg-zariGold/10 hover:bg-zariGold/20"
                    title="Account Options"
                    aria-label="Account Options"
                  >
                    <User className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] stroke-[1.5] text-zariGold" />
                  </button>

                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute right-0 top-full mt-2 w-56 bg-ivory border border-zariGold/30 rounded-2xl shadow-2xl py-2.5 z-50 overflow-hidden"
                      >
                        <div className="px-4 py-2.5 border-b border-zariGold/15 bg-zariGold/5">
                          <p className="text-xs font-serif font-bold text-inkNavy truncate">
                            {user?.name || user?.email || user?.phone || 'Valued Member'}
                          </p>
                          <p className="text-[10px] font-sans text-zariGold font-medium truncate tracking-wide">
                            {user?.email || user?.phone || 'Account Member'}
                          </p>
                        </div>

                        <div className="py-1">
                          <Link
                            href="/account/orders"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center justify-between px-4 py-2 text-xs font-sans text-inkNavy hover:bg-zariGold/10 hover:text-zariGold transition-colors font-semibold"
                          >
                            <span>My Profile</span>
                            <span className="text-[10px] text-zariGold uppercase font-mono">Profile</span>
                          </Link>

                          <Link
                            href="/account/orders"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center justify-between px-4 py-2 text-xs font-sans text-inkNavy hover:bg-zariGold/10 hover:text-zariGold transition-colors font-medium"
                          >
                            <span>My Orders</span>
                            <span className="text-[10px] text-zinc-400 uppercase font-mono">History</span>
                          </Link>

                          <Link
                            href="/track"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center justify-between px-4 py-2 text-xs font-sans text-inkNavy hover:bg-zariGold/10 hover:text-zariGold transition-colors"
                          >
                            <span>Track Order</span>
                            <span className="text-[10px] text-zinc-400 font-mono">Live</span>
                          </Link>

                          <Link
                            href="/wishlist"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center justify-between px-4 py-2 text-xs font-sans text-inkNavy hover:bg-zariGold/10 hover:text-zariGold transition-colors"
                          >
                            <span>My Wishlist</span>
                            <span className="text-[10px] text-zariGold font-bold font-mono">({wishlist.length})</span>
                          </Link>
                        </div>

                        <div className="border-t border-zariGold/15 my-1" />

                        <button
                          onClick={async () => {
                            setUserDropdownOpen(false);
                            await logout();
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-sans text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer font-bold"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  onClick={() => openAuthModal('google')}
                  className="w-8 h-8 sm:w-auto sm:h-[34px] sm:px-2.5 flex items-center justify-center gap-1 sm:gap-1.5 text-inkNavy hover:text-zariGold transition-colors rounded-full sm:rounded-lg cursor-pointer focus:outline-none sm:bg-zariGold/10"
                  title="Sign In"
                  aria-label="Sign In"
                >
                  <User className="w-[20px] h-[20px] sm:w-[18px] sm:h-[18px] stroke-[1.6]" />
                  <span className="hidden sm:inline font-sans text-[11px] font-bold tracking-[0.12em] uppercase">
                    Sign In
                  </span>
                </motion.button>
              )}
            </div>

            {/* Desktop Wishlist Icon */}
            <motion.div className="hidden lg:block" whileTap={{ scale: 0.94 }}>
              <Link
                href="/wishlist"
                className="w-9 h-9 flex items-center justify-center hover:text-zariGold transition-colors relative"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <Heart
                  className={`w-5 h-5 stroke-[1.5] transition-all duration-200 ${wishlist.length > 0 ? 'text-zariGold fill-zariGold/20' : 'text-inkNavy'
                    }`}
                />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-zariGold text-white text-[9px] font-bold flex items-center justify-center animate-badge-pop shadow-xs">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </motion.div>

            {/* Shopping Bag Icon */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => setIsCartOpen(true)}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:text-zariGold transition-colors relative cursor-pointer focus:outline-none"
              title="Shopping Bag"
              aria-label="Cart"
            >
              <ShoppingBag className="w-[22px] h-[22px] stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-zariGold text-white text-[9px] font-bold flex items-center justify-center animate-badge-pop shadow-xs font-sans">
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
