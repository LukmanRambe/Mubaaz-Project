import React, { ReactNode } from 'react';

import id from 'date-fns/locale/id';
import moment from 'moment';
import { registerLocale } from 'react-datepicker';

import AuthProvider from '../../../context/AuthContext';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

type AppMainProps = {
  children: ReactNode;
};

const AppMain: React.FC<AppMainProps> = ({ children }) => {
  registerLocale('id', id);
  moment.updateLocale('id', {
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
    <AuthProvider>
      <Navbar />
      <Sidebar />
      <main className="min-h-screen px-5 pt-[100px] bg-gray-200 lg:ml-[300px] pb-10">
        {children}
      </main>
    </AuthProvider>
  );
};

export default AppMain;
