import printDisplayTime from '../utils/printDisplayTime';

const StopwatchTime = ({ elapsedTime }) => <div>{printDisplayTime(elapsedTime)}</div>;

export default StopwatchTime;
