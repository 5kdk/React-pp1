import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  display: flex;
  margin-top: 3rem;
`;

const Thumbnail = styled.div`
  margin-right: 1rem;
`;

const Image = styled.img`
  display: block;
  width: 160px;
  height: 100px;
  object-fit: cover;
`;

const NewsTitle = styled.h2`
  margin: 0;
`;

const NewsTitleLink = styled.a`
  color: black;
`;

const Description = styled.p`
  margin: 0;
  margin-top: 0.5rem;
  line-height: 1.5;
  white-space: normal;
`;

const Article = ({ url, urlToImage, title, description }) => (
  <Container>
    <Thumbnail className="thumbnail">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Image src={urlToImage || 'https://via.placeholder.com/160x100'} alt="thumbnail" />
      </a>
    </Thumbnail>
    <div className="contents">
      <NewsTitle>
        <NewsTitleLink href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </NewsTitleLink>
      </NewsTitle>
      <Description>{description}</Description>
    </div>
  </Container>
);

export default Article;
