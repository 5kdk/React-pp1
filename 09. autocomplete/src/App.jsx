import styled from 'styled-components';
import AutoComplete from './components/AutoComplete';

const Title = styled.h1`
  color: #ede7e7;
  font-weight: 300;
  text-align: center;
`;

const App = () => (
  <>
    <Title>Autocomplete</Title>
    <AutoComplete />
  </>
);

export default App;
