import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { Toast } from '@/core/utils/toast/toast';
import { useCustomerSharedEndpoints } from '@/modules/customer-management/hooks/useCustomerSharedEndpoints';
import { useAddServiceMutation } from '@/modules/service-management/endpoints/service.endpoints';
import { ServiceAddModel } from '@/modules/service-management/types/service.types';
import { useStaffSharedEndpoints } from '@/modules/staff-management/hooks/useStaffSharedEndpoints';
import { useEffect, useState } from 'react';
import { ServiceAddHookResponse } from './types/serviceHookReturn.types';

export default function useServiceAdd(customerId?: string): ServiceAddHookResponse {
  const [error, setError] = useState<ResponseError>();
  const customerEndpoints = useCustomerSharedEndpoints();
  const staffEndpoints = useStaffSharedEndpoints();
  const corporateQuery = customerEndpoints.getCorporateOptions;
  const individualQuery = customerEndpoints.getIndividualOptions;
  const employeesQuery = staffEndpoints.getAllEmployees;
  const teamsQuery = staffEndpoints.getAllTeams;
  const addressQuery = customerEndpoints.getByIdCustomerAddressList(customerId);

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ServiceAddModel, string>>>(
    {},
  );

  const [addService, submitState] = useAddServiceMutation();

  const addServiceAction = async (payload: ServiceAddModel) => {
    setError(undefined);
    setFieldErrors({});

    try {
      await addService(payload).unwrap();
      Toast.success('Servis başarıyla eklendi!');
    } catch (err) {
      const error = err as ResponseError;
      setError(error);

      if (Array.isArray(error.Errors)) {
        const mapped: Partial<Record<keyof ServiceAddModel, string>> = {};
        error.Errors.forEach(e => {
          const key = (e.Property.charAt(0).toLowerCase() +
            e.Property.slice(1)) as keyof ServiceAddModel;
          mapped[key] = e.Errors.join(' | ');
        });
        setFieldErrors(mapped);
      }

      Toast[error.type?.includes('validation') ? 'warning' : 'error'](
        error.title || 'Servis eklenemedi',
      );
    }
  };

  const fetchError =
    corporateQuery.error ||
    individualQuery.error ||
    employeesQuery.error ||
    teamsQuery.error ||
    addressQuery.error;

  // Show API Errors once
  useEffect(() => {
    if (fetchError) Toast.error((fetchError as ResponseError).title);
  }, [fetchError]);

  return {
    data: {
      corporateCustomers: corporateQuery.data,
      individualCustomers: individualQuery.data,
      employees: employeesQuery.data,
      teams: teamsQuery.data,
      customerAddress: addressQuery.data,
    },

    state: {
      addState: submitState,
      customerState: corporateQuery || individualQuery,
      teamsState: teamsQuery,
      employeesState: employeesQuery,
      addressState: addressQuery,
    },

    errors: {
      error: error,
      fieldErrors: fieldErrors,
      fetchError: fetchError as ResponseError | undefined,
    },

    actions: {
      add: payload => addServiceAction(payload),
    },
  };
}
