import { useMemo } from 'react';

import type { DonasiType } from '../../ts/types/main/Donasi';
import { useFetch } from '../useFetch';

const useRemoteGetDonasi = (id: DonasiType['id']) => {
  const url = `/api/donations/${id}`;

  const { data, error, isFetching, refetch } = useFetch('getDonasi', url);

  const newData = useMemo<DonasiType>(() => data?.data.data, [data?.data.data]);

  return { data: newData, error, isFetching, refetch };
};

export default useRemoteGetDonasi;
