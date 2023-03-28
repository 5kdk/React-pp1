import { useEffect } from 'react';

const useTheme = () => {
  let theme = (() => {
    const localTheme = window.localStorage.getItem('theme');
    const windowTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    return localTheme || windowTheme;
  })();

  const changeTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    theme = nextTheme;
    localStorage.setItem('theme', nextTheme);
    document.body.dataset.theme = theme;
  };

  useEffect(() => {
    document.body.dataset.theme = theme;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return changeTheme;
};

export default useTheme;
