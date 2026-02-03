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
  // 1) Dökümanları çek
  const {
    data: documents,
    isLoading: documentsLoading,
    isFetching: documentFetching,
    error: documentsError,
    refetch,
  } = useGetDocumentByServiceIdQuery(serviceId ? serviceId : skipToken);

  const [deleteDocument, { isLoading: isDeleting }] = useDeleteDocumentMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteDocument(id).unwrap();
      refetch();
    } catch (error) {
      const err = error as ResponseError;
      Toast.error(err.title || 'Döküman Silindi');
    }
  };

  // Signed URL oluşturulacak yollar
  const urls = documents?.items?.map(d => d.filePath) ?? [];

  // 2) Signed URL’leri çek
  const {
    data: signedResults,
    error: signedError,
    isFetching: signedFetching,
    isLoading: signedLoading,
  } = useGetDocumentsSignedUrlQuery(
    { urls, duration: 60 },
    { skip: urls.length === 0 }, // boşsa çağırma
  );

  const endpointError = (documentsError || signedError) as ResponseError;
  const isLoading = documentsLoading || signedLoading;
  const isFetching = documentFetching || signedFetching;

  // 3) Hata yönetimi
  // Show API Errors once
  useEffect(() => {
    if (!endpointError) return;
    setError(endpointError);
    Toast.error(endpointError.title);
  }, [endpointError]);

  // 4) Dökümanları signed URL ile merge et
  const finalDocuments = useMemo(() => {
    if (!documents?.items || !signedResults?.signedUrls) return [];

    return documents.items.map(doc => ({
      ...doc,
      filePath: signedResults.signedUrls[doc.filePath],
    }));
  }, [documents, signedResults]);

  return {
    // data
    documents: finalDocuments,
    // states
    isLoading,
    isFetching,
    isDeleting,
    error,
    // actions
    refetch,
    handleDelete,
  };
}
