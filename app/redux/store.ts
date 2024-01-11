// Reference: https://redux-toolkit.js.org/usage/nextjs
import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "./Slices/studentSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      student: studentSlice.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
