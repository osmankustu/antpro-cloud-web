import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { Toast } from '@/core/utils/toast/toast';
import {
  useDeleteActivityMutation,
  useGetActivitiesByPoolIdQuery,
} from '@/modules/service-management/endpoints/activity.endpoints';
import { ActivityModel } from '@/modules/service-management/types/activity.types';
import { useStaffSharedEndpoints } from '@/modules/staff-management/hooks/useStaffSharedEndpoints';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { ActivitiesHookResponse } from './types/activityHookReturn.types';

export function useActivities(poolId?: string): ActivitiesHookResponse {
  const [error, setError] = useState<ResponseError>();
  const staffEndpoints = useStaffSharedEndpoints();
  const [activities, setActivities] = useState<ActivityModel[]>([]);
  const employeesQuery = staffEndpoints.getAllEmployees;
  const activitiesQuery = useGetActivitiesByPoolIdQuery(poolId ?? skipToken);
  const [deleteActivity, deleteState] = useDeleteActivityMutation();

  const fetchError = (activitiesQuery.error || employeesQuery.error) as ResponseError;

  useEffect(() => {
    if (!activitiesQuery.data || !employeesQuery.data) return;

    const employeeMap = new Map(employeesQuery.data.items.map(e => [e.id, e.fullName]));

    const merged = activitiesQuery.data.items.map(activity => ({
      ...activity,
      employeeFullName: employeeMap.get(activity.employeeId),
    }));

    setActivities(merged);
  }, [activitiesQuery.data, employeesQuery.data]);

  const deleteAction = async (id: string) => {
    try {
      await deleteActivity(id).unwrap();
    } catch (error) {
      setError(error as ResponseError);
      const err = error as ResponseError;
      Toast.error(err.title || 'Aktivite Silindi');
    }
  };

  const refetchAction = async () => {
    setError(undefined);
    await Promise.all([employeesQuery.refetch(), activitiesQuery.refetch()]);
  };

  // Show API Errors once
  useEffect(() => {
    if (!fetchError) return;

    setError(fetchError);
    Toast.error((fetchError as ResponseError).title);
  }, [fetchError]);

  return {
    data: {
      activities: activities,
    },
    state: {
      activityState: activitiesQuery,
      employeeState: employeesQuery,
      deleteState: deleteState,
    },
    errors: {
      error: error,
      fetchError: fetchError as ResponseError,
    },
    actions: {
      delete: (id: string) => deleteAction(id),
      refetch: refetchAction,
    },
  };
}
