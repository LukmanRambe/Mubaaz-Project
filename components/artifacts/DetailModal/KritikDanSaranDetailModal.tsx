import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';

import { KritikDanSaranType } from '../../../ts/types/main/KritikDanSaran';

type KritikDanSaranDetailModalProps = {
  kritikDanSaran: KritikDanSaranType;
  isFetchingKritikDanSaran: boolean;
  idKritikDanSaran: string;
  setIdKritikDanSaran: (value: string) => void;
  isDetailModalShown: boolean;
  setIsDetailModalShown: (value: boolean) => void;
};

const KritikDanSaranDetailModal = ({
  kritikDanSaran,
  isFetchingKritikDanSaran,
  setIdKritikDanSaran,
  isDetailModalShown,
  setIsDetailModalShown,
}: KritikDanSaranDetailModalProps) => {
  const handleCloseModal = () => {
    setIsDetailModalShown(false);
    setIdKritikDanSaran('');
  };

  return (
    <>
      {isDetailModalShown && (
        <>
          <div
            tabIndex={-1}
            className="fixed inset-0 z-50 flex items-center justify-center w-full h-full md:min-h-screen min-w-screen bg-black/50"
          >
            <div className="relative flex flex-col max-w-md gap-5 px-3 py-5 mx-2 bg-white rounded-xl md:w-full md:h-auto md:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium text-gray-900">
                  Detail Kritik/Saran
                </h3>

                <button
                  type="button"
                  className="w-7 h-7 transition duration-75 text-[#84828A] hover:text-[#727076] font-bold"
                  onClick={() => handleCloseModal()}
                >
                  <CgClose />
                </button>
              </div>

              {isFetchingKritikDanSaran ? (
                <div className="flex items-center justify-center w-full h-full py-6">
                  <AiOutlineLoading3Quarters className="text-7xl text-primary-100 animate-spin" />
                </div>
              ) : (
                <>
                  <div className="w-full">
                    <label className="block mb-2 text-sm font-semibold text-gray-900">
                      Urutan
                    </label>

                    <p>{kritikDanSaran?.nama_pengirim}</p>
                  </div>

                  <div className="w-full">
                    <label className="block mb-2 text-sm font-semibold text-gray-900">
                      Text
                    </label>

                    <p>{kritikDanSaran?.teks}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default KritikDanSaranDetailModal;
