import { useState, useEffect } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const localTheme = window.localStorage.getItem('theme');
    const windowTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    return localTheme || windowTheme;
  });

  const changeTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return changeTheme;
};

export default useTheme;
