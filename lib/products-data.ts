import type { Product } from "./types"

export const products: Product[] = [
  // Urban Essentials Collection
  {
    id: "1",
    name: "Hoodie Signature Noir",
    slug: "hoodie-signature-noir",
    description:
      "Notre hoodie emblématique en coton premium. Coupe oversize moderne avec broderie Maktoub sur la poitrine. Parfait pour un style urbain décontracté et luxueux.",
    price: 129,
    images: [
      "/modern-streetwear-essentials--minimalist-urban-fas.jpg",
      "/black-hoodie-front.png",
      "/black-hoodie-back-view.png",
    ],
    category: "Hoodies",
    collection: "Urban Essentials",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Noir", "Blanc", "Gris"],
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "T-Shirt Essential Blanc",
    slug: "t-shirt-essential-blanc",
    description:
      "T-shirt en coton bio avec logo Maktoub minimaliste. Coupe droite confortable, parfait pour toutes les occasions. Qualité premium pour un basique intemporel.",
    price: 59,
    images: [
      "/modern-streetwear-essentials--minimalist-urban-fas.jpg",
      "/white-t-shirt-minimalist.jpg",
      "/white-t-shirt-detail.jpg",
    ],
    category: "T-Shirts",
    collection: "Urban Essentials",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blanc", "Noir", "Beige"],
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    name: "Pantalon Cargo Premium",
    slug: "pantalon-cargo-premium",
    description:
      "Pantalon cargo revisité avec une coupe moderne. Multiples poches fonctionnelles et tissu technique résistant. Le parfait équilibre entre style et praticité.",
    price: 149,
    images: [
      "/modern-streetwear-essentials--minimalist-urban-fas.jpg",
      "/cargo-pants-black-urban.jpg",
      "/cargo-pants-detail-pockets.jpg",
    ],
    category: "Pantalons",
    collection: "Urban Essentials",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Noir", "Kaki", "Gris"],
    inStock: true,
    featured: false,
  },

  // Street Luxury Collection
  {
    id: "4",
    name: "Veste Bomber Luxe",
    slug: "veste-bomber-luxe",
    description:
      "Bomber jacket en nylon premium avec doublure satinée. Détails en cuir véritable et fermeture éclair YKK. Une pièce statement pour votre garde-robe.",
    price: 299,
    images: [
      "/luxury-streetwear-collection--high-end-urban-fashi.jpg",
      "/luxury-bomber-jacket-black.jpg",
      "/bomber-jacket-detail.jpg",
    ],
    category: "Vestes",
    collection: "Street Luxury",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Noir", "Bleu Marine"],
    inStock: true,
    featured: true,
  },
  {
    id: "5",
    name: "Sweatshirt Velours",
    slug: "sweatshirt-velours",
    description:
      "Sweatshirt en velours côtelé avec finitions premium. Broderie ton sur ton et coupe ajustée. Confort absolu avec une touche de sophistication.",
    price: 169,
    images: [
      "/luxury-streetwear-collection--high-end-urban-fashi.jpg",
      "/velvet-sweatshirt-luxury.jpg",
      "/velvet-sweatshirt-detail.jpg",
    ],
    category: "Sweatshirts",
    collection: "Street Luxury",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Bordeaux", "Noir", "Vert Forêt"],
    inStock: true,
    featured: false,
  },
  {
    id: "6",
    name: "Sneakers Maktoub Edition",
    slug: "sneakers-maktoub-edition",
    description:
      "Sneakers en édition limitée avec cuir italien premium. Design minimaliste avec logo Maktoub gravé. Confort exceptionnel pour un style urbain raffiné.",
    price: 249,
    images: [
      "/luxury-streetwear-collection--high-end-urban-fashi.jpg",
      "/luxury-white-sneakers.jpg",
      "/sneakers-detail-leather.jpg",
    ],
    category: "Chaussures",
    collection: "Street Luxury",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: ["Blanc", "Noir", "Beige"],
    inStock: true,
    featured: true,
  },

  // Signature Series Collection
  {
    id: "7",
    name: "Manteau Long Signature",
    slug: "manteau-long-signature",
    description:
      "Manteau long en laine mélangée avec coupe oversize. Pièce iconique de la collection Signature. Design intemporel pour un look sophistiqué.",
    price: 449,
    images: [
      "/signature-fashion-pieces--iconic-streetwear-design.jpg",
      "/long-black-coat-luxury.jpg",
      "/coat-detail-buttons.jpg",
    ],
    category: "Manteaux",
    collection: "Signature Series",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Noir", "Camel", "Gris Anthracite"],
    inStock: true,
    featured: true,
  },
  {
    id: "8",
    name: "Ensemble Jogging Premium",
    slug: "ensemble-jogging-premium",
    description:
      "Ensemble jogging en coton peigné avec détails contrastés. Confort ultime sans compromis sur le style. Logo Maktoub brodé avec finesse.",
    price: 199,
    images: [
      "/signature-fashion-pieces--iconic-streetwear-design.jpg",
      "/luxury-tracksuit-set.jpg",
      "/tracksuit-detail-embroidery.jpg",
    ],
    category: "Ensembles",
    collection: "Signature Series",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Noir", "Gris", "Bleu Marine"],
    inStock: true,
    featured: false,
  },
  {
    id: "9",
    name: "Chemise Oversize Luxe",
    slug: "chemise-oversize-luxe",
    description:
      "Chemise oversize en coton égyptien. Coupe ample moderne avec boutons nacre. Une pièce versatile pour un style décontracté chic.",
    price: 139,
    images: [
      "/signature-fashion-pieces--iconic-streetwear-design.jpg",
      "/oversized-white-shirt-luxury.jpg",
      "/shirt-detail-buttons.jpg",
    ],
    category: "Chemises",
    collection: "Signature Series",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanc", "Noir", "Beige"],
    inStock: true,
    featured: false,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCollection(collection: string): Product[] {
  return products.filter((p) => p.collection === collection)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}
