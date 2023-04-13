import { useCallback } from 'react';
import styled from 'styled-components';

import { useNewsQuery, useObsever } from '../hooks';

import { Article, ScrollObserver } from '.';

const Container = styled.div`
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  padding-bottom: 1rem;
`;

const NewsList = () => {
  const { isSuccess, newsList } = useNewsQuery();

  const { hasNextPage, fetchNextPage } = useNewsQuery();

  const getNextPage = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  const observerRef = useObsever(getNextPage);

  return (
    <Container>
      {isSuccess && (
        <article>
          {newsList.map(({ url, urlToImage, title, description }, idx) => (
            <Article key={idx} url={url} urlToImage={urlToImage} title={title} description={description} />
          ))}
        </article>
      )}
      <ScrollObserver hasNextPage={hasNextPage} observer={observerRef} />
    </Container>
  );
};

export default NewsList;
