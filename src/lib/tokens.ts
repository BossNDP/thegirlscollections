/**
 * The Girls Collections — Design System Tokens
 * Unified spacing, motion system, and typography constants.
 */

export const TOKENS = {
  // Mobile & Desktop Spacing Systems
  spacing: {
    mobile: {
      pagePx: 'px-4 sm:px-6', // 16px / 24px
      sectionPy: 'py-16 sm:py-20', // 64px - 80px
      gap: 'gap-3 sm:gap-4', // 12px - 16px
    },
    desktop: {
      maxWidth: 'max-w-[1440px]',
      pagePx: 'lg:px-12 xl:px-16', // 48px - 64px
      sectionPy: 'md:py-24 lg:py-32', // 96px - 128px
      gap: 'gap-6 lg:gap-8', // 24px - 32px
    },
  },

  // Motion Durations & Easing Curves
  motion: {
    // Easing Curves
    easeLuxury: [0.16, 1, 0.3, 1], // Smooth custom cubic bezier
    easeFast: [0.25, 0.1, 0.25, 1.0],

    // Durations (in seconds for Framer Motion)
    durationFast: 0.2, // 200ms - taps, toggles, badges
    durationComponent: 0.35, // 350ms - drawers, sheets, cards
    durationEditorial: 0.6, // 600ms - reveals, hero, staggered menus
  },

  // Typography Constants
  typography: {
    serifHeader: 'font-serif font-bold text-inkNavy tracking-tight',
    sansProductTitle: 'font-sans font-medium text-inkNavy text-xs sm:text-sm tracking-wide',
    kicker: 'font-sans font-semibold text-[10.5px] sm:text-xs text-zariGold tracking-[0.25em] uppercase',
    price: 'font-sans font-bold text-zariGold font-tnum',
    priceStrike: 'font-sans text-inkNavy/40 line-through font-normal text-xs font-tnum',
  },

  // Restraint & Surface Rules
  restraint: {
    cardBorder: 'border border-zariGold/20',
    cardBorderHover: 'hover:border-zariGold/40',
    cardRadius: 'rounded-xl', // Selective rounded corners
    subtleShadow: 'shadow-[0_4px_20px_rgba(13,14,26,0.06)]',
  },
};
