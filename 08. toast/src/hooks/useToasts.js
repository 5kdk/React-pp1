import { useRecoilState } from 'recoil';
import toastListState from '../recoil/atom/toastListState';

const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};

const defaultConfig = {
  position: 'bottom-right',
  autoClose: true,
  autoCloseDelay: 3000,
  closeOnClick: true,
};

const useToasts = () => {
  const [toastList, setToastList] = useRecoilState(toastListState);

  const generateMaxId = () => Math.max(...toastList.map(({ id }) => id), 0) + 1;

  const appendToast = config => {
    const newToast = { id: generateMaxId(), ...defaultConfig, ...config };

    setToastList([...toastList, newToast]);
  };

  const removeToast = id => {
    setToastList(toastList.filter(toast => toast.id !== id));
  };

  return {
    success(config) {
      appendToast({ type: TOAST_TYPES.SUCCESS, ...config });
    },
    error(config) {
      appendToast({ type: TOAST_TYPES.ERROR, ...config });
    },
    info(config) {
      appendToast({ type: TOAST_TYPES.INFO, ...config });
    },
    warning(config) {
      appendToast({ type: TOAST_TYPES.WARNING, ...config });
    },
    remove(id) {
      removeToast(id);
    },
  };
};

export default useToasts;
