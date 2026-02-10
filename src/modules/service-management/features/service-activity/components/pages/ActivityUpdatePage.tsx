import TextArea from '@/components/form/input/TextArea';
import { UpdateModalButton } from '@/components/ui/button/UpdateModalButton';
import { useAppSelector } from '@/core/store/base/hook';
import FormField from '@/modules/service-management/components/forms/FormField';
import { ServiceStatusSelect } from '@/modules/service-management/components/forms/ServiceStatusSelect';
import { FullRow, Section } from '@/modules/service-management/components/ui/detail';
import { ServiceMessages } from '@/modules/service-management/constants/serviceMessages';
import {
  ActivityModel,
  ActivityUpdateModel,
} from '@/modules/service-management/types/activity.types';
import { ServiceModel } from '@/modules/service-management/types/service.types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useUpdateActivity } from '../../hooks/useUpdateActivity';
import { ActivityDropzone } from '../forms/ActivityDropzone';

interface ActivityUpdatePageProps {
  activity?: ActivityModel;
  service?: ServiceModel;
}

export function ActivityUpdatePage({ activity, service }: ActivityUpdatePageProps) {
  const { actions, state, error } = useUpdateActivity(service?.id);
  const progress = useAppSelector(s => s.ui.uploadProgress);

  const employee = useAppSelector(s => s.auth.user);
  const [files, setFiles] = useState<File[]>([]);
  const { control, reset, getValues, handleSubmit } = useForm<ActivityUpdateModel>({
    defaultValues: {},
  });

  useEffect(() => {
    if (activity) {
      reset({
        description: activity?.description ?? '',
        status: activity?.status ?? '',
        employeeId: employee?.employeeId ?? '',
        id: activity?.id ?? '',
        poolId: activity?.poolId ?? '',
        createdDate: activity?.createdDate ?? '',
      });
    }
  }, [activity, employee]);

  const handleActivitySubmit = async (data: ActivityUpdateModel) => {
    actions.updateActivity(data, files);
  };

  return (
    <div className="space-y-6">
      <Section title="Hareket Bilgileri">
        <FullRow>
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
                <ServiceStatusSelect
                  onChange={value => field.onChange(value)}
                  value={getValues('status')}
                />
              )}
            />
          </FormField>
        </FullRow>
      </Section>
      <ActivityDropzone
        onChange={value => setFiles(value)}
        isSubmitting={state.documentState.isLoading}
      />
      <div className="flex justify-end">
        <UpdateModalButton
          message={ServiceMessages.updateActivity}
          onConfirm={handleSubmit(handleActivitySubmit)}
          onSubmitting={state.documentState.isLoading || state.activityState.isLoading}
          onSuccess={state.activityState.isSuccess && progress === 100}
        />
      </div>
    </div>
  );
}
