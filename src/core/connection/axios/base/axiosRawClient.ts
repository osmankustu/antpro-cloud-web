import axios from 'axios';

export const axiosRawClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`,
  withCredentials: true,
  headers: { 'Accept-Language': 'tr' },
  timeout: 15000,
});
