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
      service: query.data.service,
      customerName: query.data.customerName,
      assignedName: query.data.assignedName,
      isLoading: query.state.serviceState.isLoading,
      isFetching: query.state.serviceState.isFetching,
      isDeleting: query.state.deleteState.isLoading,
      error: query.errors.error,
      refetch: query.actions.refetch,
      handleDelete: query.actions.delete,
    }),
    [
      query.data.service,
      query.state.serviceState.isLoading,
      query.state.serviceState.isFetching,
      query.errors.error,
      query.actions.refetch,
      query.actions.delete,
    ],
  );

  return (
    <ServiceDetailContext.Provider value={{ ...value, router: router }}>
      {children}
    </ServiceDetailContext.Provider>
  );
}
