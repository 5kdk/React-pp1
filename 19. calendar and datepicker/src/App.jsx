import styled from 'styled-components';
import { DatePicker } from './components';

const Title = styled.h1`
  color: var(--red);
`;

const App = () => (
  <>
    <Title>DatePicker</Title>
    <DatePicker />
    <DatePicker />
  </>
);

export default App;
