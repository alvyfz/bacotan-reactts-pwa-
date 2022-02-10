import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counteraja",
  initialState: {
    value: 0,
    todos: [],
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// action creator
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
