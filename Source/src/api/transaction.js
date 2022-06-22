import { apiSlice } from "api";
import addresses from "api/addresses";

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => ({
        url: `/${addresses.transaction_getAll}`,
        method: "GET",
      }),
    }),
    getById: builder.mutation({
      query: (transactionId) => ({
        url: `/${addresses.transaction_getById}?transactionId=${transactionId}`,
        method: "GET",
      }),
    }),
    add: builder.mutation({
      query: (data) => ({
        url: `/${addresses.transaction_add}`,
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const { useAddMutation, useGetByIdMutation, useGetAllQuery } = transactionApiSlice;
