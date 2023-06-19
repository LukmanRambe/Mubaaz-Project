import { useMemo } from 'react';

import { AllUstadzType } from '../../ts/types/main/Ustadz';
import { useFetch } from '../useFetch';

const useRemoteGetAllUstadz = (
  dataLimit: number,
  page: number,
  searchInput: string
) => {
  const url = `/api/ustadzs?show=${dataLimit}&page=${page}&search=${searchInput}`;

  const { data, error, isFetching, refetch } = useFetch(
    ['getAllUstadz', { dataLimit, page, searchInput }],
    url
  );

  const newData = useMemo<AllUstadzType | undefined>(() => {
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

export default useRemoteGetAllUstadz;
