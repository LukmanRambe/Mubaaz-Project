import moment from 'moment';
import momentHijri from 'moment-hijri';
import { BsGlobe } from 'react-icons/bs';
import { GrInstagram } from 'react-icons/gr';

import RunningTextSlide from './RunningTextSlide';
import useClock from '../../../hooks/slideshow/useClock';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { AllPosterType } from '../../../ts/types/main/Poster';
import { AllRunningTextType } from '../../../ts/types/main/RunningText';
import PosterBanner from '../Banner/Slideshow/PosterBanner';
import JadwalShalat from '../Card/JadwalShalatCard.tsx';

type FirstSlidePropsType = {
  allPosterData: AllPosterType | undefined;
  runningTexts: AllRunningTextType | undefined;
  isReady: boolean;
  isFetchingPosterBanner: boolean;
  activeSlideIndex: number | undefined;
};

const FirstSlide = ({
  allPosterData,
  runningTexts,
  isReady,
  isFetchingPosterBanner,
  activeSlideIndex,
}: FirstSlidePropsType) => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const isTVScreen = useMediaQuery('(min-width: 1920px');
  const clock = useClock();

  return isLargeScreen ? (
    <article
      className={`grid items-stretch justify-between w-screen h-screen bg-[#153B44] ${
        isTVScreen
          ? 'grid-cols-[70%_minmax(30%,_1fr)] grid-rows-[90%_minmax(10%,_1fr)]'
          : 'grid-cols-[65%_minmax(35%,_1fr)] grid-rows-[92%_minmax(8%,_1fr)]'
      }`}
    >
      <section className="flex flex-col w-full h-full grid-rows-3 row-span-1 row-start-1 bg-[#1c6571]">
        <section className={`flex w-full gap-4 ${isTVScreen ? 'p-5' : 'p-3'}`}>
          <article>
            <h1
              className={`font-bold text-white ${
                isTVScreen ? 'text-5xl mb-3' : 'lg:text-xl xl:text-2xl mb-1'
              }`}
            >
              Masjid Umar bin Abdul Aziz
            </h1>

            <section
              className={`flex flex-col font-semibold text-white ${
                isTVScreen ? 'text-2xl gap-1' : 'lg:text-sm xl:text-base gap-0'
              }`}
            >
              <p>Jalan Pusaka, Pasar 10, Tembung</p>
              <div className="flex items-center gap-3 text-yellow-400">
                <div className="flex items-center gap-1">
                  <span className="h-5">
                    <GrInstagram
                      className={`flex-shrink-0 ${
                        isTVScreen ? 'w-6 h-6' : 'w-4 h-4'
                      }`}
                    />
                  </span>
                  <p>: mubaaz_official</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-5">
                    <BsGlobe
                      className={`flex-shrink-0 ${
                        isTVScreen ? 'w-6 h-6' : 'w-4 h-4'
                      }`}
                    />
                  </span>
                  <p>: mubaaz.id</p>
                </div>
              </div>
            </section>
          </article>
        </section>

        <section
          className={`flex items-center justify-between w-full text-white bg-[#2790a0]  ${
            isTVScreen ? 'p-5' : 'p-2 px-3'
          }`}
        >
          <p
            className={`font-semibold ${
              isTVScreen ? 'text-3xl' : 'lg:text-base xl:text-lg'
            } `}
          >
            {moment().locale('id').format('dddd')}
          </p>
          <p
            className={`font-semibold ${
              isTVScreen ? 'text-3xl' : 'lg:text-base xl:text-lg'
            } `}
          >
            {moment().locale('id').format('D MMMM YYYY')}
          </p>
          <p
            className={`font-semibold ${
              isTVScreen ? 'text-3xl' : 'lg:text-base xl:text-lg'
            } `}
          >
            {momentHijri().locale('ar-sa').format('iDD iMMMM iYYYY')} H
          </p>
        </section>

        <section
          className={`w-full h-full bg-[#fff16f] ${
            isTVScreen ? 'p-7 px-24' : 'p-5 lg:px-12 xl:px-16'
          }`}
        >
          <PosterBanner
            allPosterData={allPosterData}
            isReady={isReady}
            activeSlideIndex={activeSlideIndex}
            isFetchingPosterBanner={isFetchingPosterBanner}
          />
        </section>
      </section>

      <section className="flex-col w-full p-10 bg-[#17515b]">
        <section
          className={`${isTVScreen ? 'mb-16' : 'lg:mb-7 xl:mb-10'}`}
          suppressHydrationWarning={true}
        >
          <p
            className={`font-bold text-center text-white ${
              isTVScreen ? 'text-8xl' : 'lg:text-4xl xl:text-5xl'
            }`}
          >
            {moment(clock.date).locale('id').format('HH:mm:ss')}
          </p>
        </section>

        <JadwalShalat isTVScreen={isTVScreen} />
      </section>

      <RunningTextSlide
        runningTexts={runningTexts}
        isReady={isReady}
        isTVScreen={isTVScreen}
        activeSlideIndex={activeSlideIndex}
      />
    </article>
  ) : (
    <article className="flex items-center justify-center w-full h-screen">
      <p className="text-sm font-bold text-center sm:text-lg md:text-2xl">
        Harap Buka Website dengan Lebar Layar Minimal 1024px
      </p>
    </article>
  );
};

export default FirstSlide;
