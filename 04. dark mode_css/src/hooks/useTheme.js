import { useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const localTheme = window.localStorage.getItem('theme');
    const windowTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    return localTheme || windowTheme;
  });

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    localStorage.setItem('theme', theme);
  };

  return [theme, changeTheme];
};

export default useTheme;
