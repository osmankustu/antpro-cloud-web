import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { Toast } from '@/core/utils/toast/toast';
import {
  useDeleteActivityMutation,
  useGetActivitiesByPoolIdQuery,
} from '@/modules/service-management/endpoints/activity.endpoints';
import { useStaffSharedEndpoints } from '@/modules/staff-management/hooks/useStaffSharedEndpoints';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';

export function useActivities(poolId: string) {
  const [error, setError] = useState<ResponseError>();
  const staffEndpoints = useStaffSharedEndpoints();
  const [activities, setActivities] = useState<any[]>([]);
  const employees = staffEndpoints.getAllEmployees;
  const activitiesQuery = useGetActivitiesByPoolIdQuery(poolId ?? skipToken);
  const [deleteActivity, deleteState] = useDeleteActivityMutation();

  const fetchError = (activitiesQuery.error || employees.error) as ResponseError;

  useEffect(() => {
    if (!activitiesQuery.data || !employees.data) return;

    const employeeMap = new Map(employees.data.items.map(e => [e.id, e.fullName]));

    const merged = activitiesQuery.data.items.map(activity => ({
      ...activity,
      employeeFullName: employeeMap.get(activity.employeeId),
    }));

    setActivities(merged);
  }, [activitiesQuery.data, employees.data]);

  const DeleteActivityAction = async (id: string) => {
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
    await Promise.all([employees.refetch(), activitiesQuery.refetch()]);
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
      activitiesState: activitiesQuery,
      deleteState: deleteState,
      employeesState: employees,
    },
    errors: {
      error,
    },
    actions: {
      deleteActivity: (id: string) => DeleteActivityAction(id),
      refetch: refetchAction,
    },
  };
}
