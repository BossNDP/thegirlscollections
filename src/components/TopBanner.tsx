'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PROMO_MESSAGES = [
  {
    desktop: 'FREE SHIPPING PAN-INDIA ON ORDERS ABOVE ₹1,999',
    mobile: 'FREE SHIPPING PAN-INDIA OVER ₹1,999',
  },
  {
    desktop: 'CASH ON DELIVERY (COD) AVAILABLE ACROSS INDIA',
    mobile: 'COD AVAILABLE PAN-INDIA',
  },
  {
    desktop: "USE CODE 'FESTIVE10' FOR 10% OFF YOUR FIRST ORDER",
    mobile: "10% OFF WITH CODE 'FESTIVE10'",
  },
];

export const TopBanner: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % PROMO_MESSAGES.length);
        setFade(true);
      }, 350);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + PROMO_MESSAGES.length) % PROMO_MESSAGES.length);
      setFade(true);
    }, 150);
  };

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % PROMO_MESSAGES.length);
      setFade(true);
    }, 150);
  };

  const currentMsg = PROMO_MESSAGES[index];

  return (
    <div
      aria-label="Top Utility Bar"
      className="relative w-full bg-[#FAF6F0] text-navy border-b border-navy/10 py-1.5 px-3 sm:px-8 lg:px-12 select-none z-40"
    >
      <div className="max-w-[1440px] mx-auto w-full flex items-center justify-center sm:justify-between text-[10.5px] sm:text-[11px] font-sans text-navy/70">
        
        {/* Left / Centered on Mobile: Short, Clean Promo Message without Truncation */}
        <div className="flex items-center gap-1.5 justify-center sm:justify-start w-full sm:w-auto">
          <div className="flex items-center space-x-0.5 shrink-0">
            <button
              onClick={handlePrev}
              className="p-1 hover:text-navy text-navy/60 transition-colors rounded-full"
              aria-label="Previous promotion"
            >
              <ChevronLeft className="w-3 h-3 stroke-[2]" />
            </button>
            <button
              onClick={handleNext}
              className="p-1 hover:text-navy text-navy/60 transition-colors rounded-full"
              aria-label="Next promotion"
            >
              <ChevronRight className="w-3 h-3 stroke-[2]" />
            </button>
          </div>

          <div
            className={`transition-opacity duration-300 ease-in-out text-center sm:text-left ${
              fade ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Mobile short message (never cut off with ...) */}
            <span className="sm:hidden font-semibold tracking-[0.06em] text-navy/90 uppercase text-[10px] whitespace-nowrap">
              {currentMsg.mobile}
            </span>

            {/* Desktop full message */}
            <span className="hidden sm:inline font-medium tracking-[0.08em] text-navy/80 uppercase text-[11px] whitespace-nowrap">
              {currentMsg.desktop}
            </span>
          </div>
        </div>

        {/* Right: Secondary Utility Messages (Desktop only) */}
        <div className="hidden md:flex items-center gap-5 text-[11px] tracking-[0.06em]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-roseGold inline-block shrink-0" />
            <span>Complimentary Royal Gift Packaging</span>
          </span>
          <span className="text-navy/20">•</span>
          <a
            href="https://wa.me/917406164512"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-roseGold transition-colors font-medium text-navy/80"
          >
            Book Virtual Bridal Appointment
          </a>
        </div>

      </div>
    </div>
  );
};

export default TopBanner;
