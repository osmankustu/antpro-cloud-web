import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  loadingCount: number;
  uploadProgress: number | null;
}

const initialState: UIState = {
  loadingCount: 0,
  uploadProgress: null,
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
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload;
    },
    clearUploadProgress: state => {
      state.uploadProgress = null;
    },
  },
});

export const { startLoading, stopLoading, setUploadProgress, clearUploadProgress } =
  UiSlice.actions;
export default UiSlice.reducer;
