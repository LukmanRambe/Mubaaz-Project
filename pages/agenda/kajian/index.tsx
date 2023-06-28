import { useEffect } from 'react';

import moment from 'moment';
import Head from 'next/head';
import Image from 'next/image';
import { FaCalendarAlt } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

import PageLoading from '../../../components/artifacts/Loading/PageLoading';
import BreadCrumb from '../../../components/artifacts/PageHeader/Breadcrumb';
import MainLayout from '../../../components/main/Layout/MainLayout';
import useRemoteGetAllKajian from '../../../hooks/remote/useRemoteGetAllKajian';
import { NextPageWithLayout } from '../../../ts/types/NextPageWithLayout';

const Kajian: NextPageWithLayout = () => {
  const {
    data: allKajianData,
    refetch,
    isFetching,
  } = useRemoteGetAllKajian(100, 1, '');

  const breadcrumbData = [
    {
      pageName: 'Home',
      pageHref: '/',
    },
    {
      pageName: `Jadwal Kajian`,
      pageHref: '',
    },
  ];

  useEffect(() => {
    if (allKajianData) {
      refetch();
    }
  }, [allKajianData]);

  return (
    <div className="px-3 mt-20 sm:mt-52 sm:px-6 lg:px-12 xl:px-24 2xl:px-28 pb-28">
      <Head>
        <title>Kajian | Masjid Umar bin Abdul Aziz</title>
        <meta
          name="Halaman Kajian Masjid Umar bin Abdul Aziz"
          content="Jadwal Kajian Masjid Umar bin Abdul Aziz"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BreadCrumb breadCrumbData={breadcrumbData} />

      <article className="mt-5">
        <h1 className="mb-10 text-2xl font-bold text-primary-140">
          Jadwal Kajian
        </h1>

        <section
          className={`${
            isFetching
              ? 'flex justify-center w-full items-start'
              : 'grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-12'
          }`}
        >
          {isFetching ? (
            <PageLoading />
          ) : (
            allKajianData?.data?.map((kajian) => (
              <article
                key={kajian.id}
                className="w-full xl:min-w-[22rem] xl:min-h-[20rem] lg:min-w-[18rem] lg:min-h-[19rem] overflow-hidden bg-white rounded-lg shadow-xl border border-gray-[125]"
              >
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
              </article>
            ))
          )}
        </section>
      </article>
    </div>
  );
};

Kajian.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Kajian;
