'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ANNOUNCEMENTS = [
  { text: 'COMPLIMENTARY SHIPPING ON ORDERS OVER ₹1,999', badge: 'FREE EXPRESS' },
  { text: 'CASH ON DELIVERY AVAILABLE ACROSS INDIA', badge: 'COD AVAILABLE' },
  { text: 'NEW FESTIVE COUTURE EDIT \u201926 NOW LIVE', badge: 'JUST DROPPED' },
  { text: 'HANDCRAFTED PURE SILK & ZARI WEAVES', badge: 'HERITAGE' },
  { text: 'USE CODE "GIRLS100" FOR ₹100 OFF FIRST ORDER', badge: 'WELCOME OFFER' },
];

interface TopBannerProps {
  isFloating?: boolean;
}

export const TopBanner: React.FC<TopBannerProps> = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const nextMessage = useCallback(() => {
    setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextMessage();
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused, nextMessage]);

  const currentAnnouncement = ANNOUNCEMENTS[index];

  return (
    <div
      aria-label="Announcement Bar"
      aria-live="polite"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      /*
        On-brand: same navy as the navbar below (#1C1F3B), always visible.
        A gold hairline at the bottom visually separates it from the navbar.
      */
      className="relative w-full bg-[#1C1F3B] select-none z-40 overflow-hidden border-b border-[#C9A84C]/30 py-1.5"
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-center relative px-3 h-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { y: 10, opacity: 0 }
            }
            animate={{ y: 0, opacity: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { y: -10, opacity: 0 }
            }
            transition={{
              duration: prefersReducedMotion ? 0.2 : 0.32,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center justify-center gap-2 text-center cursor-default max-w-full overflow-hidden"
          >
            {/* Badge — gold text on navy, hairline gold border */}
            <span className="hidden xs:inline-block font-sans text-[8px] font-extrabold tracking-[0.18em] text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/40 px-1.5 py-0.5 rounded uppercase shrink-0">
              {currentAnnouncement.badge}
            </span>

            {/* Main text — solid ivory, no gradient */}
            <span className="font-sans text-[9.5px] xs:text-[10.5px] sm:text-[11px] font-medium tracking-[0.20em] sm:tracking-[0.24em] text-[#F5F0E8] uppercase truncate whitespace-nowrap">
              {currentAnnouncement.text}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Desktop dot indicators */}
        <div className="hidden md:flex items-center gap-1 absolute right-4 top-1/2 -translate-y-1/2">
          {ANNOUNCEMENTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index ? 'w-3 bg-[#C9A84C]' : 'w-1 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to announcement ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
