import React from 'react';
import styled from 'styled-components';
import LapItem from './LapItem';

const Laps = ({ laps }) => (
  <LapList>
    <div>Laps</div>
    <div>Time</div>
    {laps.map((lap, idx) => (
      <LapItem key={`lap-${idx + 1}`} id={idx + 1} lap={lap} />
    ))}
  </LapList>
);

export default Laps;

const LapList = styled.div`
  display: grid;
  grid-template-columns: 70px 1fr;
  column-gap: 50px;
  row-gap: 10px;
  width: 260px;
  margin: 10px auto;
  font-size: 0.5em;
`;
