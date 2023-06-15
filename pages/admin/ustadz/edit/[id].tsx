import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import ButtonLoading from '../../../../components/artifacts/Loading/ButtonLoading';
import PageLoading from '../../../../components/artifacts/Loading/PageLoading';
import BreadCrumb from '../../../../components/artifacts/PageHeader/Breadcrumb';
import HeaderTitle from '../../../../components/artifacts/PageHeader/HeaderTitle';
import Toast from '../../../../components/artifacts/Toast';
import DashboardLayout from '../../../../components/main/Layout/DashboardLayout';
import useRemoteGetUstadz from '../../../../hooks/remote/useRemoteGetUstadz';
import { fetchAxios } from '../../../../libs/axios';
import { UstadzType } from '../../../../ts/types/main/Ustadz';
import { NextPageWithLayout } from '../../../../ts/types/NextPageWithLayout';
import type { EditUstadzFormValues } from '../../../../ts/types/schema/UstadzSchema';
import { editUstadzSchema } from '../../../../utils/schema/ustadzSchema';

type EditUstadzProps = {
  idUstadz: UstadzType['id'];
};

const EditUstadz: NextPageWithLayout<EditUstadzProps> = ({ idUstadz }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditUstadzFormValues>({
    resolver: yupResolver(editUstadzSchema),
  });

  const router = useRouter();
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: ustadzData } = useRemoteGetUstadz(idUstadz);

  const breadCrumbData = [
    {
      pageName: 'List Ustadz',
      pageHref: '/admin/ustadz',
    },
    {
      pageName: `Edit Ustadz`,
      pageHref: '',
    },
  ];

  const editUstadz = useMutation(
    'editUstadz',
    async () => {
      return fetchAxios.put(`/api/ustadzs/${idUstadz}`, {
        nama_ustadz: watch('nama_ustadz'),
        alamat: watch('alamat'),
        nomor_wa: watch('nomor_wa'),
      });
    },
    {
      onSuccess: async (response) => {
        if (response.status === 200) {
          setShowToast(true);
          setToastMessage('Ustadz berhasil diedit');
          setToastType('success');

          setTimeout(() => {
            setShowToast(false);
            setToastMessage('');
            router.push(`/admin/ustadz`);
          }, 2000);
        }
      },
      onError: async (error: AxiosError) => {
        if (error.response?.status === 401) {
          setToastMessage('Ustadz gagal diedit');
          if (toastMessage !== '') {
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

  const handleEditUstadz = async () => {
    editUstadz.mutate();
  };

  useEffect(() => {
    if (ustadzData) {
      setValue('nama_ustadz', ustadzData.nama_ustadz);
      setValue('alamat', ustadzData.alamat);
      setValue('nomor_wa', ustadzData.nomor_wa);
    }
  }, [ustadzData]);

  useEffect(() => {
    const loading = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(loading);
  }, []);

  return (
    <>
      <Head>
        <title>Edit Ustadz</title>
        <meta name="Halaman Edit Ustadz" content="Edit Ustadz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading ? (
        <PageLoading />
      ) : (
        <div>
          {showToast && <Toast message={toastMessage} type={toastType} />}

          <div>
            <HeaderTitle headerTitle="Edit Ustadz" />
            <BreadCrumb breadCrumbData={breadCrumbData} />
          </div>

          <div className="w-full p-5 mx-auto mt-10 bg-white lg:w-3/4 rounded-2xl">
            <form onSubmit={handleSubmit(handleEditUstadz)}>
              <div className="w-full mb-5">
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  Nama Ustadz
                </label>

                <input
                  {...register('nama_ustadz')}
                  className="w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-140 sm:text-sm sm:leading-6"
                  placeholder="Input Nama Ustadz"
                />

                {errors.nama_ustadz && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.nama_ustadz.message}
                  </p>
                )}
              </div>

              <div className="w-full mb-5">
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  Alamat
                </label>

                <input
                  {...register('alamat')}
                  className="w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-140 sm:text-sm sm:leading-6"
                  placeholder="Input Alamat"
                />

                {errors.alamat && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.alamat.message}
                  </p>
                )}
              </div>

              <div className="w-full mb-5">
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  Nomor Whatsapp
                </label>

                <input
                  {...register('nomor_wa')}
                  className="w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-140 sm:text-sm sm:leading-6"
                  placeholder="Input Nomor Whatsapp"
                />

                {errors.nomor_wa && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.nomor_wa.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end mt-10">
                <button
                  type="submit"
                  className="text-white bg-primary-120 hover:bg-primary-140 focus-visible:ring-2 focus-visible:bg-primary-160 focus-visible:outline-none focus-visible:ring-primary-100 font-semibold rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 ease-in-out active:bg-primary-160"
                >
                  {editUstadz.status === 'loading' ? (
                    <ButtonLoading />
                  ) : (
                    <>Edit</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

EditUstadz.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps = async (context: {
  query: { id: string };
}) => {
  const { id } = context.query;

  return {
    props: {
      idUstadz: id,
    },
  };
};

export default EditUstadz;
