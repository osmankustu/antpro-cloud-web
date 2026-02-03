import { CitySelect } from '@/components/form/CitySelect';
import Input from '@/components/form/input/InputField';
import TextArea from '@/components/form/input/TextArea';
import Button from '@/components/ui/button/Button';
import { Modal } from '@/components/ui/modal';
import { AddressAddModel } from '@/modules/customer-management/types/address.types';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAddCustomerAddress } from '../../hooks/useAddCustomerAddress';
import FormField from '../forms/FormField';
import FormGrid from '../forms/FormGrid';
import FormSection from '../forms/FormSection';

interface AddressAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerId: string;
}

export function AddressAddModal({ isOpen, onClose, customerId }: AddressAddModalProps) {
  const { handleAddAddress } = useAddCustomerAddress(customerId);
  const { control, reset, setValue, handleSubmit } = useForm<AddressAddModel>({
    defaultValues: {
      addressLine: '',
      city: '',
      latitude: 0,
      longitude: 0,
      postalCode: '',
      state: '',
      cityId: 0,
      stateId: 0,
      customerId: '',
      title: '',
    },
  });

  useEffect(() => {
    reset({
      customerId: customerId ?? '',
      addressLine: '',
      city: '',
      latitude: 0,
      longitude: 0,
      postalCode: '',
      state: '',
      cityId: 0,
      stateId: 0,

      title: '',
    });
  }, [customerId, isOpen]);

  const handleAddressSubmit = (data: AddressAddModel) => {
    console.log(data);
    handleAddAddress(data);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="m-4 max-w-[900px]">
      <div className="no-scrollbar relative w-full max-w-[900px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {customerId} Adres Oluştur
          </h4>
        </div>
        <FormSection title="Adres Bilgileri">
          <FormField label="Adres başlığı">
            <Controller
              control={control}
              name="title"
              render={({ field }) => <Input {...field} />}
            />
          </FormField>
          <FormField label="Adres">
            <Controller
              control={control}
              name="addressLine"
              render={({ field }) => <TextArea {...field} />}
            />
          </FormField>

          <FormGrid>
            <CitySelect
              onChange={value => {
                setValue('city', value.city?.name!);
                setValue('cityId', value.city?.id!);
                setValue('state', value.state?.name!);
                setValue('stateId', value.state?.id!);
                setValue(
                  'latitude',
                  value.state ? value.state.lat : value.city ? value.city.lat : null,
                );
                setValue(
                  'longitude',
                  value.state ? value.state.lon : value.city ? value.city.lon : null,
                );
              }}
            />
          </FormGrid>

          <FormField label="Posta kodu">
            <Controller
              control={control}
              name="postalCode"
              render={({ field }) => <Input {...field} />}
            />
          </FormField>
        </FormSection>
        <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
          <Button size="sm" variant="outline" onClick={onClose}>
            Kapat
          </Button>
          <Button size="sm" onClick={handleSubmit(handleAddressSubmit)}>
            Oluştur
          </Button>
        </div>
      </div>
    </Modal>
  );
}
