import { createSlice, configureStore } from "@reduxjs/toolkit";
import InputType from "./types/inputType";

interface HistoryState {
  history: InputType[];
}

const historySlice = createSlice({
  name: "history",
  initialState: {
    history: [],
  } as HistoryState,
  reducers: {
    append: (state, action) => {
      state.history = [action.payload, ...state.history];
    },
  },
});

export const store = configureStore({
  reducer: historySlice.reducer,
});

export const { append } = historySlice.actions;

export type IRootState = ReturnType<typeof store.getState>;

export default historySlice.reducer;
