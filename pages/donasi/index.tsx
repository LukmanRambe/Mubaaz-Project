import React from 'react';

import Head from 'next/head';
import Image from 'next/image';

import BreadCrumb from '../../components/artifacts/PageHeader/Breadcrumb';
import MainLayout from '../../components/main/Layout/MainLayout';
import { NextPageWithLayout } from '../../ts/types/NextPageWithLayout';

const Donasi: NextPageWithLayout = () => {
  const breadcrumbData = [
    {
      pageName: 'Home',
      pageHref: '/',
    },
    {
      pageName: `Donasi`,
      pageHref: '',
    },
  ];

  return (
    <div className="px-3 mt-20 xl:px-24 lg:px-12 sm:px-6 2xl:px-28 sm:mt-52 pb-28">
      <Head>
        <title>Donasi | Masjid Umar bin Abdul Aziz</title>
        <meta
          name="Halaman Donasi Jum'at Masjid Umar bin Abdul Aziz"
          content="Jadwal Donasi Jum'at Masjid Umar bin Abdul Aziz"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BreadCrumb breadCrumbData={breadcrumbData} />

      <article className="w-full h-full mt-5">
        <h1 className="mb-10 text-2xl font-bold text-primary-140">Donasi</h1>

        <section className="flex flex-col justify-start gap-10">
          <section>
            <h2 className="mb-5 text-lg font-semibold">
              Bank Muamalat - Infaq Masjid
            </h2>

            <picture className="relative block h-12 w-44 md:h-20 md:w-80">
              <Image
                src="/assets/images/bank-muamalat.png"
                alt="Bank Muamalat"
                layout="fill"
                className="object-contain"
              />
            </picture>

            <section className="mt-5">
              <p>Nomor Rekening : 23 0001 9696</p>
              <p>A/N : MASJID UMAR BIN ABDUL AZIZ</p>
              <p>Kode Bank : 147</p>
            </section>
          </section>

          <section>
            <h2 className="mb-5 text-lg font-semibold">
              Bank BSI - Operasional Dakwah
            </h2>

            <picture className="relative block h-12 w-44 md:h-20 md:w-80">
              <Image
                src="/assets/images/bank-bsi.svg"
                alt="Bank Muamalat"
                layout="fill"
                className="object-contain"
              />
            </picture>

            <section className="mt-5">
              <p>Nomor Rekening : 7125-418-451</p>
              <p>A/N : Yayasan Darussunnah Tembung</p>
              <p>Kode Bank : 451</p>
            </section>
          </section>

          <section>
            <h2 className="mb-5 text-lg font-semibold">
              Listrik Pintar - Token Listrik Mubaaz
            </h2>

            <picture className="relative block h-20 w-36 md:w-56 md:h-28">
              <Image
                src="/assets/images/listrik-pintar.webp"
                alt="Bank Muamalat"
                layout="fill"
                className="object-contain"
              />
            </picture>

            <section className="mt-5">
              <p>Nomor Meter : 32 1738 5938 3</p>
            </section>
          </section>
        </section>
      </article>
    </div>
  );
};

Donasi.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Donasi;
