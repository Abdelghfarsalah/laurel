import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/types/product";

export type OrderStatus = "processing" | "shipped" | "delivered";

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: "cod" | "card" | "paypal";
  status: OrderStatus;
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

let counter = 0;

export const createOrderId = (): string => {
  counter += 1;
  return `NM-${Date.now().toString(36).toUpperCase()}${counter
    .toString(36)
    .toUpperCase()
    .padStart(2, "0")}`;
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action: PayloadAction<Omit<Order, "id" | "date" | "status">>) => {
      state.orders.unshift({
        ...action.payload,
        id: createOrderId(),
        date: new Date().toISOString(),
        status: "processing",
      });
    },
    hydrateOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
  },
});

export const { placeOrder, hydrateOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
