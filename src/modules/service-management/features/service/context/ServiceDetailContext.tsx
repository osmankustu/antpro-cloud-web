import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { createContext, useContext } from 'react';
import { ServiceDetailHookResponse } from '../hooks/types/serviceHookReturn.types';

export interface ServiceDetailContextType {
  serviceDetailResponse: ServiceDetailHookResponse;
  router: AppRouterInstance;
}

export const ServiceDetailContext = createContext<ServiceDetailContextType | null>(null);

export function useServiceDetailCtx(): ServiceDetailContextType {
  const ctx = useContext(ServiceDetailContext);
  if (!ctx) {
    throw new Error('useServiceDetail must be used inside <IndividualDetailProvider>');
  }
  return ctx;
}
