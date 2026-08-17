'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORY_TAXONOMY } from '@/data/categoryTaxonomy';

interface MegaMenuProps {
  activeCategory: string | null;
  onClose: () => void;
}

export const DesktopMegaMenu: React.FC<MegaMenuProps> = ({ activeCategory, onClose }) => {
  if (!activeCategory) return null;

  const renderContent = () => {
    if (activeCategory === 'women') {
      const womenData = CATEGORY_TAXONOMY.find((c) => c.id === 'women');
      const traditional = womenData?.groups.find((g) => g.id === 'women-traditional');
      const frocksWestern = womenData?.groups.find((g) => g.id === 'women-frocks-western');

      return (
        <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-8 px-8 py-6">
          {/* Column 1: Women's Traditional */}
          <div className="col-span-4 space-y-4 border-r border-sand pr-8">
            <div className="space-y-1">
              <span className="eyebrow-text">Category Spotlight</span>
              <h4 className="text-xl font-serif font-semibold text-inkNavy">Women Traditional</h4>
              <div className="w-10 h-[1.5px] bg-gold-gradient rounded-full" />
            </div>
            <ul className="space-y-1 pt-2">
              {traditional?.items.map((sub) => (
                <li key={sub.id}>
                  <Link
                    href={`/shop?category=${sub.slug}`}
                    onClick={onClose}
                    className="group flex items-center justify-between py-2 text-sm font-sans font-medium text-inkNavy/85 hover:text-zariGold transition-colors"
                  >
                    <span>{sub.name}</span>
                    <ChevronRight className="w-4 h-4 text-zariGold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Frocks & Western */}
          <div className="col-span-4 space-y-4 border-r border-sand pr-8">
            <div className="space-y-1">
              <span className="eyebrow-text">Contemporary Couture</span>
              <h4 className="text-xl font-serif font-semibold text-inkNavy">Frocks &amp; Western</h4>
              <div className="w-10 h-[1.5px] bg-gold-gradient rounded-full" />
            </div>
            <ul className="space-y-1 pt-2">
              {frocksWestern?.items.map((sub) => (
                <li key={sub.id}>
                  <Link
                    href={`/shop?category=${sub.slug}`}
                    onClick={onClose}
                    className="group flex items-center justify-between py-2 text-sm font-sans font-medium text-inkNavy/85 hover:text-zariGold transition-colors"
                  >
                    <span>{sub.name}</span>
                    <ChevronRight className="w-4 h-4 text-zariGold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Lookbook Image Card + Evocative Copy */}
          <div className="col-span-4 pl-4 flex flex-col justify-between">
            <div className="relative h-64 w-full rounded-[2px] overflow-hidden group bg-sand/50">
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=600"
                alt="Women Royal Edit"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nearBlack/85 via-nearBlack/30 to-transparent p-6 flex flex-col justify-end">
                <span className="eyebrow-text text-zariGoldLight mb-1">Editorial Lookbook</span>
                <p className="text-lg font-serif font-semibold text-ivory leading-snug">
                  The Royal Heritage Pallu Edit &amp; Zari Gowns
                </p>
                <p className="text-xs text-ivory/70 font-sans mt-1">
                  Intricate zari weaves designed for celebratory grand moments.
                </p>
              </div>
            </div>
            <Link
              href="/shop?target=women"
              onClick={onClose}
              className="mt-4 text-center py-3 rounded-[2px] btn-gold-gradient text-xs uppercase tracking-[0.2em] font-semibold"
            >
              Explore Women Collection
            </Link>
          </div>
        </div>
      );
    }

    if (activeCategory === 'kids') {
      const kidsData = CATEGORY_TAXONOMY.find((c) => c.id === 'kids');
      const kidsItems = kidsData?.groups[0]?.items || [];

      return (
        <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-8 px-8 py-6">
          <div className="col-span-8 space-y-4 border-r border-sand pr-8">
            <div className="space-y-1">
              <span className="eyebrow-text">Little Royalty</span>
              <h4 className="text-xl font-serif font-semibold text-inkNavy">Kids Pure Silk Ethnic Wear</h4>
              <div className="w-10 h-[1.5px] bg-gold-gradient rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              {kidsItems.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/shop?category=${sub.slug}`}
                  onClick={onClose}
                  className="group p-3 rounded-[2px] bg-sand/30 hover:bg-sand/60 transition-colors border border-zariGold/10"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-serif font-semibold text-inkNavy group-hover:text-zariGold transition-colors">
                      {sub.name}
                    </span>
                    <ChevronRight className="w-4 h-4 text-zariGold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {sub.description && (
                    <p className="text-xs text-inkNavy/60 font-sans mt-1 line-clamp-1">
                      {sub.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-4 pl-4 flex flex-col justify-between">
            <div className="relative h-64 w-full rounded-[2px] overflow-hidden group bg-sand/50">
              <Image
                src="https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&q=85&w=800"
                alt="Kids Pattu Frocks"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nearBlack/85 via-nearBlack/30 to-transparent p-6 flex flex-col justify-end">
                <span className="eyebrow-text text-zariGoldLight mb-1">Signature Craft</span>
                <p className="text-lg font-serif font-semibold text-ivory leading-snug">
                  Pure Kanjeevaram Silk Pattu Frocks
                </p>
                <p className="text-xs text-ivory/70 font-sans mt-1">
                  Gentle non-scratchy pure cotton lining for delicate skin.
                </p>
              </div>
            </div>
            <Link
              href="/shop?target=kids"
              onClick={onClose}
              className="mt-4 text-center py-3 rounded-[2px] btn-gold-gradient text-xs uppercase tracking-[0.2em] font-semibold"
            >
              Explore Kids Collection
            </Link>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-ivory border-b border-zariGold/20 shadow-[0_20px_50px_rgba(28,31,59,0.12)] z-[60] text-inkNavy"
    >
      {renderContent()}
    </div>
  );
};

export const MobileMegaMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [selectedMain, setSelectedMain] = React.useState<'women' | 'kids' | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[75] bg-nearBlack/70 backdrop-blur-xs"
          />

          {/* Full-Screen Drawer Navigation */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="fixed inset-y-0 left-0 w-full max-w-[380px] z-[80] bg-inkNavy text-ivory flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-zariGold/20 flex items-center justify-between bg-inkNavy shrink-0">
              {selectedMain ? (
                <button
                  onClick={() => setSelectedMain(null)}
                  className="flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-zariGold hover:text-ivory transition-colors min-h-[48px]"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
              ) : (
                <span className="eyebrow-text text-zariGold">
                  THE GIRLS COLLECTIONS
                </span>
              )}

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-zariGold hover:text-inkNavy text-ivory flex items-center justify-center transition-all focus:outline-none"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Categories */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {!selectedMain ? (
                <div className="space-y-4">
                  <span className="eyebrow-text text-zariGoldLight">COLLECTIONS</span>
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => setSelectedMain('women')}
                      className="w-full py-4 border-b border-zariGold/15 flex items-center justify-between text-left group min-h-[48px]"
                    >
                      <span className="text-2xl font-serif font-bold text-ivory group-hover:text-zariGold transition-colors">
                        Women Ethnic
                      </span>
                      <ChevronRight className="w-5 h-5 text-zariGold" />
                    </button>

                    <button
                      onClick={() => setSelectedMain('kids')}
                      className="w-full py-4 border-b border-zariGold/15 flex items-center justify-between text-left group min-h-[48px]"
                    >
                      <span className="text-2xl font-serif font-bold text-ivory group-hover:text-zariGold transition-colors">
                        Kids Ethnic
                      </span>
                      <ChevronRight className="w-5 h-5 text-zariGold" />
                    </button>

                    <Link
                      href="/shop?isNew=true"
                      onClick={onClose}
                      className="block py-4 border-b border-zariGold/15 text-2xl font-serif font-bold text-ivory hover:text-zariGold transition-colors min-h-[48px]"
                    >
                      New Arrivals
                    </Link>

                    <Link
                      href="/shop?occasion=Festive"
                      onClick={onClose}
                      className="block py-4 border-b border-zariGold/15 text-2xl font-serif font-bold text-ivory hover:text-zariGold transition-colors min-h-[48px]"
                    >
                      Festive Edit
                    </Link>

                    <Link
                      href="/shop?isSale=true"
                      onClick={onClose}
                      className="block py-4 border-b border-zariGold/15 text-2xl font-serif font-bold text-oxblood hover:text-zariGold transition-colors min-h-[48px]"
                    >
                      Sale Spotlight
                    </Link>
                  </div>
                </div>
              ) : selectedMain === 'women' ? (
                <div className="space-y-6">
                  <h3 className="text-2xl font-serif font-bold text-ivory">Women&apos;s Wear</h3>

                  <div className="space-y-3">
                    <span className="eyebrow-text text-zariGold">Traditional</span>
                    {CATEGORY_TAXONOMY.find((c) => c.id === 'women')?.groups.find((g) => g.id === 'women-traditional')?.items.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/shop?category=${sub.slug}`}
                        onClick={onClose}
                        className="block py-3 text-lg font-serif text-ivory/90 hover:text-zariGold border-b border-zariGold/10 min-h-[48px]"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-3 pt-4">
                    <span className="eyebrow-text text-zariGold">Frocks &amp; Western</span>
                    {CATEGORY_TAXONOMY.find((c) => c.id === 'women')?.groups.find((g) => g.id === 'women-frocks-western')?.items.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/shop?category=${sub.slug}`}
                        onClick={onClose}
                        className="block py-3 text-lg font-serif text-ivory/90 hover:text-zariGold border-b border-zariGold/10 min-h-[48px]"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-ivory">Kids Ethnic</h3>
                  {CATEGORY_TAXONOMY.find((c) => c.id === 'kids')?.groups[0]?.items.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/shop?category=${sub.slug}`}
                      onClick={onClose}
                      className="block py-3 text-lg font-serif text-ivory/90 hover:text-zariGold border-b border-zariGold/10 min-h-[48px]"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
