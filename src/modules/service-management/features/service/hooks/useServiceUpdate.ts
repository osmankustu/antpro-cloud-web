import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { Toast } from '@/core/utils/toast/toast';
import { useCustomerSharedEndpoints } from '@/modules/customer-management/hooks/useCustomerSharedEndpoints';
import { useUpdateServiceMutation } from '@/modules/service-management/endpoints/service.endpoints';
import { ServiceUpdateModel } from '@/modules/service-management/types/service.types';
import { useStaffSharedEndpoints } from '@/modules/staff-management/hooks/useStaffSharedEndpoints';
import { useEffect, useState } from 'react';

export default function useServiceUpdate() {
  const customerEndpoints = useCustomerSharedEndpoints();
  const staffEndpoints = useStaffSharedEndpoints();
  const corporate = customerEndpoints.getCorporateOptions;
  const individual = customerEndpoints.getIndividualOptions;
  const employeesQuery = staffEndpoints.getAllEmployees;
  const teamsQuery = staffEndpoints.getAllTeams;

  const [formError, setFormError] = useState<ResponseError>();
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ServiceUpdateModel, string>>>(
    {},
  );

  const [updateService, submitState] = useUpdateServiceMutation();

  const updateServiceAction = async (payload: ServiceUpdateModel) => {
    setFormError(undefined);
    setFieldErrors({});

    try {
      await updateService(payload).unwrap();
      Toast.success('Servis başarıyla Güncellendi!');
    } catch (err) {
      const error = err as ResponseError;
      setFormError(error);

      if (Array.isArray(error.Errors)) {
        const mapped: Partial<Record<keyof ServiceUpdateModel, string>> = {};
        error.Errors.forEach(e => {
          const key = (e.Property.charAt(0).toLowerCase() +
            e.Property.slice(1)) as keyof ServiceUpdateModel;
          mapped[key] = e.Errors.join(' | ');
        });
        setFieldErrors(mapped);
      }

      Toast[error.type?.includes('validation') ? 'warning' : 'error'](
        error.title || 'Servis Güncellenemedi',
      );
    }
  };

  const fetchError =
    corporate.error || individual.error || employeesQuery.error || teamsQuery.error;

  // Show API Errors once
  useEffect(() => {
    if (fetchError) Toast.error((fetchError as ResponseError).title);
  }, [fetchError]);

  return {
    data: {
      corporateCustomers: corporate.data,
      individualCustomers: individual.data,
      employees: employeesQuery.data,
      teams: teamsQuery.data,
      getCustomerAddresses: (id: string) => customerEndpoints.getByIdCustomerAddressList(id),
    },
    state: {
      isLoadingOptions:
        corporate.isLoading ||
        individual.isLoading ||
        employeesQuery.isLoading ||
        teamsQuery.isLoading,

      isFetchingOptions:
        corporate.isFetching ||
        individual.isFetching ||
        employeesQuery.isFetching ||
        teamsQuery.isFetching,

      isSubmitting: submitState.isLoading,
      isSubmitSuccess: submitState.isSuccess,
      isSubmitError: submitState.isError,
    },
    errors: {
      formError,
      fieldErrors,
      fetchError: fetchError as ResponseError | undefined,
    },
    actions: {
      updateService: updateServiceAction,
    },
  };
}
