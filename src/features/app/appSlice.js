import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  colorMode: "light",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    colorModeUpdated: (state, action) => {
      state.colorMode = action.payload;
    },
  },
});

export const selectColorMode = (state) => state.app.colorMode;

export const { colorModeUpdated } = appSlice.actions;

export default appSlice.reducer;
