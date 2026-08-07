'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingContextualCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.8;
      if (window.scrollY > scrollThreshold && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[70] hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md border border-navy/15 rounded-full pl-4 pr-3 py-2.5 shadow-2xl text-navy transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
      <div className="w-7 h-7 rounded-full bg-[#25D366]/15 flex items-center justify-center shrink-0">
        <MessageCircle className="w-4 h-4 text-[#25D366]" />
      </div>

      <div className="text-left text-xs font-sans">
        <p className="font-semibold text-navy tracking-tight">Need Sizing or Custom Fitting Advice?</p>
        <a
          href="https://wa.me/917406164512?text=Hello!%20I%20am%20browsing%20The%20Girls%20Collection%20and%20need%20help%20with%20sizing."
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-medium text-roseGold hover:underline"
        >
          Chat with Concierge →
        </a>
      </div>

      <button
        onClick={() => setIsDismissed(true)}
        className="w-5 h-5 rounded-full hover:bg-navy/10 flex items-center justify-center text-navy/50 transition-colors ml-1"
        aria-label="Dismiss helper"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default FloatingContextualCTA;
