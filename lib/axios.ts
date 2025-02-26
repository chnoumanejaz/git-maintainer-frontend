import { ACCESS_TOKEN } from '@/constants';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { ErrorResponse, formatErrorMessage, getCookie } from './utils';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  async config => {
    const accessToken = getCookie(ACCESS_TOKEN);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    console.log('Authorization', `Bearer ${accessToken}`);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;

interface ShowApiError {
  (error: unknown): void;
}

export const showApiError: ShowApiError = (error: unknown): void => {
  console.error(error);
  if (error instanceof AxiosError) {
    if (error.code === 'ERR_NETWORK') {
      toast.error('Please make sure you are connected to the internet.');
    } else {
      toast.error(formatErrorMessage(error.response?.data as ErrorResponse));
    }
  } else {
    toast.error('An unknown error occurred.');
  }
};
