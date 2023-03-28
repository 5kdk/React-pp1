import { useState } from 'react';

const useTheme = () => {
  const [darkTheme, setDarkTheme] = useState(() => {
    const isLocalDark = window.localStorage.getItem('isDark');
    const isWindowDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    return isLocalDark ? JSON.parse(isLocalDark) : isWindowDark;
  });

  const changeTheme = () => {
    setDarkTheme(!darkTheme);
    localStorage.setItem('isDark', darkTheme);
  };

  return [darkTheme, changeTheme];
};

export default useTheme;
