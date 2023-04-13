import { useRecoilValue } from 'recoil';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import categoryState from '../recoil/atoms/categoryState';

import apiKey from '../constants/apiKey';

const pageSize = 5;

const useNewsQuery = () => {
  const selectedCategory = useRecoilValue(categoryState);

  const fetchNews = async pageParam => {
    const { data } = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr&category=${
        selectedCategory === 'all' ? '' : selectedCategory
      }&page=${pageParam}&pageSize=${pageSize}&apiKey=${apiKey}`
    );

    return data.articles;
  };

  const {
    data: newsList,
    isSuccess,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['@article', selectedCategory],
    queryFn: ({ pageParam = 1 }) => fetchNews(pageParam),
    getNextPageParam: (lastPage, allPages) => (lastPage.length !== 0 ? allPages.length + 1 : undefined),
    select: data => data.pages.flat(),
  });

  return { newsList, isSuccess, hasNextPage, fetchNextPage };
};

export default useNewsQuery;
