import { Paginated } from '@/core/connection/types/response/paginated';
import { DynamicQuery } from '@/core/model/dynamicQuery';
import { serviceManagementApi } from '@/modules/service-management/api/serviceMangement.api';
import { ServiceAddModel, ServiceModel, ServiceUpdateModel } from '../types/service.types';

export const serviceEndpoints = serviceManagementApi.injectEndpoints({
  endpoints: builder => ({
    getServices: builder.query<Paginated<ServiceModel>, { pageIndex?: number; pageSize?: number }>({
      query: ({ pageIndex = 0, pageSize = 10 }) => ({
        url: 'services',
        method: 'GET',
        params: { pageIndex, pageSize },
      }),
      providesTags: ['service'],
    }),

    getServicesByDynamic: builder.query<
      Paginated<ServiceModel>,
      { pageIndex: number; pageSize: number; query: DynamicQuery }
    >({
      query: ({ pageIndex = 0, pageSize = 10, query }) => ({
        url: 'services/get-list/by-dynamic',
        method: 'POST',
        params: { pageIndex, pageSize },
        data: query,
      }),
      providesTags: ['service'],
    }),

    getServiceById: builder.query<ServiceModel, string>({
      query: id => ({
        url: `services/${id}`,
        method: 'GET',
      }),
      providesTags: ['service'],
    }),

    addService: builder.mutation<ServiceModel, ServiceAddModel>({
      query: body => ({
        url: 'services',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['service', 'shared'],
    }),

    updateService: builder.mutation<any, ServiceUpdateModel>({
      query: body => ({
        url: 'services',
        method: 'PUT',
        data: body,
      }),
      invalidatesTags: ['service', 'shared'],
    }),

    deleteService: builder.mutation<any, string>({
      query: id => ({
        url: `services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['service', 'shared'],
    }),
  }),
});

export const {
  //Queries
  useGetServicesQuery,
  useGetServicesByDynamicQuery,
  useGetServiceByIdQuery,
  //Mutations
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceEndpoints;
