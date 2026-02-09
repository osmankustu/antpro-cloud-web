import axios from 'axios';
import { setupRequestInterceptor } from '../interceptors/requestInterceptor';
import { setupResponseInterceptor } from '../interceptors/responseInterceptor';

const axiosClient = axios.create({
  baseURL: `/api`,
  withCredentials: true,
  headers: { 'Accept-Language': 'tr' },
});

setupRequestInterceptor(axiosClient);
setupResponseInterceptor(axiosClient);

export default axiosClient;
