import { useContext, useMemo } from 'react';

import { Disclosure, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiLogOut } from 'react-icons/bi';
import { HiChevronUp } from 'react-icons/hi';

import { AuthContext } from '../../../context/AuthContext';
import { generateSidebarMenus } from '../../../utils/generateData';

const Sidebar = () => {
  const { logout, userData } = useContext(AuthContext);
  const router = useRouter();
  const sidebarMenus = useMemo(() => generateSidebarMenus(), []);

  return (
    <aside className="fixed left-0 hidden h-full bg-white z-49 lg:block">
      <section
        className="fixed top-0 left-0 h-screen pt-24 overflow-y-auto transition-transform bg-white scroll-smooth w-72 px-7 scrollbar-hide sm:translate-x-0"
        aria-label="Sidebar"
      >
        <article className="w-full h-full pb-7">
          <ul
            role="list"
            className="flex flex-col justify-between w-full h-full text-base font-medium gap-14"
          >
            <article className="flex flex-col items-start justify-center gap-3">
              {sidebarMenus.map((menu) => (
                <li key={menu.href} className="w-full">
                  {menu.subMenu ? (
                    <Disclosure key={menu.menuName + menu.href}>
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={`flex items-center justify-between active:text-primary-160 hover:text-primary-160 hover:bg-primary-40 active:bg-primary-60 px-4 py-3 transition duration-75 ease-in-out cursor-pointer rounded-lg w-full text-base text-[#84828A] group focus:outline-none focus:bg-primary-40 focus:text-primary-160`}
                          >
                            <div className="flex items-center justify-start gap-3">
                              <span>{menu.icon}</span>
                              <p>{menu.menuName}</p>
                            </div>

                            <HiChevronUp
                              className={`${
                                open ? 'rotate-180 transform' : ''
                              } h-5 w-5 text-[#84828A] group-hover:text-primary-160 group-focus:text-primary-160`}
                            />
                          </Disclosure.Button>

                          <Transition
                            enter="transition duration-75 ease-in-out"
                            enterFrom="transform scale-90 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-in-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-90 opacity-0"
                          >
                            <Disclosure.Panel className="flex flex-col gap-2 mt-2">
                              {menu.subMenu?.map((subMenu) => (
                                <Link
                                  key={subMenu.name}
                                  href={subMenu.href}
                                  passHref
                                >
                                  <a
                                    className={`active:text-primary-160 hover:text-primary-160 active:bg-primary-60 ml-8 px-5 py-3 transition duration-75 ease-in-out cursor-pointer rounded-lg min-w-fit text-sm focus:outline-none ${
                                      `${subMenu.href}` === router.pathname
                                        ? 'text-primary-160 hover:bg-primary-60 focus-visible:bg-primary-40 focus-visible:text-primary-160'
                                        : 'text-[#84828A] hover:bg-primary-40 focus-visible:bg-primary-40 focus-visible:text-primary-160'
                                    }`}
                                  >
                                    {subMenu.name}
                                  </a>
                                </Link>
                              ))}
                            </Disclosure.Panel>
                          </Transition>
                        </>
                      )}
                    </Disclosure>
                  ) : (
                    <>
                      {menu.role?.includes(userData.role) && (
                        <Link role="listitem" href={menu.href} passHref>
                          <a
                            className={`flex items-center justify-start gap-3 active:text-primary-160 hover:text-primary-160 active:bg-primary-60 px-4 py-3 transition duration-75 ease-in-out cursor-pointer rounded-lg w- ${
                              `${menu.href}` === router.pathname
                                ? 'text-primary-160 hover:bg-primary-60 bg-primary-60 focus:bg-primary-60 focus:text-primary-160'
                                : 'text-[#84828A] hover:bg-primary-40 focus:bg-primary-40 focus:text-primary-160'
                            }`}
                          >
                            <span>{menu.icon}</span>
                            <p>{menu.menuName}</p>
                          </a>
                        </Link>
                      )}
                    </>
                  )}
                </li>
              ))}
            </article>

            <button
              type="button"
              onClick={() => logout()}
              role="button"
              aria-label="Tombol Keluar"
              className="flex items-center justify-start gap-3 active:text-primary-160 hover:text-primary-160 hover:bg-primary-40 active:bg-primary-60 px-4 rounded-lg py-3 transition duration-75 ease-in-out cursor-pointer text-[#84828A] focus:bg-primary-40 focus:text-primary-160"
            >
              <BiLogOut className="flex-shrink-0 w-6 h-6 transition duration-75 ease-in-out" />
              <p>Keluar</p>
            </button>
          </ul>
        </article>
      </section>
    </aside>
  );
};

export default Sidebar;
