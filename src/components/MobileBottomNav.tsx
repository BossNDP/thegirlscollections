'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Heart, ShoppingBag, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useShop } from '@/context/ShopContext';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { cartCount, wishlist, setIsCartOpen } = useShop();
  const shouldReduceMotion = useReducedMotion();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBagBurst, setShowBagBurst] = useState(false);
  const [activeSheenTab, setActiveSheenTab] = useState<string | null>(null);

  const prevCartCountRef = useRef(cartCount);

  // Trigger add-to-bag celebration burst
  useEffect(() => {
    if (cartCount > prevCartCountRef.current) {
      setShowBagBurst(true);
      const timer = setTimeout(() => setShowBagBurst(false), 450);
      prevCartCountRef.current = cartCount;
      return () => clearTimeout(timer);
    }
    prevCartCountRef.current = cartCount;
  }, [cartCount]);

  // Listen for custom menu events
  useEffect(() => {
    const handleOpenMenu = () => setIsMenuOpen(true);
    const handleCloseMenu = () => setIsMenuOpen(false);

    window.addEventListener('open-category-menu', handleOpenMenu);
    window.addEventListener('close-category-menu', handleCloseMenu);

    return () => {
      window.removeEventListener('open-category-menu', handleOpenMenu);
      window.removeEventListener('close-category-menu', handleCloseMenu);
    };
  }, []);

  const isExcluded = pathname?.startsWith('/admin') || pathname === '/checkout';
  if (isExcluded) return null;

  const wishlistCount = wishlist.length;

  const handleToggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isMenuOpen) {
      setIsMenuOpen(false);
      window.dispatchEvent(new CustomEvent('close-category-menu'));
    } else {
      setIsMenuOpen(true);
      window.dispatchEvent(new CustomEvent('open-category-menu'));
    }
  };

  const triggerSheen = (tabId: string) => {
    if (shouldReduceMotion) return;
    setActiveSheenTab(tabId);
    setTimeout(() => setActiveSheenTab(null), 200);
  };

  // Nav Items array: HOME | SHOP | MENU (center) | WISHLIST | BAG
  const allTabs = [
    {
      id: 'home',
      label: 'HOME',
      href: '/',
      icon: Home,
      isActive: pathname === '/' && !isMenuOpen,
    },
    {
      id: 'shop',
      label: 'SHOP',
      href: '/shop',
      icon: LayoutGrid,
      isActive: (pathname === '/shop' || pathname?.startsWith('/shop/')) && !isMenuOpen,
    },
    {
      id: 'menu',
      label: 'MENU',
      isCenterMenu: true,
      isActive: isMenuOpen,
    },
    {
      id: 'wishlist',
      label: 'WISHLIST',
      href: '/wishlist',
      icon: Heart,
      badge: wishlistCount,
      isActive: pathname === '/wishlist' && !isMenuOpen,
    },
    {
      id: 'bag',
      label: 'BAG',
      href: '#bag',
      icon: ShoppingBag,
      badge: cartCount,
      isActive: false,
      isBagButton: true,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setIsCartOpen(true);
        triggerSheen('bag');
      },
    },
  ];

  const springTransition = shouldReduceMotion
    ? { duration: 0.15 }
    : ({ type: 'spring', stiffness: 300, damping: 30 } as const);

  return (
    <nav
      className="fixed bottom-[calc(12px+env(safe-area-inset-bottom))] inset-x-0 z-[90] md:hidden px-3 max-w-[390px] mx-auto select-none pointer-events-auto"
      aria-label="Bottom Navigation"
    >
      {/* SVG SCALLOPED NECKLACE/PENDANT DOCK CONTAINER */}
      <div className="relative w-full h-[64px] flex items-center justify-between px-2">
        {/* SVG Background Path with Arch Scallop Notch */}
        <svg
          className="absolute inset-0 w-full h-full filter drop-shadow-[0_12px_32px_rgba(28,31,59,0.18)]"
          viewBox="0 0 364 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M 28 0 
               L 142 0 
               C 152 0, 156 12, 164 18 
               C 172 24, 192 24, 200 18 
               C 208 12, 212 0, 222 0 
               L 336 0 
               C 351.468 0, 364 12.532, 364 28 
               L 364 36 
               C 364 51.468, 351.468 64, 336 64 
               L 28 64 
               C 12.532 64, 0 51.468, 0 36 
               L 0 28 
               C 0 12.532, 12.532 0, 28 0 Z"
            fill="#FAF5EA"
            fillOpacity="0.96"
            stroke="#B4863C"
            strokeWidth="1.2"
            strokeOpacity="0.35"
          />
        </svg>

        {/* NAV TAB ITEMS */}
        <div className="relative z-10 w-full h-full flex items-center justify-between px-1">
          {allTabs.map((tab) => {
            // CENTER MENU BUTTON
            if (tab.isCenterMenu) {
              return (
                <div key={tab.id} className="relative shrink-0 -mt-5 px-1 z-30">
                  <motion.button
                    onClick={handleToggleMenu}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.93 }}
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : { scale: isMenuOpen ? 1.05 : [1, 1.03, 1] }
                    }
                    transition={
                      shouldReduceMotion
                        ? undefined
                        : isMenuOpen
                        ? { duration: 0.2 }
                        : { repeat: Infinity, duration: 3.2, ease: 'easeInOut' }
                    }
                    className={`relative w-[52px] h-[52px] rounded-full flex flex-col items-center justify-center transition-colors duration-300 shadow-md border cursor-pointer focus:outline-none ${
                      isMenuOpen
                        ? 'bg-roseGold text-ivory border-roseGold shadow-[0_0_20px_rgba(180,134,60,0.5)]'
                        : 'bg-navy text-roseGold border-roseGold/40 hover:border-roseGold'
                    }`}
                    aria-label="Toggle Category Menu"
                  >
                    {/* Morphing Hamburger / Close Icon */}
                    <div className="w-5 h-5 flex flex-col items-center justify-center relative">
                      <motion.span
                        animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                        transition={{ duration: 0.25 }}
                        className={`absolute w-4 h-[1.8px] rounded-full ${
                          isMenuOpen ? 'bg-ivory' : 'bg-roseGold'
                        }`}
                      />
                      <motion.span
                        animate={isMenuOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute w-4 h-[1.8px] rounded-full ${
                          isMenuOpen ? 'bg-ivory' : 'bg-roseGold'
                        }`}
                      />
                      <motion.span
                        animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                        transition={{ duration: 0.25 }}
                        className={`absolute w-4 h-[1.8px] rounded-full ${
                          isMenuOpen ? 'bg-ivory' : 'bg-roseGold'
                        }`}
                      />
                    </div>
                    <span
                      className={`text-[7.5px] font-sans font-bold tracking-[0.18em] uppercase mt-0.5 ${
                        isMenuOpen ? 'text-ivory' : 'text-roseGold'
                      }`}
                    >
                      MENU
                    </span>
                  </motion.button>
                </div>
              );
            }

            const Icon = tab.icon!;
            const active = tab.isActive;
            const isBag = tab.isBagButton;
            const hasSheen = activeSheenTab === tab.id;

            const tabInnerContent = (
              <div className="relative w-full h-full flex flex-col items-center justify-center py-1">
                {/* Active Soft Rose Gold Pill Background with Spring Physics */}
                {active && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={springTransition}
                    className="absolute inset-x-1.5 inset-y-1.5 rounded-full bg-roseGold/15 border border-roseGold/30"
                  />
                )}

                {/* Zari Gold Sheen Sweep Overlay */}
                {hasSheen && (
                  <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                    <div className="w-full h-full bg-zari-shimmer animate-zari-sheen opacity-60" />
                  </div>
                )}

                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div className="relative">
                    <motion.div
                      animate={
                        isBag && showBagBurst && !shouldReduceMotion
                          ? { scale: [1, 1.32, 1] }
                          : { scale: active ? 1.1 : 1 }
                      }
                      transition={{ duration: 0.25 }}
                    >
                      <Icon
                        className={`w-[20px] h-[20px] stroke-[1.6] transition-colors duration-200 ${
                          active
                            ? 'text-navy fill-roseGold/20'
                            : 'text-navy/70 hover:text-navy'
                        }`}
                      />
                    </motion.div>

                    {/* Badge Count with Number Roll-Up Animation */}
                    {!!tab.badge && tab.badge > 0 && (
                      <span className="absolute -top-1.5 -right-2 text-[8px] font-bold bg-roseGold text-ivory w-3.5 h-3.5 rounded-full flex items-center justify-center font-sans shadow-xs overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={tab.badge}
                            initial={{ y: 6, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -6, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                          >
                            {tab.badge}
                          </motion.span>
                        </AnimatePresence>
                      </span>
                    )}

                    {/* Celebratory Sparkle Burst on Bag Addition */}
                    {isBag && showBagBurst && (
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.4 }}
                          animate={{ opacity: 1, scale: 1.4 }}
                          exit={{ opacity: 0, scale: 1.8 }}
                          transition={{ duration: 0.4 }}
                          className="absolute -inset-2 flex items-center justify-center pointer-events-none z-20"
                        >
                          <Sparkles className="w-6 h-6 text-roseGold filter drop-shadow-[0_0_6px_#B4863C]" />
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </div>

                  <span
                    className={`text-[8.5px] font-sans uppercase tracking-[0.14em] mt-0.5 relative z-10 transition-colors duration-150 ${
                      active ? 'text-navy font-bold' : 'text-navy/70 font-medium'
                    }`}
                  >
                    {tab.label}
                  </span>
                </div>
              </div>
            );

            if (tab.isBagButton) {
              return (
                <motion.button
                  key={tab.id}
                  onClick={tab.onClick}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
                  className="flex-1 h-full relative flex items-center justify-center cursor-pointer focus:outline-none"
                  aria-label={tab.label}
                >
                  {tabInnerContent}
                </motion.button>
              );
            }

            return (
              <Link
                key={tab.id}
                href={tab.href!}
                onClick={() => triggerSheen(tab.id)}
                className="flex-1 h-full relative flex items-center justify-center focus:outline-none"
                aria-label={tab.label}
              >
                <motion.div
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {tabInnerContent}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
