import Image from 'next/image';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';

import { PosterType } from '../../../ts/types/main/Poster';

type PosterDetailModalProps = {
  poster: PosterType;
  setIdPoster: (value: string) => void;
  isFetchingPoster: boolean;
  isDetailModalShown: boolean;
  setIsDetailModalShown: (value: boolean) => void;
};

const PosterDetailModal = ({
  setIdPoster,
  poster,
  isFetchingPoster,
  isDetailModalShown,
  setIsDetailModalShown,
}: PosterDetailModalProps) => {
  const handleCloseModal = () => {
    setIsDetailModalShown(false);
    setIdPoster('');
  };

  return (
    <>
      {isDetailModalShown && (
        <div
          tabIndex={-1}
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full md:min-h-screen min-w-screen bg-black/50"
        >
          <div className="w-[calc(100%-2rem)] md:w-1/2 overflow-hidden bg-white shadow-xl lg:w-[40rem] rounded-2xl">
            <div className="flex items-center justify-between p-4 px-5">
              <h3 className="text-xl font-medium text-gray-900">
                Detail Poster - {poster?.urutan}
              </h3>

              <button
                type="button"
                className="w-7 h-7 transition duration-75 text-[#84828A] hover:text-[#727076] font-bold"
                onClick={() => handleCloseModal()}
              >
                <CgClose />
              </button>
            </div>

            <article className="flex h-96">
              {isFetchingPoster ? (
                <div className="flex items-center justify-center w-full py-6 h-96">
                  <AiOutlineLoading3Quarters className="text-7xl text-primary-100 animate-spin" />
                </div>
              ) : (
                <picture className="relative object-contain w-full aspect-[16/9]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${poster?.gambar}`}
                    alt={poster.nama_file_poster}
                    layout="fill"
                  />
                </picture>
              )}
            </article>
          </div>
        </div>
      )}
    </>
  );
};

export default PosterDetailModal;
