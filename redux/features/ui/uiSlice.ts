import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ToastType = "success" | "info" | "error";

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface UiState {
  theme: "light" | "dark";
  toasts: Toast[];
}

const initialState: UiState = {
  theme: "light",
  toasts: [],
};

let toastId = 0;

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    pushToast: (state, action: PayloadAction<{ message: string; type?: ToastType }>) => {
      toastId += 1;
      state.toasts.push({
        id: toastId,
        message: action.payload.message,
        type: action.payload.type ?? "success",
      });
      if (state.toasts.length > 4) state.toasts.shift();
    },
    dismissToast: (state, action: PayloadAction<number>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { setTheme, pushToast, dismissToast } = uiSlice.actions;

export default uiSlice.reducer;
