import React from 'react';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { ShopByCategoryIndex } from '@/components/home/ShopByCategoryIndex';
import { ShopByEditCuratorial } from '@/components/home/ShopByEditCuratorial';
import { NewArrivalsCarousel } from '@/components/home/NewArrivalsCarousel';
import { OccasionGrid } from '@/components/home/OccasionGrid';
import { BrandWorldDiscover } from '@/components/home/BrandWorldDiscover';
import { StyledInBrandSocial } from '@/components/home/StyledInBrandSocial';
import { NewsletterSection } from '@/components/home/NewsletterSection';

import { SectionDivider } from '@/components/home/SectionDivider';

export default function HomePage() {
  return (
    <div className="w-full bg-ivory text-navy">
      {/* 1. Flagship Hero Carousel */}
      <HeroCarousel />

      {/* 2. Editorial Category Index (Warm Ivory Stage #FAF6F0) */}
      <ShopByCategoryIndex />

      {/* 3. Full-Bleed Navy Heritage Section Divider (#1B1F3B) */}
      <SectionDivider />

      {/* 4. Curatorial "Shop by Edit" Stylist Themes */}
      <ShopByEditCuratorial />

      {/* 4. New Arrivals Product Carousel */}
      <NewArrivalsCarousel />

      {/* 5. Shop by Occasion Grid (Festive, Wedding Guest, Everyday, Gifting) */}
      <OccasionGrid />

      {/* 6. Discover / Brand World Institutional Section */}
      <BrandWorldDiscover />

      {/* 7. Styled in The Girls Collection Social Proof Slot */}
      <StyledInBrandSocial />

      {/* 8. Newsletter Capture */}
      <NewsletterSection />
    </div>
  );
}
