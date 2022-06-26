import { apiSlice } from "api";
import addresses from "api/addresses";

export const transactionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAll: builder.query({
            query: () => ({
                url: `/${addresses.transaction_getAll}`,
                method: "GET",
            }),
        }),
        getById: builder.mutation({
            query: (transactionId) => ({
                url: `/${addresses.transaction_getById}?transactionId=${transactionId}`,
                method: "GET",
            }),
        }),
        getUserBalance: builder.query({
            query: () => ({
                url: `/${addresses.transaction_getUserBalance}`,
                method: "GET",
            }),
        }),
        add: builder.mutation({
            query: (transaction) => {
                debugger;
                return {
                    url: `/${addresses.transaction_add}`,
                    method: "POST",
                    body: { ...transaction },
                };
            }, 
        })
    }),
});

export const { useGetByIdMutation, useGetAllQuery, useGetUserBalanceQuery, useAddMutation} = transactionApiSlice;
