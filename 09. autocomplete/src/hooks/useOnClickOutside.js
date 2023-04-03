import { useEffect } from 'react';

const useOnClickOutside = clickHandler => {
  useEffect(() => {
    window.addEventListener('click', clickHandler);

    return () => window.removeEventListener('click', clickHandler);
  }, []);
};

export default useOnClickOutside;
