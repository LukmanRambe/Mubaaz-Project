import React, { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';

import ConfirmationDonationCreateModal from '../../components/artifacts/CreateModal/ConfirmationDonationCreateModal';
import BreadCrumb from '../../components/artifacts/PageHeader/Breadcrumb';
import Toast from '../../components/artifacts/Toast';
import MainLayout from '../../components/main/Layout/MainLayout';
import { NextPageWithLayout } from '../../ts/types/NextPageWithLayout';

const Donasi: NextPageWithLayout = () => {
  const [isCreateModalShown, setIsCreateModalShown] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<string>('');

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

      {showToast && <Toast type={toastType} message={toastMessage} />}

      {isCreateModalShown && (
        <ConfirmationDonationCreateModal
          isCreateModalShown={isCreateModalShown}
          setIsCreateModalShown={setIsCreateModalShown}
          setShowToast={setShowToast}
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
          setToastType={setToastType}
        />
      )}

      <article className="w-full h-full mt-5">
        <section className="flex flex-col items-start justify-between gap-5 mb-6 sm:mb-10 sm:items-center w-52 sm:w-full sm:flex-row">
          <h1 className="text-2xl font-bold text-primary-140">Donasi</h1>

          <button
            onClick={() => setIsCreateModalShown(true)}
            className="w-full px-5 py-[.675rem] text-sm font-semibold text-center text-white transition duration-300 ease-in-out bg-primary-120 rounded-lg cursor-pointer hover:bg-primary-140 focus:outline-none outline-none focus:bg-primary-140 active:bg-primary-160 md:w-64 self-end mb-5 sm:mb-0"
          >
            Kirim Bukti Transfer
          </button>
        </section>

        <section className="flex flex-col flex-wrap justify-between gap-10 md:flex-row">
          <section>
            <h2 className="mb-5 text-lg font-semibold">
              Bank Muamalat - Infaq Masjid
            </h2>

            <section className="overflow-hidden bg-white rounded-lg drop-shadow-xl w-fit">
              <section className="w-full p-5 py-10 border-b border-primary-180">
                <picture className="relative block h-12 w-44 md:h-20 md:w-80">
                  <Image
                    src="/assets/images/bank-muamalat.png"
                    alt="Bank Muamalat"
                    layout="fill"
                    className="object-contain"
                  />
                </picture>
              </section>

              <section className="px-4 py-3">
                <p>Nomor Rekening : 23 0001 9696</p>
                <p>A/N : MASJID UMAR BIN ABDUL AZIZ</p>
                <p>Kode Bank : 147</p>
              </section>
            </section>
          </section>

          <section>
            <h2 className="mb-5 text-lg font-semibold">
              Bank BSI - Operasional Dakwah
            </h2>

            <section className="overflow-hidden bg-white rounded-lg drop-shadow-xl w-fit">
              <section className="w-full p-5 py-10 border-b border-primary-180">
                <picture className="relative block h-12 w-44 md:h-20 md:w-80">
                  <Image
                    src="/assets/images/bank-bsi.svg"
                    alt="Bank Muamalat"
                    layout="fill"
                    className="object-contain"
                  />
                </picture>
              </section>

              <section className="px-4 py-3">
                <p>Nomor Rekening : 7125-418-451</p>
                <p>A/N : Yayasan Darussunnah Tembung</p>
                <p>Kode Bank : 451</p>
              </section>
            </section>
          </section>

          <section>
            <h2 className="mb-5 text-lg font-semibold">
              Listrik Pintar - Token Listrik Mubaaz
            </h2>

            <section className="overflow-hidden bg-white rounded-lg drop-shadow-xl w-fit">
              <section className="w-full p-[4.25rem] border-b py-[1.53rem] border-primary-180">
                <picture className="relative block h-20 w-36 md:w-56 md:h-28">
                  <Image
                    src="/assets/images/listrik-pintar.webp"
                    alt="Bank Muamalat"
                    layout="fill"
                    className="object-contain"
                  />
                </picture>
              </section>

              <section className="px-4 py-3 min-h-[96px]">
                <p>Nomor Meter : 32 1738 5938 3</p>
              </section>
            </section>
          </section>
        </section>
      </article>
    </div>
  );
};

Donasi.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Donasi;
