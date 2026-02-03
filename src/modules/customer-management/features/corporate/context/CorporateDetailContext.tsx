import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { Listed } from '@/core/connection/types/response/listed';
import { AddressModel } from '@/modules/customer-management/types/address.types';
import { CorporateCustomerModel } from '@/modules/customer-management/types/corporate.types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { createContext, useContext } from 'react';

export type CorporateDetailContextType = {
  customer?: CorporateCustomerModel;
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

export const CorporateDetailContext = createContext<CorporateDetailContextType | null>(null);

export function useCorporateDetailCtx() {
  const ctx = useContext(CorporateDetailContext);
  if (!ctx) {
    throw new Error('useCoporateDetailCtx must be used inside <CorporateDetailProvider>');
  }
  return ctx;
}
