import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { ServiceModel } from '@/modules/service-management/types/service.types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { createContext, useContext } from 'react';

export type ServiceDetailContextType = {
  service?: ServiceModel;
  customerName?: string;
  assignedName?: string;
  isDeleting: boolean;
  isLoading: boolean;
  isFetching: boolean;
  error: ResponseError | null;
  refetch?: () => void;
  handleDelete: () => void;
  router: AppRouterInstance;
};

export const ServiceDetailContext = createContext<ServiceDetailContextType | null>(null);

export function useServiceDetailCtx() {
  const ctx = useContext(ServiceDetailContext);
  if (!ctx) {
    throw new Error('useServiceDetail must be used inside <IndividualDetailProvider>');
  }
  return ctx;
}
