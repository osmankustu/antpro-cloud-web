'use client';
import Input from '@/components/form/input/InputField';
import FormField from '@/modules/customer-management/components/forms/FormField';
import FormGrid from '@/modules/customer-management/components/forms/FormGrid';
import FormSection from '@/modules/customer-management/components/forms/FormSection';
import {
  CorporateCustomerModel,
  CorporateCustomerUpdateModel,
} from '@/modules/customer-management/types/corporate.types';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCorporateUpdate } from '../../hooks/useCorporateUpdate';

interface CorporateEditPageProps {
  customer?: CorporateCustomerModel;
}

export default function CorporateEditPage({ customer }: CorporateEditPageProps) {
  const { error, fieldErrors, handleUpdateCustomer, isSubmitting } = useCorporateUpdate();
  const { control, reset, handleSubmit } = useForm<CorporateCustomerUpdateModel>({
    defaultValues: {
      id: '',
      customerNo: '',
      companyName: '',
      sector: '',
      taxNumber: '',
      phoneNumber: '',
      email: '',
      authorizedPerson: '',
      authorizedPersonPhone: '',
      authorizedPersonEmail: '',
      createdDate: '',
    },
  });

  useEffect(() => {
    if (customer) {
      reset({
        id: customer.id ?? '',
        customerNo: customer.customerNo ?? '',
        companyName: customer.companyName ?? '',
        sector: customer.sector ?? '',
        taxNumber: customer.taxNumber ?? '',
        phoneNumber: customer.phoneNumber ?? '',
        email: customer.email ?? '',
        authorizedPerson: customer.authorizedPerson ?? '',
        authorizedPersonPhone: customer.authorizedPersonPhone ?? '',
        authorizedPersonEmail: customer.authorizedPersonEmail ?? '',
        createdDate: customer.createdDate ?? '',
      });
    }
  }, [customer]);

  const onSubmit = (data: CorporateCustomerUpdateModel) => {
    handleUpdateCustomer(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Genel Bilgiler */}
      <FormSection title="Genel Bilgiler">
        <FormGrid>
          <FormField label="Firma Adı">
            <Controller
              control={control}
              name="companyName"
              render={({ field }) => (
                <Input
                  {...field}
                  error={!!fieldErrors.companyName}
                  hint={fieldErrors.companyName}
                />
              )}
            />
          </FormField>
          <FormField label="Firma Sektörü">
            <Controller
              control={control}
              name="sector"
              render={({ field }) => (
                <Input {...field} error={!!fieldErrors.sector} hint={fieldErrors.sector} />
              )}
            />
          </FormField>
          <FormField label="Vergi Numarası">
            <Controller
              control={control}
              name="taxNumber"
              render={({ field }) => (
                <Input {...field} error={!!fieldErrors.taxNumber} hint={fieldErrors.taxNumber} />
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

      {/* Yetkili Bilgileri */}
      <FormSection title="Yetkili Bilgileri">
        <FormGrid>
          <FormField label="Yetkili Adı-Soyadı">
            <Controller
              control={control}
              name="authorizedPerson"
              render={({ field }) => (
                <Input
                  {...field}
                  error={!!fieldErrors.authorizedPerson}
                  hint={fieldErrors.authorizedPerson}
                />
              )}
            />
          </FormField>
          <FormField label="Telefon">
            <Controller
              control={control}
              name="authorizedPersonPhone"
              render={({ field }) => (
                <Input
                  {...field}
                  error={!!fieldErrors.authorizedPersonPhone}
                  hint={fieldErrors.authorizedPersonPhone}
                />
              )}
            />
          </FormField>
          <FormField label="Email">
            <Controller
              control={control}
              name="authorizedPersonEmail"
              render={({ field }) => (
                <Input
                  {...field}
                  error={!!fieldErrors.authorizedPersonEmail}
                  hint={fieldErrors.authorizedPersonEmail}
                />
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
