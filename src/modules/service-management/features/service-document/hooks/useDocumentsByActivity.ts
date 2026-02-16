import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { Toast } from '@/core/utils/toast/toast';
import {
  useDeleteDocumentMutation,
  useGetDocumentByActivityIdQuery,
  useGetDocumentsSignedUrlQuery,
} from '@/modules/service-management/endpoints/document.endpoints';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useMemo, useState } from 'react';

export function useDocumentsByActivity(activityId?: string) {
  const [error, setError] = useState<ResponseError | undefined>(undefined);
  const doucmentsQuery = useGetDocumentByActivityIdQuery(activityId ? activityId : skipToken);
  const [deleteDocument, deleteSubmitState] = useDeleteDocumentMutation();
  const urls = doucmentsQuery.data?.items?.map(d => d.filePath) ?? [];
  const SignedQuery = useGetDocumentsSignedUrlQuery(
    { urls, duration: 60 },
    { skip: urls.length === 0 }, // boşsa çağırma
  );
  const fetchError = (doucmentsQuery.error || SignedQuery.error) as ResponseError;

  useEffect(() => {
    if (!fetchError) return;
    setError(fetchError);
    Toast.error(fetchError.title);
  }, [fetchError]);

  const documents = useMemo(() => {
    if (!doucmentsQuery.data?.items || !SignedQuery.data?.signedUrls) return [];

    return doucmentsQuery.data?.items.map(doc => ({
      ...doc,
      filePath: SignedQuery.data?.signedUrls?.[doc.filePath]!,
    }));
  }, [doucmentsQuery.data, SignedQuery.data]);

  const deleteAction = async (id: string) => {
    try {
      await deleteDocument(id).unwrap();
    } catch (error) {
      const err = error as ResponseError;
      setError(err);
      Toast.error(err.title || 'Döküman Silindi');
    }
  };
  const refetchAction = async () => {
    setError(undefined);
    await Promise.all([doucmentsQuery.refetch(), SignedQuery.refetch()]);
  };
  return {
    data: {
      documents: documents,
    },
    state: {
      documentState: doucmentsQuery,
      signedState: SignedQuery,
      deleteSubmitState: deleteSubmitState,
    },
    errors: {
      error,
      fetchError,
    },
    actions: {
      refetch: refetchAction,
      delete: (id: string) => deleteAction(id),
    },
  };
}
