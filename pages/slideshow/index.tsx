import { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';
import Head from 'next/head';
// Import Swiper React components
import SwiperJS, { Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

// Slides Components
import FirstSlide from '../../components/artifacts/Slides/FirstSlide';
import SecondSlide from '../../components/artifacts/Slides/SecondSlide';
import SlideshowLayout from '../../components/main/Layout/SlideshowLayout';
import useRemoteGetAllPoster from '../../hooks/remote/useRemoteGetAllPoster';
import useRemoteGetAllRunningText from '../../hooks/remote/useRemoteGetAllRunningText';
import useRemoteGetKajian from '../../hooks/remote/useRemoteGetKajian';
import useRemoteGetSlideshow from '../../hooks/remote/useRemoteGetSlideshow';
import { NextPageWithLayout } from '../../ts/types/NextPageWithLayout';

const Slideshow: NextPageWithLayout = () => {
  const swiperRef = useRef<SwiperJS>();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [idKajian, setIdKajian] = useState<string>('');
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [status, setStatus] = useState<string>('uncontrolled');
  const [slideInterval, setSlideInterval] = useState<number>(15000);
  const { data: slideshowData, refetch: refetchSlideshow } =
    useRemoteGetSlideshow();
  const { data: allPosterData } = useRemoteGetAllPoster();
  const { data: runningTexts } = useRemoteGetAllRunningText();
  const {
    data: kajianData,
    refetch,
    isFetching: isFetchingKajianData,
  } = useRemoteGetKajian(idKajian);

  useEffect(() => {
    if (slideshowData) {
      slideshowData.data?.map((data) => {
        setStatus(data.status);
        setActiveSlideIndex(data.urutan - 1);
        setIdKajian(data.kajian_id);

        return true;
      });
    }
  }, [slideshowData]);

  useEffect(() => {
    swiperRef.current?.slideToLoop(activeSlideIndex);

    if (status === 'controlled') {
      setSlideInterval(100000000);
    } else {
      setSlideInterval(15000);
    }
  }, [status, activeSlideIndex]);

  useEffect(() => {
    if (idKajian !== '') {
      refetch();
    }
  }, [idKajian]);

  useEffect(() => {
    if (
      slideshowData?.data &&
      allPosterData?.data &&
      runningTexts?.data &&
      kajianData
    )
      setIsReady(true);
    else setIsReady(false);
  }, [slideshowData, allPosterData, runningTexts, kajianData]);

  useEffect(() => {
    if (isReady) swiperRef.current?.autoplay?.start();
  }, [isReady]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchSlideshow();
    }, 1000);

    return () => clearInterval(interval);
  }, [new Date()]);

  return (
    <SlideshowLayout>
      <Head>
        <title>Slideshow</title>
        <meta name="Halaman Slideshow" content="Slideshow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Swiper
        onSwiper={(swiper) => {
          if (swiper) {
            swiperRef.current = swiper;
          }
        }}
        onSlideChange={() =>
          swiperRef.current && setActiveSlideIndex(swiperRef.current.realIndex)
        }
        modules={[EffectFade, Autoplay]}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        noSwiping
        loop
        simulateTouch={false}
        centeredSlides
        preventInteractionOnTransition
        autoplay={{
          delay: slideInterval,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <FirstSlide
            allPosterData={allPosterData}
            runningTexts={runningTexts}
            isReady={isReady}
            activeSlideIndex={activeSlideIndex}
          />
        </SwiperSlide>
        <SwiperSlide>
          <SecondSlide
            kajianData={kajianData}
            isFetchingKajianData={isFetchingKajianData}
            isReady={isReady}
          />
        </SwiperSlide>
      </Swiper>
    </SlideshowLayout>
  );
};

export default dynamic(() => Promise.resolve(Slideshow), { ssr: false });
