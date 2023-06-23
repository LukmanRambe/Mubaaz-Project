import { useMemo } from 'react';

import { GroupBase } from 'react-select';

import { AllKajianDropdownType } from '../../ts/types/main/Kajian';
import { Option } from '../../ts/types/main/Option';
import { useFetch } from '../useFetch';

const useRemoteGetAllKajianDropdown = () => {
  const url = '/api/kajians';

  const { data, error, isFetching, refetch } = useFetch(
    'getAllKajianDropdown',
    url
  );

  const newData = useMemo<GroupBase<Option<string>>[]>(
    () =>
      data?.data?.data?.data?.map((kajian: AllKajianDropdownType) => {
        return {
          label: kajian.judul,
          value: kajian.id,
        };
      }),
    [data?.data?.data?.data]
  );

  return { data: newData, error, isFetching, refetch };
};

export default useRemoteGetAllKajianDropdown;
