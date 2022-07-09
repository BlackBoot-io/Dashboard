import { apiSlice } from "api";
import addresses from "api/addresses";
import storageKeys from "config/storageKeys";
import Utils from "config/utils";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `/${addresses.account_login}`,
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: (params) => ({
        url: `/${addresses.account_signup}`,
        method: "POST",
        body: params,
      }),
    }),
    logout: builder.mutation({
      query: (credentials) => {
        const refreshToken = Utils.getStoredData(storageKeys.refreshToken);
        return {
          url: `/${addresses.account_logout}?refreshToken=${refreshToken}`,
          method: "DELETE",
          body: { ...credentials },
        };
      },
    }),
    // getCurrentUserInfo: builder.query({
    //   query: () => `/${addresses.account_getCurrentUser}`,
    // }),
    getCurrentUserInfo: builder.mutation({
      query: () => ({
        url: `/${addresses.account_getCurrentUser}`,
        method: "GET"
      }),
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

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  //useGetCurrentUserInfoQuery,
  useGetCurrentUserInfoMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUpdateWalletMutation,
} = authApiSlice;
