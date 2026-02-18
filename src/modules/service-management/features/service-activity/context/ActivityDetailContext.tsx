import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { createContext, useContext } from 'react';
import { ActivitiyDetailHookResponse } from '../hooks/types/activityHookReturn.types';

export type ActivityDetailContextType = {
  activityDetailResponse: ActivitiyDetailHookResponse;
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
