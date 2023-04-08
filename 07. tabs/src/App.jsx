import styled from 'styled-components';

import Tabs from './components/Tabs';

const Title = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;

const App = () => (
  <>
    <Title>Tabs</Title>
    <Tabs />
  </>
);

export default App;
