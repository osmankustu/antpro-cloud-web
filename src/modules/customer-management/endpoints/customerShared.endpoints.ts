import { Listed } from '@/core/connection/types/response/listed';
import { GeoModel } from '@/core/model/geoModel';
import { customerManagementApi } from '@/modules/customer-management/api/customerManagement.api';
import { AddressAddModel, AddressModel } from '../types/address.types';
import { BaseAddress } from '../types/base/baseAddress';
import { BaseCustomer } from '../types/base/baseCustomer';

export const customerSharedEndpoints = customerManagementApi.injectEndpoints({
  endpoints: builder => ({
    addAddress: builder.mutation<AddressModel, AddressAddModel>({
      query: body => ({
        url: 'addresses',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['shared'],
    }),

    //Get All Customers Options For Select
    getAllCustomers: builder.query<Listed<BaseCustomer>, void>({
      query: () => ({
        url: '/customers',
        method: 'GET',
      }),
      providesTags: ['shared'],
    }),
    //Get All Individual Options For Select
    getIndividualOptions: builder.query<Listed<BaseCustomer>, void>({
      query: () => ({
        url: '/customers/individual/get-list/for-select',
        method: 'GET',
      }),
      providesTags: ['shared'],
    }),
    //Get All Corporate Options For Select
    getCorporateOptions: builder.query<Listed<BaseCustomer>, void>({
      query: () => ({
        url: '/customers/corporate/get-list/for-select',
        method: 'GET',
      }),
      providesTags: ['shared'],
    }),
    //Get By Id Customer Address List
    getByIdCustomerAddressList: builder.query<Listed<BaseAddress>, string>({
      query: customerId => ({
        url: `addresses/get-list/${customerId}`,
        method: 'GET',
      }),
      providesTags: ['shared'],
    }),
    getGeoOptions: builder.query<Listed<GeoModel>, number | void>({
      query: (cityId?) => ({
        url: !cityId ? `auth/address` : `auth/address?cityId=${cityId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  // Queries
  useGetAllCustomersQuery,
  useGetCorporateOptionsQuery,
  useGetIndividualOptionsQuery,
  useGetByIdCustomerAddressListQuery,
  useGetGeoOptionsQuery,
  //Mutations
  useAddAddressMutation,
} = customerSharedEndpoints;
