import Input from '@/components/form/input/InputField';
import FormField from '@/modules/customer-management/components/forms/FormField';
import FormGrid from '@/modules/customer-management/components/forms/FormGrid';
import FormSection from '@/modules/customer-management/components/forms/FormSection';
import {
  IndividualCustomerModel,
  IndividualCustomerUpdateModel,
} from '@/modules/customer-management/types/individual.types.';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useIndividualUpdate } from '../../hooks/useIndividualUpdate';

interface IndividualEditPageProps {
  customer?: IndividualCustomerModel;
}

export default function IndividualEditPage({ customer }: IndividualEditPageProps) {
  const { handleUpdateCustomer, fieldErrors, isSubmitting, error } = useIndividualUpdate();
  const { control, reset, handleSubmit } = useForm<IndividualCustomerUpdateModel>({
    defaultValues: {
      id: '',
      firstName: '',
      lastName: '',
      customerNo: '',
      phoneNumber: '',
      email: '',
      createdDate: '',
    },
  });

  useEffect(() => {
    if (customer) {
      reset({
        id: customer.id ?? '',
        firstName: customer.firstName,
        lastName: customer.lastName,
        customerNo: customer.customerNo ?? '',
        phoneNumber: customer.phoneNumber ?? '',
        email: customer.email ?? '',
        createdDate: customer.createdDate ?? '',
      });
    }
  }, [customer]);

  const onSubmit = (data: IndividualCustomerUpdateModel) => {
    handleUpdateCustomer(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Genel Bilgiler */}
      <FormSection title="Genel Bilgiler">
        <FormGrid>
          <FormField label="Adı">
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <Input {...field} error={!!fieldErrors.firstName} hint={fieldErrors.firstName} />
              )}
            />
          </FormField>
          <FormField label="Soyadı">
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <Input {...field} error={!!fieldErrors.lastName} hint={fieldErrors.lastName} />
              )}
            />
          </FormField>
        </FormGrid>
      </FormSection>

      {/* İletişim Bilgileri */}
      <FormSection title="İletişim Bilgileri">
        <FormGrid>
          <FormField label="Telefon">
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <Input
                  {...field}
                  error={!!fieldErrors.phoneNumber}
                  hint={fieldErrors.phoneNumber}
                />
              )}
            />
          </FormField>
          <FormField label="Email">
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input {...field} error={!!fieldErrors.email} hint={fieldErrors.email} />
              )}
            />
          </FormField>
        </FormGrid>
      </FormSection>

      {/* Kaydet Butonu */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-brand-500 hover:bg-brand-600 rounded-lg px-6 py-2 font-semibold text-white transition"
        >
          Kaydet
        </button>
      </div>
    </form>
  );
}
