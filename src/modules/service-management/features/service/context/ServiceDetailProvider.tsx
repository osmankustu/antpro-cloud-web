'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useMemo } from 'react';
import { useServiceDetail } from '../hooks/useServiceDetail';
import { ServiceDetailContext } from './ServiceDetailContext';

type Props = {
  serviceId: string;
  children: ReactNode;
};

export function ServiceDetailProvider({ serviceId, children }: Props) {
  const router = useRouter();
  const query = useServiceDetail(serviceId);
  const value = useMemo(
    () => ({
      service: query.service,
      customerName: query.customerName,
      assignedName: query.assignedName,
      isLoading: query.isLoading,
      isFetching: query.isFetching,
      isDeleting: query.isDeleting,
      error: query.error,
      refetch: query.refetch,
      handleDelete: query.handleDelete,
    }),
    [query.service, query.isLoading, query.isFetching, query.error, query.refetch],
  );

  return (
    <ServiceDetailContext.Provider value={{ ...value, router: router }}>
      {children}
    </ServiceDetailContext.Provider>
  );
}
