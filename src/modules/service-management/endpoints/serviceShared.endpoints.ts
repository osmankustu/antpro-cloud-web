import { Paginated } from '@/core/connection/types/response/paginated';
import { DynamicQuery } from '@/core/model/dynamicQuery';
import { serviceManagementApi } from '@/modules/service-management/api/serviceMangement.api';
import { ServiceModel } from '../types/service.types';

export const serviceSharedEndpoints = serviceManagementApi.injectEndpoints({
  endpoints: builder => ({
    getServicesByCustomerId: builder.query<
      Paginated<ServiceModel>,
      { pageIndex?: number; pageSize?: number; customerId: string }
    >({
      query: ({ pageIndex = 0, pageSize = 10, customerId }) => ({
        url: 'services/get-list/by-customer-id',
        method: 'GET',
        params: { pageIndex, pageSize, customerId },
      }),
      providesTags: ['shared'],
    }),

    getServicesByDynamicCustomerId: builder.query<
      Paginated<ServiceModel>,
      { pageIndex: number; pageSize: number; customerId: string; query: DynamicQuery }
    >({
      query: ({ pageIndex = 0, pageSize = 10, customerId, query }) => ({
        url: 'services/get-list/by-dynamic-customer-id',
        method: 'POST',
        params: { pageIndex, pageSize, customerId },
        data: query,
      }),
      providesTags: ['shared'],
    }),
  }),
});

export const {
  //Queries

  useGetServicesByCustomerIdQuery,
  useGetServicesByDynamicCustomerIdQuery,
  //Mutations
} = serviceSharedEndpoints;
