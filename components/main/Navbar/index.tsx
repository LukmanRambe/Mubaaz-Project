import { Fragment, useContext, useEffect, useMemo, useState } from 'react';

import { Disclosure, Dialog, Transition, Popover } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiLogOut } from 'react-icons/bi';
import { CgMenu, CgClose } from 'react-icons/cg';
import { HiChevronUp } from 'react-icons/hi';

import { AuthContext } from '../../../context/AuthContext';
import { generateSidebarMenus } from '../../../utils/generateData';

const Navbar: React.FC = () => {
  const router = useRouter();
  const { logout, userData } = useContext(AuthContext);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const sidebarMenus = useMemo(() => generateSidebarMenus(), []);

  useEffect(() => {
    setMobileFiltersOpen(false);
  }, [router.pathname]);

  return (
    <nav
      className={`fixed top-0 w-full bg-white ${
        mobileFiltersOpen ? 'z-0' : 'z-50'
      }`}
    >
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0 sm:translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0 sm:translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex flex-col w-[80%] h-full max-w-xs py-2 pb-8 mr-auto overflow-y-auto scrollbar-hide bg-white shadow-xl">
                <div className="flex items-start justify-between px-6 pt-3 ">
                  <div className="flex flex-col gap-2">
                    <article className="flex items-start justify-between">
                      <figure className="relative w-16 h-16">
                        <Image
                          src="/assets/profile-pic.webp"
                          layout="fill"
                          alt="Profile Picture"
                          className="rounded-full"
                        />
                      </figure>

                      <button
                        type="button"
                        className="h-10 text-gray-400 bg-white w-fit"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <CgClose
                          className="w-7 h-7 transition duration-75 text-[#84828A] hover:text-[#727076] font-bold"
                          aria-hidden="true"
                        />
                      </button>
                    </article>

                    <article className="flex items-center gap-2">
                      <h1 className="text-lg font-medium tracking-wide text-[#2C2C2C] sm:text-2xl capitalize">
                        {userData?.username}
                      </h1>

                      <div
                        className={`w-fit ${
                          userData?.role === 'super-admin' &&
                          'bg-blue-100 text-blue-600 text-xs font-medium  px-2 py-1 rounded-full'
                        } ${
                          userData?.role === 'admin' &&
                          'bg-yellow-100 text-yellow-600 text-xs font-medium  px-2 py-1 rounded-full'
                        }`}
                      >
                        {userData.role}
                      </div>
                    </article>
                  </div>
                </div>

                <div className="w-full h-full pt-5">
                  <ul
                    role="list"
                    className="flex flex-col justify-between w-full h-full pr-5 font-medium text-m gap-14"
                  >
                    <div className="flex flex-col items-start justify-center gap-3 pl-5">
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
                                              `${subMenu.href}` ===
                                              router.pathname
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
                    </div>

                    <li className="flex items-center justify-start gap-3 active:text-dark-primary-color hover:text-dark-primary-color hover:bg-blue-100 active:bg-blue-200 ml-5 pl-5 rounded-lg py-4 transition duration-75 ease-in-out cursor-pointer text-[#84828A]">
                      <button
                        onClick={() => logout()}
                        className="flex items-center gap-3"
                      >
                        <span>
                          <BiLogOut className="flex-shrink-0 w-6 h-6 transition duration-75" />
                        </span>
                        <p>Keluar</p>
                      </button>
                    </li>
                  </ul>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <nav className="flex items-center justify-between gap-4 px-6 py-4 lg:px-6 sm:px-6 md:px-6 bg-red">
        <div className="items-center justify-between hidden w-full lg:flex">
          <Link href={'/'} passHref>
            <a>
              <div className="relative cursor-pointer w-36 aspect-[4/1.14]">
                <Image
                  src="/assets/profile-pic.webp"
                  layout="fill"
                  alt="Profile Picture"
                />
              </div>
            </a>
          </Link>

          <Popover as="div" className="relative w-fit">
            <Popover.Button className="w-12 h-12 transition duration-75 ease-in-out rounded-full cursor-pointer hover:ring-2 hover:ring-gray-200">
              <Image
                src="/assets/profile-pic.webp"
                layout="fill"
                alt="Profile Picture"
                className="rounded-full"
              />
            </Popover.Button>

            <Popover.Panel className="relative">
              <div className="absolute right-0 mt-2 bg-white divide-y divide-gray-300 rounded-lg shadow w-44 shadow-gray-400">
                <div>
                  <div className="flex flex-col items-start w-full gap-2 px-4 py-3 text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full">
                        <Image
                          src="/assets/profile-pic.webp"
                          layout="fill"
                          alt="Profile Picture"
                          className="rounded-full"
                        />
                      </div>

                      <div className="flex flex-col items-start gap-1">
                        <div className="text-sm font-semibold capitalize">
                          {userData.username}
                        </div>
                        <div
                          className={` ${
                            userData?.role === 'super-admin' &&
                            'bg-blue-100 text-blue-600 text-xs font-medium  px-2 py-1 rounded-full'
                          } ${
                            userData?.role === 'admin-do' &&
                            'bg-yellow-100 text-yellow-600 text-xs font-medium  px-2 py-1 rounded-full'
                          }`}
                        >
                          {userData.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-start gap-3 active:text-dark-primary-color hover:text-dark-primary-color rounded-lg px-4 py-3 transition duration-75 ease-in-out cursor-pointer text-[#84828A]">
                    <button
                      // onClick={() => logout()}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span>
                        <BiLogOut className="flex-shrink-0 w-4 h-4 transition duration-75 ease-in-out" />
                      </span>
                      Keluar
                    </button>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Popover>
        </div>

        <div className="flex items-center w-full py-1 lg:hidden">
          <button
            type="button"
            className="text-gray-400 hover:text-gray-500 lg:hidden"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <CgMenu
              className="flex-shrink-0 w-6 h-6 transition duration-75 text-[#84828A] hover:text-[#727076] font-bold"
              aria-hidden="true"
            />
          </button>

          <div className="flex justify-end w-full">
            <Link href="/">
              <div className="relative w-24 aspect-[4/1.14] rounded-full cursor-pointer">
                <Image
                  src="/assets/tnt-logo.png"
                  color="#4F46E5"
                  layout="fill"
                  alt="Profile Picture"
                />
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </nav>
  );
};

export default Navbar;
