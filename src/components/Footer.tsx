'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, RefreshCw, Truck, Award, Mail } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-navy text-ivory pt-16 pb-8 border-t-4 border-roseGold">
      {/* Top Newsletter & Story Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-16 border-b border-roseGold/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center space-x-2 text-roseGold text-xs uppercase tracking-eyebrow font-sans font-bold">
              <span>✦</span>
              <span>Join The Royal Inner Circle</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-ivory-cream leading-tight">
              Receive Private Drop Invitations &amp; Festive Styling Guides
            </h3>
            <p className="text-xs sm:text-sm text-ivory/80 max-w-md font-sans font-light">
              Subscribe to get 10% off your first handcrafted saree or kids ethnic ensemble.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 rounded-xl bg-roseGold/15 border border-roseGold text-roseGold text-sm font-serif">
                ✨ Thank you for subscribing! Welcome to The Girls Collection family.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="flex-1 px-5 py-3.5 rounded-full bg-ivory/10 border border-roseGold/30 text-ivory placeholder-ivory/50 focus:outline-none focus:border-roseGold text-sm font-sans"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-roseGold text-navy text-xs font-bold uppercase tracking-widest hover:bg-ivory hover:text-navy transition-all flex items-center justify-center space-x-2 shadow-lg hover:scale-[1.02]"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 border-b border-roseGold/20 text-xs font-sans">
        
        {/* Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <BrandLogo variant="badge" size="lg" />
          <p className="text-ivory/80 leading-relaxed max-w-sm font-light">
            Curated D2C luxury fashion brand specializing in traditional &amp; contemporary sarees, lehengas, 
            indo-western couture for women, and handcrafted pure silk pattu frocks for young girls.
          </p>
          <div className="flex items-center space-x-4 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-ivory/10 hover:bg-blush hover:text-navy flex items-center justify-center transition-all duration-300" title="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-ivory/10 hover:bg-blush hover:text-navy flex items-center justify-center transition-all duration-300" title="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/></svg>
            </a>
            <a href="mailto:care@thegirlscollections.com" className="w-9 h-9 rounded-full bg-ivory/10 hover:bg-blush hover:text-navy flex items-center justify-center transition-all duration-300" title="Email">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Women Ethnic */}
        <div className="space-y-3">
          <h4 className="text-sm font-serif font-bold text-roseGold uppercase tracking-wider">Women Couture</h4>
          <ul className="space-y-2 text-ivory/80 font-light">
            <li><Link href="/shop?category=langa-davani" className="hover:text-roseGold transition-colors">Langa Davani</Link></li>
            <li><Link href="/shop?category=traditional-gowns" className="hover:text-roseGold transition-colors">Traditional Gowns</Link></li>
            <li><Link href="/shop?category=sharara-sets" className="hover:text-roseGold transition-colors">Sharara &amp; Gharara Sets</Link></li>
            <li><Link href="/shop?category=party-frocks" className="hover:text-roseGold transition-colors">Party Frocks</Link></li>
            <li><Link href="/shop?category=palazzo-sets" className="hover:text-roseGold transition-colors">Palazzo Sets</Link></li>
          </ul>
        </div>

        {/* Kids Ethnic */}
        <div className="space-y-3">
          <h4 className="text-sm font-serif font-bold text-roseGold uppercase tracking-wider">Kids Royal Wear</h4>
          <ul className="space-y-2 text-ivory/80 font-light">
            <li><Link href="/shop?category=pattu-frocks" className="hover:text-roseGold transition-colors">Pure Silk Pattu Frocks</Link></li>
            <li><Link href="/shop?category=kids-lehenga" className="hover:text-roseGold transition-colors">Girls Lehenga Cholis</Link></li>
            <li><Link href="/shop?category=kids-kurta" className="hover:text-roseGold transition-colors">Boys Kurta Dhoti Sets</Link></li>
            <li><Link href="/shop?category=kids-anarkali" className="hover:text-roseGold transition-colors">Festive Anarkalis</Link></li>
          </ul>
        </div>

        {/* Discover & Brand World */}
        <div className="space-y-3">
          <h4 className="text-sm font-serif font-bold text-roseGold uppercase tracking-wider">Brand World</h4>
          <ul className="space-y-2 text-ivory/80 font-light">
            <li><Link href="/#discover-brand-world" className="hover:text-roseGold transition-colors">Our Heritage Story</Link></li>
            <li><Link href="/#discover-brand-world" className="hover:text-roseGold transition-colors">Zari &amp; Weave Craft</Link></li>
            <li><Link href="/#discover-brand-world" className="hover:text-roseGold transition-colors">Artisan Support</Link></li>
            <li><Link href="/track" className="hover:text-roseGold transition-colors">Track Order</Link></li>
            <li><Link href="/contact" className="hover:text-roseGold transition-colors">WhatsApp Concierge</Link></li>
          </ul>
        </div>

      </div>

      {/* Trust USP Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 border-b border-roseGold/20 grid grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-ivory/80">
        <div className="flex items-center space-x-3">
          <Award className="w-6 h-6 text-roseGold flex-shrink-0" />
          <div>
            <p className="font-semibold text-ivory-cream">Handpicked Silk Fabrics</p>
            <p className="text-[11px] text-ivory/60">100% Pure Kanjeevaram &amp; Organza</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <RefreshCw className="w-6 h-6 text-roseGold flex-shrink-0" />
          <div>
            <p className="font-semibold text-ivory-cream">Hassle-Free Returns</p>
            <p className="text-[11px] text-ivory/60">Easy 7-Day Doorstep Pickups</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-6 h-6 text-roseGold flex-shrink-0" />
          <div>
            <p className="font-semibold text-ivory-cream">COD Available</p>
            <p className="text-[11px] text-ivory/60">Pay on Delivery across India</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Truck className="w-6 h-6 text-roseGold flex-shrink-0" />
          <div>
            <p className="font-semibold text-ivory-cream">Express Shipping</p>
            <p className="text-[11px] text-ivory/60">Pan-India Dispatch in 24h</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar & Payment Icons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-ivory/60 space-y-4 sm:space-y-0">
        <p>© {new Date().getFullYear()} The Girls Collection. All Rights Reserved. Crafted with Quiet Luxury.</p>
        <div className="flex items-center space-x-3 text-roseGold font-mono text-[10px]">
          <span>RAZORPAY</span>
          <span>•</span>
          <span>UPI</span>
          <span>•</span>
          <span>VISA</span>
          <span>•</span>
          <span>MASTERCARD</span>
          <span>•</span>
          <span>NET BANKING</span>
        </div>
      </div>
    </footer>
  );
}
