import { useState, useRef } from 'react';

const useStopwatch = () => {
  const [isStart, setIsStart] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);

  const lastTimerTime = useRef(0);
  const timerId = useRef(null);

  const start = () => {
    const startTime = Date.now();
    // let startTime = Date.now();

    timerId.current = setInterval(() => {
      lastTimerTime.current = Date.now();
      setElapsedTime(elapsedTime + (lastTimerTime.current - startTime));
      // const diff = lastTimerTime.current - startTime;
      // setElapsedTime(elapsedTime => elapsedTime + diff);
      // startTime = lastTimerTime.current;
    }, 10);

    setIsStart(true);
  };

  const stop = () => {
    clearInterval(timerId.current);
    setElapsedTime(elapsedTime + (Date.now() - lastTimerTime.current));
    // const diff = Date.now() - lastTimerTime.current;
    // setElapsedTime(elapsedTime => elapsedTime + (Date.now() - lastTimerTime.current));
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
