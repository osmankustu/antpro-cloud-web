import axios from 'axios';

export const axiosRawClient = axios.create({
  baseURL: `/api`,
  withCredentials: true,
  headers: { 'Accept-Language': 'tr' },
  timeout: 15000,
});
