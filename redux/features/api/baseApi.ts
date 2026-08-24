import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RawProduct } from "@/types/product";

const BASE_URL = "https://ecommerce-api3.p.rapidapi.com";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("x-rapidapi-key", process.env.NEXT_PUBLIC_RAPIDAPI_KEY ?? "");
      headers.set("x-rapidapi-host", process.env.NEXT_PUBLIC_RAPIDAPI_HOST ?? "");
      return headers;
    },
  }),
  tagTypes: ["Products"],
  endpoints: () => ({}),
});

export type { RawProduct };
