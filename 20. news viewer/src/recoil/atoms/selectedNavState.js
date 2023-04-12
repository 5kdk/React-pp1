import { atom } from 'recoil';

const selectedNavState = atom({
  key: 'selectedNavState',
  default: 'all',
});

export default selectedNavState;
