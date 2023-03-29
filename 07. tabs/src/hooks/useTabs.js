import { useState, useEffect } from 'react';
import fetchTabsData from '../../utils/fetchTabData';

const useTabs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [error, setError] = useState(null);
  
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    const initialize = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTabsData();
        setTabs(data);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, []);

  return { tabs, error, isLoading, selectedIdx, setSelectedIdx };
};

export default useTabs;
