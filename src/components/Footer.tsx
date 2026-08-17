'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, RefreshCw, Truck, Award } from 'lucide-react';
import BrandLogo from './BrandLogo';
import ZariThread from '@/components/ui/ZariThread';

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
    <footer className="bg-nearBlack text-ivory relative border-t border-zariGold/30 select-none">
      {/* Top Woven Temple / Kolam Border Pattern */}
      <ZariThread variant="footerWeave" />

      {/* Newsletter Block */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-16 border-b border-zariGold/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-3">
            <span className="eyebrow-text text-zariGoldLight">ROYAL INNER CIRCLE</span>
            <h3 className="text-2xl sm:text-4xl font-serif font-semibold text-ivory">
              Private Drop Invitations &amp; Festive Styling Guides
            </h3>
            <p className="text-xs sm:text-sm text-ivory/70 font-sans font-light">
              Receive 10% off your first handcrafted saree or kids ethnic ensemble.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 rounded-[2px] bg-zariGold/15 border border-zariGold text-zariGoldLight text-sm font-serif">
                ✨ Thank you for joining. Welcome to The Girls Collections inner circle.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="flex-1 px-5 py-4 rounded-[2px] bg-ivory text-inkNavy placeholder-inkNavy/50 focus:outline-none focus:ring-2 focus:ring-zariGold text-sm font-sans font-medium"
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-[2px] btn-gold-gradient text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center space-x-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Navigation Columns */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 border-b border-zariGold/20 text-xs font-sans">
        {/* Column 1: Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <BrandLogo variant="badge" size="lg" />
          <p className="text-ivory/70 leading-relaxed max-w-sm font-light">
            Curated D2C ethnic wear brand specializing in traditional &amp; contemporary sarees, lehengas, 
            indo-western couture for women, and handcrafted pure silk pattu frocks for young girls.
          </p>
        </div>

        {/* Column 2: Shop */}
        <div className="space-y-3">
          <h4 className="text-xs font-serif font-bold text-zariGold uppercase tracking-[0.2em]">Shop</h4>
          <ul className="space-y-2.5 text-ivory/75 font-light">
            <li><Link href="/shop?category=sarees" className="hover:text-zariGold transition-colors">Silk Sarees</Link></li>
            <li><Link href="/shop?category=lehengas" className="hover:text-zariGold transition-colors">Bridal Lehengas</Link></li>
            <li><Link href="/shop?category=pattu-frocks" className="hover:text-zariGold transition-colors">Kids Pattu Frocks</Link></li>
            <li><Link href="/shop?category=gowns" className="hover:text-zariGold transition-colors">Designer Gowns</Link></li>
          </ul>
        </div>

        {/* Column 3: Client Care */}
        <div className="space-y-3">
          <h4 className="text-xs font-serif font-bold text-zariGold uppercase tracking-[0.2em]">Client Care</h4>
          <ul className="space-y-2.5 text-ivory/75 font-light">
            <li><Link href="/track" className="hover:text-zariGold transition-colors">Track Order</Link></li>
            <li><Link href="/contact" className="hover:text-zariGold transition-colors">Styling Concierge</Link></li>
            <li><Link href="/policies" className="hover:text-zariGold transition-colors">Shipping &amp; Returns</Link></li>
            <li><Link href="/policies" className="hover:text-zariGold transition-colors">Size Guide</Link></li>
          </ul>
        </div>

        {/* Column 4: About */}
        <div className="space-y-3">
          <h4 className="text-xs font-serif font-bold text-zariGold uppercase tracking-[0.2em]">About</h4>
          <ul className="space-y-2.5 text-ivory/75 font-light">
            <li><Link href="/about" className="hover:text-zariGold transition-colors">Our Heritage</Link></li>
            <li><Link href="/about" className="hover:text-zariGold transition-colors">Artisan Craftsmanship</Link></li>
            <li><Link href="/contact" className="hover:text-zariGold transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      {/* Trust Badges Strip */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-8 border-b border-zariGold/20 grid grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-ivory/80">
        <div className="flex items-center space-x-3">
          <Award className="w-6 h-6 text-zariGold shrink-0" />
          <div>
            <p className="font-semibold text-ivory">Pure Silk Certified</p>
            <p className="text-[11px] text-ivory/60">100% Authentic Kanjeevaram</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <RefreshCw className="w-6 h-6 text-zariGold shrink-0" />
          <div>
            <p className="font-semibold text-ivory">7-Day Easy Returns</p>
            <p className="text-[11px] text-ivory/60">Hassle-free Doorstep Pickups</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-6 h-6 text-zariGold shrink-0" />
          <div>
            <p className="font-semibold text-ivory">Cash on Delivery</p>
            <p className="text-[11px] text-ivory/60">Available Pan-India</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Truck className="w-6 h-6 text-zariGold shrink-0" />
          <div>
            <p className="font-semibold text-ivory">Express Shipping</p>
            <p className="text-[11px] text-ivory/60">Dispatched within 24 Hours</p>
          </div>
        </div>
      </div>

      {/* Copyright & Payment */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-ivory/60 space-y-4 sm:space-y-0">
        <p>© {new Date().getFullYear()} The Girls Collections. Custom Built with Quiet Luxury.</p>
        <div className="flex items-center space-x-3 text-zariGold font-sans text-[10px] tracking-widest uppercase">
          <span>RAZORPAY</span>
          <span>•</span>
          <span>UPI</span>
          <span>•</span>
          <span>VISA</span>
          <span>•</span>
          <span>MASTERCARD</span>
        </div>
      </div>
    </footer>
  );
}
