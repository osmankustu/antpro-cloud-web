import { AxiosError, AxiosInstance } from 'axios';
import { handleError } from '../../error/errorHandler';
import { FailedRequest } from '../types/failedRequest';

// token yenilenene kadar istekleri bekletme mekanizması
let isRefreshing: boolean = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

export const setupResponseInterceptor = (axios: AxiosInstance) => {
  axios.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      //Token Yenileme Mekanizması
      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(axios(originalRequest));
              },
              reject: (err: unknown) => reject(err),
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const { rootStore } = await import('@/core/store/base/rootStore');
          const { refreshTokenThunk } = await import('@/core/auth/store/authThunks');

          rootStore.dispatch(refreshTokenThunk());

          //token kaydedildi
          const newToken = rootStore.getState().auth.token?.token;
          if (!newToken) console.log('axios interceptor new Token can be null');

          //yeni token set edilecek
          processQueue(null, newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return axios(originalRequest);
        } catch (err) {
          // console.log("interceptor err :", err);
          processQueue(err, null);

          const { rootStore } = await import('@/core/store/base/rootStore');
          const { logoutThunk } = await import('@/core/auth/store/authThunks');

          //token kaldırılıacak
          rootStore.dispatch(logoutThunk());

          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      if (error) {
        const errr = error as AxiosError;
        console.log(errr);
        console.log('Response Error ', errr.response);
        let err = handleError(errr);
        return Promise.reject(error);
      }
      console.log(error);
      return Promise.reject(error);
    },
  );
};
