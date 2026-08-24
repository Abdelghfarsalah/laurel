import { baseApi } from "./baseApi";
import { normalizeProduct, type NormalizedRawProduct } from "@/utils/product";
import type { RawProduct } from "@/types/product";

export type NormalizedProduct = NormalizedRawProduct;

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<NormalizedProduct[], string>({
      query: (endpoint) => endpoint,
      transformResponse: (raw: RawProduct[], _meta, endpoint: string) =>
        raw.map((item, i) => normalizeProduct(item, i, endpoint)),
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
