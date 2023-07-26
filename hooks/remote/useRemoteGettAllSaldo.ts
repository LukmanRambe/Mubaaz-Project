import { useMemo } from 'react';

import type { AllSaldoType } from '../../ts/types/main/Saldo';
import { useFetch } from '../useFetch';

const useRemoteGetAllSaldo = () => {
  // const url = `/api/result?show=${dataLimit}&page=${page}&search=${searchInput}`;
  const url = '/api/result';

  const { data, error, isFetching, refetch } = useFetch('getAllSaldo', url);

  const newData = useMemo<AllSaldoType | undefined>(() => {
    return {
      data: data?.data.data,
    };
  }, [data?.data.data]);

  return { data: newData, error, isFetching, refetch };
};

export default useRemoteGetAllSaldo;
