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
  }),
});

export const { useAllCrowdsaleSchedulesQuery } = crowdsaleScheduleApiSlice;
