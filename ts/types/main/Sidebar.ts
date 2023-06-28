import { ReactElement } from 'react';

export type SidebarMenus = {
  menuName: string;
  href: string;
  icon: ReactElement;
  role: string[];
  subMenu?: {
    name: string;
    href: string;
  }[];
}[];
