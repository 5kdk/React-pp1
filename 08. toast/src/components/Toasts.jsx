import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import Toast from './Toast';
import toastListState from '../recoil/atom/toastListState';

const ToastContainer = styled.div`
  position: absolute;
  overflow: hidden;
  ${props => {
    const positions = props.position.split('-');
    return positions.map(pos => `${pos}: 0;`).join('');
  }}
`;

const Toasts = () => {
  const toastList = useRecoilValue(toastListState);

  return Object.keys(toastList).map(
    position =>
      toastList[position].length !== 0 && (
        <ToastContainer key={position} position={position}>
          {toastList[position].map(toast => (
            <Toast key={toast.id} position={position} toastInfo={toast} />
          ))}
        </ToastContainer>
      )
  );
};

export default Toasts;
