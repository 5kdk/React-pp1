import { selector } from 'recoil';
import toastListState from '../atom/toastListState';

const TopLeftToastListState = selector({
  key: 'TopLeftToastListState',
  get: ({ get }) => get(toastListState).filter(({ position }) => position === 'top-left'),
});

export default TopLeftToastListState;
