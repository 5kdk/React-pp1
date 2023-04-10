import React from 'react';
import styled from 'styled-components';
import StarRating from './components/StarRating';

const Title = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;

const App = () => (
  <>
    <Title>Star rating</Title>
    <StarRating maxRating="5" />
    <StarRating maxRating="3" />
  </>
);

export default App;
