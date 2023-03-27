import { useState, useEffect } from 'react';
import { throttle } from 'lodash';
import { SCROLL_DELAY } from '../constants/constants';

const useScroll = boundary => {
  const [isPassed, setIsPassed] = useState(false);

  useEffect(() => {
    const scrollHandler = throttle(() => {
      setIsPassed(window.pageYOffset >= boundary);
    }, SCROLL_DELAY);

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [boundary]);

  return isPassed;
};

export default useScroll;
