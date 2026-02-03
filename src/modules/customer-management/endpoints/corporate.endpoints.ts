import { Paginated } from '@/core/connection/types/response/paginated';
import { DynamicQuery } from '@/core/model/dynamicQuery';
import { customerManagementApi } from '../api/customerManagement.api';
import {
  CorporateCustomerAddModel,
  CorporateCustomerModel,
  CorporateCustomerUpdateModel,
} from '../types/corporate.types';

export const corporateEndpoints = customerManagementApi.injectEndpoints({
  endpoints: builder => ({
    getCorporateCustomers: builder.query<
      Paginated<CorporateCustomerModel>,
      { pageIndex?: number; pageSize?: number }
    >({
      query: ({ pageIndex = 0, pageSize = 10 }) => ({
        url: 'customers/corporate',
        method: 'GET',
        params: { pageIndex, pageSize },
      }),
      providesTags: ['corporate'],
    }),

    getCorporateCustomersByDynamic: builder.query<
      Paginated<CorporateCustomerModel>,
      { pageIndex?: number; pageSize?: number; query: DynamicQuery }
    >({
      query: ({ pageIndex = 0, pageSize = 0, query }) => ({
        url: 'customers/corporate/get-list/by-dynamic',
        method: 'POST',
        params: { pageIndex, pageSize },
        data: query,
      }),
      providesTags: ['corporate'],
    }),

    getCorporateCustomerById: builder.query<CorporateCustomerModel, string>({
      query: id => ({
        url: `customers/corporate/${id}`,
        method: 'GET',
      }),
      providesTags: ['corporate'],
    }),

    addCorporateCustomer: builder.mutation<CorporateCustomerModel, CorporateCustomerAddModel>({
      query: body => ({
        url: 'customers/corporate',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['corporate', 'shared'],
    }),
    updateCorporateCustomer: builder.mutation<CorporateCustomerModel, CorporateCustomerUpdateModel>(
      {
        query: body => ({
          url: 'customers/corporate',
          method: 'PUT',
          data: body,
        }),
        invalidatesTags: ['corporate', 'shared'],
      },
    ),
    deleteCorporateCustomer: builder.mutation<any, string>({
      query: id => ({
        url: `customers/corporate/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['corporate', 'shared'],
    }),
  }),
});

export const {
  //Queries
  useGetCorporateCustomersQuery,
  useGetCorporateCustomersByDynamicQuery,
  useGetCorporateCustomerByIdQuery,

  //Mutations
  useAddCorporateCustomerMutation,
  useUpdateCorporateCustomerMutation,
  useDeleteCorporateCustomerMutation,
} = corporateEndpoints;
