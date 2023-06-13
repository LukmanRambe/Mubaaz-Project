import React, { useState } from 'react';

import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { AiOutlineWarning } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { useMutation } from 'react-query';

import { fetchAxios } from '../../../libs/axios';
import ButtonLoading from '../Loading/ButtonLoading';
import Toast from '../Toast';

type DeleteButtonProps = {
  queryKey: string;
  endPointUrl: string;
  refetch?: () => void;
  cardDelete?: boolean;
  dataName: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({
  queryKey,
  endPointUrl,
  refetch,
  cardDelete,
  dataName,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<string>('');
  const router = useRouter();

  const deleteData = useMutation(
    queryKey,
    async () => {
      return fetchAxios.delete(endPointUrl);
    },
    {
      onSuccess: async (response) => {
        if (response.status === 204) {
          setShowToast(true);
          setToastMessage(`${dataName} berhasil dihapus`);
          setToastType('success');

          setTimeout(() => {
            setShowModal(false);
            setToastMessage('');
            setIsLoading(false);
            setShowToast(false);
          }, 1800);

          setTimeout(() => {
            if (refetch) {
              deleteData.reset();
              refetch();
            } else {
              router.reload();
            }
          }, 2000);
        }
      },
      onError: async (error: AxiosError) => {
        if (error.response?.status === 404) {
          setToastMessage('Terjadi kesalahan dari sisi client');
          setShowToast(true);
          setToastType('error');

          setTimeout(() => {
            setShowModal(false);
            setToastMessage('');
            setIsLoading(false);
            setShowToast(false);
          }, 1800);

          setTimeout(() => {
            deleteData.reset();
          }, 2000);
        } else {
          setToastMessage(`${dataName} gagal dihapus`);
          setShowToast(true);
          setToastType('success');

          setTimeout(() => {
            setShowModal(false);
            setToastMessage('');
            setIsLoading(false);
            setShowToast(false);
          }, 1800);

          setTimeout(() => {
            deleteData.reset();
          }, 2000);
        }
      },
    }
  );

  const handleDelete = async () => {
    deleteData.mutate();
    setIsLoading(true);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`p-2 ${
          cardDelete
            ? 'bg-white'
            : 'bg-red-600 hover:bg-red-700 active:bg-red-800 transition-all duration-150 outline-none focus:bg-red-700 focus:outline-none'
        } rounded-lg cursor-pointer`}
      >
        <BiTrash
          className={`text-lg ${cardDelete ? 'text-red-600' : 'text-white'}`}
        />
      </button>

      {showToast && <Toast message={toastMessage} type={toastType} />}
      {showModal && (
        <>
          <div
            tabIndex={-1}
            className={`fixed flex justify-center items-center z-50 md:min-h-screen min-w-screen w-full inset-0 h-full bg-black/50`}
          >
            <div className="relative flex flex-col max-w-md gap-5 px-3 py-5 mx-2 text-center bg-white rounded-lg md:w-full md:h-auto md:p-6">
              <span className="flex justify-center">
                <AiOutlineWarning className="md:w-24 md:h-24 w-[4.5rem] h-[4.5rem] px-4 md:px-5 text-red-600 bg-[#FEE2E2] rounded-full" />
              </span>

              <h3 className="my-5 font-semibold text-gray-900 text-md md:text-lg">
                Kamu yakin ingin menghapus data?
              </h3>

              <div className="flex justify-center gap-3 text-center">
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="md:w-32 w-24 text-gray-900  bg-white hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200 focus:outline-none outline-none rounded-lg border border-gray-200 text-sm font-medium px-6 py-2.5 hover:text-gray-900 "
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Batalkan
                </button>

                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="md:w-32 w-24 text-white bg-red-600 hover:bg-red-700 active:bg-red-800 focus:bg-red-700 focus:outline-none font-medium rounded-lg text-sm px-6 py-2.5 flex justify-center"
                  onClick={() => handleDelete()}
                >
                  {isLoading ? <ButtonLoading /> : 'Hapus'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DeleteButton;
