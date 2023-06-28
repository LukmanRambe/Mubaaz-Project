import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { getDay } from 'date-fns';
import moment from 'moment';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Select, { SingleValue } from 'react-select';

import ButtonLoading from '../../../../../components/artifacts/Loading/ButtonLoading';
import PageLoading from '../../../../../components/artifacts/Loading/PageLoading';
import BreadCrumb from '../../../../../components/artifacts/PageHeader/Breadcrumb';
import HeaderTitle from '../../../../../components/artifacts/PageHeader/HeaderTitle';
import Toast from '../../../../../components/artifacts/Toast';
import DashboardLayout from '../../../../../components/main/Layout/DashboardLayout';
import useRemoteGetAllUstadzDropdown from '../../../../../hooks/remote/useRemoteGetAllUstadzDropdown';
import useRemoteGetKhutbah from '../../../../../hooks/remote/useRemoteGetKhutbah';
import { fetchAxios } from '../../../../../libs/axios';
import { selectStringInputCustomStyles } from '../../../../../libs/reactSelectStyles';
import { KhutbahType } from '../../../../../ts/types/main/Khutbah';
import type { Option } from '../../../../../ts/types/main/Option';
import { NextPageWithLayout } from '../../../../../ts/types/NextPageWithLayout';
import type { EditKhutbahFormValues } from '../../../../../ts/types/schema/KhutbahSchema';
import { editKhutbahSchema } from '../../../../../utils/schema/khutbahSchema';

type EditKhutbahProps = {
  idKhutbah: KhutbahType['id'];
};

const EditKhutbah: NextPageWithLayout<EditKhutbahProps> = ({ idKhutbah }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<EditKhutbahFormValues>({
    resolver: yupResolver(editKhutbahSchema),
  });

  const router = useRouter();
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: allUstadzDropdownData } = useRemoteGetAllUstadzDropdown();
  const { data: khutbahData } = useRemoteGetKhutbah(idKhutbah);
  const isFriday = (date: Date) => {
    const day = getDay(date);
    return day === 5;
  };

  const breadCrumbData = [
    {
      pageName: 'List Khutbah',
      pageHref: '/admin/agenda/khutbah',
    },
    {
      pageName: `Edit Khutbah`,
      pageHref: '',
    },
  ];

  const editKhutbah = useMutation(
    'editKhutbah',
    async () => {
      return fetchAxios.put(`/api/khutbahs/${idKhutbah}`, {
        ustadz_id: watch('ustadz_id') && watch('ustadz_id').value,
        nama_ustadz: watch('ustadz_id') && watch('ustadz_id').label,
        judul: watch('judul'),
        tanggal: moment(watch('tanggal')).format('YYYY-MM-DD'),
      });
    },
    {
      onSuccess: async (response) => {
        if (response.status === 200) {
          setShowToast(true);
          setToastMessage('Khutbah berhasil diedit');
          setToastType('success');

          setTimeout(() => {
            setShowToast(false);
            setToastMessage('');
            router.push('/admin/agenda/khutbah');
          }, 2000);
        }
      },
      onError: async (error: AxiosError) => {
        if (error.response?.status === 401) {
          setToastMessage('Khutbah gagal diedit');
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

  const handleEditKhutbah = async () => {
    editKhutbah.mutate();
  };

  useEffect(() => {
    if (khutbahData) {
      setValue('ustadz_id', {
        label: khutbahData.nama_ustadz,
        value: khutbahData.ustadz_id,
      });
      setValue('nama_ustadz', khutbahData.nama_ustadz);
      setValue('judul', khutbahData.judul);
      if (khutbahData.tanggal) {
        setValue('tanggal', new Date(khutbahData.tanggal));
      }
    }
  }, [khutbahData]);

  useEffect(() => {
    const loading = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(loading);
  }, []);

  return (
    <>
      <Head>
        <title>Edit Khutbah</title>
        <meta name="Halaman Edit Khutbah" content="Edit Khutbah" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading ? (
        <PageLoading />
      ) : (
        <div>
          {showToast && <Toast message={toastMessage} type={toastType} />}

          <div>
            <HeaderTitle headerTitle="Edit Khutbah" />
            <BreadCrumb breadCrumbData={breadCrumbData} />
          </div>

          <div className="w-full p-5 mx-auto mt-10 bg-white lg:w-3/4 rounded-2xl">
            <form onSubmit={handleSubmit(handleEditKhutbah)}>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  Khatib
                </label>

                <Controller
                  name="ustadz_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={allUstadzDropdownData}
                      placeholder="Input Khatib"
                      styles={selectStringInputCustomStyles}
                      {...register('ustadz_id')}
                      {...field}
                      onChange={(option: SingleValue<Option<string>>) => {
                        field.onChange(option);
                      }}
                    />
                  )}
                />

                {errors.ustadz_id && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.ustadz_id.value?.message}
                  </p>
                )}
              </div>

              <div className="w-full mb-5">
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  Judul Khutbah
                </label>

                <input
                  {...register('judul')}
                  className="w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-140 sm:text-sm sm:leading-6"
                  placeholder="Input Judul"
                />

                {errors.judul && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.judul.message}
                  </p>
                )}
              </div>

              <div className="w-full mb-5">
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  Tanggal
                </label>

                <Controller
                  name="tanggal"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...register('tanggal', { valueAsDate: true })}
                      dateFormat="dd MMMM yyyy"
                      locale="id"
                      filterDate={isFriday}
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      className="w-full p-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded shadow-sm focus:ring-1 focus:ring-primary-140 focus:border-primary-140 hover:cursor-pointer"
                      placeholderText="Input Tanggal"
                      autoComplete="off"
                    />
                  )}
                />

                {errors.tanggal && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.tanggal.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end mt-10">
                <button
                  type="submit"
                  className="text-white bg-primary-120 hover:bg-primary-140 focus-visible:ring-2 focus-visible:bg-primary-160 focus-visible:outline-none focus-visible:ring-primary-100 font-semibold rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 ease-in-out active:bg-primary-160"
                >
                  {editKhutbah.status === 'loading' ? (
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

EditKhutbah.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps = async (context: {
  query: { id: string };
}) => {
  const { id } = context.query;

  return {
    props: {
      idKhutbah: id,
    },
  };
};

export default EditKhutbah;
