import styled from 'styled-components';
import TicTacToe from './components/TicTacToe';

const Title = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;

const App = () => (
  <>
    <Title>Tic Tac Toe</Title>
    <TicTacToe />
  </>
);

export default App;
