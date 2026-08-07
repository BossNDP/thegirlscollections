import React from 'react';
import { CategoryAvatarScroller } from '@/components/home/CategoryAvatarScroller';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { SlowPremiumMarquee } from '@/components/home/SlowPremiumMarquee';
import { SecondaryCampaignBanner } from '@/components/home/SecondaryCampaignBanner';
import { LuxuryStatementSection } from '@/components/home/LuxuryStatementSection';
import { NewArrivalsCarousel } from '@/components/home/NewArrivalsCarousel';
import { ShopByCategoryIndex } from '@/components/home/ShopByCategoryIndex';
import { FabricCraftsmanshipSection } from '@/components/home/FabricCraftsmanshipSection';
import { FeaturedCollectionsAlternating } from '@/components/home/FeaturedCollectionsAlternating';
import { HorizontalCollectionRail } from '@/components/home/HorizontalCollectionRail';
import { KidsEthnicFeatureSection } from '@/components/home/KidsEthnicFeatureSection';
import { SectionDivider } from '@/components/home/SectionDivider';
import { BrandWorldDiscover } from '@/components/home/BrandWorldDiscover';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { FloatingContextualCTA } from '@/components/home/FloatingContextualCTA';

export default function HomePage() {
  return (
    <div className="w-full bg-ivory text-navy">
      {/* SECTION 3 — Category Avatar Scroller (sits directly under navbar) */}
      <CategoryAvatarScroller />

      {/* SECTION 4 — Flagship Hero Carousel with Cinematic Scale Zoom & Blur Reveal */}
      <HeroCarousel />

      {/* PHASE 1e — Slow Premium Continuous Marquee Strip */}
      <SlowPremiumMarquee />

      {/* SECTION 5 — Secondary Campaign Story Banner */}
      <SecondaryCampaignBanner />

      {/* PHASE 2a — Minimal Large-Typography Luxury Statement */}
      <LuxuryStatementSection />

      {/* SECTION 6 — "Trending This Week" Product Grid */}
      <NewArrivalsCarousel />

      {/* SECTION 7 — "Shop by Category" Asymmetric Index */}
      <ShopByCategoryIndex />

      {/* PHASE 2b — Fabric & Artisan Craftsmanship Spotlight */}
      <FabricCraftsmanshipSection />

      {/* PHASE 2c — Alternating Featured Collections Editorial Curation */}
      <FeaturedCollectionsAlternating />

      {/* PHASE 3a — Deep Taxonomy Portrait Silhouette Rail */}
      <HorizontalCollectionRail />

      {/* SECTION 9 — Kids Ethnic Spotlight Feature Section */}
      <KidsEthnicFeatureSection />

      {/* SECTION 10 — ONE Intentional Full-Bleed Navy Accent Section ("Signature Heritage") */}
      <SectionDivider />

      {/* Brand World Heritage & Craft */}
      <BrandWorldDiscover />

      {/* VIP Newsletter Capture */}
      <NewsletterSection />

      {/* PHASE 3b — Floating Contextual WhatsApp Concierge Helper */}
      <FloatingContextualCTA />
    </div>
  );
}
