'use client';

import React, { useState, useEffect } from 'react';

const MESSAGES = [
  "COMPLIMENTARY PAN-INDIA SHIPPING ON ORDERS ABOVE ₹1,999",
  "FESTIVE EDIT '26 LIVE NOW — USE CODE 'FESTIVE10' FOR 10% OFF",
  "EASY 7-DAY RETURNS & COMPLIMENTARY ROYAL GIFT PACKAGING",
];

export const TopBanner: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % MESSAGES.length);
        setFade(true);
      }, 500);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      aria-label="Brand Announcements"
      className="relative w-full bg-gradient-to-r from-navy-dark via-navy to-navy-dark h-8 text-ivory flex items-center justify-center border-b border-roseGold/25 px-4 overflow-hidden select-none z-40"
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-center text-center">
        <span
          className={`text-[10px] sm:text-xs font-sans tracking-widest uppercase text-ivory/90 font-medium transition-opacity duration-500 ease-in-out flex items-center gap-2 ${
            fade ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-roseGold inline-block animate-pulse shrink-0" />
          <span className="text-roseGold font-semibold">THE GIRLS EDIT:</span>
          <span className="truncate max-w-[280px] sm:max-w-none">{MESSAGES[index]}</span>
        </span>
      </div>
    </div>
  );
};

export default TopBanner;
