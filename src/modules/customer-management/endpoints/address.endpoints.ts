import { Listed } from '@/core/connection/types/response/listed';
import { customerManagementApi } from '../api/customerManagement.api';
import { AddressAddModel, AddressModel, AddressUpdateModel } from '../types/address.types';

export const addressEndpoints = customerManagementApi.injectEndpoints({
  endpoints: builder => ({
    getListAddressesByCustomerId: builder.query<Listed<AddressModel>, string>({
      query: customerId => ({
        url: `addresses/get-list/${customerId}`,
        method: 'GET',
      }),
      providesTags: ['address'],
    }),

    getAddressById: builder.query<AddressModel, string>({
      query: id => ({
        url: `addresses/${id}`,
        method: 'GET',
      }),
      providesTags: ['address'],
    }),

    addAddress: builder.mutation<AddressModel, AddressAddModel>({
      query: body => ({
        url: 'addresses',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['address'],
    }),

    deleteAddress: builder.mutation<AddressModel, string>({
      query: id => ({
        url: `addresses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['address'],
    }),
    updateAddress: builder.mutation<AddressModel, AddressUpdateModel>({
      query: body => ({
        url: `addresses`,
        method: 'PUT',
        data: body,
      }),
      invalidatesTags: ['address'],
    }),
  }),
});

export const {
  //Queries
  useGetListAddressesByCustomerIdQuery,
  useGetAddressByIdQuery,

  //Mutations
  useAddAddressMutation,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} = addressEndpoints;
