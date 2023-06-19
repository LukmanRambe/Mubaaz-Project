import { useEffect, useState, useRef } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import moment from 'moment';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import { MdFileUpload } from 'react-icons/md';
import { useMutation } from 'react-query';
import Select, { SingleValue } from 'react-select';

import ButtonLoading from '../../../../../components/artifacts/Loading/ButtonLoading';
import PageLoading from '../../../../../components/artifacts/Loading/PageLoading';
import BreadCrumb from '../../../../../components/artifacts/PageHeader/Breadcrumb';
import HeaderTitle from '../../../../../components/artifacts/PageHeader/HeaderTitle';
import Toast from '../../../../../components/artifacts/Toast';
import DashboardLayout from '../../../../../components/main/Layout/DashboardLayout';
import useRemoteGetAllUstadzDropdown from '../../../../../hooks/remote/useRemoteGetAllUstadzDropdown';
import useRemoteGetKajian from '../../../../../hooks/remote/useRemoteGetKajian';
import { fetchAxios } from '../../../../../libs/axios';
import { selectStringInputCustomStyles } from '../../../../../libs/reactSelectStyles';
import { KajianType } from '../../../../../ts/types/main/Kajian';
import type { Option } from '../../../../../ts/types/main/Option';
import { NextPageWithLayout } from '../../../../../ts/types/NextPageWithLayout';
import type { EditKajianFormValues } from '../../../../../ts/types/schema/KajianSchema';
import { editKajianSchema } from '../../../../../utils/schema/kajianSchema';

type EditKajianProps = {
  idKajian: KajianType['id'];
};

const EditKajian: NextPageWithLayout<EditKajianProps> = ({ idKajian }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<EditKajianFormValues>({
    resolver: yupResolver(editKajianSchema),
  });

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [requestBody, setRequestBody] = useState<FormData>();
  const { data: allUstadzDropdownData } = useRemoteGetAllUstadzDropdown();
  const {
    data: kajianData,
    refetch,
    isFetching,
  } = useRemoteGetKajian(idKajian);

  const breadCrumbData = [
    {
      pageName: 'List Kajian',
      pageHref: '/admin/agenda/kajian',
    },
    {
      pageName: `Edit Kajian`,
      pageHref: '',
    },
  ];

  const editKajian = useMutation(
    'editKajian',
    async () => {
      return fetchAxios.post(`/api/kajians/${idKajian}`, requestBody);
    },
    {
      onSuccess: async (response) => {
        if (response.status === 200) {
          setShowToast(true);
          setToastMessage('Kajian berhasil diedit');
          setToastType('success');

          setTimeout(() => {
            setShowToast(false);
            setToastMessage('');
            router.push('/admin/agenda/kajian');
          }, 2000);
        }
      },
      onError: async (error: AxiosError) => {
        if (error.response?.status === 401) {
          setToastMessage('Kajian gagal diedit');
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

  const handleEditKajian = async (data: EditKajianFormValues) => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('ustadz_id', data.ustadz_id.value);
    formData.append('nama_ustadz', data.ustadz_id.label);
    formData.append('tema', data.tema);
    formData.append('judul', data.judul);
    formData.append('tanggal', moment(data.tanggal).format('YYYY-MM-DD'));
    formData.append('lokasi', data.lokasi);
    if (data.poster) {
      formData.append('poster', data.poster);
      formData.append('nama_file_poster', fileName);
    }

    setRequestBody(formData);

    setTimeout(() => {
      editKajian.mutate();
    }, 150);
  };

  useEffect(() => {
    refetch();
    if (kajianData) {
      setValue('ustadz_id', {
        label: kajianData.nama_ustadz,
        value: kajianData.ustadz_id,
      });
      setValue('nama_ustadz', kajianData.nama_ustadz);
      setValue('tema', kajianData.tema);
      setValue('judul', kajianData.judul);
      if (kajianData.tanggal) {
        setValue('tanggal', new Date(kajianData.tanggal));
      }
      setValue('lokasi', kajianData.lokasi);

      if (kajianData.poster) {
        const imageUrl = `https://api.mubaaz.id/${kajianData.poster}`;
        setPreviewImage(imageUrl);
      }
    }
  }, [kajianData]);

  useEffect(() => {
    const loading = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(loading);
  }, []);

  return (
    <>
      <Head>
        <title>Edit Kajian</title>
        <meta name="Halaman Edit Kajian" content="Edit Kajian" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isFetching || isLoading ? (
        <PageLoading />
      ) : (
        <div>
          {showToast && <Toast message={toastMessage} type={toastType} />}

          <div>
            <HeaderTitle headerTitle="Edit Kajian" />
            <BreadCrumb breadCrumbData={breadCrumbData} />
          </div>

          <div className="w-full p-5 mx-auto mt-10 bg-white lg:w-3/4 rounded-2xl">
            <form onSubmit={handleSubmit(handleEditKajian)}>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  Ustadz
                </label>

                <Controller
                  name="ustadz_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={allUstadzDropdownData}
                      placeholder="Pilih Ustadz"
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
                  Tema Kajian
                </label>

                <input
                  {...register('tema')}
                  className="w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-140 sm:text-sm sm:leading-6"
                  placeholder="Input Tema Kajian"
                />

                {errors.tema && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.tema.message}
                  </p>
                )}
              </div>

              <div className="w-full mb-5">
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  Judul Kajian
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

              <div className="flex items-center gap-3 justfiy-between">
                <div className="w-full mb-5">
                  <label className="block mb-2 text-sm font-semibold text-gray-900">
                    Lokasi
                  </label>

                  <input
                    {...register('lokasi')}
                    className="w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-140 sm:text-sm sm:leading-6"
                    placeholder="Input Lokasi"
                  />

                  {errors.lokasi && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.lokasi.message}
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
                        selected={field.value}
                        onChange={(date: Date) => field.onChange(date)}
                        className="w-full p-[.7rem] text-sm text-gray-900 bg-white border-gray-300 rounded shadow-sm ring-1 focus:ring-2 ring-primary-100 focus:ring-primary-140 focus:border-primary-140 hover:cursor-pointer"
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
              </div>

              <div className="w-full">
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  Poster (1280 x 720 pixels)
                </label>

                <section className="border-2 border-dashed rounded-lg border-primary-140">
                  <div className="flex flex-col px-12 py-5">
                    <Controller
                      name="poster"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="file"
                          accept="image/jpeg, image/jpg, image/png, image/webp"
                          className="w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-140 sm:text-sm sm:leading-6 hover:cursor-pointer hidden"
                          ref={inputRef}
                          onChange={(value) => {
                            if (
                              value.target.files &&
                              value.target.files.length > 0
                            ) {
                              field.onChange(value.target.files[0]);

                              const reader = new FileReader();
                              reader.onloadend = () => {
                                if (value.target.files) {
                                  setPreviewImage(
                                    URL.createObjectURL(value.target.files[0])
                                  );
                                  setFileName(value.target.files[0].name);
                                }
                              };

                              reader.readAsDataURL(value.target.files[0]);
                            } else {
                              field.onChange(false);
                              setPreviewImage(null);
                            }
                          }}
                        />
                      )}
                    />

                    <div className="flex items-center justify-center pt-5 mb-7">
                      {previewImage ? (
                        <picture className="relative object-cover w-full aspect-video">
                          <Image
                            src={previewImage}
                            alt={fileName}
                            layout="fill"
                          />
                        </picture>
                      ) : (
                        <div className="flex flex-col items-center justify-center w-full">
                          <MdFileUpload className="flex-shrink-0 w-20 h-20 p-3 mb-3 transition duration-75 rounded-full bg-primary-60 text-primary-180 md:w-24 md:h-24" />
                          <p className="text-sm text-center md:text-lg">
                            Upload file dengan memilih foto
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => inputRef.current?.click()}
                      className="text-white bg-primary-120 hover:bg-primary-140 focus-visible:ring-2 focus-visible:bg-primary-160 focus-visible:outline-none focus-visible:ring-primary-100 font-semibold text-sm px-5 py-2.5 text-center transition duration-300 ease-in-out active:bg-primary-160 w-52 self-center rounded-md"
                    >
                      Pilih Foto
                    </button>
                  </div>
                </section>

                <div
                  className={`flex w-full ${
                    errors.poster ? 'justify-between' : 'justify-end'
                  }`}
                >
                  {errors.poster && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.poster.message}
                    </p>
                  )}

                  <div className="mt-1 text-xs italic text-gray-400">
                    .JPG, .JPEG, .PNG, .WEBP (Maks. 3MB)
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-10">
                <button
                  type="submit"
                  className="text-white bg-primary-120 hover:bg-primary-140 focus-visible:ring-2 focus-visible:bg-primary-160 focus-visible:outline-none focus-visible:ring-primary-100 font-semibold rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 ease-in-out active:bg-primary-160"
                >
                  {editKajian.status === 'loading' ? (
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

EditKajian.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps = async (context: {
  query: { id: string };
}) => {
  const { id } = context.query;

  return {
    props: {
      idKajian: id,
    },
  };
};

export default EditKajian;
