import { useMemo } from 'react';

import type { AllPosterType } from '../../ts/types/main/Poster';
import { useFetch } from '../useFetch';

const useRemoteGetAllPoster = () => {
  const url = `/api/posters`;

  const { data, error, isFetching, refetch } = useFetch('getAllPoster', url);

  const newData = useMemo<AllPosterType | undefined>(() => {
    return {
      data: data?.data.data,
    };
  }, [data?.data]);

  return { data: newData, error, isFetching, refetch };
};

export default useRemoteGetAllPoster;
