'use client';
import { useRouter } from 'next/navigation';
import { ReactNode, useMemo } from 'react';
import { useCorporateDetail } from '../hooks/useCorporateDetail';
import { CorporateDetailContext } from './CorporateDetailContext';

type Props = {
  customerId: string;
  children: ReactNode;
};

export function CorporateDetailProvider({ customerId, children }: Props) {
  const router = useRouter();
  const query = useCorporateDetail(customerId);
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
    <CorporateDetailContext.Provider value={{ ...value, router: router }}>
      {children}
    </CorporateDetailContext.Provider>
  );
}
