import { createSlice } from "@reduxjs/toolkit";
import { data } from "../data";

export const dataSlice = createSlice({
  name: data,
  initialState: {
    data: data,
  },
  reducers: {
    blockUser: () => {},

    unblockUser: () => {},

    deleteUser: () => {},
  },
});
