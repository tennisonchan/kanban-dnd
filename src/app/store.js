import { configureStore } from "@reduxjs/toolkit";
import { columnSlice } from "app/slices/columns";

export const store = configureStore({
  reducer: {
    [columnSlice.name]: columnSlice.reducer,
  },
});

export const columnState = {
  columns: {},
  columnOrder: [],
};
