export interface RawProduct {
  Brand?: string;
  Description?: string;
  Image?: string;
  Price?: string;
  Tag?: string;
  "Unnamed: 0"?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  priceLabel: string;
  tag: string;
  category: CategorySlug;
}

export type CategorySlug =
  | "mobiles"
  | "laptops"
  | "watches"
  | "menswear"
  | "womenswear"
  | "kidswear"
  | "books"
  | "malefootwear"
  | "femalefootwear"
  | "kidsfootwear";

export interface CartItem {
  product: Product;
  quantity: number;
}
