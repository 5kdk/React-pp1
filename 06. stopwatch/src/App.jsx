import styled from 'styled-components';
import { Stopwatch } from './components';

const App = () => (
  <>
    <Title>Stopwatch</Title>
    <Stopwatch />
  </>
);

export default App;

const Title = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;
