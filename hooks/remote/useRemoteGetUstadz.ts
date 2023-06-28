import { useMemo } from 'react';

import type { UstadzType } from '../../ts/types/main/Ustadz';
import { useFetch } from '../useFetch';

const useRemoteGetUstadz = (id: UstadzType['id']) => {
  const url = `/api/ustadzs/${id}`;

  const { data, error, isFetching, refetch } = useFetch('getUstadz', url);

  const newData = useMemo<UstadzType>(() => data?.data.data, [data?.data]);

  return { data: newData, error, isFetching, refetch };
};

export default useRemoteGetUstadz;
