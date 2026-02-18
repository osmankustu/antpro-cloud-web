import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { useAppSelector } from '@/core/store/base/hook';
import { Toast } from '@/core/utils/toast/toast';
import { useAddActivityMutation } from '@/modules/service-management/endpoints/activity.endpoints';
import { useAddDocumentMutation } from '@/modules/service-management/endpoints/document.endpoints';
import { ActivityAddModel } from '@/modules/service-management/types/activity.types';
import { useState } from 'react';
import { ActivityAddHookResponse } from './types/activityHookReturn.types';

export function useAddActivity(serviceId?: string): ActivityAddHookResponse {
  const [error, setError] = useState<ResponseError>();
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ActivityAddModel, string>>>(
    {},
  );
  const [addActivity, activitySubmitState] = useAddActivityMutation();
  const [addDocument, documentSubmitState] = useAddDocumentMutation();
  const currentUser = useAppSelector(s => s.auth.user);
  const progress = useAppSelector(s => s.ui.uploadProgress);

  const addActivityAction = async (activityData: ActivityAddModel, fileData: File[]) => {
    setError(undefined);
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
      setError(e);

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
    data: {
      currentUser: currentUser,
    },
    state: {
      activitySubmitState: activitySubmitState,
      documentSubmitState: documentSubmitState,
      documentProgress: progress,
    },
    errors: {
      error: error,
      fieldErrors: fieldErrors,
    },
    actions: {
      add: (payload, files) => addActivityAction(payload, files),
    },
  };
}
