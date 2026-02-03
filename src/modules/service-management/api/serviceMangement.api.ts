import { reduxClient } from '@/core/connection/redux/reduxClient';
import { createApi } from '@reduxjs/toolkit/query/react';

export const serviceManagementApi = createApi({
  reducerPath: 'service-management-api',
  baseQuery: reduxClient,
  endpoints: () => ({}),
  tagTypes: ['service', 'service-activity', 'service-document', 'shared'],
});
