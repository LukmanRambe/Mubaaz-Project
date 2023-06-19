import { useRef, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { CgClose } from 'react-icons/cg';
import { MdFileUpload } from 'react-icons/md';
import { useMutation } from 'react-query';
import Select, { SingleValue } from 'react-select';

import { fetchAxios } from '../../../libs/axios';
import { selectNumberInputCustomStyles } from '../../../libs/reactSelectStyles';
import type { Option } from '../../../ts/types/main/Option';
import { CreatePosterFormValues } from '../../../ts/types/schema/PosterSchema';
import { generateUrutanOptions } from '../../../utils/generateData';
import { createPosterSchema } from '../../../utils/schema/posterSchema';
import ButtonLoading from '../Loading/ButtonLoading';

type PosterCreateModalProps = {
  selectedUrutan?: number[];
  isCreateModalShown: boolean;
  setIsCreateModalShown: (value: boolean) => void;
  setShowToast: (value: boolean) => void;
  toastMessage: string;
  setToastMessage: (value: string) => void;
  setToastType: (value: string) => void;
  refetch: () => void;
};

const PosterCreateModal = ({
  selectedUrutan,
  isCreateModalShown,
  setIsCreateModalShown,
  setShowToast,
  toastMessage,
  setToastMessage,
  setToastType,
  refetch,
}: PosterCreateModalProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [requestBody, setRequestBody] = useState<FormData>();
  const urutanOptions = generateUrutanOptions();
  const availableUrutan = urutanOptions.filter(
    (option) => !selectedUrutan?.includes(option.value)
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreatePosterFormValues>({
    resolver: yupResolver(createPosterSchema),
  });

  const handleCloseModal = () => {
    setIsCreateModalShown(false);
  };

  const createPoster = useMutation(
    'createPoster',
    async () => {
      return fetchAxios.post('/api/posters', requestBody);
    },
    {
      onSuccess: async (response) => {
        if (response.status === 200) {
          setShowToast(true);
          setToastMessage('Poster berhasil ditambah');
          setToastType('success');

          setTimeout(() => {
            setShowToast(false);
            setIsCreateModalShown(false);
            setToastMessage('');
            refetch();
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

  const handleCreatePoster = (data: CreatePosterFormValues) => {
    const formData = new FormData();
    formData.append('urutan', data.urutan.value.toString());
    if (data.poster) {
      formData.append('gambar', data.poster);
      formData.append('nama_file_poster', fileName);
    }

    setRequestBody(formData);

    setTimeout(() => {
      createPoster.mutate();
    }, 150);
  };

  return (
    <>
      {isCreateModalShown && (
        <>
          <div
            tabIndex={-1}
            className="fixed inset-0 z-50 flex items-center justify-center w-full h-full md:min-h-screen min-w-screen bg-black/50"
          >
            <div className="w-[calc(100%-2rem)] sm:w-[28rem] overflow-hidden bg-white shadow-xl lg:w-[32rem] p-5 rounded-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium text-gray-900">
                  Tambah Poster
                </h3>

                <button
                  type="button"
                  className="w-7 h-7 transition duration-75 text-[#84828A] hover:text-[#727076] font-bold"
                  onClick={() => handleCloseModal()}
                >
                  <CgClose />
                </button>
              </div>

              <form
                className="flex flex-col mt-5"
                onSubmit={handleSubmit(handleCreatePoster)}
              >
                <div className="w-full mb-5">
                  <label className="block mb-2 text-sm font-semibold text-gray-900">
                    Urutan
                  </label>

                  <Controller
                    name="urutan"
                    control={control}
                    render={({ field }) => (
                      <Select
                        options={availableUrutan}
                        styles={selectNumberInputCustomStyles}
                        isSearchable={false}
                        placeholder="Pilih Urutan"
                        className="w-full text-sm text-gray-900 bg-white border rounded focus:ring-blue-500 focus:border-blue-500"
                        {...register('urutan')}
                        {...field}
                        onChange={(option: SingleValue<Option<number>>) => {
                          field.onChange(option);
                        }}
                      />
                    )}
                  />

                  {errors.urutan && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.urutan.value?.message}
                    </p>
                  )}
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
                    {createPoster.status === 'loading' ? (
                      <ButtonLoading />
                    ) : (
                      <>Tambah</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PosterCreateModal;
