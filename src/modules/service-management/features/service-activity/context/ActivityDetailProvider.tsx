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
      activity: query.data.activitiy,
      employeeFullName: query.data.employeeFullName,
      isLoading: query.state.activityState.isLoading,
      isFetching: query.state.activityState.isFetching,
      isDeleting: query.state.deleteSubmitStatus.isLoading,
      isDeleteSuccess: query.state.deleteSubmitStatus.isSuccess,
      error: query.errors.error,
      refetch: query.actions.refetch,
      handleDelete: query.actions.delete,
    }),
    [
      query.data.activitiy,
      query.state.activityState.isLoading,
      query.state.activityState.isFetching,
      query.errors.error,
      query.actions.refetch,
      query.actions.delete,
      query.state.deleteSubmitStatus.isSuccess,
    ],
  );

  return (
    <ActivityDetailContext.Provider value={{ ...value, router: router }}>
      {children}
    </ActivityDetailContext.Provider>
  );
}
