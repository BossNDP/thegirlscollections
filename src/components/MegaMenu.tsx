'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, Sparkles, X } from 'lucide-react';
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
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
          {/* Column 1: Women's Traditional */}
          <div className="col-span-4 space-y-3 border-r border-roseGold/20 pr-6">
            <div className="flex items-center space-x-2 text-[11px] font-sans uppercase tracking-eyebrow text-roseGold font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Women Traditional</span>
            </div>
            <ul className="space-y-2">
              {traditional?.items.map((sub) => (
                <li key={sub.id}>
                  <Link
                    href={`/shop?category=${sub.slug}`}
                    onClick={onClose}
                    className="group flex items-center justify-between text-sm font-serif font-medium text-navy hover:text-roseGold transition-colors"
                  >
                    <span>{sub.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-roseGold/40 group-hover:text-roseGold group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Women's Frocks & Western */}
          <div className="col-span-4 space-y-3 border-r border-roseGold/20 pr-6">
            <div className="flex items-center space-x-2 text-[11px] font-sans uppercase tracking-eyebrow text-roseGold font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Frocks &amp; Western</span>
            </div>
            <ul className="space-y-1.5">
              {frocksWestern?.items.map((sub) => (
                <li key={sub.id}>
                  <Link
                    href={`/shop?category=${sub.slug}`}
                    onClick={onClose}
                    className="group flex items-center justify-between text-sm font-serif font-medium text-navy hover:text-roseGold transition-colors"
                  >
                    <span>{sub.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-roseGold/40 group-hover:text-roseGold group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured Story Banner */}
          <div className="col-span-4 pl-4 flex flex-col justify-between">
            <div className="relative h-56 w-full rounded-xl overflow-hidden shadow-md group">
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=600"
                alt="Women Couture Edit"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent p-5 flex flex-col justify-end">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-roseGold text-navy text-[9px] uppercase font-bold tracking-wider mb-1.5 w-max">
                  Handcrafted Luxury
                </span>
                <p className="text-sm font-serif font-semibold text-ivory leading-snug">
                  Explore Langa Davanis, Zari Gowns &amp; Flared Shararas
                </p>
              </div>
            </div>
            <Link
              href="/shop?target=women"
              onClick={onClose}
              className="mt-4 text-center py-2.5 rounded-full border border-navy text-xs uppercase font-semibold tracking-wider text-navy hover:bg-navy hover:text-ivory transition-all"
            >
              Shop All Women Collections
            </Link>
          </div>
        </div>
      );
    }

    if (activeCategory === 'kids') {
      const kidsData = CATEGORY_TAXONOMY.find((c) => c.id === 'kids');
      const kidsItems = kidsData?.groups[0]?.items || [];

      return (
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
          <div className="col-span-6 space-y-4 border-r border-roseGold/20 pr-6">
            <div className="flex items-center space-x-2 text-[11px] font-sans uppercase tracking-eyebrow text-roseGold font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kids Pure Silk Ethnic Wear</span>
            </div>
            <ul className="space-y-2.5">
              {kidsItems.map((sub) => (
                <li key={sub.id}>
                  <Link
                    href={`/shop?category=${sub.slug}`}
                    onClick={onClose}
                    className="group flex items-center justify-between text-base font-serif font-medium text-navy hover:text-roseGold transition-colors"
                  >
                    <div>
                      <span className="block">{sub.name}</span>
                      {sub.description && (
                        <span className="text-xs text-charcoal-muted font-sans font-normal">
                          {sub.description}
                        </span>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-roseGold/40 group-hover:text-roseGold group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 pl-4 flex flex-col justify-between">
            <div className="relative h-56 w-full rounded-xl overflow-hidden shadow-md group">
              <Image
                src="https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&q=85&w=800"
                alt="Kids Pattu Frocks"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent p-5 flex flex-col justify-end">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-roseGold text-navy text-[9px] uppercase font-bold tracking-wider mb-1.5 w-max">
                  Little Royalty
                </span>
                <p className="text-sm font-serif font-semibold text-ivory leading-snug">
                  Pure Kanjeevaram Pattu Frocks with Non-Scratchy Cotton Lining
                </p>
              </div>
            </div>
            <Link
              href="/shop?target=kids"
              onClick={onClose}
              className="mt-4 text-center py-2.5 rounded-full border border-navy text-xs uppercase font-semibold tracking-wider text-navy hover:bg-navy hover:text-ivory transition-all"
            >
              Shop All Kids Ethnic Wear
            </Link>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {/* Opaque Dimming Backdrop Overlay (z-55) so background content never bleeds through */}
      <div
        onClick={onClose}
        className="fixed inset-0 top-20 bg-navy/40 backdrop-blur-xs z-[55] pointer-events-auto transition-opacity duration-300"
      />

      {/* Solid Elevated Dropdown Panel (z-60) */}
      <div
        onMouseLeave={onClose}
        className="absolute top-full left-0 w-full bg-ivory border-b border-roseGold/30 shadow-2xl z-[60] animate-fade-in text-charcoal py-8 px-8"
      >
        {renderContent()}
      </div>
    </>
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
          {/* Smooth Dimming Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[75] bg-navy/60 backdrop-blur-xs"
          />

          {/* Smooth Sliding Mobile Navigation Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 left-0 w-full max-w-[340px] sm:max-w-[400px] z-[80] bg-navy text-ivory flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Top Header with Prominent Cross Mark (X) Close Button */}
            <div className="p-4 border-b border-roseGold/20 flex items-center justify-between bg-navy shrink-0">
              {selectedMain ? (
                <button
                  onClick={() => setSelectedMain(null)}
                  className="flex items-center text-xs font-semibold uppercase tracking-[0.14em] text-roseGold hover:text-ivory transition-colors min-h-[44px]"
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  Back to Categories
                </button>
              ) : (
                <span className="text-xs uppercase tracking-[0.18em] font-semibold text-roseGold">
                  THE GIRLS COLLECTION
                </span>
              )}

              {/* Prominent Cross Mark (X) Button */}
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-roseGold hover:text-navy text-ivory flex items-center justify-center transition-all duration-300 focus:outline-none"
                aria-label="Close Navigation Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Drawer Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {!selectedMain ? (
                <div className="space-y-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-roseGold font-medium">
                    Explore Collections
                  </p>
                  <div className="divide-y divide-roseGold/10">
                    <button
                      onClick={() => setSelectedMain('women')}
                      className="w-full py-4 flex items-center justify-between text-left group min-h-[44px]"
                    >
                      <span className="text-xl font-serif font-bold text-ivory group-hover:text-roseGold transition-colors">
                        Women
                      </span>
                      <ChevronRight className="w-5 h-5 text-roseGold" />
                    </button>

                    <button
                      onClick={() => setSelectedMain('kids')}
                      className="w-full py-4 flex items-center justify-between text-left group min-h-[44px]"
                    >
                      <span className="text-xl font-serif font-bold text-ivory group-hover:text-roseGold transition-colors">
                        Kids Ethnic
                      </span>
                      <ChevronRight className="w-5 h-5 text-roseGold" />
                    </button>

                    <Link
                      href="/shop?isNew=true"
                      onClick={onClose}
                      className="block py-4 text-xl font-serif font-bold text-ivory hover:text-roseGold transition-colors min-h-[44px]"
                    >
                      New Arrivals
                    </Link>

                    <Link
                      href="/shop?occasion=Festive"
                      onClick={onClose}
                      className="block py-4 text-xl font-serif font-bold text-ivory hover:text-roseGold transition-colors min-h-[44px]"
                    >
                      Festive Edit
                    </Link>

                    <Link
                      href="/shop?isSale=true"
                      onClick={onClose}
                      className="block py-4 text-xl font-serif font-bold text-blush hover:text-roseGold transition-colors min-h-[44px]"
                    >
                      Sale
                    </Link>

                    <Link
                      href="/#discover-brand-world"
                      onClick={onClose}
                      className="block py-4 text-xl font-serif font-bold text-ivory hover:text-roseGold transition-colors min-h-[44px]"
                    >
                      Discover Brand World
                    </Link>
                  </div>
                </div>
              ) : selectedMain === 'women' ? (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-2xl font-serif font-bold text-ivory">Women&apos;s Collection</h3>

                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-roseGold font-medium mb-3">
                      Traditional
                    </p>
                    {CATEGORY_TAXONOMY.find((c) => c.id === 'women')?.groups.find((g) => g.id === 'women-traditional')?.items.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/shop?category=${sub.slug}`}
                        onClick={onClose}
                        className="block py-3 text-lg font-serif text-ivory/90 hover:text-roseGold border-b border-roseGold/10"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-roseGold font-medium mb-3">
                      Frocks &amp; Western
                    </p>
                    {CATEGORY_TAXONOMY.find((c) => c.id === 'women')?.groups.find((g) => g.id === 'women-frocks-western')?.items.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/shop?category=${sub.slug}`}
                        onClick={onClose}
                        className="block py-3 text-lg font-serif text-ivory/90 hover:text-roseGold border-b border-roseGold/10"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-5 animate-fade-in">
                  <h3 className="text-2xl font-serif font-bold text-ivory">Kids Ethnic Collection</h3>
                  {CATEGORY_TAXONOMY.find((c) => c.id === 'kids')?.groups[0]?.items.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/shop?category=${sub.slug}`}
                      onClick={onClose}
                      className="block py-3.5 text-lg font-serif text-ivory/90 hover:text-roseGold border-b border-roseGold/10"
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
