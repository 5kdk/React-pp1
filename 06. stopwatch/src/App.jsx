import styled from 'styled-components';
import { Stopwatch } from './components';

const App = () => {
  return (
    <>
      <Header>Stopwatch</Header>
      <Stopwatch />
    </>
  );
};

export default App;

const Header = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;
