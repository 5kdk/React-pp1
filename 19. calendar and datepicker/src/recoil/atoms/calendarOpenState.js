import { atom } from 'recoil';

const calendarOpenState = atom({
  key: 'calendarOpenState',
  default: false,
});

export default calendarOpenState;
