import { useMemo } from 'react';

import type { SlideshowType } from '../../ts/types/main/Slideshow';
import { useFetch } from '../useFetch';

const useRemoteGetSlideshow = () => {
  const url = `/api/slideshows`;

  const { data, error, isFetching, refetch } = useFetch('getSlideshow', url);

  const newData = useMemo<SlideshowType | undefined>(() => {
    return {
      data: data?.data.data,
    };
  }, [data?.data]);

  return { data: newData, error, isFetching, refetch };
};

export default useRemoteGetSlideshow;
