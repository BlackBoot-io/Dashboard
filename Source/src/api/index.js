import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import settings from "config/settings";
import { setCredentials, logOut } from "redux/auth";
import addresses from "./addresses";
import Utils from "config/utils";
import storageKeys from "config/storageKeys";

const baseQuery = fetchBaseQuery({
  baseUrl: settings.baseApiUrl,
  credentials: "include",
  mode: "cors",
  prepareHeaders: (headers, { getState }) => {
    const token = Utils.getStoredData(storageKeys.token);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  extraOptions=(extraOptions??{}).timoute = 3000;
  let result = await baseQuery(args, api, extraOptions);
  const refreshToken = Utils.getStoredData(storageKeys.refreshToken);
  if (result?.error?.status === 401 && refreshToken) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      `${addresses.account_refreshToken}?refreshToken=${refreshToken}`,
      api,
      extraOptions
    );
    console.log(refreshResult);
    if (refreshResult?.data && refreshResult?.data.isSuccess) {
      // store the new token
      api.dispatch(setCredentials(refreshResult.data.data));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
      window.location.href = "/";
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
