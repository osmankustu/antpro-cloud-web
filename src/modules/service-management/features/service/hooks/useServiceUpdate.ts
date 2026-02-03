import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { Toast } from '@/core/utils/toast/toast';
import { useCustomerSharedEndpoints } from '@/modules/customer-management/hooks/useCustomerSharedEndpoints';
import { useUpdateServiceMutation } from '@/modules/service-management/endpoints/service.endpoints';
import { ServiceUpdateModel } from '@/modules/service-management/types/service.types';
import { useStaffSharedEndpoints } from '@/modules/staff-management/hooks/useStaffSharedEndpoints';
import { useEffect, useState } from 'react';

export default function useServiceUpdate() {
  const { getCorporateOptions, getIndividualOptions, getByIdCustomerAddressList } =
    useCustomerSharedEndpoints();
  const { getAllEmployees, getAllTeams } = useStaffSharedEndpoints();

  const {
    data: corporateCustomers,
    isFetching: corporateFetching,
    isLoading: corporateLoading,
    error: corporateError,
  } = getCorporateOptions;
  const {
    data: IndividualCustomers,
    isFetching: individualFetching,
    isLoading: individualLoading,
    error: individualError,
  } = getIndividualOptions;

  const {
    data: employees,
    isFetching: employeesFetching,
    isLoading: employeesLoading,
    error: employeesError,
  } = getAllEmployees;
  const {
    data: teams,
    isFetching: teamsFetching,
    isLoading: teamsLoading,
    error: teamsError,
  } = getAllTeams;

  const [error, setError] = useState<ResponseError | undefined>();
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ServiceUpdateModel, string>>>(
    {},
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateServiceMutation] = useUpdateServiceMutation();

  const handleUpdateService = async (data: ServiceUpdateModel) => {
    setError(undefined);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      await updateServiceMutation(data).unwrap();
      Toast.success('Servis başarıyla eklendi!');
    } catch (err) {
      const e = err as ResponseError;
      setError(e);

      if (e.Errors && Array.isArray(e.Errors)) {
        const mappedErrors: Partial<Record<keyof ServiceUpdateModel, string>> = {};
        e.Errors.forEach(fe => {
          // Backend Property isimlerini camelCase'e çevir
          const key = (fe.Property.charAt(0).toLowerCase() +
            fe.Property.slice(1)) as keyof ServiceUpdateModel;
          mappedErrors[key] = fe.Errors.join(' | ');
        });
        setFieldErrors(mappedErrors);
      }

      if (e.type === 'https://example.com/probs/validation') {
        Toast.warning(e.title || 'Servis eklenemedi');
      } else {
        Toast.error(e.title || 'Servis eklenemedi');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const endpointError = (corporateError ||
    individualError ||
    employeesError ||
    teamsError) as ResponseError;

  const isFetching = corporateFetching || individualFetching || employeesFetching || teamsFetching;
  const isLoading = corporateLoading || individualLoading || employeesLoading || teamsLoading;

  // Show API Errors once
  useEffect(() => {
    if (!endpointError) return;
    setError(endpointError);
    Toast.error(endpointError?.title);
  }, [endpointError]);

  return {
    options: {
      corporateCustomers,
      IndividualCustomers,
      getByIdCustomerAddressList,
      employees,
      teams,
      isFetching,
      isLoading,
      endpointError,
    },
    handleUpdateService,
    isSubmitting,
    fieldErrors,
    error,
  };
}
