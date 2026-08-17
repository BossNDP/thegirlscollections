'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function WhatsAppButton() {
  const pathname = usePathname();
  const isExcluded = pathname?.startsWith('/admin') || pathname === '/checkout';

  if (isExcluded) return null;

  return (
    <div className="fixed bottom-[calc(84px+env(safe-area-inset-bottom,0px))] right-4 sm:bottom-6 sm:right-6 z-[95] flex items-center group select-none pointer-events-auto">
      {/* Desktop Hover Label Badge */}
      <span className="hidden sm:inline-block opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 text-[11px] font-sans font-semibold uppercase tracking-[0.1em] text-inkNavy bg-ivory/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-zariGold/30 mr-2.5 pointer-events-none">
        Chat on WhatsApp
      </span>

      {/* Floating WhatsApp Action Button using Custom Image Asset */}
      <a
        href="https://wa.me/917483848505?text=Hello%20The%20Girls%20Collection!%20I%20have%20a%20question%20about%20sizing%20and%20festive%20wear%20customization."
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 sm:w-14 sm:h-14 hover:scale-105 active:scale-95 transition-transform duration-200 ease-out flex items-center justify-center shrink-0 drop-shadow-lg"
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
