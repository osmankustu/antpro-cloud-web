import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { Toast } from '@/core/utils/toast/toast';
import { useAddActivityMutation } from '@/modules/service-management/endpoints/activity.endpoints';
import { useAddDocumentMutation } from '@/modules/service-management/endpoints/document.endpoints';
import { ActivityAddModel } from '@/modules/service-management/types/activity.types';
import { useEffect, useState } from 'react';

export function useAddActivity(serviceId?: string) {
  const [error, setError] = useState<ResponseError | undefined>();
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ActivityAddModel, string>>>(
    {},
  );
  const [
    AddActivity,
    { isLoading: activityLoading, error: activityError, isSuccess: activitySuccess },
  ] = useAddActivityMutation();
  const [
    addDocument,
    { isLoading: documentLoading, error: documentError, isSuccess: documentSuccess },
  ] = useAddDocumentMutation();

  const isSubmitting = activityLoading || documentLoading;
  const endpointError = (activityError || documentError) as ResponseError;

  const handleAddActivity = async (activityData: ActivityAddModel, fileData: File[]) => {
    setError(undefined);
    setFieldErrors({});

    try {
      const activity = await AddActivity(activityData).unwrap();
      Toast.success('Aktivite Oluşturuldu.');
      if (activity.id) {
        if (fileData && fileData.length > 0) {
          await addDocument({
            activityId: activity.id,
            serviceId: serviceId!,
            files: fileData,
          }).unwrap();
          Toast.info('Dökümanlar Eklendi.');
        }
      }
    } catch (error) {
      const e = error as ResponseError;
      setError(e);

      if (e.Errors && Array.isArray(e.Errors)) {
        const mappedErrors: Partial<Record<keyof ActivityAddModel, string>> = {};
        e.Errors.forEach(fe => {
          // Backend Property isimlerini camelCase'e çevir
          const key = (fe.Property.charAt(0).toLowerCase() +
            fe.Property.slice(1)) as keyof ActivityAddModel;
          mappedErrors[key] = fe.Errors.join(' | ');
        });
        setFieldErrors(mappedErrors);
      }
      if (e.type === 'https://example.com/probs/validation') {
        Toast.warning(e.title || 'Hareket eklenemedi');
      } else {
        Toast.error(e.title || 'Hareket eklenemedi');
      }
    }
  };

  useEffect(() => {
    if (!endpointError) return;
    setError(endpointError);
    Toast.error(endpointError?.title);
  }, [endpointError]);

  return {
    handleAddActivity,
    isSubmitting,
    activitySuccess,
    documentSuccess,
    fieldErrors,
    error,
  };
}
