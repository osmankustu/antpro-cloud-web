import { DynamicQuery } from '@/core/model/dynamicQuery';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ServiceManagementUIState {
  isDynamic: boolean;
  dynamicQuery: DynamicQuery | null;
}

const initialState: ServiceManagementUIState = {
  isDynamic: false,
  dynamicQuery: { filter: null, sort: null },
};

export const ServiceManagementSlice = createSlice({
  name: 'service-management-ui',
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

export const { setServiceDynamicQuery, setServiceIsDynamic } = ServiceManagementSlice.actions;
export default ServiceManagementSlice.reducer;
