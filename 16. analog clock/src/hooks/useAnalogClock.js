import { useState, useEffect } from 'react';

const useAnalogClock = () => {
  const [time, setTime] = useState(new Date());

  const [hr, min, sec] = [time.getHours(), time.getMinutes(), time.getSeconds()];

  const secDegree = sec / 60;
  const minDegree = (secDegree + min) / 60;
  const hrDegree = (minDegree + hr) / 12;

  useEffect(() => {
    const tick = () => setTime(new Date());
    const intervalId = setInterval(tick, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return { hrDegree, minDegree, secDegree };
};

export default useAnalogClock;
