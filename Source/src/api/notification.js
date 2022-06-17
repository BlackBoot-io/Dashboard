import { apiSlice } from "api";
import addresses from "api/addresses";

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allNotifications: builder.query({
      query: () => ({
        url: `/${addresses.notification_all}`,
        method: "GET",
      }),
    }),
    notificationCount: builder.query({
      query: () => ({
        url: `/${addresses.notification_count}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAllNotificationsQuery, useNotificationCountQuery } = transactionApiSlice;
