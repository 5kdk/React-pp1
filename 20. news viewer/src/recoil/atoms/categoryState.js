import { atom } from 'recoil';

const categoryState = atom({
  key: 'categoryState',
  default: 'all',
});

export default categoryState;
