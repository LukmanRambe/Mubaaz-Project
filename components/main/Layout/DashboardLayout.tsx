import React, { ReactNode } from 'react';

import id from 'date-fns/locale/id';
import moment from 'moment';
import { registerLocale } from 'react-datepicker';

import AuthProvider from '../../../context/AuthContext';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  registerLocale('id', id);
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
    <AuthProvider>
      <Navbar />
      <Sidebar />
      <main className="min-h-screen px-5 pt-[100px] bg-gray-200 lg:ml-[300px] pb-10">
        {children}
      </main>
    </AuthProvider>
  );
};

export default DashboardLayout;
