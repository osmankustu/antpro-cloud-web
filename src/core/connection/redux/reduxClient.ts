import { rootStore } from '@/core/store/base/rootStore';
import { startLoading, stopLoading } from '@/core/ui/uiSlice';
import axiosClient from '../axios/base/axiosClient';
import { handleError } from '../error/errorHandler';
import { ReduxClientRequest } from './types/reduxClientRequest';
import { ReduxClientResponse } from './types/reduxClientResponse';

export const reduxClient = async <T = any>(
  req: ReduxClientRequest,
): Promise<ReduxClientResponse<T>> => {
  try {
    rootStore.dispatch(startLoading());

    if (req.data instanceof FormData) {
      req.headers = { 'Content-Type': 'multipart/form-data' };
      console.debug('Multipart');
    }

    const response = await axiosClient({
      url: req.url,
      method: req.method,
      data: req.data,
      params: req.params,
      headers: req.headers,
    });

    return { data: response.data as T };
  } catch (error: any) {
    const err = handleError(error);
    return {
      error: { ...err, status: err.statusCode },
    };
  } finally {
    rootStore.dispatch(stopLoading());
  }
};
