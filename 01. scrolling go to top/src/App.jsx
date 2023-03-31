import React from 'react';
import styled from 'styled-components';
import TopButton from './components/TopButton';
import { BUTTON_START_Y } from './constants/constants';

const App = () => (
  <>
    <Title>Scrolling goto top</Title>
    <Section>Section 1</Section>
    <Section>Section 2</Section>
    <Section>Section 3</Section>
    <Section>Section 4</Section>
    <TopButton boundary={BUTTON_START_Y} />
  </>
);

export default App;

const Section = styled.article`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 3em;
  font-weight: 400;

  :nth-of-type(even) {
    background: rgb(34, 185, 255);
  }

  :nth-of-type(odd) {
    background: rgb(100, 78, 226);
  }
`;

const Title = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;
