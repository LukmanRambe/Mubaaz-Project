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
      data: data?.data.data.data,
      pagination: {
        currentPage: data?.data.data.current_page,
        lastPage: data?.data.data.last_page,
        perPage: data?.data.data.per_page,
        total: data?.data.data.total,
      },
    };
  }, [data?.data.data]);

  return { data: newData, error, isFetching, refetch };
};

export default useRemoteGetAllKajian;
