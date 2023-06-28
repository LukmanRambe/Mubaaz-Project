import { useMemo } from 'react';

import moment from 'moment';
import Image from 'next/image';
import {
  AiOutlineClockCircle,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';

import useRemoteGetJadwalShalat from '../../../hooks/remote/slideshow/useRemoteGetJadwalShalat';
import useClock from '../../../hooks/slideshow/useClock';
import useNextShalat from '../../../hooks/slideshow/useNextShalat';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { KajianType } from '../../../ts/types/main/Kajian';
import { generateJadwalShalat } from '../../../utils/generateData';

type SecondSlideProps = {
  kajianData: KajianType;
  isFetchingKajianData: boolean;
  isReady: boolean;
};

const SecondSlide = ({
  kajianData,
  isFetchingKajianData,
  isReady,
}: SecondSlideProps) => {
  const clock = useClock();
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const isTVScreen = useMediaQuery('(min-width: 1920px)');
  const { data: jadwalShalatData } = useRemoteGetJadwalShalat();
  const jadwalShalat = generateJadwalShalat(jadwalShalatData);
  const { nextShalat } = useNextShalat({ jadwalShalat });
  const jadwalShalatFilltered = useMemo(
    () =>
      jadwalShalat?.filter(
        (shalat: { name: string; jam: string }) => shalat.name === nextShalat
      ),
    [jadwalShalat]
  );

  return isLargeScreen ? (
    <section className="flex items-stretch justify-center w-screen h-screen bg-black">
      {isFetchingKajianData && !isReady ? (
        <div className="flex items-center justify-center w-full h-screen">
          <AiOutlineLoading3Quarters className="text-7xl text-primary-100 animate-spin" />
        </div>
      ) : (
        <article
          className={`relative object-cover w-full aspect-video ${
            isTVScreen ? 'min-h-[1081px]' : 'h-screen'
          }`}
        >
          <section className="absolute top-0 z-10 flex w-full left-28">
            <section className="pb-10 text-6xl bg-[#0b3f45] flex items-center justify-center rounded-b-[9rem] min-w-[25rem] h-56 ring drop-shadow-2xl ring-white/75">
              <p
                className={`font-bold text-center text-white ${
                  isTVScreen ? 'text-6xl' : 'lg:text-4xl xl:text-5xl'
                }`}
              >
                {moment(kajianData?.tanggal).format('dddd')}
              </p>
            </section>
          </section>

          <picture>
            <Image
              src={
                kajianData?.poster
                  ? `https://api.mubaaz.id/${kajianData?.poster}`
                  : '/assets/images/mekkah.jpg'
              }
              alt={kajianData?.nama_file_poster}
              layout="fill"
              loading="lazy"
              className={`object-center ${
                isTVScreen ? 'object-cover' : 'object-fil'
              }`}
            />
          </picture>

          <section className="absolute bottom-0 flex items-end justify-between w-full">
            <section className="py-5 text-6xl bg-[#0b3f45] rounded-tr-full pr-12 w-[25rem] ring drop-shadow-2xl ring-white/75">
              <p
                className={`font-bold text-center text-white ${
                  isTVScreen ? 'text-6xl' : 'lg:text-4xl xl:text-5xl'
                }`}
              >
                {moment(clock.date).locale('id').format('HH:mm:ss')}
              </p>
            </section>

            <section className="py-6 text-6xl bg-[#0b3f45] rounded-tl-full pl-[4.5rem] min-w-[35rem] ring drop-shadow-2xl ring-white/75">
              <p
                className={`flex items-center gap-3 font-bold text-center text-white ${
                  isTVScreen ? 'text-6xl' : 'lg:text-4xl xl:text-5xl'
                }`}
              >
                <span>{jadwalShalatFilltered[0]?.name}</span>
                <span>
                  <AiOutlineClockCircle className="flex-shrink-0 w-14 h-14" />
                </span>
                <span>{jadwalShalatFilltered[0]?.jam}</span>
              </p>
            </section>
          </section>
        </article>
      )}
    </section>
  ) : (
    <article className="flex items-center justify-center w-full h-screen">
      <p className="text-sm font-bold text-center sm:text-lg md:text-2xl">
        Harap Buka Website dengan Lebar Layar Minimal 1024px
      </p>
    </article>
  );
};

export default SecondSlide;
