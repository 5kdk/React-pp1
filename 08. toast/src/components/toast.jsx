import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { AiFillCheckCircle, AiFillWarning, AiFillInfoCircle, AiFillExclamationCircle } from 'react-icons/ai';
import useToasts from '../hooks/useToasts';
import ToastColor from '../styles/ToastColor';
import { dismissToRight, dismissToLeft, enterFromRight, enterFromLeft } from '../styles/Animation';

const animations = {
  dismiss: {
    'bottom-right': dismissToRight,
    'top-right': dismissToRight,
    'bottom-left': dismissToLeft,
    'top-left': dismissToLeft,
  },
  enter: {
    'bottom-right': enterFromRight,
    'top-right': enterFromRight,
    'bottom-left': enterFromLeft,
    'top-left': enterFromLeft,
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
  background-color: ${props => ToastColor[props.type]};
  animation: ${props => animations[props.isDismiss ? 'dismiss' : 'enter'][props.position]} 0.3s both;
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

const Icon = {
  success: <AiFillCheckCircle />,
  error: <AiFillWarning />,
  info: <AiFillInfoCircle />,
  warning: <AiFillExclamationCircle />,
};

const Toast = ({ toastInfo }) => {
  const { id, type, message, position, autoClose, autoCloseDelay, closeOnClick } = toastInfo;
  const { remove } = useToasts();
  const [isDismiss, setIsDismiss] = useState(false);

  useEffect(() => {
    if (autoClose) setTimeout(() => setIsDismiss(true), autoCloseDelay);
  }, []);

  return (
    <Container
      type={type}
      position={position}
      isDismiss={isDismiss}
      onAnimationEnd={() => {
        if (isDismiss) remove(id);
      }}>
      {Icon[type]}
      <span>{message}</span>
      {closeOnClick && <ToastCloseButton onClick={() => setIsDismiss(true)}>×</ToastCloseButton>}
    </Container>
  );
};

export default Toast;
