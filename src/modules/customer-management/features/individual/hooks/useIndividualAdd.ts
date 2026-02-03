import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { Toast } from '@/core/utils/toast/toast';
import { useAddIndividualCustomerMutation } from '@/modules/customer-management/endpoints/individual.endpoints';
import { IndividualCustomerAddModel } from '@/modules/customer-management/types/individual.types.';
import { useState } from 'react';

export function useIndividualAdd() {
  const [error, setError] = useState<ResponseError | undefined>();
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof IndividualCustomerAddModel, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [addCustomerMutation] = useAddIndividualCustomerMutation();

  const handleAddCustomer = async (data: IndividualCustomerAddModel) => {
    setError(undefined);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      await addCustomerMutation(data).unwrap();
      Toast.success('Müşteri başarıyla eklendi!');
    } catch (err) {
      const e = err as ResponseError;
      setError(e);

      if (e.Errors && Array.isArray(e.Errors)) {
        const mappedErrors: Partial<Record<keyof IndividualCustomerAddModel, string>> = {};
        e.Errors.forEach(fe => {
          // Backend Property isimlerini camelCase'e çevir
          const key = (fe.Property.charAt(0).toLowerCase() +
            fe.Property.slice(1)) as keyof IndividualCustomerAddModel;
          mappedErrors[key] = fe.Errors.join(' | ');
        });
        setFieldErrors(mappedErrors);
      }

      if (e.type === 'https://example.com/probs/validation') {
        Toast.warning(e.title || 'Müşteri eklenemedi');
      } else {
        Toast.error(e.title || 'Müşteri eklenemedi');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    error,
    fieldErrors,
    isSubmitting,
    handleAddCustomer,
  };
}
