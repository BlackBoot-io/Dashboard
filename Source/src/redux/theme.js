import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  lightMode: true
};
const themeSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    dark: (state) => {
      state.lightMode = false;
    },
    light: (state) => {
      state.lightMode = true;
    },
    toggle: (state) => {
      state.lightMode = !state.lightMode;
    },
  },
});
export const { dark, light, toggle } = themeSlice.actions;

export default themeSlice.reducer;
