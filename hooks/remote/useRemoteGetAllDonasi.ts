import { useMemo } from 'react';

import type { AllDonasiType } from '../../ts/types/main/Donasi';
import { useFetch } from '../useFetch';

const useRemoteGetAllDonasi = (
  dataLimit: number,
  page: number,
  searchInput: string
) => {
  const url = `/api/donations?show=${dataLimit}&page=${page}&search=${searchInput}`;

  const { data, error, isFetching, refetch } = useFetch('getAllDonasi', url);

  const newData = useMemo<AllDonasiType | undefined>(() => {
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

export default useRemoteGetAllDonasi;
