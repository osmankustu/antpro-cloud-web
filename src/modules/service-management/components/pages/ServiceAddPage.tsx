'use client';

import Input from '@/components/form/input/InputField';
import TextArea from '@/components/form/input/TextArea';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { BaseAddress } from '@/modules/customer-management/types/base/baseAddress';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import useServiceAdd from '../../features/service/hooks/useServiceAdd';
import { ServiceAddModel } from '../../types/service.types';
import { AddressSelect } from '../forms/AddressSelect';
import { AssignmentSelect } from '../forms/AssignmentsSelect';
import { CustomerSelect } from '../forms/CustomerSelect';
import FormField from '../forms/FormField';
import FormGrid from '../forms/FormGrid';
import FormSection from '../forms/FormSection';
import { PrioritySelect } from '../forms/PrioritySelect';
import { AddressAddModal } from '../modals/AddressAddModal';

export default function ServiceAddPage() {
  const router = useRouter();
  const { openModal, isOpen, closeModal } = useModal();
  const { data, state, actions, errors } = useServiceAdd();
  const { control, reset, handleSubmit, setValue } = useForm<ServiceAddModel>({
    defaultValues: {
      customerId: '',
      title: '',
      subject: '',
      priority: '',
      customerType: '',
      assignmentType: '',
      description: '',
      address: {
        addressId: '',
        addressLine: '',
        city: '',
        latitude: 0,
        longitude: 0,
        postalCode: '',
        state: '',
      },
      employeeId: '',
      teamId: '',
    },
  });

  const customerId = useWatch({
    control,
    name: 'customerId',
    defaultValue: '',
  });

  useEffect(() => {
    if (state.isSubmitSuccess) router.push('/management/service-management');
  }, [state.isSubmitSuccess]);

  const handleServiceSubmit = (data: ServiceAddModel) => {
    actions.addService(data);
  };
  return (
    <div className="space-y-6">
      <FormSection title="Müşteri Tipi">
        <CustomerSelect
          corporateCustomers={data.corporateCustomers?.items}
          individualCustomers={data.individualCustomers?.items}
          error={!!errors.fieldErrors.customerId}
          hint={errors.fieldErrors.customerId}
          onChange={(value, type) => {
            if (type === 'Individual') {
              setValue('customerType', type);
              setValue('customerId', value);
            }
            if (type === 'Corporate') {
              setValue('customerType', type);
              setValue('customerId', value);
            }
          }}
        />
      </FormSection>

      <FormSection title="Servis Tanımları">
        <FormGrid>
          <FormField label="Servis Başlığı">
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Input
                  {...field}
                  error={!!errors.fieldErrors.title}
                  hint={errors.fieldErrors.title}
                />
              )}
            />
          </FormField>
          <FormField label="Servis Konusu">
            <Controller
              control={control}
              name="subject"
              render={({ field }) => (
                <Input
                  {...field}
                  error={!!errors.fieldErrors.subject}
                  hint={errors.fieldErrors.subject}
                />
              )}
            />
          </FormField>
        </FormGrid>
        <FormGrid>
          <FormField label="Servis Açıklaması">
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <TextArea
                  {...field}
                  error={!!errors.fieldErrors.description}
                  hint={errors.fieldErrors.description}
                />
              )}
            />
          </FormField>
        </FormGrid>
        <FormGrid>
          <FormField label="Öncelik Durumu">
            <Controller
              control={control}
              name="priority"
              render={({ field }) => (
                <PrioritySelect
                  onChange={value => field.onChange(value)}
                  error={!!errors.fieldErrors.priority}
                />
              )}
            />
          </FormField>
        </FormGrid>
      </FormSection>
      <FormSection title="Adres Bilgileri">
        <FormGrid>
          <FormField label="Müşteri Adresleri">
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <AddressSelect
                  disabled={!customerId}
                  addresses={data.getCustomerAddresses(customerId).data?.items}
                  onClick={openModal}
                  onChange={selected => {
                    const address: BaseAddress = selected!;
                    setValue('address.addressId', address?.id);
                    setValue('address.addressLine', address?.addressLine);
                    setValue('address.city', address?.city);
                    setValue('address.cityId', address?.cityId);
                    setValue('address.state', address?.state);
                    setValue('address.stateId', address?.stateId);
                    setValue('address.latitude', address?.latitude);
                    setValue('address.longitude', address?.longitude);
                    setValue('address.postalCode', address?.postalCode);
                  }}
                />
              )}
            />
          </FormField>
        </FormGrid>
      </FormSection>

      <FormSection title="Atama Bilgileri">
        <FormGrid>
          <FormField label="Atama Tipi">
            <AssignmentSelect
              personnelList={data.employees?.items}
              teamList={data.teams?.items}
              onChange={(value, type) => {
                if (type === 'personel') {
                  setValue('employeeId', value!);
                  setValue('teamId', '');
                }
                if (type === 'team') {
                  setValue('employeeId', '');
                  setValue('teamId', value!);
                }
                if (type === 'none') {
                  setValue('employeeId', '');
                  setValue('teamId', '');
                }
              }}
              defaultType="none"
            />
          </FormField>
        </FormGrid>
      </FormSection>

      {/* Kaydet Butonu */}
      <div className="flex justify-end">
        <Button
          size="sm"
          onClick={handleSubmit(handleServiceSubmit)}
          isSubmitting={state.isSubmitting}
          disabled={state.isSubmitting}
          children={'Kaydet'}
        />
      </div>
      <AddressAddModal isOpen={isOpen} onClose={closeModal} customerId={customerId} />
    </div>
  );
}
