import { atom } from 'recoil';

const selectedDateState = atom({
  key: 'selectedDateState',
  default: null,
});

export default selectedDateState;
