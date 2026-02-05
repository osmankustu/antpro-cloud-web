import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { Toast } from '@/core/utils/toast/toast';
import { useUpdateActivityMutation } from '@/modules/service-management/endpoints/activity.endpoints';
import { useAddDocumentMutation } from '@/modules/service-management/endpoints/document.endpoints';
import { ActivityUpdateModel } from '@/modules/service-management/types/activity.types';
import { useEffect, useState } from 'react';

export function useUpdateActivity(serviceId?: string) {
  const [error, setError] = useState<ResponseError | undefined>();
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ActivityUpdateModel, string>>
  >({});
  const [
    UpdateActivity,
    { isLoading: activityLoading, error: activityError, isSuccess: activitySuccess },
  ] = useUpdateActivityMutation();
  const [
    addDocument,
    { isLoading: documentLoading, error: documentError, isSuccess: documentSuccess },
  ] = useAddDocumentMutation();

  const isSubmitting = activityLoading || documentLoading;
  const endpointError = (activityError || documentError) as ResponseError;

  const handleUpdateActivity = async (activityData: ActivityUpdateModel, fileData: File[]) => {
    setError(undefined);
    setFieldErrors({});

    try {
      const activity = await UpdateActivity(activityData).unwrap();
      Toast.success('Aktivite Güncellendi.');
      if (activityData.id) {
        if (fileData && fileData.length > 0) {
          await addDocument({
            activityId: activityData.id,
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
        const mappedErrors: Partial<Record<keyof ActivityUpdateModel, string>> = {};
        e.Errors.forEach(fe => {
          // Backend Property isimlerini camelCase'e çevir
          const key = (fe.Property.charAt(0).toLowerCase() +
            fe.Property.slice(1)) as keyof ActivityUpdateModel;
          mappedErrors[key] = fe.Errors.join(' | ');
        });
        setFieldErrors(mappedErrors);
      }
      if (e.type === 'https://example.com/probs/validation') {
        Toast.warning(e.title || 'Hareket Güncellenemedi');
      } else {
        Toast.error(e.title || 'Hareket Güncellenemedi');
      }
    }
  };

  useEffect(() => {
    if (!endpointError) return;
    setError(endpointError);
    Toast.error(endpointError?.title);
  }, [endpointError]);

  return {
    handleUpdateActivity,
    isSubmitting,
    activitySuccess,
    documentSuccess,
    fieldErrors,
    error,
  };
}
