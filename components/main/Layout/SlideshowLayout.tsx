import { ReactNode } from 'react';

import moment from 'moment';
import momentHijri from 'moment-hijri';

type SlideshowLayoutProps = {
  children: ReactNode;
};

const SlideshowLayout: React.FC<SlideshowLayoutProps> = ({ children }) => {
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
    <main className="flex items-center justify-center w-screen h-screen select-none">
      {children}
    </main>
  );
};

export default SlideshowLayout;
