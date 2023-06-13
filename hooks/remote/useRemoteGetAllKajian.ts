import { useMemo } from 'react';

import type { AllKajianType } from '../../ts/types/main/Kajian';
import { useFetch } from '../useFetch';

const useRemoteGetAllKajian = (
  dataLimit: number,
  page: number,
  searchInput: string
) => {
  const url = `/api/kajians?show=${dataLimit}&page=${page}&search=${searchInput}`;

  const { data, error, isFetching, refetch } = useFetch(
    ['getAllKajian', { dataLimit, page, searchInput }],
    url
  );

  const newData = useMemo<AllKajianType | undefined>(() => {
    return {
      data: data?.data.payload,
      pagination: data?.data.meta,
    };
  }, [data?.data]);

  return { data: newData, error, isFetching, refetch };
};

export default useRemoteGetAllKajian;
