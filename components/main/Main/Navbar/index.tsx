import React, { useMemo } from 'react';

import { Popover, Transition } from '@headlessui/react';
import moment from 'moment';
import momentHijri from 'moment-hijri';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineClockCircle } from 'react-icons/ai';
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
  const navbarMenus = useMemo(() => generateNavbarMenus(), []);
  const { data: jadwalShalatData } = useRemoteGetJadwalShalat();
  const jadwalShalat = useMemo(
    () => generateJadwalShalat(jadwalShalatData),
    [jadwalShalatData]
  );

  return (
    <header className="fixed top-0 z-10 flex flex-col w-full">
      {router.pathname !== '/' && (
        <>
          {isVisible && (
            <article className="items-center justify-between hidden w-full p-5 lg:px-12 xl:px-24 2xl:px-28 sm:px-6 bg-neutral-50 md:flex">
              <section className="w-fit">
                <h1 className="text-3xl font-semibold text-primary-180 w-fit">
                  Logo Mubaaz
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

      <nav
        className={`flex items-center w-full gap-10 px-3 sm:px-6 lg:px-12 xl:px-24 2xl:px-28 py-3 font-semibold ${
          isVisible && router.pathname === '/'
            ? 'bg-transparent justify-start xl:justify-between'
            : 'bg-primary-180 justify-start'
        }`}
      >
        {router.pathname === '/' && (
          <section className="hidden w-full md:block">
            <h1 className="text-3xl font-semibold text-white w-fit">
              Logo Mubaaz
            </h1>
          </section>
        )}

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
                      <Popover.Panel className="absolute flex flex-col justify-center mt-1 bg-white divide-y rounded-md shadow-xl w-fit">
                        {menu.subMenu?.map((subMenu) => (
                          <div
                            key={subMenu.name}
                            className="p-3"
                            onClick={close}
                          >
                            <Link href={subMenu.href} passHref>
                              <a
                                className={`w-full active:text-primary-160 hover:text-primary-160 min-h-[44px] transition duration-75 ease-in-out cursor-pointer text-sm focus:outline-none ${
                                  `${subMenu.href}` === router.pathname
                                    ? 'text-primary-160 focus-visible:text-primary-160'
                                    : 'text-[#84828A] focus-visible:text-primary-160'
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
    </header>
  );
};

export default Navbar;
