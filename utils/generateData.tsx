import { FaCalendarAlt } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import { IoImages } from 'react-icons/io5';
import { MdTextFields } from 'react-icons/md';
import { RiSlideshow3Fill } from 'react-icons/ri';

import type { Option } from '../ts/types/main/Option';
import type { SidebarMenus } from '../ts/types/main/Sidebar';

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
      menuName: 'Slideshow',
      href: '/admin/slideshow-control',
      icon: <RiSlideshow3Fill className={classNames} />,
      role: ['Admin'],
    },
  ];

  return sidebarMenus;
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
  const tableHeadsPoster = ['No.', 'Gambar', 'Jenis', 'Urutan', 'Aksi'];

  return tableHeadsPoster;
};

export const generateTableHeadsRunningText = (): string[] => {
  const tableHeadsRunningText = ['No.', 'Teks', 'Urutan', 'Aksi'];

  return tableHeadsRunningText;
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
