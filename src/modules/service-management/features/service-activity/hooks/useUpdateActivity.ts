import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { useAppSelector } from '@/core/store/base/hook';
import { Toast } from '@/core/utils/toast/toast';
import { useUpdateActivityMutation } from '@/modules/service-management/endpoints/activity.endpoints';
import { useAddDocumentMutation } from '@/modules/service-management/endpoints/document.endpoints';
import { ActivityUpdateModel } from '@/modules/service-management/types/activity.types';
import { useState } from 'react';
import { ActivityUpdateHookResponse } from './types/activityHookReturn.types';

export function useUpdateActivity(serviceId?: string): ActivityUpdateHookResponse {
  const [error, setError] = useState<ResponseError>();
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ActivityUpdateModel, string>>
  >({});
  const [UpdateActivity, activitySubmitState] = useUpdateActivityMutation();
  const [addDocument, documentSubmitState] = useAddDocumentMutation();
  const currentUser = useAppSelector(s => s.auth.user);
  const progress = useAppSelector(s => s.ui.uploadProgress);

  const updateActivityAction = async (activityData: ActivityUpdateModel, fileData: File[]) => {
    setError(undefined);
    setFieldErrors({});

    try {
      UpdateActivity(activityData).unwrap();
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
      update: (payload, files) => updateActivityAction(payload, files),
    },
  };
}
