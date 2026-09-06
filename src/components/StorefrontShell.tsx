'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { CartDrawer } from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import { SearchOverlay } from '@/components/SearchOverlay';
import ToastContainer from '@/components/ToastContainer';
import WhatsAppButton from '@/components/WhatsAppButton';
import FloatingLuxuryDock from '@/components/FloatingLuxuryDock';
import LoginIncentivePopup from '@/components/LoginIncentivePopup';
import PushPrompt from '@/components/PushPrompt';

export default function StorefrontShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <>
        {children}
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      {/* Section 1: Top Utility Bar */}
      <TopBanner />

      {/* Section 2: Main Storefront Navbar */}
      <Navbar />

      {/* Main Storefront Body */}
      <main className="flex-1 flex flex-col relative w-full p-0 m-0 pb-24 md:pb-0">
        <PageTransition>{children}</PageTransition>
      </main>

      {/* Global Storefront Footer */}
      <Footer />

      {/* Interactive Drawers, Toast & Overlays */}
      <CartDrawer />
      <QuickViewModal />
      <SearchOverlay />
      <ToastContainer />
      <WhatsAppButton />
      <FloatingLuxuryDock />
      <LoginIncentivePopup />
      <PushPrompt />
    </>
  );
}
