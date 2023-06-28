// import Cookies from 'js-cookie';
import { useQuery } from 'react-query';

import { fetchAxios } from '../libs/axios';

export const useFetch = (queryKey: string | [string, {}], endpoint: string) => {
  const { data, error, refetch, isFetching } = useQuery(
    queryKey,
    async () => fetchAxios.get(endpoint),
    {
      keepPreviousData: true,
      staleTime: 3600000,
      onSuccess: async (response) => {
        return response;
      },
      onError: async (error) => {
        console.log(error);
      },
    }
  );

  return { data, error, refetch, isFetching };
};
