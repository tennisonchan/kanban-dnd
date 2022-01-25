import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { projectSlice } from "app/slices/projects";

export const store = configureStore({
  reducer: {
    [projectSlice.name]: projectSlice.reducer,
  },
  devTools: true,
  middleware: [...getDefaultMiddleware()],
});
