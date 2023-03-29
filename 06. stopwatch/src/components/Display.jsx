import React from 'react';
import printDisplayTime from '../utils/printDisplayTime';

const Display = ({ elapsedTime }) => <div>{printDisplayTime(elapsedTime)}</div>;

export default Display;
