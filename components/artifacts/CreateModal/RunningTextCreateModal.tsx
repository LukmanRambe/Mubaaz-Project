import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { CgClose } from 'react-icons/cg';
import { useMutation } from 'react-query';
import Select, { SingleValue } from 'react-select';

import { fetchAxios } from '../../../libs/axios';
import { selectNumberInputCustomStyles } from '../../../libs/reactSelectStyles';
import type { Option } from '../../../ts/types/main/Option';
import { CreateRunningTextFormValues } from '../../../ts/types/schema/RunningTextSchema';
import { generateUrutanOptions } from '../../../utils/generateData';
import { createRunningTextSchema } from '../../../utils/schema/runningTextSchema';
import ButtonLoading from '../Loading/ButtonLoading';

type RunningTextCreateModalProps = {
  selectedUrutan?: number[];
  isCreateModalShown: boolean;
  setIsCreateModalShown: (value: boolean) => void;
  setShowToast: (value: boolean) => void;
  toastMessage: string;
  setToastMessage: (value: string) => void;
  setToastType: (value: string) => void;
  refetch: () => void;
};

const RunningTextCreateModal = ({
  selectedUrutan,
  isCreateModalShown,
  setIsCreateModalShown,
  setShowToast,
  toastMessage,
  setToastMessage,
  setToastType,
  refetch,
}: RunningTextCreateModalProps) => {
  const urutanOptions = generateUrutanOptions();
  const availableUrutan = urutanOptions.filter(
    (option) => !selectedUrutan?.includes(option.value)
  );

  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateRunningTextFormValues>({
    resolver: yupResolver(createRunningTextSchema),
  });

  const handleCloseModal = () => {
    setIsCreateModalShown(false);
  };

  const createRunningText = useMutation(
    'createRunningText',
    async () => {
      return fetchAxios.post('/api/running-text', {
        text: watch('text'),
        urutan: watch('urutan').value,
      });
    },
    {
      onSuccess: async (response) => {
        if (response.status === 200) {
          setShowToast(true);
          setToastMessage('Running Text berhasil ditambah');
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

  const handleCreateRunningText = () => {
    createRunningText.mutate();
  };

  return (
    <>
      {isCreateModalShown && (
        <>
          <div
            tabIndex={-1}
            className="fixed inset-0 z-50 flex items-center justify-center w-full h-full md:min-h-screen min-w-screen bg-black/50"
          >
            <div className="relative flex flex-col max-w-md gap-5 px-3 py-5 mx-2 bg-white rounded-xl md:w-full md:h-auto md:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium text-gray-900">
                  Tambah Running Text
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
                className="flex flex-col"
                onSubmit={handleSubmit(handleCreateRunningText)}
              >
                <div className="w-full mb-5">
                  <label className="block mb-2 text-sm font-semibold text-gray-900">
                    Text
                  </label>

                  <input
                    {...register('text')}
                    className="w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-140 sm:text-sm sm:leading-6"
                    placeholder="Input Text"
                  />

                  {errors.text && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.text.message}
                    </p>
                  )}
                </div>

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

                <div className="flex justify-end mt-10">
                  <button
                    type="submit"
                    className="text-white bg-primary-120 hover:bg-primary-140 focus-visible:ring-2 focus-visible:bg-primary-160 focus-visible:outline-none focus-visible:ring-primary-100 font-semibold rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 ease-in-out active:bg-primary-160"
                  >
                    {createRunningText.status === 'loading' ? (
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

export default RunningTextCreateModal;
