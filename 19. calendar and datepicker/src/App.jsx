import styled from 'styled-components';
import { DatePicker } from './components';

const Title = styled.h1`
  color: var(--red);
`;

const App = () => (
  <>
    <Title>DatePicker</Title>
    <DatePicker pickerId="1" />
    <DatePicker pickerId="2" />
  </>
);

export default App;
