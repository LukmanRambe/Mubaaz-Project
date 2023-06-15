import { useMemo } from 'react';

import type { KhutbahType } from '../../ts/types/main/Khutbah';
import { useFetch } from '../useFetch';

const useRemoteGetKhutbah = (id: KhutbahType['id']) => {
  const url = `/api/khutbahs/${id}`;

  const { data, error, isFetching, refetch } = useFetch('getKhutbah', url);

  const newData = useMemo<KhutbahType>(() => data?.data.data, [data?.data]);

  return { data: newData, error, isFetching, refetch };
};

export default useRemoteGetKhutbah;
