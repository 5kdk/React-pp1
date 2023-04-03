import { selector } from 'recoil';
import toastListState from '../atom/toastListState';

const BottomRightToastListState = selector({
  key: 'BottomRightToastListState',
  get: ({ get }) => get(toastListState).filter(({ position }) => position === 'bottom-right'),
});

export default BottomRightToastListState;
