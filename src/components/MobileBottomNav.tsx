'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Menu, Heart, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '@/context/ShopContext';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { cartCount, wishlist, setIsCartOpen } = useShop();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const tabs = [
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
      icon: isMenuOpen ? X : Menu,
      isActive: isMenuOpen,
      onClick: handleToggleMenu,
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
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setIsCartOpen(true);
      },
    },
  ];

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-[90] md:hidden bg-[#1C1F3B] text-ivory border-t border-white/10 select-none pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile Navigation Bar"
    >
      <div className="w-full h-[56px] flex items-center justify-around relative px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = tab.isActive;

          const content = (
            <div className="relative w-full h-full flex flex-col items-center justify-center py-1 group min-h-[44px]">
              {/* Active Tab Top Hairline Indicator */}
              {active && (
                <motion.div
                  layoutId="activeBottomTabLine"
                  className="absolute top-0 inset-x-3 h-[2px] bg-zariGold"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}

              <div className="relative flex flex-col items-center justify-center">
                <div className="relative">
                  <Icon
                    className={`w-[20px] h-[20px] stroke-[1.5] transition-colors duration-200 ${
                      active ? 'text-ivory' : 'text-ivory/60 group-hover:text-ivory'
                    }`}
                  />

                  {/* Badge Counter */}
                  {!!tab.badge && tab.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 text-[8px] font-bold bg-ivory text-inkNavy w-3.5 h-3.5 rounded-full flex items-center justify-center font-sans shadow-xs">
                      {tab.badge}
                    </span>
                  )}
                </div>

                <span
                  className={`text-[8.5px] font-sans tracking-[0.16em] uppercase mt-1 transition-colors duration-200 ${
                    active ? 'text-ivory font-bold' : 'text-ivory/60 font-medium group-hover:text-ivory'
                  }`}
                >
                  {tab.label}
                </span>
              </div>
            </div>
          );

          if (tab.onClick) {
            return (
              <button
                key={tab.id}
                onClick={tab.onClick}
                className="flex-1 h-full flex items-center justify-center focus:outline-none cursor-pointer"
                aria-label={tab.label}
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={tab.id}
              href={tab.href!}
              className="flex-1 h-full flex items-center justify-center focus:outline-none"
              aria-label={tab.label}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

