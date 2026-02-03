import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { Toast } from '@/core/utils/toast/toast';
import { useUpdateIndividualCustomerMutation } from '@/modules/customer-management/endpoints/individual.endpoints';
import { IndividualCustomerUpdateModel } from '@/modules/customer-management/types/individual.types.';
import { useState } from 'react';

export function useIndividualUpdate() {
  const [error, setError] = useState<ResponseError | undefined>();
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof IndividualCustomerUpdateModel, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [updateCustomerMutation] = useUpdateIndividualCustomerMutation();

  const handleUpdateCustomer = async (data: IndividualCustomerUpdateModel) => {
    setError(undefined);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      await updateCustomerMutation(data).unwrap();
      Toast.success('Müşteri başarıyla güncellendi!');
    } catch (err) {
      const e = err as ResponseError;
      setError(e);

      if (e.Errors && Array.isArray(e.Errors)) {
        const mappedErrors: Partial<Record<keyof IndividualCustomerUpdateModel, string>> = {};
        e.Errors.forEach(fe => {
          // Backend Property isimlerini camelCase'e çevir
          const key = (fe.Property.charAt(0).toLowerCase() +
            fe.Property.slice(1)) as keyof IndividualCustomerUpdateModel;
          mappedErrors[key] = fe.Errors.join(' | ');
        });
        setFieldErrors(mappedErrors);
      }

      if (e.type === 'https://example.com/probs/validation') {
        Toast.warning(e.title || 'Müşteri güncellenemedi');
      } else {
        Toast.error(e.title || 'Müşteri güncellenemedi');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    error,
    fieldErrors,
    isSubmitting,
    handleUpdateCustomer,
  };
}
