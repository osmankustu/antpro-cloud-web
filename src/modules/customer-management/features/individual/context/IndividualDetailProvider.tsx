'use client';
import { useRouter } from 'next/navigation';
import { ReactNode, useMemo } from 'react';
import { useIndividualDetail } from '../hooks/useIndividualDetail';
import { IndividualDetailContext } from './IndividualDetailContext';

type Props = {
  customerId: string;
  children: ReactNode;
};

export function IndividualDetailProvider({ customerId, children }: Props) {
  const router = useRouter();
  const query = useIndividualDetail(customerId);
  const value = useMemo(
    () => ({
      customer: query.customer,
      addresses: query.addresses,
      isLoading: query.isLoading,
      isFetching: query.isFetching,
      isDeleting: query.isDeleting,
      error: query.error,
      refetch: query.refetch,
      handleDelete: query.handleDelete,
      handleDeleteAddress: query.handleDeleteAddress,
    }),
    [
      query.customer,
      query.isLoading,
      query.isFetching,
      query.error,
      query.refetch,
      query.handleDeleteAddress,
    ],
  );

  return (
    <IndividualDetailContext.Provider value={{ ...value, router: router }}>
      {children}
    </IndividualDetailContext.Provider>
  );
}
