// import Cookies from 'js-cookie';
import { useQuery } from 'react-query';

import { fetchAxios } from '../libs/axios';

export const useFetch = (queryKey: string | [string, {}], endpoint: string) => {
  const { data, error, refetch, isFetching } = useQuery(
    queryKey,
    () =>
      fetchAxios.get(endpoint).catch((err) => {
        throw err;
      }),
    { keepPreviousData: true, staleTime: 3600000 }
  );

  return { data, error, refetch, isFetching };
};
