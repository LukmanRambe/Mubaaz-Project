import { useMemo } from 'react';

import type { RunningTextType } from '../../ts/types/main/RunningText';
import { useFetch } from '../useFetch';

const useRemoteGetRunningText = (id: RunningTextType['id']) => {
  const url = `/api/running-text/${id}`;

  const { data, error, isFetching, refetch } = useFetch('getRunningText', url);

  const newData = useMemo<RunningTextType>(
    () => data?.data.data,
    [data?.data.data]
  );

  return { data: newData, error, isFetching, refetch };
};

export default useRemoteGetRunningText;
