import axiosClient from '@/core/connection/axios/base/axiosClient';
import { axiosRawClient } from '@/core/connection/axios/base/axiosRawClient';
import { LoginRequest } from '../types/requests/loginRequest';

export const AuthService = {
  login: (credentials: LoginRequest) => axiosClient.post('/auth/login', credentials),
  refresh: () => axiosRawClient.get('/auth/refresh-token'),
  revoke: (refreshToken?: string) => axiosClient.put('/auth/revoke-token', refreshToken),
  me: () => axiosClient.get('/user/get-from-auth'),
  myInfo: () => axiosClient.get('/employees/get-from-user'),
};
