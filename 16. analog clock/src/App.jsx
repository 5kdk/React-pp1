import styled from 'styled-components';
import AnalogClock from './components/AnalogClock';

const Title = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;

const App = () => (
  <>
    <Title>Analog clock</Title>
    <AnalogClock />
    <AnalogClock />
  </>
);
export default App;
