import { useMemo } from 'react';

import moment from 'moment';

import { JadwalShalatType } from '../../../ts/types/slideshow/JadwalShalat';
import { useFetch } from '../../useFetch';

const useRemoteGetJadwalShalat = () => {
  moment.locale('id');
  const date = moment().date();
  const month = moment().month() + 1;
  const year = moment().year();

  const url = `https://api.myquran.com/v1/sholat/jadwal/0204/${year}/${month}/${date}`;

  const { data, error, isFetching, refetch } = useFetch('getJadwalShalat', url);
  const newData = useMemo<JadwalShalatType | undefined>(() => {
    return {
      data: data?.data.data,
    };
  }, [data?.data]);

  return { data: newData, error, isFetching, refetch };
};

export default useRemoteGetJadwalShalat;
