import Input from '@/components/form/input/InputField';
import TextArea from '@/components/form/input/TextArea';
import { UpdateModalButton } from '@/components/ui/button/UpdateModalButton';
import { useModal } from '@/hooks/useModal';
import { BaseAddress } from '@/modules/customer-management/types/base/baseAddress';
import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { ServiceMessages } from '../../constants/serviceMessages';
import useServiceUpdate from '../../features/service/hooks/useServiceUpdate';
import { ServiceModel, ServiceUpdateModel } from '../../types/service.types';
import { AddressSelect } from '../forms/AddressSelect';
import { AssignmentSelect } from '../forms/AssignmentsSelect';
import { CustomerSelect } from '../forms/CustomerSelect';
import FormField from '../forms/FormField';
import FormGrid from '../forms/FormGrid';
import FormSection from '../forms/FormSection';
import { PrioritySelect } from '../forms/PrioritySelect';
import { AddressAddModal } from '../modals/AddressAddModal';

interface ServiceUpdatePageProps {
  service?: ServiceModel;
}

export default function ServiceUpdatePage({ service }: ServiceUpdatePageProps) {
  const { isOpen, closeModal, openModal } = useModal();
  const { data, state, errors, actions } = useServiceUpdate();
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

  const handleServiceSubmit = (data: ServiceUpdateModel) => {
    actions.updateService(data);
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
          onSubmitting={state.isSubmitting}
          onSuccess={state.isSubmitSuccess}
        />
      </div>
      <AddressAddModal isOpen={isOpen} onClose={closeModal} customerId={customerId} />
    </div>
  );
}
