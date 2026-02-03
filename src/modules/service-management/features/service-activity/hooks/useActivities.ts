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
  const [error, setError] = useState<ResponseError | undefined>(undefined);
  const { getAllEmployees } = useStaffSharedEndpoints();
  const [activities, setActivities] = useState<any[]>([]);

  const {
    data: employees,
    isFetching: employeesFetching,
    isLoading: employeesLoading,
    error: employeesError,
  } = getAllEmployees;

  const {
    data,
    error: activitiesError,
    isFetching: activitiesFetching,
    isLoading: activitiesLoading,
    refetch: activitiesRefetch,
  } = useGetActivitiesByPoolIdQuery(poolId ?? skipToken);

  const endpointError = (employeesError || activitiesError) as ResponseError;
  const isLoading = employeesLoading || activitiesLoading;
  const isFetching = employeesFetching || activitiesFetching;

  const [deleteActivity, { isLoading: isDeleting }] = useDeleteActivityMutation();

  useEffect(() => {
    if (!data || !employees) return;

    const employeeMap = new Map(employees.items.map(e => [e.id, e.fullName]));

    const merged = data.items.map(activity => ({
      ...activity,
      employeeFullName: employeeMap.get(activity.employeeId),
    }));

    setActivities(merged);
  }, [data, employees]);

  const handleDelete = async (id: string) => {
    try {
      await deleteActivity(id).unwrap();
      activitiesRefetch();
    } catch (error) {
      const err = error as ResponseError;
      Toast.error(err.title || 'Aktivite Silindi');
    }
  };

  // Show API Errors once
  useEffect(() => {
    if (!endpointError) return;
    setError(endpointError);
    Toast.error(endpointError.title);
  }, [endpointError]);

  return {
    activities,
    isLoading,
    isFetching,
    error,
    activitiesRefetch,
    handleDelete,
    isDeleting,
  };
}
