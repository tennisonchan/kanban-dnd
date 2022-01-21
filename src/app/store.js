import { configureStore } from "@reduxjs/toolkit";
import { columnSlice } from "app/slices/columns";
import { noteSlice } from "app/slices/notes";

export const store = configureStore({
  reducer: {
    [columnSlice.name]: columnSlice.reducer,
    [noteSlice.name]: noteSlice.reducer,
  },
});
