const convertTime = (target, divider) => `${Math.floor(target / divider)}`.padStart(2, 0);

const printDisplayTime = ms => {
  const minutes = convertTime(ms, 60000);
  const seconds = convertTime(ms % 60000, 1000);
  const milliseconds = convertTime(ms % 1000, 10);

  return `${minutes}:${seconds}:${milliseconds}`;
};

export default printDisplayTime;
