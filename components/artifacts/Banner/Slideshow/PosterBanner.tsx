import { useEffect, useRef } from 'react';

import Image from 'next/image';
// Import Swiper React components
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
  activeSlideIndex: number | undefined;
};

const PosterBanner = ({
  allPosterData,
  isReady,
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
      className="w-full h-full overflow-hidden bg-green-300 rounded-md"
    >
      {allPosterData?.data?.map((poster) => (
        <SwiperSlide
          key={poster.id}
          className="relative object-cover w-full h-full"
        >
          <Image
            src={`https://api.mubaaz.id/${poster.gambar}`}
            alt={`${poster.nama_file_poster}`}
            layout="fill"
            loading="lazy"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PosterBanner;
