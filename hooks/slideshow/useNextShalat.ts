import { useState, useEffect } from 'react';

import moment from 'moment';

import { convertToSeconds } from '../../utils/convertToSeconds';

type JadwalShalatProps = {
  jadwalShalat: {
    name: string;
    jam: string;
  }[];
};

const useNextShalat = ({ jadwalShalat }: JadwalShalatProps) => {
  const [nextShalat, setNextShalat] = useState<string>('');

  useEffect(() => {
    const currentSeconds = convertToSeconds(
      `${moment().hour()}:${moment().minute()}`
    );
    const jadwalSeconds = jadwalShalat.map((jadwal) => {
      return convertToSeconds(jadwal.jam);
    });
    const upcomings = jadwalSeconds.filter((seconds) => {
      return seconds > currentSeconds;
    });
    const nextSeconds = jadwalSeconds.filter((jadwal) =>
      upcomings.includes(jadwal)
    );
    const nextShalat = jadwalShalat.find(
      (jadwal) => convertToSeconds(jadwal.jam) === nextSeconds[0]
    );

    if (nextShalat) {
      setNextShalat(nextShalat.name);
    } else {
      setNextShalat(jadwalShalat[0].name);
    }
  }, [new Date().getTime()]);

  return { nextShalat };
};

export default useNextShalat;
