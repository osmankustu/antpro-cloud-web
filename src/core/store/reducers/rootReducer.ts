import AuthReducer from '@/core/auth/store/authSlice';
import UiReducer from '@/core/ui/uiSlice';
import { customerManagementApi } from '@/modules/customer-management/api/customerManagement.api';
import CustomerManagementUIReducer from '@/modules/customer-management/store/customerManagementSlice';
import { serviceManagementApi } from '@/modules/service-management/api/serviceMangement.api';
import ServiceManagementUIReducer from '@/modules/service-management/store/serviceManagementSlice';
import { staffManagementApi } from '@/modules/staff-management/api/staffManagement.api';
import StaffManagementUiReducer from '@/modules/staff-management/store/staffManagementSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  ui: UiReducer,
  auth: AuthReducer,
  serviceManagementUi: ServiceManagementUIReducer,
  CustomerManagementUi: CustomerManagementUIReducer,
  StaffManagementUi: StaffManagementUiReducer,
  [serviceManagementApi.reducerPath]: serviceManagementApi.reducer,
  [customerManagementApi.reducerPath]: customerManagementApi.reducer,
  [staffManagementApi.reducerPath]: staffManagementApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
