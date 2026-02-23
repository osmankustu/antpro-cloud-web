import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { DocumentModel } from '@/modules/service-management/types/document.types';

export interface DocumentByActivityHookResponse {
  data: {
    documents: DocumentModel[];
  };
  state: {
    documentState: {
      isLoading: boolean;
      isFetching: boolean;
      isSuccess: boolean;
      isError: boolean;
    };
    signedState: {
      isLoading: boolean;
      isFetching: boolean;
      isSuccess: boolean;
      isError: boolean;
    };
    deleteState: {
      isLoading: boolean;
      isSuccess: boolean;
      isError: boolean;
    };
  };
  errors: {
    error?: ResponseError;
    fetchError?: ResponseError;
  };
  actions: {
    refetch: () => Promise<void>;
    download: (path?: string) => Promise<void>;
    delete: (id: string) => Promise<void>;
  };
}

export interface DocumentByServiceIdHookResponse {
  data: {
    documents: DocumentModel[];
  };
  state: {
    documentState: {
      isLoading: boolean;
      isFetching: boolean;
      isSuccess: boolean;
      isError: boolean;
    };
    signedState: {
      isLoading: boolean;
      isFetching: boolean;
      isSuccess: boolean;
      isError: boolean;
    };
    deleteState: {
      isLoading: boolean;
      isSuccess: boolean;
      isError: boolean;
    };
  };
  errors: {
    error?: ResponseError;
    fetchError?: ResponseError;
  };
  actions: {
    refetch: () => Promise<void>;
    download: (path?: string) => Promise<void>;
    delete: (id: string) => Promise<void>;
  };
}
