import { FaCalendarAlt } from 'react-icons/fa';
import { GiPayMoney, GiTeacher } from 'react-icons/gi';
import { IoImages } from 'react-icons/io5';
import { MdFeedback, MdTextFields } from 'react-icons/md';
import { RiSlideshow3Fill } from 'react-icons/ri';

import { NavbarMenus } from '../ts/types/main/Navbar';
import type { Option } from '../ts/types/main/Option';
import type { SidebarMenus } from '../ts/types/main/Sidebar';
import { JadwalShalatType } from '../ts/types/slideshow/JadwalShalat';

export const generateSidebarMenus = () => {
  const classNames = 'flex-shrink-0 w-6 h-6 transition duration-75';

  const sidebarMenus: SidebarMenus = [
    {
      menuName: 'Ustadz',
      href: '/admin/ustadz',
      icon: <GiTeacher className={classNames} />,
      role: ['Super Admin', 'Admin'],
    },
    {
      menuName: 'Agenda',
      href: '#',
      icon: <FaCalendarAlt className={classNames} />,
      role: ['Super Admin', 'Admin'],
      subMenu: [
        {
          name: 'Kajian',
          href: '/admin/agenda/kajian',
        },
        {
          name: "Khutbah Jum'at",
          href: '/admin/agenda/khutbah',
        },
      ],
    },
    {
      menuName: 'Poster',
      href: '/admin/poster',
      icon: <IoImages className={classNames} />,
      role: ['Super Admin', 'Admin'],
    },
    {
      menuName: 'Running Text',
      href: '/admin/running-text',
      icon: <MdTextFields className={classNames} />,
      role: ['Super Admin', 'Admin'],
    },
    {
      menuName: 'Slideshow Control',
      href: '/admin/slideshow-control',
      icon: <RiSlideshow3Fill className={classNames} />,
      role: ['Admin'],
    },
    {
      menuName: 'Donasi',
      href: '/admin/donasi',
      icon: <GiPayMoney className={classNames} />,
      role: ['Super Admin', 'Admin'],
    },
    {
      menuName: 'Kritik & Saran',
      href: '/admin/kritik-dan-saran',
      icon: <MdFeedback className={classNames} />,
      role: ['Super Admin', 'Admin'],
    },
  ];

  return sidebarMenus;
};

export const generateNavbarMenus = () => {
  const navbarMenus: NavbarMenus = [
    {
      menuName: 'Home',
      href: '/',
    },
    {
      menuName: 'Agenda',
      href: '#',
      subMenu: [
        {
          name: 'Kajian',
          href: '/agenda/kajian',
        },
        {
          name: "Khutbah Jum'at",
          href: '/agenda/khutbah',
        },
      ],
    },
    {
      menuName: 'Donasi',
      href: '/donasi',
    },
    {
      menuName: 'Lainnya',
      href: '#',
      subMenu: [
        {
          name: 'Kritik & Saran',
          href: '/kritik-dan-saran',
        },
      ],
    },
  ];

  return navbarMenus;
};

export const generateJadwalShalat = (
  jadwalShalatData: JadwalShalatType | undefined
) => {
  const jadwalShalat = [
    {
      name: 'Shubuh',
      jam: jadwalShalatData?.data?.jadwal.subuh ?? '00:00',
    },
    {
      name: 'Terbit',
      jam: jadwalShalatData?.data?.jadwal.terbit ?? '00:00',
    },
    {
      name: 'Dzuhur',
      jam: jadwalShalatData?.data?.jadwal.dzuhur ?? '00:00',
    },
    {
      name: 'Ashar',
      jam: jadwalShalatData?.data?.jadwal.ashar ?? '00:00',
    },
    {
      name: 'Maghrib',
      jam: jadwalShalatData?.data?.jadwal.maghrib ?? '00:00',
    },
    {
      name: 'Isya',
      jam: jadwalShalatData?.data?.jadwal.isya ?? '00:00',
    },
  ];

  return jadwalShalat;
};

export const generateTableHeadsUstadz = (): string[] => {
  const tableHeadsUstadz = ['No.', 'Nama', 'Alamat', 'No. Whatsapp', 'Aksi'];

  return tableHeadsUstadz;
};

export const generateTableHeadsKajian = (): string[] => {
  const tableHeadsKajian = [
    'No.',
    'Judul Kajian',
    'Nama Ustadz',
    'Lokasi',
    'Tanggal',
    'Aksi',
  ];

  return tableHeadsKajian;
};

export const generateTableHeadsKhutbah = (): string[] => {
  const tableHeadsKhutbah = [
    'No.',
    'Judul Khutbah',
    'Nama Khatib',
    'Tanggal',
    'Aksi',
  ];

  return tableHeadsKhutbah;
};

export const generateTableHeadsPoster = (): string[] => {
  const tableHeadsPoster = ['No.', 'Poster', 'Urutan', 'Aksi'];

  return tableHeadsPoster;
};

export const generateTableHeadsRunningText = (): string[] => {
  const tableHeadsRunningText = ['No.', 'Teks', 'Urutan', 'Aksi'];

  return tableHeadsRunningText;
};

export const generateTableHeadsKritikDanSaran = (): string[] => {
  const tableHeadsKritikDanSaran = [
    'No.',
    'Nama Pengirim',
    'Kritik / Saran',
    'Aksi',
  ];

  return tableHeadsKritikDanSaran;
};

export const generateTableHeadsDonasi = (): string[] => {
  const tableHeadsDonasi = ['No.', 'Nama Pengirim', 'Jumlah Donasi'];

  return tableHeadsDonasi;
};

export const generateDataPerPageOptions = (): Option<string>[] => {
  const dataPerPageOptions: Option<string>[] = [
    { label: '10', value: '10' },
    { label: '15', value: '15' },
    { label: '20', value: '20' },
    { label: '25', value: '25' },
  ];

  return dataPerPageOptions;
};

export const generateUrutanOptions = (): Option<number>[] => {
  const urutanOptions: Option<number>[] = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ];

  return urutanOptions;
};
