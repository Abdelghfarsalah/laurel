import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../features/api/baseApi";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import ordersReducer from "../features/orders/ordersSlice";
import uiReducer from "../features/ui/uiSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      cart: cartReducer,
      auth: authReducer,
      wishlist: wishlistReducer,
      orders: ordersReducer,
      ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
