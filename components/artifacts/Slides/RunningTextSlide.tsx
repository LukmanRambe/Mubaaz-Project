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
  isTVScreen: boolean;
  activeSlideIndex: number | undefined;
};

const RunningTextSlide = ({
  runningTexts,
  isReady,
  isTVScreen,
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
    <div
      className={`w-full h-full flex items-center font-semibold col-span-2 row-start-2 tracking-wide text-[#e3cf19] bg-[#051b1e] ${
        isTVScreen ? 'text-5xl' : 'lg:text-2xl xl:text-3xl'
      }`}
    >
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
            <p className="text-center">
              {text.text ?? 'Silakan Tambah Running Text Melalui Dashboard'}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RunningTextSlide;
