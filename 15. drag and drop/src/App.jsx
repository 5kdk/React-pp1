import styled from 'styled-components';

import Swappable from './components/Swappable';

import languages from './constants/languages';

const Title = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;

const App = () => (
  <>
    <Title>Top 10 Programming languages</Title>
    <Swappable list={languages} />
  </>
);

export default App;
