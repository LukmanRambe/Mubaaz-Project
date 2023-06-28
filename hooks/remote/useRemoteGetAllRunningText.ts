import { useMemo } from 'react';

import type { AllRunningTextType } from '../../ts/types/main/RunningText';
import { useFetch } from '../useFetch';

const useRemoteGetAllRunningText = () => {
  const url = `/api/running-text`;

  const { data, error, isFetching, refetch } = useFetch(
    'getAllRunningText',
    url
  );

  const newData = useMemo<AllRunningTextType | undefined>(() => {
    return {
      data: data?.data.data,
    };
  }, [data?.data.data]);

  return { data: newData, error, isFetching, refetch };
};

export default useRemoteGetAllRunningText;
