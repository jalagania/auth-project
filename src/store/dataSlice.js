import { createSlice } from "@reduxjs/toolkit";
import { data } from "../data";

export const dataSlice = createSlice({
  initialState: {
    data: data,
  },
  reducers: {
    blockUser: () => {},

    unblockUser: () => {},

    deleteUser: () => {},
  },
});
