import TextArea from '@/components/form/input/TextArea';
import Button from '@/components/ui/button/Button';
import ToolbarButton from '@/components/ui/button/ToolbarButton';
import { Modal } from '@/components/ui/modal';
import { useAppSelector } from '@/core/store/base/hook';
import { useModal } from '@/hooks/useModal';
import FormField from '@/modules/customer-management/components/forms/FormField';
import FormSection from '@/modules/customer-management/components/forms/FormSection';
import { ServiceStatusSelect } from '@/modules/service-management/components/forms/ServiceStatusSelect';
import { ActivityAddModel } from '@/modules/service-management/types/activity.types';
import { ServiceModel } from '@/modules/service-management/types/service.types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAddActivity } from '../../hooks/useAddActivity';
import { ActivityDropzone } from '../forms/ActivityDropzone';

interface ActivityAddModalProps {
  service?: ServiceModel;
}

export function ActivityAddModal({ service }: ActivityAddModalProps) {
  const employee = useAppSelector(s => s.auth.user);
  const [files, setFiles] = useState<File[]>([]);
  const { isOpen, closeModal, openModal } = useModal();
  const { control, reset, handleSubmit } = useForm<ActivityAddModel>({
    defaultValues: {
      description: '',
      employeeId: employee?.employeeId,
      poolId: service?.poolId,
      status: '',
    },
  });

  useEffect(() => {
    reset({
      employeeId: employee?.id,
      poolId: service?.poolId,
      description: '',
    });
  }, []);
  const { handleAddActivity, fieldErrors, isSubmitting, error, activitySuccess, documentSuccess } =
    useAddActivity(service?.id);

  useEffect(() => {
    if (documentSuccess && activitySuccess) {
      closeModal();
    }
  }, [documentSuccess, activitySuccess]);

  const handleActivitySubmit = (data: ActivityAddModel) => {
    handleAddActivity(data, files);
  };

  return (
    <>
      <ToolbarButton onClick={openModal}>Hareket Oluştur</ToolbarButton>
      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[900px]">
        <div className="no-scrollbar relative w-full max-w-[900px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Servis Hareketi Oluştur
            </h4>
          </div>
          <FormSection title="Hareket Bilgileri">
            <FormField label="Hareket Tanımı">
              <Controller
                control={control}
                name="description"
                render={({ field }) => <TextArea {...field} />}
              />
            </FormField>
            <FormField label="Servis Durumu">
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <ServiceStatusSelect onChange={value => field.onChange(value)} />
                )}
              />
            </FormField>
          </FormSection>

          <ActivityDropzone onChange={files => setFiles(files)} isSubmitting={isSubmitting} />
          <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Kapat
            </Button>
            <Button size="sm" onClick={handleSubmit(handleActivitySubmit)} disabled={isSubmitting}>
              Oluştur
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
