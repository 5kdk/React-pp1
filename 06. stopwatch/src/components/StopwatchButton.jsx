import React from 'react';
import styled from 'styled-components';

const StopwatchButton = ({ isStart, handlers, elapsedTime }) => {
  const { stop, lap, start, reset } = handlers;

  return isStart ? (
    <>
      <Button onClick={stop}>Stop</Button>
      <Button onClick={lap}>Laps</Button>
    </>
  ) : (
    <>
      <Button onClick={() => start(Date.now())}>Start</Button>
      <Button onClick={reset} disabled={!elapsedTime}>
        Reset
      </Button>
    </>
  );
};

export default StopwatchButton;

const Button = styled.button`
  width: 120px;
  padding: 5px;
  margin: 15px;
  font-size: 36px;
  font-weight: bold;
  border: 2px solid #f44336;
  border-radius: 4px;
  cursor: pointer;
  outline: none;

  :hover:enabled {
    background: #f44336;
    color: aliceblue;
  }

  :disabled {
    color: gray;
    cursor: not-allowed;
  }
`;
