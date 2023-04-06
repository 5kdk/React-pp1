import React from 'react';
import styled from 'styled-components';
import Accordion from './components/Accordion';

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

const menuList = [
  {
    id: 1,
    title: 'HTML',
    subMenu: [
      { title: 'Semantic Web', path: '#' },
      { title: 'Hyperlink', path: '#' },
    ],
    isOpen: true,
  },
  {
    id: 2,
    title: 'CSS',
    subMenu: [
      { title: 'Selector', path: '#' },
      { title: 'Box model', path: '#' },
      { title: 'Layout', path: '#' },
    ],
    isOpen: false,
  },
  {
    id: 3,
    title: 'JavaScript',
    subMenu: [
      { title: 'Variable', path: '#' },
      { title: 'Function', path: '#' },
      { title: 'Object', path: '#' },
      { title: 'DOM', path: '#' },
    ],
    isOpen: true,
  },
];

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
