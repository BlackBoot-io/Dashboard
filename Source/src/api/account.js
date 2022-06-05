import { apiSlice } from "api";
import addresses from "api/addresses";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `/${addresses.account_login}`,
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getCurrentUserInfo: builder.query({
      query: () => `/${addresses.account_getCurrentUser}`,
    }),
  }),
});

export const { useLoginMutation, useGetCurrentUserInfoQuery } = authApiSlice;
