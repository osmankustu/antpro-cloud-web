import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { Toast } from '@/core/utils/toast/toast';
import { useCustomerSharedEndpoints } from '@/modules/customer-management/hooks/useCustomerSharedEndpoints';
import {
  useDeleteServiceMutation,
  useGetServiceByIdQuery,
} from '@/modules/service-management/endpoints/service.endpoints';
import { useStaffSharedEndpoints } from '@/modules/staff-management/hooks/useStaffSharedEndpoints';
import { useEffect, useState } from 'react';
import { ServiceDetailHookResponse } from './types/serviceHookReturn.types';

export function useServiceDetail(id: string): ServiceDetailHookResponse {
  const [error, setError] = useState<ResponseError | undefined>(undefined);

  const staffEndpoints = useStaffSharedEndpoints();
  const customerEndpoints = useCustomerSharedEndpoints();
  const customersQuery = customerEndpoints.getAllCustomer;
  const employeesQuery = staffEndpoints.getAllEmployees;
  const teamsQuery = staffEndpoints.getAllTeams;
  const serviceQuery = useGetServiceByIdQuery(id);
  const [deleteService, deleteSubmitState] = useDeleteServiceMutation();

  const fetchError = (employeesQuery.error ||
    teamsQuery.error ||
    customersQuery.error ||
    serviceQuery.error) as ResponseError | undefined;

  console.log('Fetch Error', fetchError);

  const deleteAction = async () => {
    try {
      await deleteService(id).unwrap();
      Toast.success('Servis Silindi');
    } catch (error) {
      setError(error as ResponseError);
      const err = error as ResponseError;
      Toast.error(err.title || 'Aktivite Silindi');
    }
  };

  useEffect(() => {
    if (!fetchError) return;
    setError(fetchError as ResponseError);
    Toast.error(error?.title);
  }, [fetchError]);

  const refetchAction = async () => {
    setError(undefined);
    Promise.all([
      serviceQuery.refetch(),
      teamsQuery.refetch(),
      employeesQuery.refetch(),
      customersQuery.refetch(),
    ]);
  };

  const assignedName =
    serviceQuery.data?.employeeId !== null
      ? employeesQuery.data?.items.find(p => p.id === serviceQuery.data?.employeeId)?.fullName
      : serviceQuery.data?.teamId !== null
        ? teamsQuery.data?.items.find(t => t.id === serviceQuery.data?.teamId)?.fullName
        : 'Atanmamış';

  const customerName = customersQuery.data?.items.find(
    c => c.id === serviceQuery.data?.customerId,
  )?.fullName;
  const customerId = customersQuery.data?.items.find(
    c => c.id === serviceQuery.data?.customerId,
  )?.id;

  return {
    data: {
      service: serviceQuery.data,
      assignedName: assignedName,
      customerName: customerName,
      customerId: customerId,
    },
    state: {
      serviceState: serviceQuery,
      customerState: customersQuery,
      employeesState: employeesQuery,
      teamsState: teamsQuery,
      deleteState: deleteSubmitState,
    },
    errors: {
      error,
    },
    actions: {
      delete: deleteAction,
      refetch: refetchAction,
    },
  };
}
