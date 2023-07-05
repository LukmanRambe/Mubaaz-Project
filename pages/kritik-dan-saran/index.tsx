import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import ButtonLoading from '../../components/artifacts/Loading/ButtonLoading';
import BreadCrumb from '../../components/artifacts/PageHeader/Breadcrumb';
import Toast from '../../components/artifacts/Toast';
import MainLayout from '../../components/main/Layout/MainLayout';
import { fetchAxios } from '../../libs/axios';
import { NextPageWithLayout } from '../../ts/types/NextPageWithLayout';
import { CreateKritikDanSaranFormValues } from '../../ts/types/schema/KritikDanSaran';
import { createKritikDanSaranSchema } from '../../utils/schema/kritikDanSaranSchema';

const KritikDanSaran: NextPageWithLayout = () => {
  const router = useRouter();
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<string>('');
  const [isAnonym, setIsAnonym] = useState<boolean>(false);
  const [senderName, setSenderName] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateKritikDanSaranFormValues>({
    resolver: yupResolver(createKritikDanSaranSchema),
  });

  const createKritikDanSaran = useMutation(
    'createKritikDanSaran',
    async () => {
      return fetchAxios.post('/api/critics', {
        nama_pengirim: watch('nama_pengirim'),
        teks: watch('teks'),
      });
    },
    {
      onSuccess: async (response) => {
        if (response.status === 200) {
          setShowToast(true);
          setToastMessage('Kritik/Saran berhasil dikirim');
          setToastType('success');

          setTimeout(() => {
            setShowToast(false);
            setToastMessage('');
            router.reload();
          }, 2000);
        }
      },
      onError: async (error: AxiosError) => {
        if (error.response?.status === 404) {
          if (toastMessage === '') {
            setToastMessage('Terjadi kesalahan dari sisi client');
            setShowToast(true);
            setToastType('error');
          }

          setTimeout(() => {
            setShowToast(false);
            setToastMessage('');
          }, 2000);
        }
      },
    }
  );

  const handleCreateKritikDanSaran = () => {
    createKritikDanSaran.mutate();
  };

  const breadcrumbData = [
    {
      pageName: 'Home',
      pageHref: '/',
    },
    {
      pageName: `Kritik & Saran`,
      pageHref: '',
    },
  ];

  const handleCheckbox = () => {
    setIsAnonym((prevState) => !prevState);
  };

  useEffect(() => {
    if (isAnonym) {
      setValue('nama_pengirim', 'Anonim');
    } else {
      setValue('nama_pengirim', senderName);
    }
  }, [isAnonym]);

  return (
    <div className="px-3 mt-20 xl:px-24 lg:px-12 sm:px-6 2xl:px-28 sm:mt-52 pb-28">
      <Head>
        <title>Kritik & Saran | Masjid Umar bin Abdul Aziz</title>
        <meta
          name="Halaman KritikDanSaran Jum'at Masjid Umar bin Abdul Aziz"
          content="Jadwal KritikDanSaran Jum'at Masjid Umar bin Abdul Aziz"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BreadCrumb breadCrumbData={breadcrumbData} />

      {showToast && <Toast type={toastType} message={toastMessage} />}

      <article className="w-full h-full mt-5">
        <h1 className="mb-3 text-2xl font-bold text-primary-140">
          Kritik & Saran
        </h1>

        <p className="font-semibold mb-7">
          Kirim Kritik & Saran Anda kepada BKM Masjid Umar bin Abdul Aziz
        </p>

        <section className="w-full md:w-[35rem] lg:w-[40rem]">
          <form
            className="flex flex-col mt-5"
            onSubmit={handleSubmit(handleCreateKritikDanSaran)}
          >
            <div className="w-full mb-5">
              <label className="block mb-2 text-sm font-semibold text-gray-900">
                Nama Pengirim
              </label>

              <input
                {...register('nama_pengirim')}
                className="w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-140 sm:text-sm sm:leading-6"
                placeholder="Input Nama Pengirim"
                onChange={(e) => setSenderName(e.target.value)}
              />

              <fieldset className="flex items-center gap-1 mt-1">
                <input
                  id="checkbox-anonym"
                  name="checkbox-anonym"
                  type="checkbox"
                  checked={isAnonym}
                  onChange={handleCheckbox}
                  className="cursor-pointer"
                />

                <label htmlFor="checkbox-anonym" className="cursor-pointer">
                  Kirim sebagai Anonim
                </label>
              </fieldset>

              {errors.nama_pengirim && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.nama_pengirim.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-semibold text-gray-900">
                Teks
              </label>

              <textarea
                {...register('teks')}
                className="w-full rounded-md h-full border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 resize-none focus:ring-inset focus:ring-primary-140 sm:text-sm sm:leading-6"
                placeholder="Input Kritik/Saran"
                rows={10}
              />

              {errors.teks && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.teks.message}
                </p>
              )}
            </div>

            <div className="flex justify-end mt-10">
              <button
                type="submit"
                className="text-white bg-primary-120 hover:bg-primary-140 focus-visible:ring-2 focus-visible:bg-primary-160 focus-visible:outline-none focus-visible:ring-primary-100 font-semibold rounded-lg text-sm px-9 py-2.5 text-center transition duration-300 ease-in-out active:bg-primary-160"
              >
                {createKritikDanSaran.status === 'loading' ? (
                  <ButtonLoading />
                ) : (
                  <>Kirim</>
                )}
              </button>
            </div>
          </form>
        </section>
      </article>
    </div>
  );
};

KritikDanSaran.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default KritikDanSaran;
