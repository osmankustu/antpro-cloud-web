import TextArea from '@/components/form/input/TextArea';
import Button from '@/components/ui/button/Button';
import ToolbarButton from '@/components/ui/button/ToolbarButton';
import { Modal } from '@/components/ui/modal';
import { useModal } from '@/hooks/useModal';
import FormField from '@/modules/customer-management/components/forms/FormField';
import FormSection from '@/modules/customer-management/components/forms/FormSection';
import { ServiceStatusSelect } from '@/modules/service-management/components/forms/ServiceStatusSelect';
import { ActivityAddModel } from '@/modules/service-management/types/activity.types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ServiceDetailHookResponse } from '../../../service/hooks/types/serviceHookReturn.types';
import { useAddActivity } from '../../hooks/useAddActivity';
import { ActivityDropzone } from '../forms/ActivityDropzone';

interface ActivityAddModalProps {
  model: ServiceDetailHookResponse;
  router: AppRouterInstance;
}

export function ActivityAddModal({ model, router }: ActivityAddModalProps) {
  const service = model.data.service;
  const { data, actions, state, errors } = useAddActivity(service?.id);
  const [files, setFiles] = useState<File[]>([]);
  const { isOpen, closeModal, openModal } = useModal();
  const { control, reset, handleSubmit } = useForm<ActivityAddModel>({
    defaultValues: {
      description: '',
      employeeId: data.currentUser?.employeeId,
      poolId: service?.poolId,
      status: '',
    },
  });

  useEffect(() => {
    reset({
      employeeId: data.currentUser?.employeeId,
      poolId: service?.poolId,
      description: '',
    });
  }, [data.currentUser, service]);

  useEffect(() => {
    if (files && files.length > 0) {
      if (state.documentSubmitState.isSuccess && state.activitySubmitState.isSuccess) {
        closeModal();
      }
    } else {
      if (state.activitySubmitState.isSuccess) {
        closeModal();
      }
    }
  }, [state.documentSubmitState.isSuccess, state.activitySubmitState.isSuccess]);

  const handleActivitySubmit = (data: ActivityAddModel) => {
    actions.add(data, files);
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

          <ActivityDropzone
            onChange={files => setFiles(files)}
            isSubmitting={state.documentSubmitState.isLoading}
            progress={state.documentProgress}
          />
          <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Kapat
            </Button>
            <Button
              size="sm"
              onClick={handleSubmit(handleActivitySubmit)}
              disabled={state.documentSubmitState.isLoading || state.activitySubmitState.isLoading}
            >
              Oluştur
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
