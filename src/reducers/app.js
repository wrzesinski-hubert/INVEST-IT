import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  isDarkMode: localStorage.getItem("isDarkMode") === "true" ? true : false,
  page: 1,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    addItems: (state, action) => {
      state.list = state.list.concat(action.payload);
    },
    pageIncrement: (state) => {
      state.page = state.page + 1;
    },
  },
});
export const { changeTheme, addItems, pageIncrement } = appSlice.actions;
export default appSlice.reducer;
