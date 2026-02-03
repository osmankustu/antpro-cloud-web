import { reduxClient } from '@/core/connection/redux/reduxClient';
import { createApi } from '@reduxjs/toolkit/query/react';

export const staffManagementApi = createApi({
  reducerPath: 'staff-management-api',
  baseQuery: reduxClient,
  endpoints: () => ({}),
  tagTypes: ['staff-management', 'team', 'employee', 'shared'],
});
