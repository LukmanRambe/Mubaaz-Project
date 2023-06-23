import { useEffect, useRef } from 'react';

// Import Swiper React components
import SwiperJS, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import { AllRunningTextType } from '../../../ts/types/main/RunningText';

type RunningTextSlidePropsType = {
  runningTexts: AllRunningTextType | undefined;
  isReady: boolean;
  activeSlideIndex: number | undefined;
};

const RunningTextSlide = ({
  runningTexts,
  isReady,
  activeSlideIndex,
}: RunningTextSlidePropsType) => {
  const swiperRef = useRef<SwiperJS>();

  useEffect(() => {
    if ((isReady && activeSlideIndex === 0) || activeSlideIndex === undefined) {
      swiperRef.current?.autoplay?.start();
    } else {
      swiperRef.current?.autoplay?.stop();
    }
  }, [isReady, activeSlideIndex]);

  return (
    <div className="w-full h-full flex items-center font-semibold col-span-2 row-start-2 text-[3.4rem] tracking-wide text-white bg-indigo-400">
      <Swiper
        onSwiper={(swiper) => {
          if (swiper) {
            swiperRef.current = swiper;
          }
        }}
        modules={[Autoplay]}
        slidesPerView={1}
        noSwiping
        loop
        simulateTouch={false}
        centeredSlides
        preventInteractionOnTransition
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {runningTexts?.data?.map((text) => (
          <SwiperSlide key={text.id}>
            <p className="text-center">{text.text}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RunningTextSlide;
