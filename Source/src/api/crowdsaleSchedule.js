import { apiSlice } from "api";
import addresses from "api/addresses";

export const crowdsaleScheduleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    all: builder.query({
      query: () => ({
        url: `/${addresses.crowdsaleSchedule_all}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAllQuery } = crowdsaleScheduleApiSlice;
