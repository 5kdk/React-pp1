import styled from 'styled-components';
import useStopwatch from '../hooks/useStopwatch';
import { StopwatchTime, StopwatchLaps } from './index';

const Stopwatch = () => {
  const {
    states: { isStart, elapsedTime, laps },
    handlers: { start, stop, reset, lap },
  } = useStopwatch();

  return (
    <StopwatchWrapper>
      <StopwatchTime elapsedTime={elapsedTime} />
      {isStart ? (
        <>
          <Button onClick={stop}>Stop</Button>
          <Button onClick={lap}>Laps</Button>
        </>
      ) : (
        <>
          <Button onClick={start}>Start</Button>
          <Button onClick={reset} disabled={!elapsedTime}>
            Reset
          </Button>
        </>
      )}
      {laps.length !== 0 && <StopwatchLaps laps={laps} />}
    </StopwatchWrapper>
  );
};

export default Stopwatch;

const StopwatchWrapper = styled.div`
  text-align: center;
  font-size: 3em;
  padding: 30px;
`;

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
