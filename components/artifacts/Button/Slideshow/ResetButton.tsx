import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

import { fetchAxios } from '../../../../libs/axios';

type ResetSlideButtonProps = {
  toastMessage: string;
  setShowToast: (value: boolean) => void;
  setToastMessage: (value: string) => void;
  setToastType: (value: string) => void;
  refetch: () => void;
};

const ResetSlideButton = ({
  toastMessage,
  setShowToast,
  setToastMessage,
  setToastType,
  refetch,
}: ResetSlideButtonProps) => {
  const resetSlide = useMutation(
    'resetSlide',
    async () => {
      return fetchAxios.put(
        `/api/slideshows/e171341f-3146-4eb8-b726-9bde5f3a5468`,
        {
          urutan: 1,
          status: 'uncontrolled',
        }
      );
    },
    {
      onSuccess: async (response) => {
        if (response.status === 200) {
          setShowToast(true);
          setToastMessage('Slideshow berhasil direset');
          setToastType('success');

          setTimeout(() => {
            setShowToast(false);
            setToastMessage('');
            refetch();
          }, 2000);
        }
      },
      onError: async (error: AxiosError) => {
        if (error.response?.status === 401) {
          setToastMessage('Slideshow gagal direset');
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

  const handleResetSlide = () => {
    resetSlide.mutate();
  };

  return (
    <button
      type="button"
      onClick={() => handleResetSlide()}
      className="w-fit px-5 py-[.675rem] text-sm font-semibold text-center text-white transition duration-300 ease-in-out bg-primary-120 rounded-lg cursor-pointer hover:bg-primary-140 focus:outline-none outline-none focus:bg-primary-140 active:bg-primary-160 md:w-64"
    >
      Reset Slide
    </button>
  );
};

export default ResetSlideButton;
