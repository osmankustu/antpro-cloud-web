import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { Toast } from '@/core/utils/toast/toast';
import { useCustomerSharedEndpoints } from '@/modules/customer-management/hooks/useCustomerSharedEndpoints';
import { AddressAddModel } from '@/modules/customer-management/types/address.types';
import { useState } from 'react';

export function useAddCustomerAddress(customerId: string) {
  const { addCustomerAddress } = useCustomerSharedEndpoints();
  const [error, setError] = useState<ResponseError | undefined>();
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof AddressAddModel, string>>>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [addAddressMutation] = addCustomerAddress;

  const handleAddAddress = async (data: AddressAddModel) => {
    setError(undefined);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      await addAddressMutation(data).unwrap();
      Toast.success('Müşteri başarıyla eklendi!');
    } catch (err) {
      const e = err as ResponseError;
      setError(e);

      if (e.Errors && Array.isArray(e.Errors)) {
        const mappedErrors: Partial<Record<keyof AddressAddModel, string>> = {};
        e.Errors.forEach(fe => {
          // Backend Property isimlerini camelCase'e çevir
          const key = (fe.Property.charAt(0).toLowerCase() +
            fe.Property.slice(1)) as keyof AddressAddModel;
          mappedErrors[key] = fe.Errors.join(' | ');
        });
        setFieldErrors(mappedErrors);
      }

      if (e.type === 'https://example.com/probs/validation') {
        Toast.warning(e.title || 'Adres eklenemedi');
      } else {
        Toast.error(e.title || 'Adres eklenemedi');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { error, fieldErrors, isSubmitting, handleAddAddress };
}
