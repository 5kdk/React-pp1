import { useState } from 'react';
import styled from 'styled-components';
import Nav from './components/Nav';
import Main from './components/Main';

const Container = styled.div`
  position: relative;
  overflow-x: hidden; /* 가로 scroll bar 방지 */
  width: 100%;
  height: 100%;
`;

const App = () => {
  const [isOpened, setIsOpened] = useState(JSON.parse(localStorage.getItem('open-status')) ?? false);

  return (
    <Container>
      <Nav isOpened={isOpened} />
      <Main isOpened={isOpened} setIsOpened={setIsOpened} />
    </Container>
  );
};

export default App;
