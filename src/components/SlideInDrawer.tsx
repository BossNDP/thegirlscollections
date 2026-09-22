'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ArrowRight, MessageCircle, Package, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WOMEN_CATEGORIES, KIDS_CATEGORIES, getCategoryHref, CategoryItem } from '@/data/categoryTaxonomy';
import { useAuthSession } from '@/context/AuthContext';

interface SlideInDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const EDITORIAL_TABS = [
  { id: 'new', label: 'NEW DROPS', href: '/shop?isNew=true' },
  { id: 'bestsellers', label: 'BEST SELLERS', href: '/shop?sort=popular' },
  { id: 'trending', label: 'TRENDING', href: '/shop?tag=trending' },
  { id: 'women', label: "WOMEN'S EDIT", href: '/shop?target=women' },
  { id: 'kids', label: 'KIDS ROYALTY', href: '/shop?target=kids' },
];

export const SlideInDrawer: React.FC<SlideInDrawerProps> = ({ isOpen, onClose }) => {
  const { user, isSignedIn, openAuthModal } = useAuthSession();
  const [activeTab, setActiveTab] = useState<string>('new');

  const womenFeatured = WOMEN_CATEGORIES.filter((c) => c.featured);
  const womenSubCategories = WOMEN_CATEGORIES.filter((c) => !c.featured);

  const kidsFeatured = KIDS_CATEGORIES.filter((c) => c.featured);
  const kidsSubCategories = KIDS_CATEGORIES.filter((c) => !c.featured);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[140] bg-inkNavy/60 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />

          {/* Slide-In Left Panel */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 32 }}
            className="fixed inset-y-0 left-0 z-[150] w-[90vw] max-w-[400px] sm:max-w-[440px] bg-ivory text-inkNavy border-r border-zariGold/30 shadow-2xl flex flex-col justify-between overflow-hidden"
            role="dialog"
            aria-label="Navigation Menu"
          >
            {/* Header Lockup (Clean & Quiet) */}
            <div className="px-5 py-4 border-b border-zariGold/20 flex items-center justify-between bg-sand/30 shrink-0">
              <Link href="/" onClick={onClose} className="flex items-center gap-3 group">
                <Image
                  src="/logo.png"
                  alt="The Girls Collections Emblem"
                  width={38}
                  height={42}
                  className="h-8.5 w-auto object-contain filter drop-shadow-xs group-hover:scale-105 transition-transform"
                />
                <div>
                  <span className="block font-serif text-sm font-bold tracking-[0.18em] uppercase text-inkNavy leading-none">
                    THE GIRLS
                  </span>
                  <span className="block font-sans text-[9px] font-bold tracking-[0.35em] uppercase text-zariGold mt-0.5">
                    COLLECTIONS
                  </span>
                </div>
              </Link>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center text-inkNavy/70 hover:text-inkNavy hover:bg-zariGold/15 transition-colors cursor-pointer focus:outline-none"
                aria-label="Close Navigation Menu"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* EDITORIAL TEXT-ONLY TAB BAR (No Emoji Icons, High-Fashion Underline) */}
            <div className="px-4 pt-3 pb-1 border-b border-zariGold/15 shrink-0 bg-ivory">
              <div className="flex items-center gap-5 overflow-x-auto no-scrollbar pb-2">
                {EDITORIAL_TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <Link
                      key={tab.id}
                      href={tab.href}
                      onClick={(e) => {
                        setActiveTab(tab.id);
                        onClose();
                      }}
                      className={`relative shrink-0 font-sans text-[11px] sm:text-xs font-bold tracking-[0.24em] uppercase transition-colors duration-200 py-1 min-h-[38px] flex items-center ${
                        isActive ? 'text-inkNavy font-extrabold' : 'text-inkNavy/60 hover:text-inkNavy'
                      }`}
                    >
                      <span>{tab.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="drawerTabUnderline"
                          className="absolute bottom-0 inset-x-0 h-[2px] bg-zariGold"
                          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Menu Body Scroll Track with Full-Bleed Photo Cards */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-7 no-scrollbar">
              
              {/* SECTION 1: WOMEN'S COUTURE EDITS */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between border-b border-zariGold/20 pb-2">
                  <span className="font-serif text-sm font-bold uppercase tracking-[0.22em] text-zariGold">
                    WOMEN&apos;S COUTURE EDITS
                  </span>
                  <span className="font-sans text-[10px] font-bold text-inkNavy/50 tracking-wider">
                    {WOMEN_CATEGORIES.length} CATEGORIES
                  </span>
                </div>

                {/* Primary Full-Width Photo Hero Cards */}
                <div className="space-y-3">
                  {womenFeatured.map((cat, idx) => {
                    const cutoutPath = `/categories/cutouts/${cat.slug}.webp`;
                    return (
                      <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: idx * 0.05 }}
                      >
                        <Link
                          href={getCategoryHref(cat)}
                          onClick={onClose}
                          className="group relative block w-full h-[120px] rounded-xl overflow-hidden border border-zariGold/30 shadow-xs bg-gradient-to-r from-inkNavy via-[#1F223D] to-inkNavy select-none"
                        >
                          {/* Cutout / Model Image */}
                          <div className="absolute right-2 top-0 bottom-0 w-[140px] pointer-events-none z-0">
                            <Image
                              src={cutoutPath}
                              alt={cat.name}
                              fill
                              sizes="140px"
                              className="object-contain object-right-bottom drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>

                          {/* Soft Gradient Overlay for Text Legibility */}
                          <div className="absolute inset-0 bg-gradient-to-r from-inkNavy/95 via-inkNavy/70 to-transparent z-10 p-4 flex flex-col justify-between" />

                          {/* Card Content Overlay */}
                          <div className="relative z-20 h-full flex flex-col justify-between p-4 text-ivory pointer-events-none">
                            <span className="font-sans text-[9.5px] font-bold tracking-[0.22em] uppercase text-zariGold">
                              HANDCRAFTED COUTURE
                            </span>
                            <div className="flex items-end justify-between">
                              <div>
                                <h3 className="font-serif text-base sm:text-lg font-bold text-ivory group-hover:text-zariGold transition-colors tracking-wide leading-tight">
                                  {cat.name}
                                </h3>
                                {cat.description && (
                                  <p className="font-sans text-[10.5px] text-ivory/70 line-clamp-1 mt-0.5 max-w-[200px]">
                                    {cat.description}
                                  </p>
                                )}
                              </div>
                              <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-zariGold group-hover:text-inkNavy transition-all flex items-center justify-center text-ivory shrink-0">
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform stroke-[1.8]" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* 2-Column Grid for Sub-categories */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  {womenSubCategories.map((cat, idx) => (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: (womenFeatured.length + idx) * 0.04 }}
                    >
                      <Link
                        href={getCategoryHref(cat)}
                        onClick={onClose}
                        className="group relative block w-full h-[84px] rounded-lg overflow-hidden border border-zariGold/20 bg-sand/40 p-3 flex flex-col justify-between hover:border-zariGold/60 hover:bg-zariGold/10 transition-all select-none"
                      >
                        <span className="font-sans text-[9px] font-bold text-zariGold tracking-widest uppercase">
                          LADIES
                        </span>
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-xs font-bold text-inkNavy group-hover:text-zariGold transition-colors line-clamp-2 leading-snug pr-1">
                            {cat.name}
                          </h4>
                          <ArrowRight className="w-3.5 h-3.5 text-zariGold opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* SECTION 2: LITTLE ROYALTY KIDS */}
              <div className="space-y-3.5 pt-2">
                <div className="flex items-center justify-between border-b border-zariGold/20 pb-2">
                  <span className="font-serif text-sm font-bold uppercase tracking-[0.22em] text-zariGold">
                    LITTLE ROYALTY KIDS
                  </span>
                  <span className="font-sans text-[10px] font-bold text-inkNavy/50 tracking-wider">
                    {KIDS_CATEGORIES.length} CATEGORIES
                  </span>
                </div>

                {/* Primary Full-Width Photo Hero Cards */}
                <div className="space-y-3">
                  {kidsFeatured.map((cat, idx) => {
                    const cutoutPath = `/categories/cutouts/${cat.slug}.webp`;
                    return (
                      <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: idx * 0.05 }}
                      >
                        <Link
                          href={getCategoryHref(cat)}
                          onClick={onClose}
                          className="group relative block w-full h-[120px] rounded-xl overflow-hidden border border-zariGold/30 shadow-xs bg-gradient-to-r from-[#20172B] via-[#35254A] to-[#20172B] select-none"
                        >
                          {/* Cutout Image */}
                          <div className="absolute right-2 top-0 bottom-0 w-[140px] pointer-events-none z-0">
                            <Image
                              src={cutoutPath}
                              alt={cat.name}
                              fill
                              sizes="140px"
                              className="object-contain object-right-bottom drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>

                          {/* Soft Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-r from-[#20172B]/95 via-[#20172B]/75 to-transparent z-10 p-4 flex flex-col justify-between" />

                          {/* Card Content Overlay */}
                          <div className="relative z-20 h-full flex flex-col justify-between p-4 text-ivory pointer-events-none">
                            <span className="font-sans text-[9.5px] font-bold tracking-[0.22em] uppercase text-zariGold">
                              KIDS FESTIVE WEAR
                            </span>
                            <div className="flex items-end justify-between">
                              <div>
                                <h3 className="font-serif text-base sm:text-lg font-bold text-ivory group-hover:text-zariGold transition-colors tracking-wide leading-tight">
                                  {cat.name}
                                </h3>
                                {cat.description && (
                                  <p className="font-sans text-[10.5px] text-ivory/70 line-clamp-1 mt-0.5 max-w-[200px]">
                                    {cat.description}
                                  </p>
                                )}
                              </div>
                              <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-zariGold group-hover:text-inkNavy transition-all flex items-center justify-center text-ivory shrink-0">
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform stroke-[1.8]" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* 2-Column Grid for Kids Sub-categories */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  {kidsSubCategories.map((cat, idx) => (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: (kidsFeatured.length + idx) * 0.04 }}
                    >
                      <Link
                        href={getCategoryHref(cat)}
                        onClick={onClose}
                        className="group relative block w-full h-[84px] rounded-lg overflow-hidden border border-zariGold/20 bg-sand/40 p-3 flex flex-col justify-between hover:border-zariGold/60 hover:bg-zariGold/10 transition-all select-none"
                      >
                        <span className="font-sans text-[9px] font-bold text-zariGold tracking-widest uppercase">
                          KIDS
                        </span>
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-xs font-bold text-inkNavy group-hover:text-zariGold transition-colors line-clamp-2 leading-snug pr-1">
                            {cat.name}
                          </h4>
                          <ArrowRight className="w-3.5 h-3.5 text-zariGold opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* SECTION 3: ACCOUNT & CONCIERGE SUPPORT FOOTER */}
              <div className="pt-4 border-t border-zariGold/20 space-y-2">
                <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-zariGold mb-1">
                  ACCOUNT & SUPPORT
                </span>

                {isSignedIn ? (
                  <Link
                    href="/account/orders"
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 rounded-xl bg-sand/40 hover:bg-zariGold/15 text-xs font-sans text-inkNavy font-semibold transition-colors min-h-[44px]"
                  >
                    <User className="w-4 h-4 text-zariGold stroke-[1.5]" />
                    <span>My Account ({user?.name || 'Valued Member'})</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      onClose();
                      openAuthModal('google');
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-sand/40 hover:bg-zariGold/15 text-xs font-sans text-inkNavy font-semibold transition-colors cursor-pointer min-h-[44px]"
                  >
                    <User className="w-4 h-4 text-zariGold stroke-[1.5]" />
                    <span>Sign In / Register Account</span>
                  </button>
                )}

                <Link
                  href="/track"
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-zariGold/10 text-xs font-sans text-inkNavy font-medium transition-colors min-h-[44px]"
                >
                  <Package className="w-4 h-4 text-zariGold stroke-[1.5]" />
                  <span>Track Order Status</span>
                </Link>

                <a
                  href="https://wa.me/917483848505"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 text-xs font-sans text-emerald-900 font-medium transition-colors min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-700 stroke-[1.5]" />
                  <span>WhatsApp Concierge Support</span>
                </a>
              </div>

            </div>

            {/* Bottom Footer */}
            <div className="p-4 border-t border-zariGold/20 bg-sand/20 text-center shrink-0">
              <p className="text-[10px] font-sans text-inkNavy/60 uppercase tracking-widest">
                The Girls Collections © 2026 • Artisanal Ethnic Wear
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default SlideInDrawer;
