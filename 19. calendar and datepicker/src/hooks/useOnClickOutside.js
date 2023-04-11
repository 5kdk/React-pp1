import { useEffect, useRef } from 'react';

const useOnClickOutside = handleClick => {
  const containerRef = useRef(null);

  const handleOutsideClick = e => {
    if (containerRef.current?.contains(e.target)) return;

    handleClick();
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);

    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  return containerRef;
};

export default useOnClickOutside;
