import { useState } from 'react';
import styled from 'styled-components';
import Nav from './components/Nav';
import ArticleContainer from './components/ArticleContainer';

const Container = styled.div`
  position: relative;
  overflow-x: hidden;
  width: 100%;
  height: 100vh;
`;

const App = () => {
  const [isOpened, setIsOpened] = useState(JSON.parse(localStorage.getItem('open-status')) ?? false);

  return (
    <Container>
      <Nav isOpened={isOpened} />
      <ArticleContainer isOpened={isOpened} setIsOpened={setIsOpened} />
    </Container>
  );
};

export default App;
