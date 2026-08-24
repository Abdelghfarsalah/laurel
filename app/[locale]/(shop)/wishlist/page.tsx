import type { Metadata } from "next";
import WishlistBody from "@/components/pages/Wishlist/Body";

export const metadata: Metadata = {
  title: "Wishlist — NovaMart",
};

export default function WishlistPage() {
  return <WishlistBody />;
}
