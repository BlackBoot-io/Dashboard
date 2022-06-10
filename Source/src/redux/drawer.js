import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isOpen: false,
};
const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});
export const { close, open, toggle } = drawerSlice.actions;

export default drawerSlice.reducer;
