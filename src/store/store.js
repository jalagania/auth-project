import { configureStore } from "@reduxjs/toolkit";
import { adminPanelSlice } from "./adminPanelSlice";
import { dataSlice } from "./dataSlice";
import { formSlice } from "./formSlice";

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    form: formSlice.reducer,
    panel: adminPanelSlice.reducer,
  },
});
