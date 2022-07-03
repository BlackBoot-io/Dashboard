import { apiSlice } from "api";
import addresses from "api/addresses";

export const coinPriceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBySymbol: builder.mutation({
      query: (symbol) => ({
        url: `/${addresses.coinPrice_getBySymbol}?symbol=${symbol}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetBySymbolMutation,
} = coinPriceApiSlice;
