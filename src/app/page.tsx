import React from 'react';
import HeroCarousel from '@/components/home/HeroCarousel';
import ShopByCategoryBento from '@/components/home/ShopByCategoryBento';
import EditorialFeature from '@/components/home/EditorialFeature';
import ProductRail from '@/components/home/ProductRail';
import EditorialProductFeature from '@/components/home/EditorialProductFeature';
import StackedCategoryRailsSection from '@/components/home/StackedCategoryRailsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import { MOCK_PRODUCTS } from '@/data/shopData';

export default function HomePage() {
  const newArrivals = MOCK_PRODUCTS.slice(0, 8);
  const featuredProduct = MOCK_PRODUCTS[0];

  return (
    <div className="w-full bg-ivory text-inkNavy selection:bg-sand selection:text-inkNavy">
      {/* 1. Full-Bleed Hero Carousel (Ken Burns Effect) */}
      <HeroCarousel />

      {/* 2. Shop by Category — Signature Arch Rail */}
      <ShopByCategoryBento />

      {/* 3. Discover the Edit — Large Asymmetric Editorial Block */}
      <EditorialFeature
        kicker="DISCOVER THE EDIT"
        title="Royal Kanjeevaram & Bridal Silk Weaves"
        description="Crafted by hereditary master weavers in Tamil Nadu, our bridal sarees feature pure gold zari motifs, heavy pallus, and silk mark certification for timeless elegance."
        image="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=1200"
        imageAlt="Bridal Silk Sarees Edit"
        ctaText="EXPLORE BRIDAL EDIT"
        ctaHref="/shop?category=sarees"
      />

      {/* 4. New from the Atelier — 1.15 Card Peek Product Rail */}
      <ProductRail
        kicker="ATELIER RELEASES"
        title="New from the Atelier"
        subtitle="Handcrafted pure silk drapes and contemporary festive silhouettes freshly finished by our artisans."
        products={newArrivals}
        actionLabel="VIEW ALL RELEASES"
        actionHref="/shop"
        showProgressLine={true}
      />

      {/* 5. Single Piece Spotlight — Breaking Rail Rhythm */}
      {featuredProduct && (
        <EditorialProductFeature
          product={featuredProduct}
          kicker="PIECE OF THE SEASON"
          narrative="Handwoven with pure 24k gold zari threads and pure mulberry silk. A masterwork of South Indian handloom tradition tailored for royal celebrations."
        />
      )}

      {/* 6. The Craft — Brand Story Editorial Feature */}
      <EditorialFeature
        kicker="THE CRAFT"
        title="Heritage Craftsmanship & Pure Silk Legacy"
        description="Every weave passes through centuries-old loom techniques, ensuring unmatched drape weight, soft tactile sheen, and heirloom longevity for future generations."
        image="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=85&w=1200"
        imageAlt="Heritage Loom Craftsmanship"
        ctaText="OUR HERITAGE STORY"
        ctaHref="/about"
        reversed={true}
      />

      {/* 7. Complete the Look — Commerce-Focused Stacked Category Rails */}
      <StackedCategoryRailsSection />

      {/* 8. The Girls Journal & Patron Stories */}
      <TestimonialsSection />
    </div>
  );
}
