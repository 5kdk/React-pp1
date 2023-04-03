import { useEffect, useRef } from 'react';

const useAutoFocus = () => {
  const focusRef = useRef();

  useEffect(() => {
    focusRef.current?.focus();
  });

  return focusRef;
};

export default useAutoFocus;
