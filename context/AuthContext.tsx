import React, { createContext, useEffect, useState, ReactNode } from 'react';

import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { fetchAxios } from '../libs/axios';
import type {
  UserData,
  AuthContextData,
} from '../ts/types/Context/AuthContext';
import { LoginFormValues } from '../ts/types/schema/AuthenticationSchema';

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextData>({
  isAuthenticated: false,
  setIsAuthenticated: () => false,
  setLoginFormValues: () => {},
  loginFormValues: { username: '', password: '' },
  login: () => {},
  logout: () => null,
  errorMessage: '',
  isLoading: false,
  expiredTokenTime: 3600,
  refreshToken: () => null,
  getUserData: () => {},
  userData: {
    id: '',
    username: '',
    role: '',
    role_name: '',
    created_at: '',
    updated_at: '',
  },
  setUserData: () => {},
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [expiredTokenTime, setExpiredTokenTime] = useState<number>(3600);
  const [loginFormValues, setLoginFormValues] = useState<LoginFormValues>({
    username: '',
    password: '',
  });
  const [userData, setUserData] = useState<UserData>({
    id: '',
    username: '',
    role: '',
    role_name: '',
    created_at: '',
    updated_at: '',
  });

  const executeGetUserData = useMutation(
    'getDataUser',
    async () => {
      return fetchAxios.post('/api/auth/me');
    },
    {
      onSuccess: async (res) => {
        if (res.status === 200) {
          setUserData(res.data);
        }
      },
      onError: async (error: AxiosError) => {
        if (error.response?.status === 401) {
          setErrorMessage('Gagal memperoleh data user');
        } else {
          setErrorMessage(error.message);
        }
      },
    }
  );

  const executeLogout = useMutation(
    'logout',
    async () => {
      return fetchAxios.post('/api/auth/logout');
    },
    {
      onSuccess: async (res) => {
        setIsLoading(true);
        if (res.status === 200) {
          setIsAuthenticated(false);
          Cookies.remove('xmt');
          Cookies.remove('xmxt');

          router.replace('/admin/login');
        }
      },
      onError: async (error: AxiosError) => {
        if (error.response?.status === 401) {
          setErrorMessage('Gagal Logout');
        } else {
          setErrorMessage(error.message);
        }
      },
    }
  );

  const executeRefreshToken = useMutation(
    'refreshToken',
    async () => {
      return fetchAxios.post('/api/auth/refresh', {
        token: Cookies.get('xmt'),
      });
    },
    {
      onSuccess: async (res) => {
        Cookies.remove('xmt');
        Cookies.remove('xmxt');

        if (res.status === 200) {
          const expiredIn = res.data.expires_in * 10000;

          Cookies.set('xmt', res.data.access_token);
          Cookies.set('xmxt', JSON.stringify(expiredIn));

          setExpiredTokenTime(expiredIn);
        }
      },
      onError: async (error: AxiosError) => {
        if (error.response?.status === 401) {
          Cookies.remove('xmt');
          Cookies.remove('xmxt');
        } else {
          setErrorMessage(error.message);
        }
      },
    }
  );

  const getUserData = async () => {
    executeGetUserData.mutate();
  };

  const executeLogin = useMutation(
    'login',
    async () => {
      return fetchAxios.post('/api/auth/login', {
        username: loginFormValues.username,
        password: loginFormValues.password,
      });
    },
    {
      onSuccess: async (res) => {
        if (res.status === 200) {
          setIsLoading(false);
          setIsAuthenticated(true);

          const expiredIn = res.data.expires_in * 10000;

          Cookies.set('xmt', res.data.access_token);
          Cookies.set('xmxt', JSON.stringify(expiredIn));

          setExpiredTokenTime(expiredIn);
          getUserData();

          router.push('/admin/ustadz');
          router.prefetch('/admin/ustadz');
        }
      },
      onError: async (error: AxiosError) => {
        if (error.response?.status === 401) {
          setIsLoading(false);
          setErrorMessage('Username atau Password salah');
        } else {
          setErrorMessage(error.message);
        }
      },
    }
  );

  const login = async () => {
    setIsLoading(true);
    executeLogin.mutate();
  };

  const logout = async () => {
    executeLogout.mutate();
  };

  const refreshToken = async () => {
    if (Cookies.get('xmxt')) {
      executeRefreshToken.mutate();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken();
    }, +expiredTokenTime);

    return () => {
      clearInterval(interval);
    };
  }, [expiredTokenTime]);

  useEffect(() => {
    const token = Cookies.get('xmt');

    if (!token) {
      router.replace('/admin/login');
    } else if (token) {
      getUserData();

      if (router.pathname === '/admin/login') {
        router.replace('/admin/ustadz');
      }
    }
  }, [router.pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        setLoginFormValues,
        loginFormValues,
        login,
        logout,
        errorMessage,
        isLoading,
        expiredTokenTime,
        refreshToken,
        setUserData,
        getUserData,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
