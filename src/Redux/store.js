import { configureStore } from "@reduxjs/toolkit";
import curdSlice from "./CurdSlice";

export const store = configureStore({
  reducer: {
    curd: curdSlice,
  },
});
