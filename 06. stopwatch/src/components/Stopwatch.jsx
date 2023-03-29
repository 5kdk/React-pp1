import { useState, useRef } from 'react';
import styled from 'styled-components';

import printDisplayTime from '../utils/printDisplayTime';
import LapItem from './LapItem';

const Stopwatch = () => {
  const [isStart, setisStart] = useState(false);
  const [displayTime, setDisplayTime] = useState(0);
  const [laps, setLaps] = useState([]);

  const lastIntervalTime = useRef(0);
  const intervalId = useRef(null);

  const start = startTime => {
    setisStart(true);
    intervalId.current = setInterval(() => {
      lastIntervalTime.current = Date.now();
      setDisplayTime(displayTime + (lastIntervalTime.current - startTime));
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalId.current);
    setDisplayTime(displayTime + (Date.now() - lastIntervalTime.current));
    setisStart(false);
  };

  const reset = () => {
    setDisplayTime(0);
    setLaps([]);
  };

  const lap = () => {
    setLaps([...laps, displayTime]);
  };

  return (
    <Wrapper>
      <div>{printDisplayTime(displayTime)}</div>
      {isStart ? (
        <>
          <Button onClick={stop}>Stop</Button>
          <Button onClick={lap}>Laps</Button>
        </>
      ) : (
        <>
          <Button onClick={() => start(Date.now())}>Start</Button>
          <Button onClick={reset} disabled={displayTime === 0 && true}>
            Reset
          </Button>
        </>
      )}
      {laps.length !== 0 && (
        <Laps>
          <div>Laps</div>
          <div>Time</div>
          {laps.map((lap, idx) => (
            <LapItem key={`lap-${idx + 1}`} id={idx + 1} lap={lap} />
          ))}
        </Laps>
      )}
    </Wrapper>
  );
};

export default Stopwatch;

const Wrapper = styled.div`
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

const Laps = styled.div`
  display: grid;
  grid-template-columns: 70px 1fr;
  column-gap: 50px;
  row-gap: 10px;
  width: 260px;
  margin: 10px auto;
  font-size: 0.5em;
`;
