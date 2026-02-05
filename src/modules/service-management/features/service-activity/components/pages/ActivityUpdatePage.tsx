import TextArea from '@/components/form/input/TextArea';
import Button from '@/components/ui/button/Button';
import { useAppSelector } from '@/core/store/base/hook';
import FormField from '@/modules/service-management/components/forms/FormField';
import { ServiceStatusSelect } from '@/modules/service-management/components/forms/ServiceStatusSelect';
import { FullRow, Section } from '@/modules/service-management/components/ui/detail';
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
  const {
    handleUpdateActivity,
    isSubmitting,
    activitySuccess,
    documentSuccess,
    error,
    fieldErrors,
  } = useUpdateActivity(service?.id);

  const employee = useAppSelector(s => s.auth.user);
  const [files, setFiles] = useState<File[]>([]);
  const { control, reset, getValues, handleSubmit } = useForm<ActivityUpdateModel>({
    defaultValues: {
      //   description: activity?.description ?? '',
      //   status: activity?.status ?? '',
      //   employeeId: employee?.employeeId ?? '',
      //   id: activity?.id ?? '',
      //   poolId: activity?.poolId ?? '',
      //   createdDate: activity?.createdDate ?? '',
    },
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
  }, [activity]);

  const handleActivitySubmit = async (data: ActivityUpdateModel) => {
    handleUpdateActivity(data, files);
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
      <ActivityDropzone onChange={value => setFiles(value)} isSubmitting={isSubmitting} />
      <div className="flex justify-end">
        <Button
          size="sm"
          onClick={handleSubmit(handleActivitySubmit)}
          children={'Kaydet'}
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
}
