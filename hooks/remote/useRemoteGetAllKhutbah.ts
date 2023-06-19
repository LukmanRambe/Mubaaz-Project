import { useMemo } from 'react';

import type { AllKhutbahType } from '../../ts/types/main/Khutbah';
import { useFetch } from '../useFetch';

const useRemoteGetAllKhutbah = (
  dataLimit: number,
  page: number,
  searchInput: string
) => {
  const url = `/api/khutbahs?show=${dataLimit}&page=${page}&search=${searchInput}`;

  const { data, error, isFetching, refetch } = useFetch(
    ['getAllKhutbah', { dataLimit, page, searchInput }],
    url
  );

  const newData = useMemo<AllKhutbahType | undefined>(() => {
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

export default useRemoteGetAllKhutbah;
