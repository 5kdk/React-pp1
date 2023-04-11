import React from 'react';
import styled from 'styled-components';
import Accordion from './components/Accordion';
import menuList from './data/menuList';

const Title = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  width: 700px;
  margin: 0 auto;
  gap: 100px;
`;

const App = () => (
  <>
    <Title>Accordion</Title>
    <Container>
      <Accordion menuList={menuList} />
      <Accordion menuList={menuList} showMultiple={true} />
    </Container>
  </>
);

export default App;
