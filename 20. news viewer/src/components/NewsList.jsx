import { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import selectedNavState from '../recoil/atoms/selectedNavState';

import Article from './Article';

const Container = styled.div`
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  padding-bottom: 1rem;
`;

const ScrollObserver = styled.div`
  text-align: center;
  margin: 10px;
`;

// const apiKey = '651628152f1a4c718dbe0a521803f28b';
// const apiKey = '5d62f4885aa74eb2a6674c56d41200d2';
const apiKey = '1721d314fdca4b0788569296e746d0d5';
// const page = 1;
const pageSize = 5;

const useNewsQuery = () => {
  const selectedCategory = useRecoilValue(selectedNavState);

  const fetchNews = async pageParam => {
    const { data } = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr&category=${
        selectedCategory === 'all' ? '' : selectedCategory
      }&page=${pageParam}&pageSize=${pageSize}&apiKey=${apiKey}`
    );

    // return data.articles;
    return data;
  };

  const {
    isSuccess,
    hasNextPage,
    fetchNextPage,
    data: newsList,
  } = useInfiniteQuery({
    queryKey: ['@article', selectedCategory],
    queryFn: ({ pageParam = 1 }) => fetchNews(pageParam),
    getNextPageParam: (lastPage, allPages) => (lastPage.length !== 0 ? allPages.length + 1 : undefined),
    // select: data => data.flat(),
    select: data => data.map(({ articles }) => articles).flat(),
  });

  return { isSuccess, newsList, hasNextPage, fetchNextPage };
};

const NewsList = () => {
  const observerRef = useRef(null);
  const { isSuccess, newsList, hasNextPage, fetchNextPage } = useNewsQuery();

  const handleObserver = useCallback(
    entries => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const element = observerRef.current;
    const option = { threshold: 0.8 };

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [fetchNextPage, hasNextPage, handleObserver]);

  return (
    <Container>
      {isSuccess && (
        <article>
          {newsList.pages.map(({ url, urlToImage, title, description }, idx) => (
            <Article key={idx} url={url} urlToImage={urlToImage} title={title} description={description} />
          ))}
        </article>
      )}
      <ScrollObserver ref={observerRef}>
        {hasNextPage && <img src="./src/img/ball-triangle.svg" alt="Loading..." />}
      </ScrollObserver>
    </Container>
  );
};

export default NewsList;
