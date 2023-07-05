import { useMemo } from 'react';

import type { KritikDanSaranType } from '../../ts/types/main/KritikDanSaran';
import { useFetch } from '../useFetch';

const useRemoteGetKritikDanSaran = (id: KritikDanSaranType['id']) => {
  const url = `/api/critics/${id}`;

  const { data, error, isFetching, refetch } = useFetch(
    'getKritikDanSaran',
    url
  );
  console.log(data);

  const newData = useMemo<KritikDanSaranType>(
    () => data?.data.data,
    [data?.data.data]
  );

  return { data: newData, error, isFetching, refetch };
};

export default useRemoteGetKritikDanSaran;
