'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const pathname = usePathname();
  const isExcluded = pathname?.startsWith('/admin') || pathname === '/checkout';

  if (isExcluded) return null;

  return (
    <a
      href="https://wa.me/917406164512?text=Hello%20The%20Girls%20Collection!%20I%20have%20a%20question%20about%20sizing%20and%20festive%20wear%20customization."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 z-[70] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group relative border border-white/20"
      aria-label="Contact via WhatsApp"
    >
      {/* Subtle Ambient Pulse Ring */}
      <span className="absolute -inset-1 rounded-full bg-[#25D366]/35 animate-ping opacity-75 pointer-events-none" style={{ animationDuration: '3s' }} />

      {/* Authentic WhatsApp Glyph */}
      <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current text-white relative z-10" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.486 1.333 5.002L2 22l5.149-1.348a9.94 9.94 0 004.863 1.258h.004c5.507 0 9.99-4.479 9.99-9.985A9.943 9.943 0 0012.012 2zm0 16.486h-.003a8.27 8.27 0 01-4.22-1.156l-.303-.18-3.136.821.836-3.056-.197-.314a8.277 8.277 0 01-1.267-4.417c0-4.568 3.717-8.285 8.289-8.285 2.213 0 4.293.863 5.858 2.43a8.23 8.23 0 012.424 5.858c0 4.569-3.717 8.286-8.285 8.286zm4.542-6.208c-.249-.125-1.474-.727-1.703-.81-.228-.083-.395-.125-.561.125-.166.249-.643.81-.789.976-.145.166-.291.187-.54.062-.249-.125-1.053-.388-2.006-1.238-.742-.662-1.243-1.48-1.389-1.729-.145-.249-.015-.384.109-.508.112-.112.249-.291.374-.436.125-.145.166-.249.249-.415.083-.166.042-.312-.021-.436-.062-.125-.561-1.349-.769-1.849-.202-.488-.408-.422-.561-.43h-.478c-.166 0-.436.062-.664.312-.228.249-.872.852-.872 2.079 0 1.226.893 2.41 1.018 2.577.125.166 1.758 2.685 4.26 3.766.595.257 1.06.41 1.423.526.598.19 1.142.163 1.572.099.48-.071 1.474-.602 1.682-1.184.208-.581.208-1.08.145-1.184-.063-.104-.229-.166-.478-.291z" />
      </svg>
    </a>
  );
}
