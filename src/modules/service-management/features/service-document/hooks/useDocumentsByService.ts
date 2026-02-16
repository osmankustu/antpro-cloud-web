import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { Toast } from '@/core/utils/toast/toast';
import {
  useDeleteDocumentMutation,
  useGetDocumentByServiceIdQuery,
  useGetDocumentsSignedUrlQuery,
} from '@/modules/service-management/endpoints/document.endpoints';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useMemo, useState } from 'react';

export function useDocumentsByService(serviceId?: string) {
  const [error, setError] = useState<ResponseError | undefined>(undefined);
  const documentQuery = useGetDocumentByServiceIdQuery(serviceId ? serviceId : skipToken);
  const urls = documentQuery.data?.items?.map(d => d.filePath) ?? [];
  const signedQuery = useGetDocumentsSignedUrlQuery(
    { urls, duration: 60 },
    { skip: urls.length === 0 }, // boşsa çağırma
  );
  const [deleteDocument, deleteSubmitState] = useDeleteDocumentMutation();

  const fetchError = (documentQuery.error || signedQuery.error) as ResponseError;
  useEffect(() => {
    if (!fetchError) return;
    setError(fetchError);
    Toast.error(fetchError.title);
  }, [fetchError]);

  const documents = useMemo(() => {
    if (!documentQuery.data?.items || !signedQuery.data?.signedUrls) return [];

    return documentQuery.data.items.map(doc => ({
      ...doc,
      filePath: signedQuery.data?.signedUrls[doc.filePath]!,
    }));
  }, [documentQuery.data, signedQuery.data]);

  const deleteAction = async (id: string) => {
    try {
      await deleteDocument(id).unwrap();
    } catch (error) {
      const err = error as ResponseError;
      Toast.error(err.title || 'Döküman Silindi');
    }
  };

  const refetchAction = async () => {
    setError(undefined);
    await Promise.all([documentQuery.refetch(), signedQuery.refetch()]);
  };

  return {
    data: {
      documents: documents,
    },
    state: {
      documentState: documentQuery,
      signedState: signedQuery,
      deleteSubmitState: deleteSubmitState,
    },
    errors: {
      error,
      fetchError,
    },
    actions: {
      refetch: refetchAction,
      delete: deleteAction,
    },
  };
}
