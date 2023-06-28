import { useState, useEffect } from 'react';

const useScroll = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [height, setHeight] = useState(0);

  const listenToScroll = () => {
    const heightToHideFrom = 95;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    setHeight(winScroll);

    if (winScroll > heightToHideFrom) {
      if (isVisible) setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);

    return () => window.removeEventListener('scroll', listenToScroll);
  }, [height]);

  return { isVisible };
};

export default useScroll;
