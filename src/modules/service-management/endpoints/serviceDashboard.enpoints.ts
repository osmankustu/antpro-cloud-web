import { Listed } from '@/core/connection/types/response/listed';
import { serviceManagementApi } from '@/modules/service-management/api/serviceMangement.api';
import { OpenServiceModel } from '../types/dashboard.types';

export const serviceDashboardEndpoints = serviceManagementApi.injectEndpoints({
  endpoints: builder => ({
    getServicesOpenServices: builder.query<Listed<OpenServiceModel>, void>({
      query: () => ({
        url: 'dashboards/get-all/open-service-locations',
        method: 'GET',
      }),
      providesTags: ['service'],
    }),
  }),
});

export const { useGetServicesOpenServicesQuery } = serviceDashboardEndpoints;
