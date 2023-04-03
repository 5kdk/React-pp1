import { atom } from 'recoil';

const toastListState = atom({
  key: 'toastListState',
  default: [],
});

export default toastListState;
