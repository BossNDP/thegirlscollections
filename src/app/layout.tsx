import type { Metadata } from 'next';
import './globals.css';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import { ClerkProvider } from '@clerk/nextjs';
import { AuthSessionProvider } from '@/context/AuthContext';
import { ShopProvider } from '@/context/ShopContext';
import { SearchOverlay } from '@/components/SearchOverlay';
import { CartDrawer } from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import ToastContainer from '@/components/ToastContainer';
import WhatsAppButton from '@/components/WhatsAppButton';
import FloatingLuxuryDock from '@/components/FloatingLuxuryDock';
import { Cormorant_Garamond, Plus_Jakarta_Sans, Alex_Brush, Fraunces } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const alexBrush = Alex_Brush({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-alex-brush',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "The Girls Collection — Premium Women's & Kids Ethnic Wear",
    template: "%s | The Girls Collection",
  },
  description:
    "Curated D2C luxury fashion brand selling traditional and contemporary sarees, lehengas, kurtis, and handcrafted pure silk kids pattu frocks.",
  keywords: [
    "The Girls Collection",
    "women ethnic wear",
    "kids ethnic wear",
    "pattu frocks",
    "organza sarees",
    "zari lehengas",
    "handloom kurtis",
    "luxury Indian fashion",
  ],
  authors: [{ name: "The Girls Collection" }],
  openGraph: {
    title: "The Girls Collection — Women & Kids Ethnic Luxe",
    description: "Handcrafted sarees, lehengas, and kids pure silk pattu frocks.",
    siteName: "The Girls Collection",
    locale: "en_IN",
    type: "website",
  },
};

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/">
      <html
        lang="en"
        suppressHydrationWarning
        className={`${cormorant.variable} ${fraunces.variable} ${jakarta.variable} ${alexBrush.variable}`}
      >
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.addEventListener('error', function(e) {
                  if (e && e.message && e.message.indexOf('Clerk') !== -1) {
                    e.stopImmediatePropagation();
                  }
                }, true);
                window.addEventListener('unhandledrejection', function(e) {
                  if (e && e.reason && (String(e.reason).indexOf('Clerk') !== -1 || String(e.reason).indexOf('failed_to_load_clerk_js') !== -1)) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                  }
                }, true);
              `,
            }}
          />
        </head>
        <body
          suppressHydrationWarning
          className="antialiased min-h-screen flex flex-col bg-ivory text-charcoal p-0 m-0 font-sans selection:bg-blush selection:text-navy"
        >
          <SmoothScrollProvider>
            <AuthSessionProvider>
              <ShopProvider>
                {/* Section 1: Top Utility Bar */}
                <TopBanner />

                {/* Section 2: Main Navbar */}
                <Navbar />

                {/* Main Page Body */}
                <main className="flex-1 flex flex-col relative w-full p-0 m-0 pb-24 md:pb-0">
                  <PageTransition>{children}</PageTransition>
                </main>

                {/* Global Footer */}
                <Footer />

                {/* Interactive Drawers, Toast & Overlays */}
                <CartDrawer />
                <QuickViewModal />
                <SearchOverlay />
                <ToastContainer />
                <WhatsAppButton />
                <FloatingLuxuryDock />

                {/* Clerk Smart CAPTCHA anchor */}
                <div id="clerk-captcha" />
              </ShopProvider>
            </AuthSessionProvider>
          </SmoothScrollProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
