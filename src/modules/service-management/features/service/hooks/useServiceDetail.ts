import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { Toast } from '@/core/utils/toast/toast';
import { useCustomerSharedEndpoints } from '@/modules/customer-management/hooks/useCustomerSharedEndpoints';
import {
  useDeleteServiceMutation,
  useGetServiceByIdQuery,
} from '@/modules/service-management/endpoints/service.endpoints';
import { useStaffSharedEndpoints } from '@/modules/staff-management/hooks/useStaffSharedEndpoints';
import { useEffect, useState } from 'react';

export function useServiceDetail(id: string) {
  const [error, setError] = useState<ResponseError | undefined>(undefined);

  const { getAllEmployees, getAllTeams } = useStaffSharedEndpoints();
  const { getAllCustomer } = useCustomerSharedEndpoints();

  const {
    data: customers,
    isFetching: customerFetching,
    isLoading: customerLoading,
    error: customersError,
    refetch: customerRefetch,
  } = getAllCustomer;

  const {
    data: employees,
    isFetching: employeesFetching,
    isLoading: employeesLoading,
    error: employeesError,
    refetch: employeesRefetch,
  } = getAllEmployees;

  const {
    data: teams,
    isFetching: teamsFetching,
    isLoading: teamsLoading,
    error: teamsError,
    refetch: teamRefetch,
  } = getAllTeams;

  const {
    data: service,
    isFetching: serviceFetching,
    isLoading: serviceLoading,
    error: servicesError,
    refetch: serviceRefetch,
  } = useGetServiceByIdQuery(id);

  const [deleteService, { error: deleteError, isLoading: isDeleting }] = useDeleteServiceMutation();

  const endpointError = (employeesError ||
    teamsError ||
    customersError ||
    servicesError ||
    deleteError) as ResponseError;

  const isFetching = employeesFetching || teamsFetching || customerFetching || serviceFetching;
  const isLoading = employeesLoading || teamsLoading || serviceLoading || customerLoading;

  const handleDelete = async () => {
    await deleteService(id).unwrap();
    Toast.success('Servis Silindi');
  };

  // Show API Errors once
  useEffect(() => {
    if (!endpointError) return;
    setError(endpointError);
    Toast.error(endpointError?.title);
  }, [endpointError]);

  const refetch = async () => {
    setError(undefined);
    await customerRefetch();
    await employeesRefetch();
    await teamRefetch();
    await serviceRefetch();
  };

  const assignedName =
    service?.employeeId !== null
      ? employees?.items.find(p => p.id === service?.employeeId)?.fullName
      : service?.teamId !== null
        ? teams?.items.find(t => t.id === service.teamId)?.fullName
        : 'Atanmamış';

  const customerName = customers?.items.find(c => c.id === service?.customerId)?.fullName;
  const customerId = customers?.items.find(c => c.id === service?.customerId)?.id;

  return {
    service,
    isFetching,
    isLoading,
    isDeleting,
    error,
    refetch,
    handleDelete,
    assignedName,
    customerName,
  };
}
