import moment from 'moment';
import Image from 'next/image';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';
import { FaCalendarAlt } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

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
                  <picture className="relative block object-cover w-full border-b-2 aspect-video border-primary-160">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${kajian.poster}`}
                      alt={kajian.nama_file_poster}
                      layout="fill"
                    />
                  </picture>

                  <article className="flex flex-col p-4">
                    <p className="text-sm font-medium text-gray-500">
                      {kajian.nama_ustadz} -{' '}
                      <span className="font-normal">{kajian.tema}</span>
                    </p>

                    <h2 className="text-xl font-bold text-primary-160 min-h-[5rem]">
                      {kajian.judul}
                    </h2>

                    <article className="flex flex-col items-center justify-between gap-5 mt-10 lg:gap-0 lg:flex-row">
                      <section className="flex flex-col w-full gap-1 text-gray-400">
                        <p>Mulai : {kajian.waktu_awal} WIB</p>
                        <p>Akhir : {kajian.waktu_akhir} WIB</p>
                      </section>

                      <section className="flex flex-col self-end w-full gap-1 text-gray-400 capitalize text-md text-end">
                        <section className="flex items-center w-full gap-2">
                          <span>
                            <MdLocationOn className="w-4 h-4" />
                          </span>
                          <p className="w-fit">{kajian.lokasi}</p>
                        </section>

                        <section className="flex items-center w-full gap-2">
                          <span>
                            <FaCalendarAlt className="w-4 h-4" />
                          </span>
                          <p className="w-fit">
                            {kajian?.tanggal
                              ? moment(kajian?.tanggal).format(
                                  'dddd, D MMMM YYYY'
                                )
                              : '-'}
                          </p>
                        </section>
                      </section>
                    </article>
                  </article>
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
