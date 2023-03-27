import React from 'react';
import styled, { keyframes } from 'styled-components';
import useScroll from './hooks/useScroll';
import reactLogo from './assets/react.svg';
import { TOP_POS_TO_START_SHOWING } from './constants/constants';

const App = () => {
  const isPassed = useScroll(TOP_POS_TO_START_SHOWING);

  return (
    <div>
      <Title>Scrolling goto top</Title>
      <Section>Section 1</Section>
      <Section>Section 2</Section>
      <Section>Section 3</Section>
      <Section>Section 4</Section>
      <Icon
        role="button"
        visible={isPassed}
        onClick={() => {
          window.scrollTo({ top: 100, left: 100, behavior: 'smooth' });
        }}>
        <img src={reactLogo} alt="go up button" />
      </Icon>
    </div>
  );
};

export default App;

const glow = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
    transform: translate3D(-50%, 10px, 0);
  }
`;

const Icon = styled.div`
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translate3D(-50%, 0, 0);
  font-size: 3em;
  cursor: pointer;
  animation: ${glow} 4s infinite;
  display: ${props => (props.visible ? null : 'none')};
`;

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
