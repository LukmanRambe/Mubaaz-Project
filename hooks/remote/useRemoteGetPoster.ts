import { useMemo } from 'react';

import type { PosterType } from '../../ts/types/main/Poster';
import { useFetch } from '../useFetch';

const useRemoteGetPoster = (id: PosterType['id']) => {
  const url = `/api/posters/${id}`;

  const { data, error, isFetching, refetch } = useFetch('getPoster', url);

  const newData = useMemo<PosterType>(() => data?.data.data, [data?.data]);

  return { data: newData, error, isFetching, refetch };
};

export default useRemoteGetPoster;
