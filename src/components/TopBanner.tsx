'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TruckIcon, TagIcon, SparklesIcon, PackageIcon } from '@/components/ui/BrandIcons';
import { ANNOUNCEMENT_MESSAGES, AnnouncementMessage } from '@/config/announcements';

const ICON_MAP: Record<string, React.FC<{ className?: string; color?: string }>> = {
  truck: TruckIcon,
  tag: TagIcon,
  sparkles: SparklesIcon,
  gift: PackageIcon,
  rotate: SparklesIcon,
};

export const TopBanner: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const nextMessage = useCallback(() => {
    setIndex((prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextMessage();
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, nextMessage]);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 40 && currentY > lastY) {
        setIsScrolledDown(true);
      } else if (currentY < lastY || currentY <= 40) {
        setIsScrolledDown(false);
      }
      lastY = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentMessage: AnnouncementMessage = ANNOUNCEMENT_MESSAGES[index];
  const IconComponent = ICON_MAP[currentMessage.icon] || SparklesIcon;

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
      className={`relative w-full bg-navy text-ivory select-none z-40 overflow-hidden border-b border-roseGold/30 transition-all duration-300 ease-out ${
        isScrolledDown ? 'max-h-0 py-0 opacity-0 border-b-0 pointer-events-none' : 'max-h-12 py-2.5 opacity-100'
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-center relative px-3 sm:px-4 h-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMessage.id}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { y: '100%', opacity: 0 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { y: '0%', opacity: 1 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { y: '-100%', opacity: 0 }
            }
            transition={{
              duration: prefersReducedMotion ? 0.2 : 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center justify-center gap-1.5 sm:gap-2 max-w-full overflow-hidden text-center cursor-pointer"
            onClick={nextMessage}
          >
            <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-roseGold shrink-0 hidden xs:inline-block" />
            <span className="font-sans text-[10px] xs:text-[11px] sm:text-[12px] font-medium tracking-[0.15em] sm:tracking-[0.2em] text-ivory uppercase truncate whitespace-nowrap">
              {currentMessage.text}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
        {ANNOUNCEMENT_MESSAGES.map((msg, i) => (
          <button
            key={msg.id}
            onClick={() => setIndex(i)}
            aria-label={`Jump to announcement ${i + 1}`}
            className={`h-0.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-3 bg-roseGold' : 'w-1 bg-ivory/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TopBanner;
