import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    formIsVisible: true,
  },
  reducers: {
    setFormIsVisible: (state, action) => {
      state.formIsVisible = action.payload;
    },
  },
});
