import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api";
import auth from "redux/auth";
import drawer from "redux/drawer";
import theme from "redux/theme";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth,
    drawer,
    theme
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
  devTools: true,
});
export default store;
