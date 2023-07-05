import { useRef, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { CgClose } from 'react-icons/cg';
import { MdFileUpload } from 'react-icons/md';
import { NumericFormat } from 'react-number-format';
import { useMutation } from 'react-query';

import { fetchAxios } from '../../../libs/axios';
import { ConfirmationDonationFormValues } from '../../../ts/types/schema/ConfirmationDonationSchema';
import { confirmationDonationSchema } from '../../../utils/schema/confirmationDonationSchema';
import ButtonLoading from '../Loading/ButtonLoading';

type ConfirmationDonationCreateModalProps = {
  isCreateModalShown: boolean;
  setIsCreateModalShown: (value: boolean) => void;
  setShowToast: (value: boolean) => void;
  toastMessage: string;
  setToastMessage: (value: string) => void;
  setToastType: (value: string) => void;
};

const ConfirmationDonationCreateModal = ({
  isCreateModalShown,
  setIsCreateModalShown,
  setShowToast,
  toastMessage,
  setToastMessage,
  setToastType,
}: ConfirmationDonationCreateModalProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [requestBody, setRequestBody] = useState<FormData>();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<ConfirmationDonationFormValues>({
    resolver: yupResolver(confirmationDonationSchema),
  });

  const handleCloseModal = () => {
    setIsCreateModalShown(false);
  };

  const createConfirmationDonation = useMutation(
    'createConfirmationDonation',
    async () => {
      return fetchAxios.post('/api/donations', requestBody);
    },
    {
      onSuccess: async (response) => {
        if (response.status === 200) {
          setShowToast(true);
          setToastMessage('Konfirmasi Donasi berhasil dikirim');
          setToastType('success');

          setTimeout(() => {
            setShowToast(false);
            setIsCreateModalShown(false);
            setToastMessage('');
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

  const handleCreateConfirmationDonation = (
    data: ConfirmationDonationFormValues
  ) => {
    const formData = new FormData();
    formData.append('nama_pengirim', data.nama_pengirim);
    formData.append('jumlah_donasi', data.jumlah_donasi.toString());
    if (data.gambar) {
      formData.append('gambar', data.gambar);
    }

    setRequestBody(formData);

    setTimeout(() => {
      createConfirmationDonation.mutate();
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
            <div className="w-[calc(100%-2rem)] sm:w-[35rem] overflow-hidden bg-white shadow-xl lg:w-[32rem] p-5 rounded-2xl h-[27.5rem] md:h-auto">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium text-gray-900">
                  Konfirmasi Donasi
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
                className="flex flex-col mt-5 overflow-y-scroll h-[22rem] scrollbar-hide md:h-auto"
                onSubmit={handleSubmit(handleCreateConfirmationDonation)}
              >
                <div className="w-full mb-5">
                  <label className="block mb-2 text-sm font-semibold text-gray-900">
                    Nama Pengirim
                  </label>

                  <input
                    {...register('nama_pengirim')}
                    className="w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-140 sm:text-sm sm:leading-6"
                    placeholder="Input Nama Pengirim"
                  />

                  {errors.nama_pengirim && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.nama_pengirim.message}
                    </p>
                  )}
                </div>

                <div className="w-full mb-5">
                  <label className="block mb-2 text-sm font-semibold text-gray-900 ">
                    Jumlah Donasi
                  </label>

                  <Controller
                    name="jumlah_donasi"
                    control={control}
                    render={() => (
                      <NumericFormat
                        value={watch('jumlah_donasi')}
                        displayType="input"
                        prefix="Rp "
                        decimalSeparator=","
                        thousandSeparator="."
                        allowNegative={false}
                        {...register('jumlah_donasi', { required: true })}
                        className="w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-140 sm:text-sm sm:leading-6"
                        placeholder="Input Jumlah Donasi"
                        onValueChange={(values) => {
                          setValue('jumlah_donasi', +values.value);
                        }}
                      />
                    )}
                  />

                  {errors.jumlah_donasi && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.jumlah_donasi.message}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <label className="block mb-2 text-sm font-semibold text-gray-900">
                    Bukti Transfer
                  </label>

                  <section className="border-2 border-dashed rounded-lg border-primary-140">
                    <div className="flex flex-col px-12 py-5">
                      <Controller
                        name="gambar"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="file"
                            accept="image/jpeg, image/jpg, image/png"
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
                              alt="Bukti Transfer"
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
                      errors.gambar ? 'justify-between' : 'justify-end'
                    }`}
                  >
                    {errors.gambar && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.gambar.message}
                      </p>
                    )}

                    <div className="mt-1 text-xs italic text-gray-400">
                      .JPG, .JPEG, .PNG
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-10">
                  <button
                    type="submit"
                    className="text-white bg-primary-120 hover:bg-primary-140 focus-visible:ring-2 focus-visible:bg-primary-160 focus-visible:outline-none focus-visible:ring-primary-100 font-semibold rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 ease-in-out active:bg-primary-160"
                  >
                    {createConfirmationDonation.status === 'loading' ? (
                      <ButtonLoading />
                    ) : (
                      <>Kirim</>
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

export default ConfirmationDonationCreateModal;
