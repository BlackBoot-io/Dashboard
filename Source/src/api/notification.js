import { apiSlice } from "api";
import addresses from "api/addresses";

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    all: builder.query({
      query: () => ({
        url: `/${addresses.notification_all}`,
        method: "GET",
      }),
    }),
    count: builder.query({
      query: () => ({
        url: `/${addresses.notification_count}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAllQuery, useCountQuery } = transactionApiSlice;
