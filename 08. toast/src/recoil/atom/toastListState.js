import { atom } from 'recoil';

const toastListState = atom({
  key: 'toastListState',
  default: {
    'bottom-right': [],
    'bottom-left': [],
    'top-right': [],
    'top-left': [],
  },
});

export default toastListState;
