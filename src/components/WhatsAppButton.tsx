'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function WhatsAppButton() {
  const pathname = usePathname();
  const [isPDP, setIsPDP] = useState(false);
  const isExcluded = pathname?.startsWith('/admin') || pathname === '/checkout';

  useEffect(() => {
    setIsPDP(pathname?.startsWith('/shop/') ?? false);
  }, [pathname]);

  if (isExcluded) return null;

  return (
    <div
      className={`fixed right-4 sm:right-6 z-[75] flex items-center group select-none pointer-events-auto transition-all duration-300 ease-out ${
        isPDP
          ? 'bottom-[calc(76px+env(safe-area-inset-bottom))] sm:bottom-6'
          : 'bottom-[calc(84px+env(safe-area-inset-bottom))] sm:bottom-6'
      }`}
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
        className="w-9 h-9 sm:w-11 sm:h-11 active:scale-92 transition-transform duration-150 ease-out flex items-center justify-center shrink-0 shadow-md rounded-full bg-[#25D366] p-1.5"
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
