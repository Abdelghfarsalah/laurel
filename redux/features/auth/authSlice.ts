import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
  name: string;
  email: string;
}

interface AuthState {
  user: AuthUser | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<AuthUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    logout: (state) => {
      state.user = null;
    },
    hydrateAuth: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
    },
  },
});

export const { loginSuccess, updateUser, logout, hydrateAuth } =
  authSlice.actions;

export default authSlice.reducer;
