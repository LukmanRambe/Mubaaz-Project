import { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';
import { useMutation } from 'react-query';
import Select, { SingleValue } from 'react-select';

import { fetchAxios } from '../../../../libs/axios';
import { selectNumberInputCustomStyles } from '../../../../libs/reactSelectStyles';
import type { Option } from '../../../../ts/types/main/Option';
import { SlideshowType } from '../../../../ts/types/main/Slideshow';
import { EditUrutanSlideshowFormValues } from '../../../../ts/types/schema/SlideshowSchema';
import { editUrutanSlideshowSchema } from '../../../../utils/schema/slideshowSchema';
import ButtonLoading from '../../Loading/ButtonLoading';

type SlideToModalProps = {
  slideshow: SlideshowType | undefined;
  isFetching: boolean;
  isUrutanEditModalShown: boolean;
  setIsUrutanEditModalShown: (value: boolean) => void;
  setShowToast: (value: boolean) => void;
  toastMessage: string;
  setToastMessage: (value: string) => void;
  setToastType: (value: string) => void;
  refetch: () => void;
};

const SlideToModal = ({
  slideshow,
  isFetching,
  isUrutanEditModalShown,
  setIsUrutanEditModalShown,
  setShowToast,
  toastMessage,
  setToastMessage,
  setToastType,
  refetch,
}: SlideToModalProps) => {
  const urutanOptions = [
    {
      label: '1',
      value: 1,
    },
    {
      label: '2',
      value: 2,
    },
  ];

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditUrutanSlideshowFormValues>({
    resolver: yupResolver(editUrutanSlideshowSchema),
  });

  const handleCloseModal = () => {
    setIsUrutanEditModalShown(false);
  };

  const editSlideshow = useMutation(
    'editSlideshow',
    async () => {
      return fetchAxios.put(
        `/api/slideshows/2ff26f65-c731-4777-b475-5f554fb689b5`,
        {
          urutan: watch('urutan').value,
          status: 'controlled',
        }
      );
    },
    {
      onSuccess: async (response) => {
        if (response.status === 200) {
          setShowToast(true);
          setToastMessage('Urutan Slideshow berhasil diedit');
          setToastType('success');

          setTimeout(() => {
            setShowToast(false);
            setIsUrutanEditModalShown(false);
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

  const handleEditSlideshow = () => {
    editSlideshow.mutate();
  };

  useEffect(() => {
    if (slideshow) {
      setValue('urutan', {
        label: slideshow.data[0]?.urutan?.toString(),
        value: slideshow.data[0]?.urutan,
      });
    }
  }, [slideshow]);

  return (
    <>
      {isUrutanEditModalShown && (
        <>
          <div
            tabIndex={-1}
            className="fixed inset-0 z-50 flex items-center justify-center w-full h-full md:min-h-screen min-w-screen bg-black/50"
          >
            <div className="relative flex flex-col gap-5 px-3 py-5 mx-2 bg-white w-[calc(100%-3rem)] rounded-xl sm:max-w-xl md:h-auto md:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium text-gray-900">
                  Edit Slideshow
                </h3>

                <button
                  type="button"
                  className="w-7 h-7 transition duration-75 text-[#84828A] hover:text-[#727076] font-bold"
                  onClick={() => handleCloseModal()}
                >
                  <CgClose />
                </button>
              </div>

              {isFetching ? (
                <div className="flex items-center justify-center w-full h-full py-24">
                  <AiOutlineLoading3Quarters className="text-7xl text-primary-100 animate-spin" />
                </div>
              ) : (
                <form
                  className="flex flex-col"
                  onSubmit={handleSubmit(handleEditSlideshow)}
                >
                  <div className="w-full mb-5">
                    <label className="block mb-2 text-sm font-semibold text-gray-900">
                      Nomor Slide
                    </label>

                    <Controller
                      name="urutan"
                      control={control}
                      render={({ field }) => (
                        <Select
                          options={urutanOptions}
                          styles={selectNumberInputCustomStyles}
                          isSearchable={false}
                          placeholder="Pilih Nomor Slide"
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

                  <div className="flex justify-end mt-10">
                    <button
                      type="submit"
                      className="text-white bg-primary-120 hover:bg-primary-140 focus-visible:ring-2 focus-visible:bg-primary-160 focus-visible:outline-none focus-visible:ring-primary-100 font-semibold rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 ease-in-out active:bg-primary-160"
                    >
                      {editSlideshow.status === 'loading' ? (
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

export default SlideToModal;
