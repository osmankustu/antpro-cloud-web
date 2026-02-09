'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useMemo } from 'react';
import { useActivityDetail } from '../hooks/useActivitiyDetail';
import { ActivityDetailContext } from './ActivityDetailContext';

type Props = {
  activityId: string;
  children: ReactNode;
};

export function ActivityDetailProvider({ activityId, children }: Props) {
  const router = useRouter();
  const query = useActivityDetail(activityId);
  const value = useMemo(
    () => ({
      activity: query.activity,
      employeeFullName: query.employeeFullName,
      isLoading: query.isLoading,
      isFetching: query.isFetching,
      isDeleting: query.isDeleting,
      isDeleteSuccess: query.isDeleteSuccess,
      error: query.error,
      refetch: query.refetch,
      handleDelete: query.handleDelete,
    }),
    [
      query.activity,
      query.isLoading,
      query.isFetching,
      query.error,
      query.refetch,
      query.isDeleting,
      query.isDeleteSuccess,
    ],
  );

  return (
    <ActivityDetailContext.Provider value={{ ...value, router: router }}>
      {children}
    </ActivityDetailContext.Provider>
  );
}
