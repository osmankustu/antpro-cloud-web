import TextArea from '@/components/form/input/TextArea';
import { UpdateModalButton } from '@/components/ui/button/UpdateModalButton';
import FormField from '@/modules/service-management/components/forms/FormField';
import { ServiceStatusSelect } from '@/modules/service-management/components/forms/ServiceStatusSelect';
import { FullRow, Section } from '@/modules/service-management/components/ui/detail';
import { ServiceMessages } from '@/modules/service-management/constants/serviceMessages';
import { ActivityUpdateModel } from '@/modules/service-management/types/activity.types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ServiceDetailHookResponse } from '../../../service/hooks/types/serviceHookReturn.types';
import { ActivitiyDetailHookResponse } from '../../hooks/types/activityHookReturn.types';
import { useUpdateActivity } from '../../hooks/useUpdateActivity';
import { ActivityDropzone } from '../forms/ActivityDropzone';

interface ActivityUpdatePageProps {
  models: {
    activityModel: ActivitiyDetailHookResponse;
    serviceModel: ServiceDetailHookResponse;
  };
  router: AppRouterInstance;
}

export function ActivityUpdatePage({ models, router }: ActivityUpdatePageProps) {
  const activity = models.activityModel.data.activity;
  const service = models.serviceModel.data.service;

  const { actions, state, errors, data } = useUpdateActivity(service?.id);

  const [files, setFiles] = useState<File[]>([]);
  const { control, reset, getValues, handleSubmit } = useForm<ActivityUpdateModel>({
    defaultValues: {},
  });

  useEffect(() => {
    if (activity) {
      reset({
        description: activity?.description ?? '',
        status: activity?.status ?? '',
        employeeId: data.currentUser?.employeeId ?? '',
        id: activity?.id ?? '',
        poolId: activity?.poolId ?? '',
        createdDate: activity?.createdDate ?? '',
      });
    }
  }, [activity, data.currentUser]);

  const handleActivitySubmit = async (data: ActivityUpdateModel) => {
    actions.update(data, files);
  };

  return (
    <div className="space-y-6">
      <Section title="Hareket Bilgileri">
        <FullRow>
          <FormField label="Hareket Tanımı">
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

          <FormField label="Servis Durumu">
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <ServiceStatusSelect
                  onChange={value => field.onChange(value)}
                  value={getValues('status')}
                  error={!!errors.fieldErrors.status}
                />
              )}
            />
          </FormField>
        </FullRow>
      </Section>
      <ActivityDropzone
        onChange={value => setFiles(value)}
        isSubmitting={state.documentSubmitState.isLoading}
        progress={state.documentProgress}
      />
      <div className="flex justify-end">
        <UpdateModalButton
          message={ServiceMessages.updateActivity}
          onConfirm={handleSubmit(handleActivitySubmit)}
          onSubmitting={state.documentSubmitState.isLoading || state.activitySubmitState.isLoading}
          onSuccess={state.activitySubmitState.isSuccess}
        />
      </div>
    </div>
  );
}
