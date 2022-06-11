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
    updateProfile: builder.mutation({
      query: (credentials) => ({
        url: `/${addresses.account_updateProfile}`,
        method: "POST",
        body: { ...credentials },
      }),
    }),
    changePassword: builder.mutation({
      query: (credentials) => ({
        url: `/${addresses.account_changePassword}`,
        method: "POST",
        body: { ...credentials },
      }),
    }),
    updateWallet: builder.mutation({
      query: (credentials) => ({
        url: `/${addresses.account_updateWallet}`,
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation, useGetCurrentUserInfoQuery, useUpdateProfileMutation, useChangePasswordMutation, useUpdateWalletMutation } = authApiSlice;
