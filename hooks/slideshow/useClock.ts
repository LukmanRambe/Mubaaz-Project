import { useState, useEffect } from 'react';

const useClock = () => {
  const [date, setDate] = useState<Date>(() => new Date() ?? 0);

  const refreshClock = () => {
    setDate(new Date());
  };

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return { date };
};

export default useClock;
