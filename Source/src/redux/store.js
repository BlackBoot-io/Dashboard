import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api";
import auth from "redux/auth";
import drawer from "redux/drawer";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth,
    drawer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
  devTools: true,
});
export default store;
