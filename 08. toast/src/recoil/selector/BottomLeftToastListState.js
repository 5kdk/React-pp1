import { selector } from 'recoil';
import toastListState from '../atom/toastListState';

const BottomLeftToastListState = selector({
  key: 'BottomLeftToastListState',
  get: ({ get }) => get(toastListState).filter(({ position }) => position === 'bottom-left'),
});

export default BottomLeftToastListState;
