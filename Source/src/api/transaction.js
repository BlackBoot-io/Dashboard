import { apiSlice } from "api";
import addresses from "api/addresses";

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => `/${addresses.transaction_getAll}`,
    }),
    getById: builder.query({
      query: (transactionId) =>
        `/${addresses.transaction_getById}?transactionId=${transactionId}`,
    }),
  }),
});

export const { useGetByIdQuery, useGetAllQuery } = transactionApiSlice;
