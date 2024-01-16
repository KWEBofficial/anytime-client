import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';

const { persistAtom } = recoilPersist();

export const userState = atom<number | null>({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
