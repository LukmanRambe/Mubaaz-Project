import { ReactNode } from 'react';

import moment from 'moment';
import momentHijri from 'moment-hijri';
import dynamic from 'next/dynamic';

import Footer from '../Main/Footer';
import Navbar from '../Main/Navbar';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  momentHijri.updateLocale('ar-sa', {
    iMonths: [
      'Muharam',
      'Safar',
      "Robi'ul Awal",
      "Robi'ul Tsani",
      'Jumadil Awal',
      'Jumadil Akhirah',
      'Rajab',
      "Sya'ban",
      'Ramadhan',
      'Oktober',
      "Dzulqa'dah",
      'Dzulhijjah',
    ],
  });
  moment.updateLocale('id', {
    weekdays: ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu'],
    months: [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ],
  });

  return (
    <>
      <Navbar />
      <main className="w-full h-full bg-neutral-50">{children}</main>
      <Footer />
    </>
  );
};

export default dynamic(() => Promise.resolve(MainLayout), { ssr: false });
