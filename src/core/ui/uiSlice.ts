import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  loadingCount: number;
}

const initialState: UIState = {
  loadingCount: 0,
};

const UiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    startLoading(state) {
      state.loadingCount++;
    },
    stopLoading(state) {
      state.loadingCount = Math.max(0, state.loadingCount - 1);
    },
  },
});

export const { startLoading, stopLoading } = UiSlice.actions;
export default UiSlice.reducer;
