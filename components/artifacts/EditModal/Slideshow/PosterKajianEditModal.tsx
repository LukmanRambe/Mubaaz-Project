import { useState, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';
import { useMutation } from 'react-query';
import Select, { SingleValue } from 'react-select';

import useRemoteGetAllKajianDropdown from '../../../../hooks/remote/useRemoteGetAllKajianDropdown';
import useRemoteGetKajian from '../../../../hooks/remote/useRemoteGetKajian';
import { fetchAxios } from '../../../../libs/axios';
import { selectStringInputCustomStyles } from '../../../../libs/reactSelectStyles';
import type { Option } from '../../../../ts/types/main/Option';
import { SlideshowType } from '../../../../ts/types/main/Slideshow';
import { EditPosterKajianSlideshowFormValues } from '../../../../ts/types/schema/SlideshowSchema';
import { editPosterKajianSlideshowSchema } from '../../../../utils/schema/slideshowSchema';
import ButtonLoading from '../../Loading/ButtonLoading';

type PosterKajianEditModalProps = {
  slideshow: SlideshowType | undefined;
  isFetching: boolean;
  isPosterKajianEditModalShown: boolean;
  setIsPosterKajianEditModalShown: (value: boolean) => void;
  setShowToast: (value: boolean) => void;
  toastMessage: string;
  setToastMessage: (value: string) => void;
  setToastType: (value: string) => void;
  refetch: () => void;
};

const PosterKajianEditModal = ({
  slideshow,
  isFetching,
  isPosterKajianEditModalShown,
  setIsPosterKajianEditModalShown,
  setShowToast,
  toastMessage,
  setToastMessage,
  setToastType,
  refetch,
}: PosterKajianEditModalProps) => {
  const [idKajian, setIdKajian] = useState<string>('');
  const { data: kajianData } = useRemoteGetKajian(idKajian);
  const { data: dropdownKajian } = useRemoteGetAllKajianDropdown();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditPosterKajianSlideshowFormValues>({
    resolver: yupResolver(editPosterKajianSlideshowSchema),
  });

  const handleCloseModal = () => {
    setIsPosterKajianEditModalShown(false);
  };

  const editSlideshow = useMutation(
    'editSlideshow',
    async () => {
      return fetchAxios.put(
        `/api/slideshows/780ab88a-a27e-47d2-a00f-c310736aa7ed`,
        {
          kajian_id: watch('kajian_id').value,
        }
      );
    },
    {
      onSuccess: async (response) => {
        if (response.status === 200) {
          setShowToast(true);
          setToastMessage('Slide Poster Kajian berhasil diedit');
          setToastType('success');

          setTimeout(() => {
            setShowToast(false);
            setIsPosterKajianEditModalShown(false);
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
      setIdKajian(slideshow.data[0]?.kajian_id);

      if (kajianData) {
        setValue('kajian_id', {
          label: kajianData?.judul,
          value: kajianData?.id,
        });
      }
    }
  }, [slideshow, kajianData]);

  return (
    <>
      {isPosterKajianEditModalShown && (
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
                      Poster Kajian yang Ditampilkan
                    </label>

                    <Controller
                      name="kajian_id"
                      control={control}
                      render={({ field }) => (
                        <Select
                          options={dropdownKajian}
                          styles={selectStringInputCustomStyles}
                          isSearchable={false}
                          placeholder="Pilih Poster Kajian yang Ditampilkan"
                          className="w-full text-sm text-gray-900 bg-white border rounded focus:ring-blue-500 focus:border-blue-500"
                          {...register('kajian_id')}
                          {...field}
                          onChange={(option: SingleValue<Option<string>>) => {
                            field.onChange(option);
                          }}
                        />
                      )}
                    />

                    {errors.kajian_id && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.kajian_id.value?.message}
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

export default PosterKajianEditModal;
