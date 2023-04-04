import { selector } from 'recoil';
import toastListState from '../atom/toastListState';

const TopRightToastListState = selector({
  key: 'TopRightToastListState',
  get: ({ get }) => get(toastListState).filter(({ position }) => position === 'top-right'),
});

export default TopRightToastListState;
