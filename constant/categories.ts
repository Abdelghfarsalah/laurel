import type { CategorySlug } from "@/types/product";

export interface Category {
  slug: CategorySlug;
  label: string;
  endpoint: string;
  icon: string;
  accent: string;
}

export const CATEGORIES: Category[] = [
  { slug: "mobiles", label: "Mobiles", endpoint: "mobiles", icon: "Smartphone", accent: "#4caf4f" },
  { slug: "laptops", label: "Laptops", endpoint: "laptops", icon: "Laptop", accent: "#2196f3" },
  { slug: "watches", label: "Watches", endpoint: "watches", icon: "Watch", accent: "#f59e0b" },
  { slug: "menswear", label: "Men's Wear", endpoint: "menswear", icon: "Shirt", accent: "#8b5cf6" },
  { slug: "womenswear", label: "Women's Wear", endpoint: "womenswear", icon: "Sparkles", accent: "#ec4899" },
  { slug: "kidswear", label: "Kids' Wear", endpoint: "kidswear", icon: "Baby", accent: "#14b8a6" },
  { slug: "books", label: "Books", endpoint: "books", icon: "BookOpen", accent: "#f97316" },
  { slug: "malefootwear", label: "Men's Footwear", endpoint: "malefootwear", icon: "Footprints", accent: "#0ea5e9" },
  { slug: "femalefootwear", label: "Women's Footwear", endpoint: "femalefootwear", icon: "Footprints", accent: "#d946ef" },
  { slug: "kidsfootwear", label: "Kids' Footwear", endpoint: "kidsfootwear", icon: "Baby", accent: "#22c55e" },
];

export const getCategory = (slug: string): Category | undefined =>
  CATEGORIES.find((c) => c.slug === (slug as CategorySlug));
