import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { Toast } from '@/core/utils/toast/toast';
import { useAddActivityMutation } from '@/modules/service-management/endpoints/activity.endpoints';
import { useAddDocumentMutation } from '@/modules/service-management/endpoints/document.endpoints';
import { ActivityAddModel } from '@/modules/service-management/types/activity.types';
import { useState } from 'react';

export function useAddActivity(serviceId?: string) {
  const [formError, setFormError] = useState<ResponseError>();
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ActivityAddModel, string>>>(
    {},
  );
  const [addActivity, submitState] = useAddActivityMutation();
  const [addDocument, documentSubmitState] = useAddDocumentMutation();

  const addActivityAction = async (activityData: ActivityAddModel, fileData: File[]) => {
    setFormError(undefined);
    setFieldErrors({});

    try {
      const activity = await addActivity(activityData).unwrap();
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
      setFormError(e);

      if (e.Errors && Array.isArray(e.Errors)) {
        const mappedErrors: Partial<Record<keyof ActivityAddModel, string>> = {};
        e.Errors.forEach(fe => {
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

  return {
    data: {},
    state: {
      documentState: documentSubmitState,
      activityState: submitState,
    },
    error: {
      formError,
      fieldErrors,
    },
    actions: {
      addActivity: addActivityAction,
    },
  };
}
