import Image from 'next/image';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { KajianType } from '../../../ts/types/main/Kajian';

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
  return (
    <section className="flex items-stretch justify-center w-screen h-screen bg-red-400">
      {isFetchingKajianData && isReady ? (
        <div className="flex items-center justify-center w-full h-full py-24">
          <AiOutlineLoading3Quarters className="text-7xl text-primary-100 animate-spin" />
        </div>
      ) : (
        <picture className="relative object-cover min-h-[1081px] aspect-video">
          <Image
            src={`https://api.mubaaz.id/${kajianData?.poster}`}
            alt={kajianData?.nama_file_poster}
            layout="fill"
            loading="lazy"
            className="object-cover"
          />
        </picture>
      )}
    </section>
  );
};

export default SecondSlide;
