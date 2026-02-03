import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { Toast } from '@/core/utils/toast/toast';
import { useAddCorporateCustomerMutation } from '@/modules/customer-management/endpoints/corporate.endpoints';
import { CorporateCustomerAddModel } from '@/modules/customer-management/types/corporate.types';
import { useState } from 'react';

export function useCorporateAdd() {
  const [error, setError] = useState<ResponseError | undefined>();
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof CorporateCustomerAddModel, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [addCustomerMutation] = useAddCorporateCustomerMutation();

  const handleAddCustomer = async (data: CorporateCustomerAddModel) => {
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
        const mappedErrors: Partial<Record<keyof CorporateCustomerAddModel, string>> = {};
        e.Errors.forEach(fe => {
          // Backend Property isimlerini camelCase'e çevir
          const key = (fe.Property.charAt(0).toLowerCase() +
            fe.Property.slice(1)) as keyof CorporateCustomerAddModel;
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
