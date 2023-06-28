import React from 'react';

import moment from 'moment';
import Head from 'next/head';

import PageLoading from '../../../components/artifacts/Loading/PageLoading';
import BreadCrumb from '../../../components/artifacts/PageHeader/Breadcrumb';
import MainLayout from '../../../components/main/Layout/MainLayout';
import useRemoteGetAllKhutbah from '../../../hooks/remote/useRemoteGetAllKhutbah';
import { NextPageWithLayout } from '../../../ts/types/NextPageWithLayout';

const Khutbah: NextPageWithLayout = () => {
  const { data: allKhutbahData, isFetching } = useRemoteGetAllKhutbah(
    100,
    1,
    ''
  );

  const breadcrumbData = [
    {
      pageName: 'Home',
      pageHref: '/',
    },
    {
      pageName: `Jadwal Khutbah`,
      pageHref: '',
    },
  ];

  return (
    <div className="px-3 mt-20 xl:px-24 lg:px-12 sm:px-6 2xl:px-28 sm:mt-52 pb-28">
      <Head>
        <title>Khutbah Jum&apos;at | Masjid Umar bin Abdul Aziz</title>
        <meta
          name="Halaman Khutbah Jum'at Masjid Umar bin Abdul Aziz"
          content="Jadwal Khutbah Jum'at Masjid Umar bin Abdul Aziz"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BreadCrumb breadCrumbData={breadcrumbData} />

      <article className="w-full h-full mt-5">
        <h1 className="mb-10 text-2xl font-bold text-primary-140">
          Jadwal Khutbah Jum&apos;at
        </h1>

        <section className="overflow-x-auto overflow-y-hidden bg-white rounded-lg shadow-xl">
          <table className="w-full text-left table-auto">
            <thead className="text-sm text-primary-160 capitalize bg-white border-b border-[#9FA284] border-opacity-20">
              <tr>
                <th className="px-6 sm:px-10 2xl:px-16 p-7">No.</th>
                <th className="px-6 sm:px-10 2xl:px-16 p-7">Nama Khatib</th>
                <th className="px-6 sm:px-10 2xl:px-16 p-7">Tanggal</th>
              </tr>
            </thead>

            <tbody>
              {isFetching ? (
                <tr className="bg-white border-b border-[#9FA284] border-opacity-20 hover:bg-gray-50">
                  <td colSpan={3} className="px-5 2xl:px-16 p-7">
                    <PageLoading />
                  </td>
                </tr>
              ) : (
                allKhutbahData?.data?.map((khutbah, index) => (
                  <tr
                    key={khutbah.id}
                    className="bg-white border-b border-[#9FA284] border-opacity-20"
                  >
                    <td className="px-6 sm:px-10 2xl:px-16 p-7">{index + 1}</td>
                    <td className="px-6 sm:px-10 2xl:px-16 p-7">
                      {khutbah.nama_ustadz}
                    </td>
                    <td className="px-6 sm:px-10 2xl:px-16 p-7">
                      {moment(khutbah.tanggal).format('DD MMMM YYYY')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </article>
    </div>
  );
};

Khutbah.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Khutbah;
