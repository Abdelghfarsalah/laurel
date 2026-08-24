import type { RawProduct } from "@/types/product";

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

