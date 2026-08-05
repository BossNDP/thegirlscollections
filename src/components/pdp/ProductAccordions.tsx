'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface ProductAccordionsProps {
  description: string;
  fabric: string;
  careInstructions: string[];
}

export const ProductAccordions: React.FC<ProductAccordionsProps> = ({
  description,
  fabric,
  careInstructions,
}) => {
  const [openSections, setOpenSections] = useState({
    desc: true,
    fabric: false,
    shipping: false,
  });

  const toggle = (sec: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  return (
    <div className="divide-y divide-roseGold/20 border-y border-roseGold/20 font-sans text-xs text-navy my-8">
      
      {/* Description Accordion */}
      <div className="py-4">
        <button
          onClick={() => toggle('desc')}
          className="w-full flex items-center justify-between font-serif font-bold text-sm text-navy text-left"
        >
          <span>Garment Description & Styling</span>
          {openSections.desc ? <ChevronUp className="w-4 h-4 text-roseGold" /> : <ChevronDown className="w-4 h-4 text-roseGold" />}
        </button>
        {openSections.desc && (
          <p className="mt-3 text-charcoal-muted leading-relaxed font-light">
            {description}
          </p>
        )}
      </div>

      {/* Fabric & Care Accordion */}
      <div className="py-4">
        <button
          onClick={() => toggle('fabric')}
          className="w-full flex items-center justify-between font-serif font-bold text-sm text-navy text-left"
        >
          <span>Fabric Composition & Care</span>
          {openSections.fabric ? <ChevronUp className="w-4 h-4 text-roseGold" /> : <ChevronDown className="w-4 h-4 text-roseGold" />}
        </button>
        {openSections.fabric && (
          <div className="mt-3 space-y-2 text-charcoal-muted">
            <p><strong>Fabric:</strong> {fabric}</p>
            <div>
              <strong className="block mb-1">Care Instructions:</strong>
              <ul className="list-disc pl-4 space-y-1">
                {careInstructions.map((care, i) => (
                  <li key={i}>{care}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Shipping & Returns Accordion */}
      <div className="py-4">
        <button
          onClick={() => toggle('shipping')}
          className="w-full flex items-center justify-between font-serif font-bold text-sm text-navy text-left"
        >
          <span>Shipping, COD & Returns Policy</span>
          {openSections.shipping ? <ChevronUp className="w-4 h-4 text-roseGold" /> : <ChevronDown className="w-4 h-4 text-roseGold" />}
        </button>
        {openSections.shipping && (
          <div className="mt-3 space-y-3 text-charcoal-muted">
            <div className="flex items-start space-x-2">
              <Truck className="w-4 h-4 text-roseGold flex-shrink-0 mt-0.5" />
              <span>Complimentary Pan-India shipping on orders above ₹1,999. Dispatch within 24-48 business hours.</span>
            </div>
            <div className="flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-roseGold flex-shrink-0 mt-0.5" />
              <span>Cash on Delivery (COD) available nationwide with secure OTP verification.</span>
            </div>
            <div className="flex items-start space-x-2">
              <RefreshCw className="w-4 h-4 text-roseGold flex-shrink-0 mt-0.5" />
              <span>Easy 7-day doorstep return/exchange policy for perfect fit guarantee.</span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
