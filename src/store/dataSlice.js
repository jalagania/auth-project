import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    currentUser: "",
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },

    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },

    selectAll: (state, action) => {
      state.data.forEach((user) => (user.selected = action.payload));
    },

    selectUser: (state, action) => {
      const index = state.data.findIndex((user) => user.id === action.payload);
      state.data[index].selected = !state.data[index].selected;
    },

    blockUser: (state) => {
      state.data.forEach((user) => {
        if (user.selected === true) {
          user.blocked = true;
        }
      });
    },

    unblockUser: (state) => {
      state.data.forEach((user) => {
        if (user.selected === true) {
          user.blocked = false;
        }
      });
    },

    deleteUser: (state) => {
      state.data = state.data.filter((user) => user.selected !== true);
    },
  },
});
