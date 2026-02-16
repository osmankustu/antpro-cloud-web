import Input from '@/components/form/input/InputField';
import TextArea from '@/components/form/input/TextArea';
import { UpdateModalButton } from '@/components/ui/button/UpdateModalButton';
import { BaseAddress } from '@/modules/customer-management/types/base/baseAddress';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { AddressSelect } from '../../../../components/forms/AddressSelect';
import { AssignmentSelect } from '../../../../components/forms/AssignmentsSelect';
import { CustomerSelect } from '../../../../components/forms/CustomerSelect';
import FormField from '../../../../components/forms/FormField';
import FormGrid from '../../../../components/forms/FormGrid';
import FormSection from '../../../../components/forms/FormSection';
import { PrioritySelect } from '../../../../components/forms/PrioritySelect';
import { AddressAddModal } from '../../../../components/modals/AddressAddModal';
import { ServiceMessages } from '../../../../constants/serviceMessages';
import { ServiceUpdateModel } from '../../../../types/service.types';
import { ServiceDetailHookResponse } from '../../hooks/types/serviceHookReturn.types';
import useServiceUpdate from '../../hooks/useServiceUpdate';

interface ServiceUpdatePageProps {
  model: ServiceDetailHookResponse;
  router: AppRouterInstance;
}

export default function ServiceUpdatePage({ model, router }: ServiceUpdatePageProps) {
  const service = model.data.service;

  const { control, reset, setValue, getValues, handleSubmit } = useForm<ServiceUpdateModel>({
    defaultValues: {
      customerId: '',
      title: '',
      subject: '',
      priority: '',
      customerType: '',
      addressType: 'regist',
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

  useEffect(() => {
    if (service) {
      reset({
        id: service.id ?? '',
        code: service.code ?? '',
        customerId: service.customerId ?? '',
        title: service.title ?? '',
        subject: service.subject ?? '',
        priority: service.priority ?? '',
        customerType: service.customerType ?? '',
        description: service.description ?? '',
        address: {
          addressId: service.address.addressId ?? '',
          addressLine: service.address.addressLine ?? '',
          city: service.address.city ?? '',
          latitude: service.address.latitude ?? '',
          longitude: service.address.longitude ?? '',
          postalCode: service.address.postalCode ?? '',
          state: service.address.state ?? '',
          stateId: service.address.stateId ?? '',
        },
        employeeId: service.employeeId ?? '',
        teamId: service.teamId ?? '',
        createdDate: service.createdDate ?? '',
      });
    }
  }, [service]);

  const customerId = useWatch({
    control,
    name: 'customerId',
    defaultValue: '',
  });

  const { data, state, errors, actions } = useServiceUpdate(customerId);

  const handleServiceSubmit = (data: ServiceUpdateModel) => {
    actions.update(data);
  };
  return (
    <div className="space-y-6">
      <FormSection title="Müşteri Tipi">
        <CustomerSelect
          corporateCustomers={data.corporateCustomers?.items}
          individualCustomers={data.individualCustomers?.items}
          defaultType={getValues('customerType')}
          defaultValueId={getValues('customerId')}
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
                  value={getValues('priority')}
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
                  defaultAddressId={getValues('address.addressId')!}
                  disabled={!customerId}
                  addresses={data.customerAddress?.items}
                  rightElement={<AddressAddModal disabled={!customerId} customerId={customerId} />}
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
              defaultId={service?.employeeId ? service.employeeId : service?.teamId}
              defaultType={service?.employeeId ? 'personel' : service?.teamId ? 'team' : 'none'}
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
            />
          </FormField>
        </FormGrid>
      </FormSection>

      {/* Kaydet Butonu */}
      <div className="flex justify-end">
        <UpdateModalButton
          message={ServiceMessages.updateService}
          onConfirm={handleSubmit(handleServiceSubmit)}
          onSubmitting={state.updateState.isLoading}
          onSuccess={state.updateState.isSuccess}
          onError={state.updateState.isError}
        />
      </div>
    </div>
  );
}
