import { apiSlice } from "api";
import addresses from "api/addresses";

export const crowdsaleScheduleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allCrowdsaleSchedules: builder.query({
      query: () => ({
        url: `/${addresses.crowdsaleSchedule_all}`,
        method: "GET",
      }),
    }),
    currentCrowdsaleSchedules: builder.query({
      query: () => ({
        url: `/${addresses.crowdsaleSchedule_current}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAllCrowdsaleSchedulesQuery, useCurrentCrowdsaleSchedulesQuery } = crowdsaleScheduleApiSlice;
