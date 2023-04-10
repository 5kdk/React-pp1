import { atom } from 'recoil';

const calendarIsOpenedState = atom({
  key: 'calendarIsOpenedState',
  default: false,
});

export default calendarIsOpenedState;
