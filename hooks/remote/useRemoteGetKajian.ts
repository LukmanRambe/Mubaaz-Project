import { useMemo } from 'react';

import type { KajianType } from '../../ts/types/main/Kajian';
import { useFetch } from '../useFetch';

const useRemoteGetKajian = (id: KajianType['id']) => {
  const url = `/api/kajians/${id}`;

  const { data, error, isFetching, refetch } = useFetch('getKajian', url);

  const newData = useMemo<KajianType>(() => data?.data.data, [data?.data]);

  return { data: newData, error, isFetching, refetch };
};

export default useRemoteGetKajian;
