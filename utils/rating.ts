const hashCode = (str: string): number => {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
};

export interface ProductRating {
  rate: number;
  count: number;
}

export const getProductRating = (id: string): ProductRating => {
  const h = hashCode(id);
  const rate = Math.round((3.5 + (h % 16) / 10) * 10) / 10;
  const count = 8 + ((h >> 4) % 480);
  return { rate, count };
};

export const REVIEW_KEYS = ["review1", "review2", "review3", "review4"] as const;

export const getReviewKeysForProduct = (
  id: string,
  max = 3
): (typeof REVIEW_KEYS)[number][] => {
  const h = hashCode(id);
  const rotated = [...REVIEW_KEYS.slice(h % REVIEW_KEYS.length), ...REVIEW_KEYS.slice(0, h % REVIEW_KEYS.length)];
  return rotated.slice(0, max);
};
