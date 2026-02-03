import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { Listed } from '@/core/connection/types/response/listed';
import { AddressModel } from '@/modules/customer-management/types/address.types';
import { IndividualCustomerModel } from '@/modules/customer-management/types/individual.types.';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { createContext, useContext } from 'react';

export type IndividualDetailContextType = {
  customer?: IndividualCustomerModel;
  addresses?: Listed<AddressModel>;
  isDeleting: boolean;
  isLoading: boolean;
  isFetching: boolean;
  error?: ResponseError | null;
  refetch?: () => void;
  handleDelete: () => void;
  handleDeleteAddress: (id: string) => Promise<void>;
  router: AppRouterInstance;
};

export const IndividualDetailContext = createContext<IndividualDetailContextType | null>(null);

export function useIndividualDetailCtx() {
  const ctx = useContext(IndividualDetailContext);
  if (!ctx) {
    throw new Error('useIndividualDetail must be used inside <ServiceDetailProvider>');
  }
  return ctx;
}
