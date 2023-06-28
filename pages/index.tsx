import { useMemo } from 'react';

import moment from 'moment';
import momentHijri from 'moment-hijri';
import Head from 'next/head';
import Image from 'next/image';
import { AiOutlineClockCircle } from 'react-icons/ai';

import HomePageBanner from '../components/artifacts/Banner/Main/HomePageBanner';
import MainLayout from '../components/main/Layout/MainLayout';
import useRemoteGetJadwalShalat from '../hooks/remote/slideshow/useRemoteGetJadwalShalat';
import useClock from '../hooks/slideshow/useClock';
import { NextPageWithLayout } from '../ts/types/NextPageWithLayout';
import { generateJadwalShalat } from '../utils/generateData';

const Index: NextPageWithLayout = () => {
  const clock = useClock();
  const { data: jadwalShalatData } = useRemoteGetJadwalShalat();
  const jadwalShalat = useMemo(
    () => generateJadwalShalat(jadwalShalatData),
    [jadwalShalatData]
  );

  return (
    <>
      <Head>
        <title>Masjid Umar bin Abdul Aziz</title>
        <meta
          name="Halaman Utama Masjid Umar bin Abdul Aziz"
          content="Masjid Umar bin Abdul Aziz"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePageBanner />

      <article className="w-full px-3 py-20 pb-32 bg-neutral-50 xl:px-24 lg:px-12 sm:px-6 2xl:px-28">
        <h2 className="mb-16 text-2xl font-bold text-center md:text-3xl text-primary-140">
          Jadwal Shalat
        </h2>

        <section className="flex items-center justify-between gap-12">
          <section className="hidden w-full h-full lg:block">
            <picture className="relative block w-full aspect-[3/2] rounded-lg drop-shadow-xl overflow-hidden transform -scale-x-100">
              <Image
                src="/assets/images/shalat.jpg"
                alt="Orang Sedang Shalat"
                layout="fill"
                className="object-cover origin-top-left scale-[1.35]"
              />
            </picture>
          </section>

          <section className="flex flex-col w-full h-full gap-3 md:px-28 lg:px-0 lg:w-3/4">
            <section className="flex flex-col-reverse items-end justify-between lg:items-center md:flex-row">
              <section className="font-semibold text-primary-160">
                <span>{moment().locale('id').format('DD MMMM YYYY')} M / </span>
                <span>
                  {momentHijri().locale('ar-sa').format('iDD iMMMM iYYYY')} H
                </span>
              </section>

              <section className="flex items-center gap-2 text-primary-160">
                <span>
                  <AiOutlineClockCircle className="flex-shrink-0 w-5 h-5" />
                </span>

                <p className="w-[4rem] font-semibold text-end">
                  {moment(clock.date).locale('id').format('HH:mm:ss')}
                </p>
              </section>
            </section>

            <table className="w-full h-12 gap-5 overflow-hidden bg-white rounded-lg table-auto drop-shadow-xl">
              <thead className="font-semibold text-primary-160">
                <tr className="text-left border-b-2 border-primary-100">
                  <th className="p-4 px-10">Nama Shalat</th>
                  <th className="p-4 px-10 text-center">Waktu Shalat</th>
                </tr>
              </thead>

              <tbody className="text-primary-180">
                {jadwalShalat?.map((shalat) => (
                  <tr
                    key={shalat.name}
                    className="border-b border-[#9FA284] border-opacity-30"
                  >
                    <td className="p-4 px-10 font-medium">{shalat.name}</td>
                    <td className="p-4 px-10 text-center">{shalat.jam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </section>
      </article>
    </>
  );
};

Index.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Index;
