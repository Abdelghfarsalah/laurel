"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore, type RootState } from "@/redux/app/store";
import { hydrateCart } from "@/redux/features/cart/cartSlice";
import { hydrateAuth } from "@/redux/features/auth/authSlice";
import { hydrateWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { hydrateOrders } from "@/redux/features/orders/ordersSlice";
import { readJson, writeJson } from "@/utils/storage";

const STORAGE_KEY = "novamart-state";

type PersistedState = Pick<RootState, "cart" | "auth" | "wishlist" | "orders">;

export default function StoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState<AppStore>(() => makeStore());

  useEffect(() => {
    const persisted = readJson<PersistedState>(STORAGE_KEY);
    if (persisted) {
      if (Array.isArray(persisted.cart?.items)) {
        store.dispatch(hydrateCart(persisted.cart.items));
      }
      if ("auth" in persisted) {
        store.dispatch(hydrateAuth(persisted.auth.user));
      }
      if (Array.isArray(persisted.wishlist?.items)) {
        store.dispatch(hydrateWishlist(persisted.wishlist.items));
      }
      if (Array.isArray(persisted.orders?.orders)) {
        store.dispatch(hydrateOrders(persisted.orders.orders));
      }
    }

    let scheduled = false;
    return store.subscribe(() => {
      if (scheduled) return;
      scheduled = true;
      window.setTimeout(() => {
        scheduled = false;
        const { cart, auth, wishlist, orders } = store.getState();
        writeJson(STORAGE_KEY, { cart, auth, wishlist, orders });
      }, 250);
    });
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
