'use client';

import React, { useState, useEffect } from 'react';

const ANNOUNCEMENTS = [
  'FREE SHIPPING PAN-INDIA ON ORDERS OVER ₹1,999',
  'CASH ON DELIVERY (COD) AVAILABLE ACROSS INDIA',
  "USE CODE 'FESTIVE10' FOR 10% OFF YOUR FIRST ORDER",
  'HANDCRAFTED PURE SILK & ORGANZA COLLECTIONS NOW LIVE',
];

export const TopBanner: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
        setFade(true);
      }, 300);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

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

  return (
    <div
      aria-label="Announcement Bar"
      className={`relative w-full bg-inkNavy text-ivory select-none z-40 overflow-hidden border-b border-zariGold/30 transition-all duration-150 ease-out ${
        isScrolledDown ? 'max-h-0 py-0 opacity-0 border-b-0 pointer-events-none' : 'max-h-12 py-2.5 opacity-100'
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-center relative px-4">
        <div
          className={`transition-all duration-300 ease-in-out text-center ${
            fade ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
          }`}
        >
          <span className="font-sans text-[10.5px] sm:text-[12px] font-medium tracking-[0.2em] text-ivory uppercase inline-block">
            {ANNOUNCEMENTS[index]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
