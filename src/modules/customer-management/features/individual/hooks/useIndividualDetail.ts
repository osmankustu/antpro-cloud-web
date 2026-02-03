import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { Toast } from '@/core/utils/toast/toast';
import {
  useDeleteAddressMutation,
  useGetListAddressesByCustomerIdQuery,
} from '@/modules/customer-management/endpoints/address.endpoints';
import {
  useDeleteIndividualCustomerMutation,
  useGetIndividualCustomerByIdQuery,
} from '@/modules/customer-management/endpoints/individual.endpoints';
import { useEffect, useState } from 'react';

export function useIndividualDetail(customerId: string) {
  const [error, setError] = useState<ResponseError | undefined>(undefined);
  const {
    data: customer,
    isLoading: customerLoading,
    isFetching: customerFetching,
    error: customerError,
    refetch,
  } = useGetIndividualCustomerByIdQuery(customerId, { skip: !customerId });

  const {
    data: addresses,
    isLoading: addressLoading,
    isFetching: addressFetching,
    error: addressError,
  } = useGetListAddressesByCustomerIdQuery(customerId, {
    skip: !customerId,
  });

  const [deleteCustomer, { error: deleteError, isLoading: isDeletingCustomer }] =
    useDeleteIndividualCustomerMutation();
  const [deleteAddress, { error: deleteAddressError, isLoading: isDeletingAddress }] =
    useDeleteAddressMutation();

  //Mixing
  const endpointError = (customerError ||
    addressError ||
    deleteError ||
    deleteAddressError) as ResponseError;
  const isLoading = customerLoading || addressLoading;
  const isFetching = customerFetching || addressFetching;
  const isDeleting = isDeletingCustomer || isDeletingAddress;

  useEffect(() => {
    if (!endpointError) return;
    setError(endpointError);
    Toast.error(endpointError?.title);
  }, [endpointError]);

  //Delete Logic
  const handleDelete = async () => {
    await deleteCustomer(customerId).unwrap();
    Toast.success('Müşteri Silindi');
  };

  const handleDeleteAddress = async (id: string) => {
    await deleteAddress(id).unwrap();
    Toast.success('Adres Silindi');
  };

  return {
    customer,
    addresses,
    error,
    isLoading,
    isFetching,
    isDeleting,
    handleDelete,
    handleDeleteAddress,
    refetch,
  };
}
