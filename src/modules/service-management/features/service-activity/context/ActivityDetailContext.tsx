import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { ActivityModel } from '@/modules/service-management/types/activity.types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { createContext, useContext } from 'react';

export type ActivityDetailContextType = {
  activity?: ActivityModel;
  employeeFullName: string | null;
  isLoading: boolean;
  isFetching: boolean;
  isDeleting: boolean;
  error: ResponseError | undefined;
  refetch: () => void;
  handleDelete: () => void;
  router: AppRouterInstance;
};

export const ActivityDetailContext = createContext<ActivityDetailContextType | null>(null);

export function useActivityDetailCtx() {
  const ctx = useContext(ActivityDetailContext);
  if (!ctx) {
    throw new Error('useActivityDetail must be used inside <ActivityDetailProvider>');
  }
  return ctx;
}
