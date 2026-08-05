export interface CategorySubItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface CategoryGroup {
  id: string;
  title: string;
  slug: string;
  items: CategorySubItem[];
}

export interface PrimaryCategory {
  id: string;
  name: string;
  slug: string;
  groups: CategoryGroup[];
}

export const WOMEN_TRADITIONAL_ITEMS: CategorySubItem[] = [
  { id: 'langa-davani', name: 'Langa Davani', slug: 'langa-davani', description: 'Traditional South Indian half saree drapes' },
  { id: 'langa-blouse', name: 'Langa Blouse', slug: 'langa-blouse', description: 'Classic silk pattu langa blouse sets' },
  { id: 'traditional-gowns', name: 'Traditional Gowns', slug: 'traditional-gowns', description: 'Floor-sweeping ethnic zari & silk gowns' },
  { id: 'traditional-coat-gowns', name: 'Traditional Coat Gowns', slug: 'traditional-coat-gowns', description: 'Layered ethnic jacket & coat gowns' },
];

export const WOMEN_FROCKS_WESTERN_ITEMS: CategorySubItem[] = [
  { id: 'party-frocks', name: 'Party Frocks', slug: 'party-frocks', description: 'Festive occasion party frocks & dresses' },
  { id: 'full-gowns', name: 'Full Gowns', slug: 'full-gowns', description: 'Graceful full-length flared gowns' },
  { id: 'normal-frocks', name: 'Normal Frocks', slug: 'normal-frocks', description: 'Casual & semi-formal everyday frocks' },
  { id: 'sharara-sets', name: 'Sharara Sets', slug: 'sharara-sets', description: 'Flared tiered sharara pants & short kurtas' },
  { id: 'gharara-sets', name: 'Gharara Sets', slug: 'gharara-sets', description: 'Ruched knee-fit gharara suits with dupattas' },
  { id: 'palazzo-sets', name: 'Palazzo Sets', slug: 'palazzo-sets', description: 'Wide-leg palazzo pants with embroidered kurtis' },
  { id: 'western-frocks', name: 'Western Frocks', slug: 'western-frocks', description: 'Modern silhouette western frocks' },
  { id: 'western-gowns', name: 'Western Gowns', slug: 'western-gowns', description: 'Contemporary evening & cocktail gowns' },
];

export const KIDS_ETHNIC_ITEMS: CategorySubItem[] = [
  { id: 'pattu-frocks', name: 'Pattu Frocks', slug: 'pattu-frocks', description: 'Pure Kanjeevaram silk kids pattu frocks' },
  { id: 'kids-lehenga', name: 'Girls Lehenga Cholis', slug: 'kids-lehenga', description: 'Lightweight twirl-worthy lehenga cholis' },
  { id: 'kids-kurta', name: 'Boys Kurta & Dhoti Sets', slug: 'kids-kurta', description: 'Soft silk-blend kurtas & pre-stitched dhotis' },
  { id: 'kids-anarkali', name: 'Festive Anarkalis', slug: 'kids-anarkali', description: 'Comfortable cotton-lined flared anarkalis' },
];

export const CATEGORY_TAXONOMY: PrimaryCategory[] = [
  {
    id: 'women',
    name: 'Women',
    slug: 'women',
    groups: [
      {
        id: 'women-traditional',
        title: "Women's Traditional",
        slug: 'women-traditional',
        items: WOMEN_TRADITIONAL_ITEMS,
      },
      {
        id: 'women-frocks-western',
        title: "Women's Frocks & Western",
        slug: 'women-frocks-western',
        items: WOMEN_FROCKS_WESTERN_ITEMS,
      },
    ],
  },
  {
    id: 'kids',
    name: 'Kids Ethnic',
    slug: 'kids',
    groups: [
      {
        id: 'kids-ethnic-all',
        title: 'Kids Ethnic Collections',
        slug: 'kids-ethnic-all',
        items: KIDS_ETHNIC_ITEMS,
      },
    ],
  },
];

// Visual Index Categories for Homepage "Shop by Category"
export const SHOP_BY_CATEGORY_ITEMS = [
  {
    id: 'langa-davani',
    name: 'Langa Davani',
    slug: 'langa-davani',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=800',
  },
  {
    id: 'traditional-gowns',
    name: 'Traditional Gowns',
    slug: 'traditional-gowns',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=85&w=800',
  },
  {
    id: 'sharara-sets',
    name: 'Sharara Sets',
    slug: 'sharara-sets',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=85&w=800',
  },
  {
    id: 'party-frocks',
    name: 'Party Frocks',
    slug: 'party-frocks',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=85&w=800',
  },
  {
    id: 'pattu-frocks',
    name: 'Kids Pattu Frocks',
    slug: 'pattu-frocks',
    image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&q=85&w=800',
  },
  {
    id: 'kids-lehenga',
    name: 'Kids Lehenga Cholis',
    slug: 'kids-lehenga',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=800',
  },
];

// Curatorial Edits ("Shop by Edit")
export const SHOP_BY_EDIT_ITEMS = [
  {
    id: 'timeless-reds',
    title: 'Timeless Reds',
    subtitle: 'Auspicious vermillion & crimson silk drapes',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=85&w=800',
    slug: 'timeless-reds',
  },
  {
    id: 'iconic-ivory',
    title: 'Iconic Ivory',
    subtitle: 'Chantilly lacework & organza weaves',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=800',
    slug: 'iconic-ivory',
  },
  {
    id: 'bridesmaid-edit',
    title: 'The Bridesmaid Edit',
    subtitle: 'Flared lehengas & embroidered jacket gowns',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=85&w=800',
    slug: 'bridesmaid-edit',
  },
  {
    id: 'handmade-details',
    title: 'Handmade Details',
    subtitle: 'Fine zardosi, moti & zari needlework',
    image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&q=85&w=800',
    slug: 'handmade-details',
  },
  {
    id: 'breezy-silks',
    title: 'Breezy Silks',
    subtitle: 'Featherlight Chanderi & pure organza suits',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=85&w=800',
    slug: 'breezy-silks',
  },
];
