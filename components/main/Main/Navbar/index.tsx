import React, { useMemo, useState, useEffect, Fragment } from 'react';

import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import moment from 'moment';
import momentHijri from 'moment-hijri';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { CgClose, CgMenu } from 'react-icons/cg';
import { HiChevronUp } from 'react-icons/hi';

import useScroll from '../../../../hooks/main/useScroll';
import useRemoteGetJadwalShalat from '../../../../hooks/remote/slideshow/useRemoteGetJadwalShalat';
import useClock from '../../../../hooks/slideshow/useClock';
import {
  generateJadwalShalat,
  generateNavbarMenus,
} from '../../../../utils/generateData';

const Navbar = () => {
  const router = useRouter();
  const clock = useClock();
  const { isVisible } = useScroll();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const navbarMenus = useMemo(() => generateNavbarMenus(), []);
  const { data: jadwalShalatData } = useRemoteGetJadwalShalat();
  const jadwalShalat = useMemo(
    () => generateJadwalShalat(jadwalShalatData),
    [jadwalShalatData]
  );

  useEffect(() => {
    setMobileFiltersOpen(false);
  }, [router.pathname]);

  return (
    <header className="fixed top-0 z-10 flex flex-col w-full">
      {router.pathname !== '/' && (
        <>
          {isVisible && (
            <article className="items-center justify-between hidden w-full p-5 lg:px-12 xl:px-24 2xl:px-28 sm:px-6 bg-neutral-50 md:flex">
              <section className="w-fit">
                <h1 className="text-3xl font-bold tracking-wider uppercase text-primary-180 w-fit">
                  Mubaaz
                </h1>
              </section>

              <section className="flex items-center justify-between w-fit">
                <section className="flex flex-col gap-2">
                  <section className="flex items-center justify-between text-base">
                    <section className="font-semibold text-primary-160">
                      <span>
                        {moment().locale('id').format('DD MMMM YYYY')} M /{' '}
                      </span>
                      <span>
                        {momentHijri()
                          .locale('ar-sa')
                          .format('iDD iMMMM iYYYY')}{' '}
                        H
                      </span>
                    </section>

                    <section className="flex items-center self-end gap-2 text-primary-160">
                      <span>
                        <AiOutlineClockCircle className="flex-shrink-0 w-5 h-5" />
                      </span>

                      <p className="w-[4rem] font-semibold">
                        {moment(clock.date).locale('id').format('HH:mm:ss')}
                      </p>
                    </section>
                  </section>

                  <section className="flex overflow-hidden divide-x-2 rounded-md shadow-md">
                    {jadwalShalat?.map(
                      (shalat: { name: string; jam: string }) => (
                        <article
                          key={shalat.name}
                          className="flex flex-col w-full px-5 py-1 font-semibold text-center odd:bg-white even:bg-primary-40"
                        >
                          <span className="text-primary-160">
                            {shalat.name}
                          </span>
                          <span className="text-primary-180">{shalat.jam}</span>
                        </article>
                      )
                    )}
                  </section>
                </section>
              </section>
            </article>
          )}
        </>
      )}

      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="absolute z-50 lg:hidden"
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
              <Dialog.Panel className="relative flex flex-col w-[80%] h-full max-w-xs py-2 pb-8 mr-auto overflow-y-auto scrollbar-hide bg-primary-180 shadow-xl">
                <div className="flex items-start justify-between w-full px-5 pt-3">
                  <div className="flex flex-col w-full gap-2">
                    <article className="flex items-start justify-between">
                      <h1 className="text-3xl font-bold tracking-wider text-white uppercase w-fit">
                        Mubaaz
                      </h1>

                      <button
                        type="button"
                        className="h-10 text-white w-fit"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <CgClose
                          className="w-6 h-6 font-bold text-white transition duration-75"
                          aria-hidden="true"
                        />
                      </button>
                    </article>
                  </div>
                </div>

                <div className="w-full h-full pt-5">
                  <ul
                    role="list"
                    className="flex flex-col justify-between w-full h-full pr-5 font-medium text-m gap-14"
                  >
                    <div className="flex flex-col items-start justify-center gap-3 pl-5">
                      {navbarMenus.map((menu) => (
                        <li key={menu.href} className="w-full">
                          {menu.subMenu ? (
                            <Disclosure key={menu.menuName + menu.href}>
                              {({ open }) => (
                                <>
                                  <Disclosure.Button className="tracking-wider flex items-center text-white justify-between transition min-h-[44px] duration-100 ease-in-out cursor-pointer focus:underline hover:underline active:underline underline-offset-[6px]">
                                    <span>{menu.menuName}</span>
                                    <span>
                                      <HiChevronUp
                                        className={`${
                                          open ? 'rotate-180 transform' : ''
                                        } h-5 w-5`}
                                      />
                                    </span>
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
                                        <div
                                          key={subMenu.name}
                                          className="p-3 text-white transition duration-75 ease-in-out cursor-pointer min-w-fit focus:outline-none"
                                          onClick={() =>
                                            setMobileFiltersOpen(false)
                                          }
                                        >
                                          <Link href={subMenu.href} passHref>
                                            <a className="flex items-center justify-start gap-3">
                                              {subMenu.name}
                                            </a>
                                          </Link>
                                        </div>
                                      ))}
                                    </Disclosure.Panel>
                                  </Transition>
                                </>
                              )}
                            </Disclosure>
                          ) : (
                            <article>
                              <Link href={menu.href} passHref>
                                <a
                                  className={`active:underline flex items-center hover:underline transition duration-100 ease-in-out cursor-pointer min-h-[44px] text-white tracking-wider focus:underline border-transparent underline-offset-[6px] ${
                                    `${menu.href}` === router.pathname &&
                                    'underline'
                                  }`}
                                >
                                  {menu.menuName}
                                </a>
                              </Link>
                            </article>
                          )}
                        </li>
                      ))}
                    </div>
                  </ul>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div
        className={`flex items-center justify-between w-full px-3 sm:px-6 lg:px-12 xl:px-24 2xl:px-28 py-3 font-semibold ${
          isVisible && router.pathname === '/'
            ? 'bg-transparent justify-start xl:justify-between'
            : 'bg-primary-180 justify-start'
        } ${mobileFiltersOpen ? 'z-50' : 'z-0'}`}
      >
        <button
          type="button"
          className="text-white w-fit lg:hidden"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <CgMenu
            className="flex-shrink-0 w-6 h-6 font-bold text-white transition duration-75"
            aria-hidden="true"
          />
        </button>

        {router.pathname === '/' && (
          <section className="w-full">
            <h1 className="w-full text-3xl font-semibold text-white lg:text-start text-end">
              Mubaaz
            </h1>
          </section>
        )}

        <nav className="hidden gap-10 lg:flex">
          {navbarMenus.map((menu) => (
            <React.Fragment key={menu.menuName}>
              {menu.subMenu ? (
                <Popover
                  as="article"
                  className="block w-fit gap-12 text-base tracking-wider text-white min-h-[44px]"
                >
                  {({ open, close }) => (
                    <>
                      <Popover.Button className="tracking-wider flex items-center justify-between transition min-h-[44px] duration-100 ease-in-out cursor-pointer focus:underline hover:underline active:underline underline-offset-[6px]">
                        <span>{menu.menuName}</span>
                        <span>
                          <HiChevronUp
                            className={`${
                              open ? 'rotate-180 transform' : ''
                            } h-5 w-5`}
                          />
                        </span>
                      </Popover.Button>

                      <Transition
                        show={open}
                        enter="transition-opacity duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Popover.Panel className="absolute flex flex-col justify-center mt-1 overflow-hidden bg-white divide-y rounded-md shadow-xl w-fit">
                          {menu.subMenu?.map((subMenu) => (
                            <div
                              key={subMenu.name}
                              className="transition duration-75 p-3 ease-in-out cursor-pointer active:text-primary-160 hover:text-primary-160 active:bg-primary-60 min-w-fit focus:outline-none hover:bg-primary-40 text-[#84828A]"
                              onClick={close}
                            >
                              <Link href={subMenu.href} passHref>
                                <a
                                  className={`flex items-center justify-start gap-3 ${
                                    `${subMenu.href}` === router.pathname
                                      ? 'text-primary-160 focus-visible:text-primary-160'
                                      : 'focus-visible:text-primary-160'
                                  }`}
                                >
                                  {subMenu.name}
                                </a>
                              </Link>
                            </div>
                          ))}
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              ) : (
                <article>
                  <Link href={menu.href} passHref>
                    <a
                      className={`active:underline flex items-center hover:underline transition duration-100 ease-in-out cursor-pointer min-h-[44px] text-white tracking-wider focus:underline border-transparent underline-offset-[6px] ${
                        `${menu.href}` === router.pathname && 'underline'
                      }`}
                    >
                      {menu.menuName}
                    </a>
                  </Link>
                </article>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
