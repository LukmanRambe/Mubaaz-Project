import { useMemo } from 'react';

import type { AllKritikDanSaranType } from '../../ts/types/main/KritikDanSaran';
import { useFetch } from '../useFetch';

const useRemoteGetAllKritikDanSaran = (
  dataLimit: number,
  page: number,
  searchInput: string
) => {
  const url = `/api/critics?show=${dataLimit}&page=${page}&search=${searchInput}`;

  const { data, error, isFetching, refetch } = useFetch(
    'getAllKritikDanSaran',
    url
  );

  const newData = useMemo<AllKritikDanSaranType | undefined>(() => {
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

export default useRemoteGetAllKritikDanSaran;
