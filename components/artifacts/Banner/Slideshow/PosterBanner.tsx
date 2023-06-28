import { useEffect, useRef } from 'react';

import Image from 'next/image';
// Import Swiper React components
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import SwiperJS, { Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import { AllPosterType } from '../../../../ts/types/main/Poster';

type PosterBannerPropsType = {
  allPosterData: AllPosterType | undefined;
  isReady: boolean;
  isFetchingPosterBanner: boolean;
  activeSlideIndex: number | undefined;
};

const PosterBanner = ({
  allPosterData,
  isReady,
  isFetchingPosterBanner,
  activeSlideIndex,
}: PosterBannerPropsType) => {
  const swiperRef = useRef<SwiperJS>();

  useEffect(() => {
    if ((isReady && activeSlideIndex === 0) || activeSlideIndex === undefined) {
      swiperRef.current?.autoplay?.start();
    } else {
      swiperRef.current?.autoplay?.stop();
    }
  }, [isReady, activeSlideIndex]);

  return (
    <Swiper
      onSwiper={(swiper) => {
        if (swiper) {
          swiperRef.current = swiper;
        }
      }}
      modules={[Autoplay, EffectFade]}
      slidesPerView={1}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      noSwiping
      loop
      simulateTouch={false}
      centeredSlides
      preventInteractionOnTransition
      autoplay={{
        delay: 7000,
        disableOnInteraction: false,
      }}
      className="w-full h-full overflow-hidden rounded-2xl"
    >
      {allPosterData?.data?.map((poster) => (
        <SwiperSlide
          key={poster.id}
          className="relative object-cover w-full h-full"
        >
          {isFetchingPosterBanner ? (
            <div className="flex items-center justify-center w-full py-6 h-96">
              <AiOutlineLoading3Quarters className="text-7xl text-primary-100 animate-spin" />
            </div>
          ) : (
            <Image
              src={`${
                poster.gambar
                  ? `https://api.mubaaz.id/${poster.gambar}`
                  : '/assets/images/mubaaz-banner.jpg'
              }`}
              alt={`${poster.nama_file_poster}`}
              layout="fill"
              loading="lazy"
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PosterBanner;
