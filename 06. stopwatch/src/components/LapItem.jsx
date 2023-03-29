import React from 'react';
import printDisplayTime from '../utils/printDisplayTime';

const LapItem = ({ id, lap }) => (
  <>
    <div>{id}</div>
    <div>{printDisplayTime(lap)}</div>
  </>
);

export default LapItem;
