import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  background-color: #fff;
  border-radius: 50%;
  margin: 40px auto;
  border: 5px solid white;
  box-shadow: inset 2px 3px 8px 0 rgba(0, 0, 0, 0.1);

  ::after {
    content: '';
    width: 15px;
    height: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: black;
    border-radius: 50%;
    z-index: 100;
  }
`;

const Hand = styled.div`
  position: absolute;
  bottom: 50%;
  left: 50%;
  border: 1px solid white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transform-origin: bottom;
  transform: translate3D(-50%, 0, 0) rotate(calc(${props => props.deg} * 1deg));
  z-index: 10;
`;

const Hour = styled(Hand)`
  width: 8px;
  height: 80px;
  background-color: black;
`;

const Minute = styled(Hand)`
  width: 6px;
  height: 110px;
  background-color: black;
`;

const Second = styled(Hand)`
  width: 4px;
  height: 120px;
  background-color: red;
`;

const Time = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  transform: rotate(${props => props.time * 30}deg);
`;

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  const [hr, min, sec] = [time.getHours(), time.getMinutes(), time.getSeconds()];

  const secDegree = sec / 60;
  const minDegree = (secDegree + min) / 60;
  const hrDegree = (minDegree + hr) / 12;

  const tick = useCallback(() => setTime(new Date()), []);

  useEffect(() => {
    const intervalId = setInterval(tick, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Container>
      <Hour deg={hrDegree * 360} />
      <Minute deg={minDegree * 360} />
      <Second deg={secDegree * 360} />
      <Time time="1">|</Time>
      <Time time="2">|</Time>
      <Time time="3">|</Time>
      <Time time="4">|</Time>
      <Time time="5">|</Time>
      <Time time="6">|</Time>
      <Time time="7">|</Time>
      <Time time="8">|</Time>
      <Time time="9">|</Time>
      <Time time="10">|</Time>
      <Time time="11">|</Time>
      <Time time="12">|</Time>
    </Container>
  );
};

export default AnalogClock;
