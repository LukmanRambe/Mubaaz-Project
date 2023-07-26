import React from 'react';

import moment from 'moment';
import Head from 'next/head';
import { NumericFormat } from 'react-number-format';

import PageLoading from '../../components/artifacts/Loading/PageLoading';
import BreadCrumb from '../../components/artifacts/PageHeader/Breadcrumb';
import MainLayout from '../../components/main/Layout/MainLayout';
import useRemoteGetAllSaldo from '../../hooks/remote/useRemoteGettAllSaldo';
import { NextPageWithLayout } from '../../ts/types/NextPageWithLayout';

const LaporanSaldo: NextPageWithLayout = () => {
  const { data: saldoData, isFetching } = useRemoteGetAllSaldo();

  const breadcrumbData = [
    {
      pageName: 'Home',
      pageHref: '/',
    },
    {
      pageName: `Laporan Saldo`,
      pageHref: '',
    },
  ];

  return (
    <div className="px-3 mt-20 pb-52 xl:px-24 lg:px-12 sm:px-6 2xl:px-28 sm:mt-52">
      <Head>
        <title>Laporan Saldo | Masjid Umar bin Abdul Aziz</title>
        <meta
          name="Halaman Laporan Saldo Jum'at Masjid Umar bin Abdul Aziz"
          content="Jadwal Laporan Saldo Jum'at Masjid Umar bin Abdul Aziz"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BreadCrumb breadCrumbData={breadcrumbData} />

      <article className="w-full h-full mt-5">
        <h1 className="mb-10 text-2xl font-bold text-primary-140">
          Laporan Saldo
        </h1>

        <section className="overflow-x-auto overflow-y-hidden bg-white rounded-lg shadow-xl">
          <table className="w-full text-left table-auto">
            <thead className="text-sm text-primary-160 capitalize bg-white border-b border-[#9FA284] border-opacity-20">
              <tr>
                <th className="px-6 sm:px-10 2xl:px-16 p-7">No.</th>
                <th className="px-6 sm:px-10 2xl:px-16 p-7">
                  Minggu Ke- (Tanggal)
                </th>
                <th className="px-6 sm:px-10 2xl:px-16 p-7">Total Saldo</th>
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
                saldoData?.data?.map((saldo, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b border-[#9FA284] border-opacity-20"
                  >
                    <td className="px-6 sm:px-10 2xl:px-16 p-7">{index + 1}</td>
                    <td className="px-6 sm:px-10 2xl:px-16 p-7">
                      {saldo.minggu &&
                        `Minggu Ke-${saldo.minggu} (${moment(
                          `${saldo.tahun}-W${saldo.minggu}`
                        )
                          .startOf('week')
                          .weekday(5)
                          .format('D MMMM YYYY')})`}
                    </td>{' '}
                    <td className="px-6 sm:px-10 2xl:px-16 p-7">
                      <NumericFormat
                        value={saldo.total_donasi}
                        prefix="Rp "
                        decimalSeparator=","
                        thousandSeparator="."
                        decimalScale={2}
                        fixedDecimalScale
                        displayType="text"
                      />
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

LaporanSaldo.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default LaporanSaldo;
