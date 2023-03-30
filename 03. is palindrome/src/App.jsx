import styled from 'styled-components';
// import PalindromeC from './components/PalindromeC';
import PalindromeUC from './components/PalindromeUC';

const App = () => (
  <>
    <Title>is palindrome?</Title>
    {/* <PalindromeC /> */}
    <PalindromeUC />
  </>
);

export default App;

const Title = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;
