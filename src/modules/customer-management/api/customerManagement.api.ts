import { reduxClient } from '@/core/connection/redux/reduxClient';
import { createApi } from '@reduxjs/toolkit/query/react';

export const customerManagementApi = createApi({
  reducerPath: 'customer-management-api',
  baseQuery: reduxClient,
  endpoints: () => ({}),
  refetchOnFocus: true,
  refetchOnReconnect: true,

  tagTypes: ['customer-management', 'individual', 'corporate', 'address', 'shared'],
});
