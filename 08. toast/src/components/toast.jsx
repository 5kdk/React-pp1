import styled, { keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import toastListState from '../recoil/atom/toastListState';

const enterFromRight = keyframes`
  from {
    transform: translate3D(100%, 0, 0);
  }

  to {
    transform: translate3D(0, 0, 0);
  }
`;

const enterFromLeft = keyframes`
  from {
    transform: translate3D(-100%, 0, 0);
  }

  to {
    transform: translate3D(0, 0, 0);
  }
`;

const dismissToRight = keyframes`
  from {
    transform: translate3D(0, 0, 0);
  }

  to {
    transform: translate3D(110%, 0, 0);
  }
`;

const dismissToLeft = keyframes`
  from {
    transform: translate3D(0, 0, 0);
  }

  to {
    transform: translate3D(-110%, 0, 0);
  }
`;

const animations = {
  dismiss: {
    left: dismissToLeft,
    right: dismissToRight,
  },
  enter: {
    left: enterFromLeft,
    right: enterFromRight,
  },
};

const Container = styled.div`
  position: relative;
  width: 350px;
  height: 70px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  margin: 10px;
  padding-left: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 26%);
  background-color: ${props => {
    const colorMap = {
      success: '#5cb85c',
      error: '#d9534f',
      info: '#5bc0de',
      warning: '#f0ad4e',
    };
    return colorMap[props.type];
  }};
  animation: ${props =>
      props.isDismiss
        ? animations.dismiss[props.position.split('-')[1]]
        : animations.enter[props.position.split('-')[1]]}
    0.3s both;
`;

const ToastCloseButton = styled.button`
  position: absolute;
  top: 3px;
  right: 10px;
  padding: 0;
  font-size: 1.7em;
  background: none;
  border: none;
  color: inherit;
  outline: inherit;
  cursor: pointer;
`;

const typeIcoMap = {
  success: 'fa-circle-check',
  error: 'fa-triangle-exclamation',
  info: 'fa-circle-info',
  warning: 'fa-circle-exclamation',
};

const Toast = ({ position, toastInfo }) => {
  const { id, type, message, autoClose, autoCloseDelay, closeOnClick } = toastInfo;
  const [toastList, setToastList] = useRecoilState(toastListState);
  const [isDismiss, setIsDismiss] = useState(false);

  const removeToast = (position, id) => {
    setToastList({ ...toastList, [position]: toastList[position].filter(toast => toast.id !== id) });
  };

  useEffect(() => {
    if (autoClose) {
      setTimeout(() => {
        setIsDismiss(true);
      }, autoCloseDelay);
    }
  }, []);

  // if (newToast.autoClose) {
  //   setTimeout(() => {
  //     setToastList(toastList => ({
  //       ...toastList,
  //       [position]: toastList[position].filter(toast => toast.id !== newToast.id),
  //     }));
  //   }, newToast.autoCloseDelay);
  // }

  return (
    <Container
      key={id}
      type={type}
      position={position}
      isDismiss={isDismiss}
      onAnimationEnd={e => {
        if (isDismiss) {
          removeToast(position, id);
        }
      }}>
      <i className={`fa-solid ${typeIcoMap[type]}`}></i>
      <span>{message}</span>
      {closeOnClick && (
        <ToastCloseButton
          className="toast-close"
          onClick={() => {
            setIsDismiss(true);
          }}>
          ×
        </ToastCloseButton>
      )}
    </Container>
  );
};

export default Toast;
