import axios from 'axios';
import { ACCESS_TOKEN } from '@/constants';
import { cookies } from 'next/headers';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  async config => {
    const accessToken = (await cookies()).get(ACCESS_TOKEN)?.value;
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
