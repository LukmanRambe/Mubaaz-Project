import { useEffect, useState } from 'react';

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const matchQueryList = window.matchMedia(query);

    const handleChange = (e: {
      matches: boolean | ((prevState: boolean) => boolean);
    }) => {
      setMatches(e.matches);
    };

    matchQueryList.addEventListener('change', handleChange);

    return () => {
      matchQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  useEffect(() => {
    const matchQueryList = window.matchMedia(query);

    if (matchQueryList) {
      setMatches(matchQueryList.matches);
    }
  }, []);
  return matches;
};

export default useMediaQuery;
