import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

fetchAxios.interceptors.request.use((config): InternalAxiosRequestConfig => {
  if (typeof window !== 'undefined') {
    if (Cookies.get('xmt')) {
      (config.headers as AxiosHeaders).set(
        'Authorization',
        `Bearer ${Cookies.get('xmt')}`
      );

      if (config.data !== Blob) {
        (config.headers as AxiosHeaders).set(
          'Content-Type',
          'application/json'
        );
      }
    } else {
      (config.headers as AxiosHeaders).set('Content-Type', 'application/json');
    }
  }

  return config;
}, undefined);

export { fetchAxios };
