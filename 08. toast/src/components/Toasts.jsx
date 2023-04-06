import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { createPortal } from 'react-dom';
import Toast from './Toast';
import {
  BottomRightToastListState,
  BottomLeftToastListState,
  TopRightToastListState,
  TopLeftToastListState,
} from '../recoil/selector';
import ContainerPosition from '../styles/ContainerPosition';

const ToastContainer = styled.div`
  position: absolute;
  overflow: hidden;
  ${props => ContainerPosition[props.position]}
`;

const Toasts = () => {
  const toastPosition = {
    'bottom-right': useRecoilValue(BottomRightToastListState),
    'bottom-left': useRecoilValue(BottomLeftToastListState),
    'top-right': useRecoilValue(TopRightToastListState),
    'top-left': useRecoilValue(TopLeftToastListState),
  };

  return (
    <>
      {createPortal(
        Object.keys(toastPosition).map(
          position =>
            toastPosition[position].length !== 0 && (
              <ToastContainer key={position} position={position}>
                {toastPosition[position].map(toast => (
                  <Toast key={toast.id} toastInfo={toast} />
                ))}
              </ToastContainer>
            )
        ),
        document.body
      )}
    </>
  );
};

export default Toasts;
