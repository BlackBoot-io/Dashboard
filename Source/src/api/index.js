import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import settings from "config/settings";
import routes from "config/routes";
import { setCredentials, logOut } from "redux/auth";
import addresses from "./addresses";
import Utils from "config/utils";
import storageKeys from "config/storageKeys";

const baseQuery = fetchBaseQuery({
  baseUrl: settings.baseApiUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = Utils.getStoredData(storageKeys.token);
    console.log("baseQuery",token)
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  console.log("baseQueryWithReauth", args, api, extraOptions);
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      addresses.account_refreshToken,
      api,
      extraOptions
    );
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
