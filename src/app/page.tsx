import React from 'react';
import dynamic from 'next/dynamic';
import HeroCarousel from '@/components/home/HeroCarousel';
import CircularCategoryScroller from '@/components/home/CircularCategoryScroller';
import FloralSectionDivider from '@/components/home/FloralSectionDivider';
import { dbService } from '@/lib/db';
import { MOCK_PRODUCTS } from '@/data/shopData';
import { Product } from '@/types';

const ShopByCategoryBento = dynamic(() => import('@/components/home/ShopByCategoryBento'));
const ProductCarousel = dynamic(() => import('@/components/home/ProductCarousel'));
const CategoryShowcaseRow = dynamic(() => import('@/components/home/CategoryShowcaseRow'));
const ShopByOccasionSection = dynamic(() => import('@/components/home/ShopByOccasionSection'));
const EditorialProductFeature = dynamic(() => import('@/components/home/EditorialProductFeature'));
const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection'));

export const revalidate = 60; // Revalidate homepage every 60s

const mappedMockProducts: Product[] = MOCK_PRODUCTS.map((p: any) => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  description: p.description,
  price: p.price > 100000 ? p.price : p.price * 100,
  compare_price: p.originalPrice ? (p.originalPrice > 100000 ? p.originalPrice : p.originalPrice * 100) : undefined,
  category: p.category,
  subcategory: p.subcategory,
  gender: p.target === 'kids' ? 'unisex' : 'women',
  images: p.images,
  sizes: p.sizes ? p.sizes.map((s: any) => (typeof s === 'string' ? s : s.size)) : ['XS', 'S', 'M', 'L', 'XL'],
  stock_quantity: { S: 10, M: 10, L: 10 },
  is_featured: !!p.isBestSeller,
  is_active: true,
  weight_grams: 250,
  units_sold: p.reviewsCount || 10,
  created_at: new Date().toISOString(),
}));

export default async function HomePage() {
  let allProducts: Product[] = [];
  try {
    const dbPromise = dbService.getProducts();
    const timeoutPromise = new Promise<Product[]>((resolve) =>
      setTimeout(() => resolve([]), 200)
    );
    allProducts = await Promise.race([dbPromise, timeoutPromise]);
  } catch (err) {
    console.error('Failed to load DB products for homepage:', err);
  }

  // Fallback to mapped mock products if DB returns zero active products
  const products: Product[] = allProducts.length > 0 ? allProducts : mappedMockProducts;

  // PASS 4: Trending Products (sorted by units_sold descending)
  const trendingProducts: Product[] = [...products]
    .sort((a, b) => (b.units_sold ?? 0) - (a.units_sold ?? 0))
    .slice(0, 12);

  // PASS 7: New Drops (sorted by created_at descending)
  const newDrops: Product[] = [...products]
    .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
    .slice(0, 12);

  // PASS 5: Curated Category Rails (Top priority categories with at least 2 active products)
  const priorityCategorySlugs = [
    { slug: 'anarkali-kurta-suit-sets', title: 'Anarkali Suit Sets', accent: 'Anarkali' },
    { slug: 'all-kurta-sets', title: 'Kurta Ensembles', accent: 'Kurta' },
    { slug: 'co-ord-set', title: 'Co-ord Sets', accent: 'Co-ord' },
    { slug: 'kids-lehenga-blouse-or-pattu-pavadai', title: 'Kids Silk Pattu Pavadai', accent: 'Pattu' },
    { slug: 'party-wear-frocks', title: 'Party Wear Frocks', accent: 'Party' },
  ];

  const categoryRails = priorityCategorySlugs
    .map((cat) => {
      const catProds = products.filter(
        (p) => p.category === cat.slug || p.subcategory === cat.slug
      );
      return { ...cat, products: catProds };
    })
    .filter((rail) => rail.products.length >= 2)
    .slice(0, 4);

  const spotlightProduct = trendingProducts[0] || products[0];

  return (
    <div className="w-full bg-ivory text-inkNavy selection:bg-blush selection:text-navy">
      {/* 1. HERO CAROUSEL */}
      <HeroCarousel />

      {/* 2. CATEGORY UNIVERSE (Shop All / Women / Kids Circular Discovery) */}
      <CircularCategoryScroller />

      {/* 1. ETHNIC HERITAGE DIVIDER — MARIGOLD */}
      <FloralSectionDivider id="div-marigold" variant="marigold" kicker="ROYAL HERITAGE & ARTISANAL CRAFT" />

      {/* 3. ARCH COLLECTION (Editorial Coverflow Break) */}
      <ShopByCategoryBento />

      {/* 4. TRENDING THIS WEEK (DB-driven, ranked by units_sold) */}
      <ProductCarousel
        title="Trending This Week"
        accentWord="This Week"
        eyebrow="MOST LOVED RIGHT NOW"
        products={trendingProducts}
        variant="trending"
        viewAllHref="/shop"
        viewAllLabel="EXPLORE TRENDING"
      />

      {/* 2. CURATED SILK DIVIDER — PINK LOTUS */}
      <FloralSectionDivider id="div-pink" variant="pink" kicker="CURATED SILK & FESTIVE EDITS" />

      {/* REPEATED CATEGORY CARD GRID SHOWCASE */}
      <CategoryShowcaseRow
        eyebrow="EXPLORE BY CATEGORY"
        title="Handcrafted Wardrobe Showcase"
        accentWord="Handcrafted"
      />

      {/* EDITORIAL BREAK — SPOTLIGHT PRODUCT */}
      {spotlightProduct && (
        <EditorialProductFeature
          product={spotlightProduct}
          kicker="PIECE OF THE SEASON"
          narrative="Masterpiece artisan craftsmanship with signature hand detailing and tailored silhouettes designed for memorable celebrations."
        />
      )}

      {/* 3. WESTERN / OCCASIONS DIVIDER — WESTERN FLORAL */}
      <FloralSectionDivider id="div-western" variant="western" kicker="SIGNATURE OCCASIONS & CELEBRATIONS" />

      {/* 5. SHOP BY OCCASION (Editorial Intent Visual Panels) */}
      <ShopByOccasionSection />

      {/* 4. FRESH DROPS & TESTIMONIALS DIVIDER — WHITE ROSE */}
      <FloralSectionDivider id="div-whiterose" variant="whiterose" kicker="HANDCRAFTED WITH INTENT" />

      {/* 6. NEW DROPS (DB-driven by created_at) */}
      <ProductCarousel
        title="New Drops & Recent Arrivals"
        accentWord="Recent Arrivals"
        eyebrow="JUST ADDED"
        products={newDrops}
        variant="new"
        viewAllHref="/shop"
        viewAllLabel="VIEW ALL DROPS"
      />

      {/* 7. PATRON STORIES & TESTIMONIALS */}
      <TestimonialsSection />
    </div>
  );
}
