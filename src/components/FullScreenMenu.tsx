'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ArrowUpRight, User, ShoppingBag, Heart } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import BrandLogo from '@/components/BrandLogo';
import { useAuthSession } from '@/context/AuthContext';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MAIN_CATEGORIES = [
  { name: 'WOMEN', href: '/shop?target=women' },
  { name: 'KIDS', href: '/shop?target=kids' },
  { name: 'TRADITIONAL', href: '/shop?category=sarees' },
  { name: 'WESTERN', href: '/shop?category=gowns' },
  { name: 'FESTIVE', href: '/shop?occasion=Festive' },
  { name: 'NEW ARRIVALS', href: '/shop?isNew=true' },
  { name: 'BESTSELLERS', href: '/shop?sort=popular' },
];

const UTILITY_LINKS = [
  { name: 'About Us', href: '/about' },
  { name: 'Contact & FAQ', href: '/contact' },
  { name: 'Store Locator', href: '/contact#stores' },
];

const easeCurve = [0.25, 1, 0.5, 1] as const;

// Motion Variants for Staggered Entrance
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: easeCurve } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: easeCurve } },
};

const panelVariants: Variants = {
  hidden: { y: '-100%' },
  visible: { y: '0%', transition: { duration: 0.55, ease: easeCurve } },
  exit: { y: '-100%', transition: { duration: 0.4, ease: easeCurve } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const linkItemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeCurve } },
};

export const FullScreenMenu: React.FC<FullScreenMenuProps> = ({ isOpen, onClose }) => {
  const { user, isSignedIn, openAuthModal } = useAuthSession();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[110] bg-inkNavy text-ivory flex flex-col justify-between overflow-hidden relative select-none"
        >
          {/* Subtle Background Temple Arch Motif Silhouette */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-[0.06] z-0">
            <svg viewBox="0 0 400 600" className="w-[120%] max-w-[900px] h-auto text-zariGold" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M 50 600 V 220 A 150 150 0 0 1 350 220 V 600 Z" />
              <path d="M 70 600 V 230 A 130 130 0 0 1 330 230 V 600 Z" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Top Bar Header */}
          <div className="w-full px-6 sm:px-12 py-5 border-b border-zariGold/20 flex items-center justify-between shrink-0 bg-inkNavy/95 backdrop-blur-md z-20">
            <Link href="/" onClick={onClose}>
              <BrandLogo variant="horizontal" size="md" />
            </Link>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-ivory/10 border border-zariGold/30 flex items-center justify-center text-ivory hover:bg-zariGold hover:text-white transition-all duration-300 cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Main Body */}
          <motion.div
            variants={panelVariants}
            className="flex-1 overflow-y-auto w-full max-w-[1440px] mx-auto px-6 sm:px-12 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10"
          >
            {/* Main Categories Column */}
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="lg:col-span-7 flex flex-col justify-center">
              <span className="font-sans font-semibold text-xs text-zariGold tracking-[0.25em] uppercase block mb-4 pb-2 border-b border-zariGold/20">
                COLLECTIONS & EDITS
              </span>
              <ul className="space-y-3 sm:space-y-4">
                {MAIN_CATEGORIES.map((item) => (
                  <motion.li key={item.name} variants={linkItemVariant}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group relative inline-flex items-center gap-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-ivory hover:text-zariGold transition-colors tracking-wide"
                    >
                      <span>{item.name}</span>
                      <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-zariGold" />
                      {/* Rose Gold Underline Reveal */}
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-zariGold origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right Column: Utility Links & Account Access */}
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="lg:col-span-5 flex flex-col justify-between gap-8 pt-4 lg:pt-0">
              <div>
                <span className="font-sans font-semibold text-xs text-zariGold tracking-[0.25em] uppercase block mb-4 pb-2 border-b border-zariGold/20">
                  CUSTOMER CARE & ACCOUNT
                </span>

                {/* Account Link in Hamburger Menu */}
                <div className="mb-6 p-4 rounded-xl bg-ivory/5 border border-zariGold/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-zariGold stroke-[1.5]" />
                    <div>
                      <p className="text-xs font-serif font-bold text-ivory">
                        {isSignedIn ? (user?.name || user?.email || user?.phone || 'Valued Guest') : 'Account Services'}
                      </p>
                      <p className="text-[10px] font-sans text-zariGold tracking-wider uppercase">
                        {isSignedIn ? 'Logged In' : 'Sign in for orders & rewards'}
                      </p>
                    </div>
                  </div>
                  {isSignedIn ? (
                    <Link
                      href="/account/orders"
                      onClick={onClose}
                      className="px-3 py-1.5 rounded-md bg-zariGold text-inkNavy text-xs font-sans font-bold uppercase tracking-wider hover:bg-zariGoldLight transition-colors"
                    >
                      Orders
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        onClose();
                        openAuthModal('phone');
                      }}
                      className="px-3 py-1.5 rounded-md bg-zariGold text-inkNavy text-xs font-sans font-bold uppercase tracking-wider hover:bg-zariGoldLight transition-colors cursor-pointer"
                    >
                      Sign In
                    </button>
                  )}
                </div>

                <span className="font-sans font-semibold text-xs text-zariGold tracking-[0.25em] uppercase block mb-3 pb-2 border-b border-zariGold/20">
                  INFORMATION
                </span>
                <ul className="space-y-3">
                  {UTILITY_LINKS.map((item) => (
                    <motion.li key={item.name} variants={linkItemVariant}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="text-sm sm:text-base font-sans font-medium text-ivory/80 hover:text-zariGold transition-colors block py-0.5"
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Editorial Feature Image */}
              <div className="relative h-[140px] sm:h-[180px] rounded-xl overflow-hidden border border-zariGold/30 hidden sm:block">
                <Image
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=800"
                  alt="The Girls Collections Editorial"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inkNavy via-inkNavy/30 to-transparent p-4 flex flex-col justify-end">
                  <span className="eyebrow-text text-zariGold text-[10px] tracking-[0.25em]">
                    COUTURE EDIT 2026
                  </span>
                  <h4 className="text-base font-serif font-bold text-ivory">
                    Festive & Celebration Silhouettes
                  </h4>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Footer Bar */}
          <div className="w-full px-6 sm:px-12 py-3.5 border-t border-zariGold/20 flex items-center justify-between shrink-0 bg-inkNavy text-[11px] font-sans text-ivory/60 z-20">
            <span>© 2026 THE GIRLS COLLECTIONS · LUXURY FASHION</span>
            <span className="hidden sm:inline">COUTURE & FESTIVE WEAR</span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenMenu;
