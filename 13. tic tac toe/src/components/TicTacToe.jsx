import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: var(--game-width);
  margin: 30px auto;
`;

const Header = styled.div`
  text-align: center;
  margin: 20px;
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: var(--grid-item-gap);
  height: var(--game-width);
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  font-size: 40px;
  cursor: pointer;
  transition: transform ease 0.2s;

  :hover {
    transform: scale(1.06);
  }
`;

const Reset = styled.div`
  width: 100%;
  font-family: 'Open Sans';
  font-weight: 300;
  font-size: 16px;
  color: #58666e;
  margin-top: 20px;
  border: 0;
  text-align: center;
  background: none;
  cursor: pointer;
`;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const initBoard = new Array(9).fill('');

const TicTacToe = () => {
  const [gameState, setGameState] = useState({
    player: 'X',
    board: initBoard,
  });

  const { player, board } = gameState;

  const isTicTacToe = winConditions.some(([A, B, C]) => board[A] && board[A] === board[B] && board[B] === board[C]);
  const isDraw = !isTicTacToe && board.every(item => item !== '');
  const isPlaying = !(isTicTacToe || isDraw);

  const handleItemClick = (item, idx) => {
    if (item !== '' || isTicTacToe) return;

    const newBoard = [...board];
    newBoard[idx] = player;

    setGameState({ player: player === 'X' ? 'O' : 'X', board: newBoard });
  };

  const handleResetClick = () => {
    setGameState({ player: 'X', board: initBoard });
  };

  return (
    <Container>
      <Header>
        {isTicTacToe && `Winner is ${player === 'O' ? 'X' : 'O'}`}
        {isDraw && 'Draw'}
        {isPlaying && `Next Player: ${player}`}
      </Header>
      <Grid>
        {board.map((item, idx) => (
          <Item
            key={idx}
            onClick={() => {
              handleItemClick(item, idx);
            }}>
            {item}
          </Item>
        ))}
      </Grid>
      <Reset onClick={handleResetClick}>Try again?</Reset>
    </Container>
  );
};

export default TicTacToe;
