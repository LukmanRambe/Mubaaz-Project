import { useMemo } from 'react';

import { GroupBase } from 'react-select';

import { Option } from '../../ts/types/main/Option';
import { AllUstadzDropdownType } from '../../ts/types/main/Ustadz';
import { useFetch } from '../useFetch';

const useRemoteGetAllUstadzDropdown = () => {
  const url = '/api/ustadzs';

  const { data, error, isFetching, refetch } = useFetch(
    'getAllUstadzDropdown',
    url
  );

  const newData = useMemo<GroupBase<Option<string>>[]>(
    () =>
      data?.data?.data?.data?.map((ustadz: AllUstadzDropdownType) => {
        return {
          label: ustadz.nama_ustadz,
          value: ustadz.id,
        };
      }),
    [data?.data?.data?.data]
  );

  return { data: newData, error, isFetching, refetch };
};

export default useRemoteGetAllUstadzDropdown;
