import { useEffect, useRef, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';
import { MdFileUpload } from 'react-icons/md';
import { useMutation } from 'react-query';
import Select, { SingleValue } from 'react-select';

import { fetchAxios } from '../../../libs/axios';
import { selectNumberInputCustomStyles } from '../../../libs/reactSelectStyles';
import type { Option } from '../../../ts/types/main/Option';
import { PosterType } from '../../../ts/types/main/Poster';
import { EditPosterFormValues } from '../../../ts/types/schema/PosterSchema';
import { generateUrutanOptions } from '../../../utils/generateData';
import { editPosterSchema } from '../../../utils/schema/posterSchema';
import ButtonLoading from '../Loading/ButtonLoading';

type PosterEditModalProps = {
  setIdPoster: (value: string) => void;
  poster: PosterType;
  selectedUrutan?: number[];
  isEditModalShown: boolean;
  setIsEditModalShown: (value: boolean) => void;
  setShowToast: (value: boolean) => void;
  toastMessage: string;
  setToastMessage: (value: string) => void;
  setToastType: (value: string) => void;
  isFetchingPoster: boolean;
  refetch: () => void;
};

const PosterEditModal = ({
  setIdPoster,
  poster,
  selectedUrutan,
  isEditModalShown,
  setIsEditModalShown,
  setShowToast,
  toastMessage,
  setToastMessage,
  setToastType,
  isFetchingPoster,
  refetch,
}: PosterEditModalProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [requestBody, setRequestBody] = useState<FormData>();
  const urutanOptions = generateUrutanOptions();
  const unselectedUrutan = urutanOptions.filter(
    (option) => !selectedUrutan?.includes(option.value)
  );
  const availableUrutan = [
    { label: poster.urutan?.toString(), value: poster.urutan },
    ...unselectedUrutan,
  ].sort((a, b) => a.value - b.value);

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditPosterFormValues>({
    resolver: yupResolver(editPosterSchema),
  });

  const handleCloseModal = () => {
    setIsEditModalShown(false);
    setIdPoster('');
  };

  const editPoster = useMutation(
    'editPoster',
    async () => {
      return fetchAxios.post(`/api/posters/${poster?.id}`, requestBody);
    },
    {
      onSuccess: async (response) => {
        if (response.status === 200) {
          setShowToast(true);
          setToastMessage('Poster berhasil diedit');
          setToastType('success');

          setTimeout(() => {
            setShowToast(false);
            setIsEditModalShown(false);
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

  const handleEditPoster = (data: EditPosterFormValues) => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('urutan', data.urutan.value.toString());
    if (data.poster) {
      formData.append('gambar', data.poster);
      formData.append('nama_file_poster', fileName);
    }

    setRequestBody(formData);

    setTimeout(() => {
      editPoster.mutate();
    }, 150);
  };

  useEffect(() => {
    if (poster) {
      setValue('urutan', {
        label: poster.urutan?.toString(),
        value: poster.urutan,
      });

      const imageUrl = `https://api.mubaaz.id/${poster.gambar}`;
      setPreviewImage(imageUrl);
    }
  }, [poster]);

  return (
    <>
      {isEditModalShown && (
        <>
          <div
            tabIndex={-1}
            className="fixed inset-0 z-50 flex items-center justify-center w-full h-full md:min-h-screen min-w-screen bg-black/50"
          >
            <div className="w-[calc(100%-2rem)] sm:w-[28rem] overflow-hidden bg-white shadow-xl lg:w-[32rem] p-5 rounded-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium text-gray-900">
                  Edit Poster
                </h3>

                <button
                  type="button"
                  className="w-7 h-7 transition duration-75 text-[#84828A] hover:text-[#727076] font-bold"
                  onClick={() => handleCloseModal()}
                >
                  <CgClose />
                </button>
              </div>

              {isFetchingPoster ? (
                <div className="flex items-center justify-center w-full py-6 h-96">
                  <AiOutlineLoading3Quarters className="text-7xl text-primary-100 animate-spin" />
                </div>
              ) : (
                <form
                  className="flex flex-col mt-5"
                  onSubmit={handleSubmit(handleEditPoster)}
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

                    <section className="p-2 border-2 border-dashed rounded-lg border-primary-140">
                      <div className="flex flex-col px-6 py-2">
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
                                        URL.createObjectURL(
                                          value.target.files[0]
                                        )
                                      );
                                      setFileName(value.target.files[0].name);
                                    }
                                  };

                                  reader.readAsDataURL(value.target.files[0]);
                                } else {
                                  field.onChange(false);
                                  setPreviewImage(
                                    `https://api.mubaaz.id/${poster?.gambar}`
                                  );
                                }
                              }}
                            />
                          )}
                        />

                        <div className="flex items-center justify-center mb-4">
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
                      {editPoster.status === 'loading' ? (
                        <ButtonLoading />
                      ) : (
                        <>Edit</>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PosterEditModal;
