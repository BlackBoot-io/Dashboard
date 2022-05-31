import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api"
import authReducer from 'features/auth/slice'

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:  true
});
export default store;