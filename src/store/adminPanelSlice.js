import { createSlice } from "@reduxjs/toolkit";

export const adminPanelSlice = createSlice({
  name: "panel",
  initialState: {
    panelIsVisible: false,
  },
  reducers: {
    setPanelIsVisible: (state, action) => {
      state.panelIsVisible = action.payload;
    },
  },
});
