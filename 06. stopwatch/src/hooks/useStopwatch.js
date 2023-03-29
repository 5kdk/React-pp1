import { useState, useRef } from 'react';

const useStopwatch = () => {
  const [isStart, setIsStart] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);

  const lastIntervalTime = useRef(0);
  const intervalId = useRef(null);

  const start = startTime => {
    setIsStart(true);
    intervalId.current = setInterval(() => {
      lastIntervalTime.current = Date.now();
      setElapsedTime(elapsedTime + (lastIntervalTime.current - startTime));
    }, 10);
  };

  const stop = () => {
    clearInterval(intervalId.current);
    setElapsedTime(elapsedTime + (Date.now() - lastIntervalTime.current));
    setIsStart(false);
  };

  const reset = () => {
    setElapsedTime(0);
    setLaps([]);
  };

  const lap = () => {
    setLaps([...laps, elapsedTime]);
  };

  return {
    states: { isStart, elapsedTime, laps },
    handlers: { start, stop, reset, lap },
  };
};

export default useStopwatch;
