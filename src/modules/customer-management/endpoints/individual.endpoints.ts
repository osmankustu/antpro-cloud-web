import { Paginated } from '@/core/connection/types/response/paginated';
import { DynamicQuery } from '@/core/model/dynamicQuery';
import { customerManagementApi } from '@/modules/customer-management/api/customerManagement.api';
import {
  IndividualCustomerAddModel,
  IndividualCustomerModel,
  IndividualCustomerUpdateModel,
} from '../types/individual.types.';

export const individualEndpoints = customerManagementApi.injectEndpoints({
  endpoints: builder => ({
    getIndividualCustomers: builder.query<
      Paginated<IndividualCustomerModel>,
      { pageIndex?: number; pageSize?: number }
    >({
      query: ({ pageIndex = 0, pageSize = 10 }) => ({
        url: 'customers/individual',
        method: 'GET',
        params: { pageIndex, pageSize },
      }),
      providesTags: ['individual'],
    }),

    getIndividualCustomersByDynamic: builder.query<
      Paginated<IndividualCustomerModel>,
      { pageIndex?: number; pageSize?: number; query: DynamicQuery }
    >({
      query: ({ pageIndex = 0, pageSize = 10, query }) => ({
        url: 'customers/individual/get-list/by-dynamic',
        method: 'POST',
        params: { pageIndex, pageSize },
        data: query,
      }),
      providesTags: ['individual'],
    }),

    getIndividualCustomerById: builder.query<IndividualCustomerModel, string>({
      query: id => ({
        url: `customers/individual/${id}`,
        method: 'GET',
      }),
      providesTags: ['individual'],
    }),

    addIndividualCustomer: builder.mutation<IndividualCustomerModel, IndividualCustomerAddModel>({
      query: body => ({
        url: 'customers/individual',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['individual', 'shared'],
    }),

    updateIndividualCustomer: builder.mutation<any, IndividualCustomerUpdateModel>({
      query: body => ({
        url: 'customers/individual',
        method: 'PUT',
        data: body,
      }),
      invalidatesTags: ['individual', 'shared'],
    }),

    deleteIndividualCustomer: builder.mutation<any, string>({
      query: id => ({
        url: `customers/individual/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['individual', 'shared'],
    }),
  }),
});

export const {
  // Queries
  useGetIndividualCustomersQuery,
  useGetIndividualCustomersByDynamicQuery,
  useGetIndividualCustomerByIdQuery,

  // Mutations
  useAddIndividualCustomerMutation,
  useUpdateIndividualCustomerMutation,
  useDeleteIndividualCustomerMutation,
} = individualEndpoints;
