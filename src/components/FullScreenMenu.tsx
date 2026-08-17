'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import BrandLogo from '@/components/BrandLogo';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHOP_CATEGORIES = [
  { name: 'Kanjeevaram Silk Sarees', href: '/shop?category=sarees', count: '48 items' },
  { name: 'Kids Pure Silk Pattu', href: '/shop?category=pattu-frocks', count: '32 items' },
  { name: 'Organza & Chanderi Weaves', href: '/shop?category=organza-sarees', count: '24 items' },
  { name: 'Bridal Zari Lehengas', href: '/shop?category=lehengas', count: '18 items' },
  { name: 'Designer Zari Gowns', href: '/shop?category=gowns', count: '15 items' },
];

const THE_EDITS = [
  { name: 'Bridal & Wedding Edit', href: '/shop?collection=wedding' },
  { name: 'Festive Celebration Edit', href: '/shop?collection=festive' },
  { name: 'Royal Atelier Handlooms', href: '/shop?collection=atelier' },
  { name: 'New Arrivals 2026', href: '/shop?sort=newest' },
  { name: 'Bestsellers', href: '/shop?sort=popular' },
];

const DISCOVER_LINKS = [
  { name: 'Our Heritage & Craftsmanship', href: '/about' },
  { name: 'Girls Journal & Stories', href: '/journal' },
  { name: 'Personal Stylist Service', href: '/stylist' },
  { name: 'Customer Care & FAQ', href: '/contact' },
];

const easeCurve = [0.16, 1, 0.3, 1] as const;

// Motion Variants for Staggered Entrance
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.2 } },
};

const panelVariants: Variants = {
  hidden: { y: '-100%' },
  visible: { y: '0%', transition: { duration: 0.45, ease: easeCurve } },
  exit: { y: '-100%', transition: { duration: 0.35, ease: easeCurve } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
};

const linkItemVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: easeCurve } },
};

export const FullScreenMenu: React.FC<FullScreenMenuProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[110] bg-inkNavy text-ivory flex flex-col justify-between overflow-hidden"
        >
          {/* Top Bar Header */}
          <div className="w-full px-6 sm:px-12 py-6 border-b border-zariGold/20 flex items-center justify-between shrink-0 bg-inkNavy z-20">
            <Link href="/" onClick={onClose}>
              <BrandLogo variant="horizontal" size="md" />
            </Link>

            <button
              onClick={onClose}
              className="w-11 h-11 rounded-full bg-ivory/10 border border-zariGold/30 flex items-center justify-center text-ivory hover:bg-zariGold hover:text-white transition-all duration-300"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Body (Mobile single column, Desktop 2-column + Editorial Image Panel) */}
          <motion.div
            variants={panelVariants}
            className="flex-1 overflow-y-auto w-full max-w-[1440px] mx-auto px-6 sm:px-12 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
          >
            {/* Left Column: SHOP CATEGORIES */}
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="lg:col-span-4">
              <span className="font-sans font-semibold text-xs text-zariGold tracking-[0.25em] uppercase block mb-4 pb-2 border-b border-zariGold/20">
                SHOP TAXONOMY
              </span>
              <ul className="space-y-3 sm:space-y-4">
                {SHOP_CATEGORIES.map((item) => (
                  <motion.li key={item.name} variants={linkItemVariant}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center justify-between py-1 text-2xl sm:text-3xl font-serif font-bold text-ivory hover:text-zariGold transition-colors"
                    >
                      <span>{item.name}</span>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-zariGold" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right Column: THE EDITS & DISCOVER */}
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="lg:col-span-4 flex flex-col justify-between gap-8">
              <div>
                <span className="font-sans font-semibold text-xs text-zariGold tracking-[0.25em] uppercase block mb-4 pb-2 border-b border-zariGold/20">
                  THE EDITS
                </span>
                <ul className="space-y-2 sm:space-y-3">
                  {THE_EDITS.map((item) => (
                    <motion.li key={item.name} variants={linkItemVariant}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="text-lg sm:text-xl font-serif font-semibold text-ivory/90 hover:text-zariGold transition-colors block py-0.5"
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-sans font-semibold text-xs text-zariGold tracking-[0.25em] uppercase block mb-3 pb-2 border-b border-zariGold/20">
                  DISCOVER
                </span>
                <ul className="space-y-2">
                  {DISCOVER_LINKS.map((item) => (
                    <motion.li key={item.name} variants={linkItemVariant}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="text-xs sm:text-sm font-sans font-medium text-ivory/70 hover:text-zariGold transition-colors block py-0.5"
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Desktop 3rd Column: Editorial Image Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.25, duration: 0.5 } }}
              className="hidden lg:block lg:col-span-4 relative h-full min-h-[400px] rounded-2xl overflow-hidden border border-zariGold/30 shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=800"
                alt="Editorial Royal Heritage Campaign"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inkNavy via-transparent to-transparent p-8 flex flex-col justify-end">
                <span className="eyebrow-text text-zariGold text-xs tracking-[0.25em] mb-1">
                  ATELIER CAMPAIGN 2026
                </span>
                <h4 className="text-2xl font-serif font-bold text-ivory leading-tight">
                  The Royal Kanjeevaram Bridal Edit
                </h4>
              </div>
            </motion.div>
          </motion.div>

          {/* Footer Bar */}
          <div className="w-full px-6 sm:px-12 py-4 border-t border-zariGold/20 flex items-center justify-between shrink-0 bg-inkNavy text-xs font-sans text-ivory/60">
            <span>© 2026 THE GIRLS COLLECTION · LUXURY ETHNIC WEAR</span>
            <span className="hidden sm:inline">HANDCRAFTED IN INDIA</span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenMenu;
