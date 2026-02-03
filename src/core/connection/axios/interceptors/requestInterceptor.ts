import { rootStore } from '@/core/store/base/rootStore';
import { AxiosInstance } from 'axios';
import { config } from 'node:process';

export const setupRequestInterceptor = (axios: AxiosInstance) => {
  axios.interceptors.request.use(
    async config => {
      //tokeni localstorage vb. çek
      const state = rootStore.getState();
      const token = state.auth.token;
      //token kontrol boş değilse ekle
      if (token!) {
        config.headers.Authorization = `Bearer ${token.token}`;
      }
      return config;
    },
    error => {
      //Log.error("Request Error ", error);
      console.log(error);
      return Promise.reject(error);
    },
  );
};
