import { atomFamily } from 'recoil';

const selectedDateStateFamily = atomFamily({
  key: 'selectedDateState',
  default: null,
});

export default selectedDateStateFamily;
