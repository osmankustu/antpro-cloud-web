import { customerManagementApi } from '@/modules/customer-management/api/customerManagement.api';
import { serviceManagementApi } from '@/modules/service-management/api/serviceMangement.api';
import { staffManagementApi } from '@/modules/staff-management/api/staffManagement.api';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore } from 'redux-persist';
import { persistedReducer } from '../reducers/persistedReducer';

export const rootStore = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      serviceManagementApi.middleware,
      customerManagementApi.middleware,
      staffManagementApi.middleware,
    ),
  // devTools: process.env.NEXT_PUBLIC_DEBUG,
  // enhancers:(getDefaultEnhancers) => process.env.NEXT_PUBLIC_DEBUG ? getDefaultEnhancers().concat() : getDefaultEnhancers();
});

setupListeners(rootStore.dispatch);
export const persistor = persistStore(rootStore);
export type AppDispatch = typeof rootStore.dispatch;
export type RootState = ReturnType<typeof rootStore.getState>;
