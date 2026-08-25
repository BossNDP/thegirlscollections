'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function WhatsAppButton() {
  const pathname = usePathname();
  const [isArchSectionVisible, setIsArchSectionVisible] = useState(false);
  const isExcluded = pathname?.startsWith('/admin') || pathname === '/checkout';

  useEffect(() => {
    if (isExcluded) return;

    const checkAndObserve = () => {
      const section = document.getElementById('arch-collection-section');
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsArchSectionVisible(entry.isIntersecting);
        },
        { threshold: 0.15 }
      );

      observer.observe(section);
      return () => observer.disconnect();
    };

    const cleanup = checkAndObserve();
    return () => {
      if (cleanup) cleanup();
    };
  }, [isExcluded, pathname]);

  if (isExcluded) return null;

  return (
    <div
      className="fixed bottom-[84px] right-3.5 sm:bottom-6 sm:right-6 z-[94] flex items-center group select-none pointer-events-auto transition-all duration-300 ease-out"
    >
      {/* Desktop Hover Label Badge */}
      <span className="hidden sm:inline-block opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 text-[11px] font-sans font-semibold uppercase tracking-[0.1em] text-inkNavy bg-ivory/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-zariGold/30 mr-2 pointer-events-none">
        Stylist Assistance
      </span>

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/917483848505?text=Hello%20The%20Girls%20Collections!%20I%20have%20a%20question%20about%20your%20couture%20and%20festive%20wear."
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 sm:w-12 sm:h-12 active:scale-90 transition-transform duration-150 ease-out flex items-center justify-center shrink-0 drop-shadow-md rounded-full bg-[#25D366] p-1.5 animate-badge-pop"
        aria-label="Contact via WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <img
          src="https://media.limechat.in/lcmedia/assets/images/whatsapp/LC_WA.png"
          alt="WhatsApp Chat"
          className="w-full h-full object-contain"
        />
      </a>
    </div>
  );
}

