import Image from 'next/image';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';
import { NumericFormat } from 'react-number-format';

import { DonasiType } from '../../../ts/types/main/Donasi';

type DonasiDetailModalProps = {
  donasi: DonasiType;
  setIdDonasi: (value: string) => void;
  isFetchingDonasi: boolean;
  isDetailModalShown: boolean;
  setIsDetailModalShown: (value: boolean) => void;
};

const DonasiDetailModal = ({
  setIdDonasi,
  donasi,
  isFetchingDonasi,
  isDetailModalShown,
  setIsDetailModalShown,
}: DonasiDetailModalProps) => {
  const handleCloseModal = () => {
    setIsDetailModalShown(false);
    setIdDonasi('');
  };

  return (
    <>
      {isDetailModalShown && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full md:min-h-screen min-w-screen bg-black/50">
          <div className="w-[calc(100%-2rem)] overflow-hidden bg-white shadow-xl md:w-[30rem] rounded-2xl p-4 px-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium text-gray-900">
                Detail Donasi
              </h3>

              <button
                type="button"
                className="w-7 h-7 transition duration-75 text-[#84828A] hover:text-[#727076] font-bold"
                onClick={() => handleCloseModal()}
              >
                <CgClose />
              </button>
            </div>

            <article className="flex flex-col mt-5">
              {isFetchingDonasi ? (
                <div className="flex items-center justify-center w-full py-6 h-96">
                  <AiOutlineLoading3Quarters className="text-7xl text-primary-100 animate-spin" />
                </div>
              ) : (
                <>
                  <div className="w-full mb-5">
                    <label className="block mb-2 text-sm font-semibold text-gray-900">
                      Nama Pengirim
                    </label>

                    <p className="text-sm font-medium text-gray-500">
                      {donasi.nama_pengirim}
                    </p>
                  </div>

                  <div className="w-full mb-5">
                    <label className="block mb-2 text-sm font-semibold text-gray-900">
                      Jumlah Donasi
                    </label>

                    <p className="text-sm font-medium text-gray-500">
                      <NumericFormat
                        value={donasi.jumlah_donasi}
                        prefix="Rp "
                        decimalSeparator=","
                        thousandSeparator="."
                        decimalScale={2}
                        fixedDecimalScale
                        displayType="text"
                      />
                    </p>
                  </div>

                  <div className="w-full">
                    <label className="block mb-2 text-sm font-semibold text-gray-900">
                      Bukti Transfer
                    </label>

                    <picture className="relative block object-cover w-full aspect-square border-primary-160">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${donasi.gambar}`}
                        alt={`Bukti Transfer dari ${
                          donasi.nama_pengirim ?? 'Hamba Allah'
                        }`}
                        layout="fill"
                      />
                    </picture>
                  </div>
                </>
              )}
            </article>
          </div>
        </div>
      )}
    </>
  );
};

export default DonasiDetailModal;
