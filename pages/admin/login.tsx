import { useContext, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import {
  AiFillLock,
  AiFillUnlock,
  AiOutlineLoading3Quarters,
  AiOutlineWarning,
} from 'react-icons/ai';

import AuthLayout from '../../components/main/Layout/AuthLayout';
import { AuthContext } from '../../context/AuthContext';
import { NextPageWithLayout } from '../../ts/types/NextPageWithLayout';
import { LoginFormValues } from '../../ts/types/schema/AuthenticationSchema';
import { loginSchema } from '../../utils/schema/authenticationSchema';

const LoginPage: NextPageWithLayout = () => {
  const {
    login,
    setLoginFormValues,
    loginFormValues,
    errorMessage,
    isLoading,
  } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = () => {
    if (loginFormValues.username !== '' || loginFormValues.password !== '') {
      login();
    }
  };

  useEffect(() => {
    setLoginFormValues({
      username: watch('username'),
      password: watch('password'),
    });
  }, [watch('username'), watch('password')]);

  return (
    <section className="flex flex-col w-full h-full">
      <Head>
        <title>Login</title>
        <meta name="Halaman Login" content="Halaman Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article className="relative flex flex-col items-center sm:min-h-[30vh] justify-center w-full px-5 py-0 gap-y-10 sm:py-32 h-full">
        <article className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-center text-primary-160">
            Masuk ke akun anda
          </h1>
          <p className="text-sm text-center text-primary-160">
            masuk untuk mengakses aplikasi
          </p>
        </article>

        <form
          className="flex flex-col w-full max-w-md gap-5"
          onSubmit={handleSubmit(handleLogin)}
        >
          <article className="flex flex-col gap-1">
            <label
              htmlFor="username"
              className="text-base font-semibold text-primary-160"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Masukkan username anda"
              className="w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-140 sm:text-sm sm:leading-6"
              {...register('username')}
            />

            {errors.username && (
              <p className="mt-1 text-xs text-red-600">
                {errors.username.message}
              </p>
            )}
          </article>

          <article className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-base font-semibold text-dark-primary-color"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Masukkan password anda"
              className="w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-140 sm:text-sm sm:leading-6"
              {...register('password')}
            />

            {errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </article>

          {errorMessage && (
            <article className="flex items-center justify-center py-2 mt-2 text-sm text-red-800 transition bg-red-100 rounded-md">
              <span>
                <AiOutlineWarning className="w-5 h-5 mr-2 text-red-500" />
              </span>
              <p className="font-semibold">{errorMessage}</p>
            </article>
          )}

          <button
            type="submit"
            disabled={watch('username') === '' || watch('password') === ''}
            className={`relative flex justify-center w-full p-3 text-sm font-semibold text-white transition-all duration-100 rounded-md bg-primary-120 group hover:bg-primary-140 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-100 disabled:bg-primary-60 active:bg-primary-160 disabled:cursor-not-allowed ${
              errorMessage ? 'mt-0' : 'mt-12'
            }`}
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              {watch('username') === '' || watch('password') === '' ? (
                <AiFillLock className="w-5 h-5 text-white" />
              ) : (
                <AiFillUnlock className="w-5 h-5 text-white" />
              )}
            </span>
            {isLoading ? (
              <AiOutlineLoading3Quarters className="text-xl text-primary-40 animate-spin" />
            ) : (
              'Masuk'
            )}
          </button>
        </form>
      </article>
    </section>
  );
};

LoginPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default LoginPage;
