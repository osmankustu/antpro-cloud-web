import { rootStore } from '@/core/store/base/rootStore';
import { clearUploadProgress, setUploadProgress, startLoading, stopLoading } from '@/core/ui/uiSlice';
import axiosClient from '../axios/base/axiosClient';
import { handleError } from '../error/errorHandler';
import { ReduxClientRequest } from './types/reduxClientRequest';
import { ReduxClientResponse } from './types/reduxClientResponse';

export const reduxClient = async <T = any>(
  req: ReduxClientRequest,
): Promise<ReduxClientResponse<T>> => {
  try {
    rootStore.dispatch(startLoading());
    const isMultipart = req.data instanceof FormData;
    if (isMultipart) {
      req.headers = { 'Content-Type': 'multipart/form-data' };
      console.log('Multipart');
    }

    const response = await axiosClient({
      url: req.url,
      method: req.method,
      data: req.data,
      params: req.params,
      headers: req.headers,
      timeout: req.timeout ?? (isMultipart ? 0 : 10000),
      // 👇 progress hook
      onUploadProgress: evt => {
        if (!evt.total) return;

        const percent = Math.round((evt.loaded * 100) / evt.total);

        req.onUploadProgress?.(percent);

        // 👇 global UI için
        rootStore.dispatch(setUploadProgress(percent));
      },
    });

    return { data: response.data as T };
  } catch (error: any) {
    const err = handleError(error);
    return {
      error: { ...err, status: err.statusCode },
    };
  } finally {
    rootStore.dispatch(stopLoading());
    rootStore.dispatch(clearUploadProgress());
  }
};
