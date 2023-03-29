import { useState, useEffect } from 'react';
import fetchTabsData from '../utils/fetchTabData';

const useTabs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await fetchTabsData();
        setTabs(data);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { tabs, error, isLoading };
};

export default useTabs;
