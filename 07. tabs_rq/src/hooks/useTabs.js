import { useQuery } from '@tanstack/react-query';
import fetchTabsData from '../utils/fetchTabData';

const queryKey = ['tabs'];

const useTabs = () => {
  const { data } = useQuery({ queryKey, queryFn: fetchTabsData });

  return data;
};

export default useTabs;
