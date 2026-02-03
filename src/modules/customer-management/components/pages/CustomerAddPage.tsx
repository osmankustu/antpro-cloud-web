'use client';
import Input from '@/components/form/input/InputField';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCorporateAdd } from '../../features/corporate/hooks/useCorporateAdd';
import { useIndividualAdd } from '../../features/individual/hooks/useIndividualAdd';
import { CorporateCustomerAddModel } from '../../types/corporate.types';
import { IndividualCustomerAddModel } from '../../types/individual.types.';
import CustomerTypeRadio from '../forms/CustomerTypeRadio';
import FormField from '../forms/FormField';
import FormGrid from '../forms/FormGrid';
import FormSection from '../forms/FormSection';

export default function CustomerAddPage() {
  const [type, setType] = useState<'individual' | 'corporate'>('individual');

  const {
    handleAddCustomer,
    error,
    isSubmitting,
    fieldErrors: individualFieldErrors,
  } = useIndividualAdd();
  const {
    handleAddCustomer: handleAddCorporateCustomer,
    isSubmitting: isCorporateSubmitting,
    fieldErrors: corporateFieldErrors,
  } = useCorporateAdd();

  const {
    control: corporateControl,
    reset: resetCorporateFrom,
    handleSubmit: handleCorporateSubmit,
  } = useForm<CorporateCustomerAddModel>({
    defaultValues: {
      authorizedPerson: '',
      authorizedPersonEmail: '',
      companyName: '',
      authorizedPersonPhone: '',
      email: '',
      phoneNumber: '',
      sector: '',
      taxNumber: '',
    },
  });

  const {
    control: individualControl,
    reset: resetIndividualForm,
    handleSubmit: handleIndividualSubmit,
  } = useForm<IndividualCustomerAddModel>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
    },
  });

  useEffect(() => {
    if (type === 'individual') {
      resetCorporateFrom({
        companyName: '',
        sector: '',
        taxNumber: '',
        authorizedPerson: '',
        authorizedPersonPhone: '',
        authorizedPersonEmail: '',
        phoneNumber: '',
        email: '',
      });
    } else {
      resetIndividualForm({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
      });
    }
  }, [type]);

  const onSubmitIndividual = (data: IndividualCustomerAddModel) => {
    handleAddCustomer(data);
  };

  const onSubmitCorporate = (data: CorporateCustomerAddModel) => {
    handleAddCorporateCustomer(data);
  };

  return (
    <form
      onSubmit={
        type === 'individual'
          ? handleIndividualSubmit(onSubmitIndividual)
          : handleCorporateSubmit(onSubmitCorporate)
      }
      className="space-y-6"
    >
      {/* Müşteri Tipi */}
      <FormSection title="Müşteri Tipi">
        <div className="flex flex-wrap items-center gap-6">
          <CustomerTypeRadio
            label="Bireysel"
            checked={type === 'individual'}
            onChange={() => setType('individual')}
          />
          <CustomerTypeRadio
            label="Kurumsal"
            checked={type === 'corporate'}
            onChange={() => setType('corporate')}
          />
        </div>
      </FormSection>

      {/* Genel Bilgiler */}
      <FormSection title="Genel Bilgiler">
        {type === 'individual' ? (
          <FormGrid>
            <FormField label="Adı">
              <Controller
                key={'ind-f'}
                control={individualControl}
                name="firstName"
                render={({ field }) => (
                  <Input
                    {...field}
                    error={!!individualFieldErrors.firstName}
                    hint={individualFieldErrors.firstName}
                  />
                )}
              />
            </FormField>
            <FormField label="Soyadı">
              <Controller
                key={'ind-s'}
                control={individualControl}
                name="lastName"
                render={({ field }) => (
                  <Input
                    {...field}
                    error={!!individualFieldErrors.lastName}
                    hint={individualFieldErrors.lastName}
                  />
                )}
              />
            </FormField>
          </FormGrid>
        ) : (
          <FormGrid>
            <FormField label="Firma Adı">
              <Controller
                key={'corp-n'}
                control={corporateControl}
                name="companyName"
                render={({ field }) => (
                  <Input
                    {...field}
                    error={!!corporateFieldErrors.companyName}
                    hint={corporateFieldErrors.companyName}
                  />
                )}
              />
            </FormField>
            <FormField label="Firma Sektörü">
              <Controller
                key={'corp-s'}
                control={corporateControl}
                name="sector"
                render={({ field }) => (
                  <Input
                    {...field}
                    error={!!corporateFieldErrors.sector}
                    hint={corporateFieldErrors.sector}
                  />
                )}
              />
            </FormField>
            <FormField label="Vergi Numarası">
              <Controller
                control={corporateControl}
                name="taxNumber"
                render={({ field }) => (
                  <Input
                    {...field}
                    error={!!corporateFieldErrors.taxNumber}
                    hint={corporateFieldErrors.taxNumber}
                  />
                )}
              />
            </FormField>
          </FormGrid>
        )}
      </FormSection>

      {/* İletişim Bilgileri */}
      <FormSection title="İletişim Bilgileri">
        {type === 'individual' ? (
          <FormGrid>
            <FormField label="Telefon">
              <Controller
                key={'ind-phone'}
                control={individualControl}
                name="phoneNumber"
                render={({ field }) => (
                  <Input
                    {...field}
                    error={!!individualFieldErrors.phoneNumber}
                    hint={individualFieldErrors.phoneNumber}
                  />
                )}
              />
            </FormField>
            <FormField label="Email">
              <Controller
                key={'ind-phone'}
                control={individualControl}
                name="email"
                render={({ field }) => (
                  <Input
                    {...field}
                    error={!!individualFieldErrors.email}
                    hint={individualFieldErrors.email}
                  />
                )}
              />
            </FormField>
          </FormGrid>
        ) : (
          <FormGrid>
            <FormField label="Telefon">
              <Controller
                key={'corp-phone'}
                control={corporateControl}
                name="phoneNumber"
                render={({ field }) => (
                  <Input
                    {...field}
                    error={!!corporateFieldErrors.phoneNumber}
                    hint={corporateFieldErrors.phoneNumber}
                  />
                )}
              />
            </FormField>
            <FormField label="Email">
              <Controller
                key={'corp-email'}
                control={corporateControl}
                name="email"
                render={({ field }) => (
                  <Input
                    {...field}
                    error={!!corporateFieldErrors.email}
                    hint={corporateFieldErrors.email}
                  />
                )}
              />
            </FormField>
          </FormGrid>
        )}
      </FormSection>

      {/* Yetkili Bilgileri (Kurumsal) */}
      {type === 'corporate' && (
        <FormSection title="Yetkili Bilgileri">
          <FormGrid>
            <FormField label="Yetkili Adı-Soyadı">
              <Controller
                control={corporateControl}
                name="authorizedPerson"
                render={({ field }) => (
                  <Input
                    {...field}
                    error={!!corporateFieldErrors.authorizedPerson}
                    hint={corporateFieldErrors.authorizedPerson}
                  />
                )}
              />
            </FormField>
            <FormField label="Telefon">
              <Controller
                control={corporateControl}
                name="authorizedPersonPhone"
                render={({ field }) => (
                  <Input
                    {...field}
                    error={!!corporateFieldErrors.authorizedPersonPhone}
                    hint={corporateFieldErrors.authorizedPersonPhone}
                  />
                )}
              />
            </FormField>
            <FormField label="Email">
              <Controller
                control={corporateControl}
                name="authorizedPersonEmail"
                render={({ field }) => (
                  <Input
                    {...field}
                    error={!!corporateFieldErrors.authorizedPersonEmail}
                    hint={corporateFieldErrors.authorizedPersonEmail}
                  />
                )}
              />
            </FormField>
          </FormGrid>
        </FormSection>
      )}

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

/* Yardımcı Componentler */
