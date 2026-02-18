import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { Toast } from '@/core/utils/toast/toast';
import {
  useDeleteActivityMutation,
  useGetActivityByIdQuery,
} from '@/modules/service-management/endpoints/activity.endpoints';
import { useStaffSharedEndpoints } from '@/modules/staff-management/hooks/useStaffSharedEndpoints';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useMemo, useState } from 'react';
import { ActivitiyDetailHookResponse } from './types/activityHookReturn.types';

export function useActivityDetail(activityId: string): ActivitiyDetailHookResponse {
  const [error, setError] = useState<ResponseError | undefined>(undefined);
  const staffEndpoints = useStaffSharedEndpoints();
  const activityQuery = useGetActivityByIdQuery(activityId ?? skipToken);
  const employeesQuery = staffEndpoints.getAllEmployees;
  const [deleteActivity, deleteState] = useDeleteActivityMutation();

  const fetchError = (activityQuery.error || employeesQuery.error) as ResponseError;

  // Merge employee name properly
  const employeeFullName = useMemo(() => {
    if (!activityQuery.data || !employeesQuery.data) return null;

    if (activityQuery.data.employeeId === null) return 'Sistem';

    const employee = employeesQuery.data.items.find(e => e.id === activityQuery.data?.employeeId);

    return employee?.fullName ?? 'Bilinmiyor';
  }, [activityQuery.data, employeesQuery.data]);

  // Show API Errors once
  useEffect(() => {
    if (!fetchError) return;
    setError(fetchError);
    Toast.error(fetchError.title);
  }, [fetchError]);

  const deleteAction = async () => {
    try {
      await deleteActivity(activityId).unwrap();
    } catch (error) {
      const err = error as ResponseError;
      Toast.error(err.title || 'Aktivite Silindi');
    }
  };

  const refetchAction = async () => {
    setError(undefined);
    await Promise.all([activityQuery.refetch(), employeesQuery.refetch()]);
  };

  return {
    // Data

    data: {
      activity: activityQuery.data,
      employeeName: employeeFullName,
    },
    state: {
      activityState: activityQuery,
      employeeState: employeesQuery,
      deleteState: deleteState,
    },
    errors: {
      error,
      fetchError,
    },
    actions: {
      delete: deleteAction,
      refetch: refetchAction,
    },
  };
}
