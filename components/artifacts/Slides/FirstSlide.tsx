import moment from 'moment';
import momentHijri from 'moment-hijri';
import { GrInstagram } from 'react-icons/gr';

import RunningTextSlide from './RunningTextSlide';
import useClock from '../../../hooks/slideshow/useClock';
import { AllPosterType } from '../../../ts/types/main/Poster';
import { AllRunningTextType } from '../../../ts/types/main/RunningText';
import PosterBanner from '../Banner/Slideshow/PosterBanner';
import JadwalShalat from '../Card/JadwalShalatCard.tsx';

type FirstSlidePropsType = {
  allPosterData: AllPosterType | undefined;
  runningTexts: AllRunningTextType | undefined;
  isReady: boolean;
  activeSlideIndex: number | undefined;
};

const FirstSlide = ({
  allPosterData,
  runningTexts,
  isReady,
  activeSlideIndex,
}: FirstSlidePropsType) => {
  const clock = useClock();

  return (
    <article className="grid items-stretch justify-between w-screen h-screen grid-cols-[70%_minmax(30%,_1fr)] grid-rows-[90%_minmax(10%,_1fr)] bg-blue-400">
      <section className="flex flex-col w-full h-full grid-rows-3 row-span-1 row-start-1 bg-red-400">
        <section className="flex w-full gap-4 p-5">
          <p className="text-4xl">Logo Masjid</p>
          <article>
            <h1 className="mb-3 text-4xl font-extrabold">
              Masjid Umar bin Abdul Aziz
            </h1>
            <section className="flex flex-col gap-1 text-3xl font-bold">
              <p>Jalan Pusaka, Pasar 10, Tembung</p>
              <p className="flex items-center gap-2">
                <span>
                  <GrInstagram className="flex-shrink-0 w-8 h-8" />
                </span>
                : mubaaz_official
              </p>
            </section>
          </article>
        </section>

        <section className="flex items-center justify-between w-full p-5 bg-green-200">
          <p className="text-3xl font-semibold">
            {moment().locale('id').format('dddd')}
          </p>
          <p className="text-3xl font-semibold">
            {moment().locale('id').format('D MMMM YYYY')}
          </p>
          <p className="text-3xl font-semibold">
            {momentHijri().locale('ar-sa').format('iDD iMMMM iYYYY')} H
          </p>
        </section>

        <section className="w-full h-full bg-yellow-400 p-7">
          <PosterBanner
            allPosterData={allPosterData}
            isReady={isReady}
            activeSlideIndex={activeSlideIndex}
          />
        </section>
      </section>

      <section className="flex-col w-full p-10 bg-blue-400">
        <section className="mb-10" suppressHydrationWarning={true}>
          <p className="font-bold text-center text-7xl">
            {moment(clock.date).locale('id').format('HH:mm:ss')}
          </p>
        </section>

        <JadwalShalat />
      </section>

      <RunningTextSlide
        runningTexts={runningTexts}
        isReady={isReady}
        activeSlideIndex={activeSlideIndex}
      />
    </article>
  );
};

export default FirstSlide;
