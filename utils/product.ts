import type { CategorySlug, Product, RawProduct } from "@/types/product";

export const parsePrice = (label?: string): number => {
  if (!label) return 0;
  const digits = label.replace(/[^\d.]/g, "");
  return Number.parseFloat(digits) || 0;
};

export interface NormalizedRawProduct extends RawProduct {
  id: string;
  name: string;
  description: string;
  priceValue: number;
  category: string;
}

export const normalizeProduct = (
  raw: RawProduct,
  index: number,
  category: string
): NormalizedRawProduct => ({
  ...raw,
  id: `${category}-${raw["Unnamed: 0"] ?? index}`,
  name: raw.Brand || raw.Description?.slice(0, 60) || "Product",
  description: raw.Description ?? raw.Brand ?? "",
  priceValue: parsePrice(raw.Price),
  category,
});

export const toStoreProduct = (p: NormalizedRawProduct): Product => ({
  id: p.id,
  name: p.name,
  description: p.description,
  image: p.Image || "",
  price: p.priceValue,
  priceLabel: p.Price || "",
  tag: p.Tag || p.category,
  category: p.category as CategorySlug,
});

export const fromStoreProduct = (p: Product): NormalizedRawProduct => ({
  Brand: undefined,
  Description: p.description,
  Image: p.image,
  Price: p.priceLabel,
  Tag: p.tag,
  id: p.id,
  name: p.name,
  description: p.description,
  priceValue: p.price,
  category: p.category,
});

