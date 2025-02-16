'use client';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import LoginPage from '@/app/auth/login/page';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState<null | boolean>(null);
  const router = useRouter();

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
      setIsAuthorized(false);
      return;
    }

    try {
      const response = await api.post('/token/refresh/', {
        refresh: refreshToken,
      });

      if (response.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    const tokenExpiration = decodedToken.exp;

    if (tokenExpiration && currentTime > tokenExpiration) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  useEffect(() => {
    auth().catch(error => {
      console.error(error);
      setIsAuthorized(false);
    });
  }, []);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : router.push('/auth/login');
};

export default ProtectedRoute;
