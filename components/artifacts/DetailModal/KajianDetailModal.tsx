import moment from 'moment';
import Image from 'next/image';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';

import { KajianType } from '../../../ts/types/main/Kajian';

type KajianDetailModalProps = {
  kajian: KajianType;
  setIdKajian: (value: string) => void;
  isFetchingKajian: boolean;
  isDetailModalShown: boolean;
  setIsDetailModalShown: (value: boolean) => void;
};

const KajianDetailModal = ({
  setIdKajian,
  kajian,
  isFetchingKajian,
  isDetailModalShown,
  setIsDetailModalShown,
}: KajianDetailModalProps) => {
  const handleCloseModal = () => {
    setIsDetailModalShown(false);
    setIdKajian('');
  };

  return (
    <>
      {isDetailModalShown && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full md:min-h-screen min-w-screen bg-black/50">
          <div className="w-[calc(100%-2rem)] md:w-1/2 mt-10 overflow-hidden bg-white shadow-xl lg:w-[30rem] rounded-2xl ">
            <div className="flex items-center justify-between p-4 px-5">
              <h3 className="text-xl font-medium text-gray-900">
                Detail Kajian
              </h3>

              <button
                type="button"
                className="w-7 h-7 transition duration-75 text-[#84828A] hover:text-[#727076] font-bold"
                onClick={() => handleCloseModal()}
              >
                <CgClose />
              </button>
            </div>

            <article className="flex flex-col">
              {isFetchingKajian ? (
                <div className="flex items-center justify-center w-full py-6 h-96">
                  <AiOutlineLoading3Quarters className="text-7xl text-primary-100 animate-spin" />
                </div>
              ) : (
                <>
                  <picture className="relative object-contain w-full aspect-[16/9] border-2 border-x-0 border-primary-160">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${kajian.poster}`}
                      alt={kajian.nama_file_poster}
                      layout="fill"
                    />
                  </picture>

                  <section className="w-full p-5 pt-3 rounded-t-full">
                    <div className="flex flex-col gap-0 mb-2">
                      <p className="text-sm font-medium text-gray-500">
                        {kajian.nama_ustadz} -{' '}
                        <span className="font-normal">{kajian.tema}</span>
                      </p>

                      <p className="w-full text-2xl font-bold capitalize text-primary-140">
                        {kajian.judul}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-10">
                      <div className="flex flex-col items-start justify-start w-full text-gray-400">
                        <p>Mulai : {kajian.waktu_awal} WIB</p>
                        <p>Berakhir : {kajian.waktu_akhir} WIB</p>
                      </div>

                      <div className="flex flex-col items-end justify-end w-full text-gray-400">
                        <p className="w-full font-medium capitalize text-md text-end">
                          {kajian.lokasi}
                        </p>

                        <p className="w-full font-medium text-md text-end">
                          {kajian?.tanggal
                            ? moment(kajian?.tanggal).format(
                                'dddd, D MMMM YYYY'
                              )
                            : '-'}
                        </p>
                      </div>
                    </div>
                  </section>
                </>
              )}
            </article>
          </div>
        </div>
      )}
    </>
  );
};

export default KajianDetailModal;
