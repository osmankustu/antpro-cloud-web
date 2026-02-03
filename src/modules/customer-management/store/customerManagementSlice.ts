import { DynamicQuery } from '@/core/model/dynamicQuery';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CustomerManagementUIState {
  isDynamic: boolean;
  dynamicQuery: DynamicQuery | null;
}

const initialState: CustomerManagementUIState = {
  isDynamic: false,
  dynamicQuery: { filter: null, sort: null },
};

export const CustomerManagementSlice = createSlice({
  name: 'customer-management-ui',
  initialState,
  reducers: {
    setCustomerIsDynamic: (state, action: PayloadAction<boolean>) => {
      state.isDynamic = action.payload;
    },
    setCustomerDynamicQuery: (state, action: PayloadAction<DynamicQuery | null>) => {
      state.dynamicQuery = action.payload;
    },
  },
});

export const { setCustomerDynamicQuery, setCustomerIsDynamic } = CustomerManagementSlice.actions;
export default CustomerManagementSlice.reducer;
