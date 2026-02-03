import { DynamicQuery } from '@/core/model/dynamicQuery';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StaffManagementUIState {
  isDynamic: boolean;
  dynamicQuery: DynamicQuery | null;
}

const initialState: StaffManagementUIState = {
  isDynamic: false,
  dynamicQuery: { filter: null, sort: null },
};

export const StaffManagementSlice = createSlice({
  name: 'staff-management-ui',
  initialState,
  reducers: {
    setServiceIsDynamic: (state, action: PayloadAction<boolean>) => {
      state.isDynamic = action.payload;
    },
    setServiceDynamicQuery: (state, action: PayloadAction<DynamicQuery | null>) => {
      state.dynamicQuery = action.payload;
    },
  },
});

export const { setServiceDynamicQuery, setServiceIsDynamic } = StaffManagementSlice.actions;
export default StaffManagementSlice.reducer;
