import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { Toast } from '@/core/utils/toast/toast';
import {
  useDeleteActivityMutation,
  useGetActivityByIdQuery,
} from '@/modules/service-management/endpoints/activity.endpoints';
import { useStaffSharedEndpoints } from '@/modules/staff-management/hooks/useStaffSharedEndpoints';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useMemo, useState } from 'react';

export function useActivityDetail(activityId: string) {
  const [error, setError] = useState<ResponseError | undefined>(undefined);
  const { getAllEmployees } = useStaffSharedEndpoints();
  const {
    data: activity,
    isLoading: activityLoading,
    isFetching: activityFetching,
    error: activityError,
    refetch,
  } = useGetActivityByIdQuery(activityId ?? skipToken);

  const {
    data: employees,
    error: employeeError,
    isFetching: employeesFetching,
    isLoading: employeesLoading,
  } = getAllEmployees;

  const [deleteActivity, { isLoading: isDeleting }] = useDeleteActivityMutation();

  // Merge employee name properly
  const employeeFullName = useMemo(() => {
    if (!activity || !employees) return null;

    if (activity.employeeId === null) return 'Sistem';

    const employee = employees.items.find(e => e.id === activity.employeeId);

    return employee?.fullName ?? 'Bilinmiyor';
  }, [activity, employees]);

  // Combined flags
  const isLoading = activityLoading || employeesLoading;
  const isFetching = activityFetching || employeesFetching;
  const endpointError = (activityError || employeeError) as ResponseError;

  // Show API Errors once
  useEffect(() => {
    if (!endpointError) return;
    setError(endpointError);
    Toast.error(endpointError.title);
  }, [endpointError]);

  const handleDelete = async () => {
    try {
      await deleteActivity(activityId).unwrap();
    } catch (error) {
      const err = error as ResponseError;
      Toast.error(err.title || 'Aktivite Silindi');
    }
  };

  return {
    // Data
    activity,
    employeeFullName,

    // Flags
    isLoading,
    isFetching,
    isDeleting,
    error,

    // Actions
    refetch,
    handleDelete,
  };
}
