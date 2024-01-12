// Reference: https://redux-toolkit.js.org/api/createSlice
// Reference: https://redux-toolkit.js.org/api/createReducer
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Istudent } from "@/app/interfaces";

const initialState = {} as Partial<Istudent>;

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudentData(state, action: PayloadAction<Partial<Istudent>>) {
      state = action.payload;
    },
  },
});

export const { setStudentData } = studentSlice.actions;
export default studentSlice;
