export type NavbarMenus = {
  menuName: string;
  href: string;
  subMenu?: {
    name: string;
    href: string;
  }[];
}[];
