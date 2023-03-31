import { useState, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import toastListState from '../recoil/atom/toastListState';

const ToastCreater = () => {
  const [toastList, setToastList] = useRecoilState(toastListState);
  const [autoClose, setAutoClose] = useState(true);

  const messageRef = useRef();
  const positionRef = useRef();
  // const autoCloseRef = useRef();
  const autoCloseDelayRef = useRef();
  const closeOnClickRef = useRef();

  const generateMaxId = position => Math.max(...toastList[position].map(({ id }) => id), 0) + 1;
  return (
    <ConfigContainer>
      <ButtonContainer
        onClick={e => {
          e.preventDefault();
          if (!e.target.matches('button')) return;
          const position = positionRef.current.value;

          const newToast = {
            id: generateMaxId(position),
            type: e.target.textContent.toLowerCase(),
            message: messageRef.current.value,
            autoClose,
            autoCloseDelay: autoCloseDelayRef.current.value,
            closeOnClick: closeOnClickRef.current.checked,
          };

          setToastList({ ...toastList, [position]: [...toastList[position], newToast] });

          // if (newToast.autoClose) {
          //   setTimeout(() => {
          //     setToastList(toastList => ({
          //       ...toastList,
          //       [position]: toastList[position].filter(toast => toast.id !== newToast.id),
          //     }));
          //   }, newToast.autoCloseDelay);
          // }
        }}>
        <ToastButton type="success">Success</ToastButton>
        <ToastButton type="error">Error</ToastButton>
        <ToastButton type="info">Info</ToastButton>
        <ToastButton type="warning">Warning</ToastButton>
      </ButtonContainer>
      <ControllContainer>
        <span>Message*</span>
        <Message type="text" ref={messageRef} defaultValue="This is a default message" autoFocus />
      </ControllContainer>
      <ControllContainer>
        <span>Position</span>
        <Position ref={positionRef} defaultValue="bottom-right">
          <option value="top-left">Top Left</option>
          <option value="top-right">Top Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-right">Bottom Right</option>
        </Position>
      </ControllContainer>
      <ControllContainer className="auto-close-container">
        <span>Auto-close</span>
        <input
          type="checkbox"
          checked={autoClose}
          onChange={() => {
            setAutoClose(!autoClose);
          }}
        />
      </ControllContainer>
      <ControllContainer className="auto-close-delay-container">
        <span>Auto-close Delay</span>
        <AutoCloseDelay
          type="number"
          ref={autoCloseDelayRef}
          defaultValue="3000"
          min="0"
          step="100"
          disabled={!autoClose}
        />
      </ControllContainer>
      <ControllContainer className="close-on-click-container">
        <span>Close On click</span>
        <input type="checkbox" ref={closeOnClickRef} defaultChecked={true} />
      </ControllContainer>
    </ConfigContainer>
  );
};

export default ToastCreater;

const ConfigContainer = styled.form`
  width: 475px;
  margin: 0 auto;

  span {
    display: inline-block;
    width: 140px;
  }

  input[type='checkbox'] {
    position: relative;
    height: 25px;
    width: 25px;
    margin: 0;
    border: 2px solid #000;
    border-radius: 2px;
    vertical-align: text-bottom;
    cursor: pointer;
    appearance: none;
    opacity: 0.5;

    :checked {
      background-color: #000;
    }

    :before {
      content: '';
      position: absolute;
      right: 50%;
      top: 50%;
      width: 7px;
      height: 14px;
      margin: -1px -1px 0 -1px;
      border: solid #fff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg) translate(-50%, -50%);
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 40px;
`;

const ControllContainer = styled.div`
  margin: 20px 0;
`;

const ToastButton = styled.button`
  width: 100px;
  height: 50px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${props => {
    const colorMap = {
      success: '#5cb85c',
      error: '#d9534f',
      info: '#5bc0de',
      warning: '#f0ad4e',
    };
    return colorMap[props.type];
  }};
`;

const Message = styled.input`
  width: 270px;
  padding: 0.5em 1em;
  font: inherit;
  color: inherit;
  line-height: 1.5em;
  background-color: #fff;
  border: thin solid #ced4da;
  border-radius: 4px;
`;

const Position = styled.select`
  width: 270px;
  padding: 0.5em 3.5em 0.5em 1em;
  font: inherit;
  color: inherit;
  line-height: 1.5em;
  background-color: #fff;
  border: thin solid #ced4da;
  border-radius: 4px;
  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%), linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const AutoCloseDelay = styled.input`
  width: 270px;
  padding: 0.5em 0.5em 0.5em 1em;
  font: inherit;
  color: inherit;
  line-height: 1.5em;
  background-color: #fff;
  border: thin solid #ced4da;
  border-radius: 4px;

  :disabled {
    background-color: #ccc;
  }
`;
