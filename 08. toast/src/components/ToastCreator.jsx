import { useState } from 'react';
import styled from 'styled-components';
import useToasts from '../hooks/useToasts';
import ToastColor from '../styles/ToastColor';

const ConfigContainer = styled.form`
  width: 475px;
  margin: 0 auto;
`;

const ToastBtns = styled.div`
  display: flex;
  gap: 40px;
`;

const ToastBtn = styled.button.attrs({ type: 'submit' })`
  width: 100px;
  height: 50px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${props => ToastColor[props.name]};
`;

const FormEl = styled.div`
  margin: 20px 0;
`;

const FieldName = styled.span`
  display: inline-block;
  width: 140px;
`;

const InputText = styled.input.attrs({ type: 'text' })`
  width: 270px;
  padding: 0.5em 1em;
  font: inherit;
  color: inherit;
  line-height: 1.5em;
  background-color: #fff;
  border: thin solid #ced4da;
  border-radius: 4px;
`;

const SelectPosition = styled.select`
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

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
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
`;

const InputMs = styled.input.attrs({ type: 'number' })`
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

const ToastCreator = () => {
  const toastHandlers = useToasts();
  const [autoClose, setAutoClose] = useState(true);

  const configSubmitHandler = e => {
    e.preventDefault();

    const type = e.nativeEvent.submitter.name;

    const { message, position, autoClose, autoCloseDelay, closeOnClick } = e.nativeEvent.target;

    toastHandlers[type]({
      message: message.value,
      position: position.value,
      autoClose: autoClose.checked,
      autoCloseDelay: autoCloseDelay.value,
      closeOnClick: closeOnClick.checked,
    });
  };

  return (
    <ConfigContainer onSubmit={configSubmitHandler}>
      <ToastBtns>
        <ToastBtn name="success">Success</ToastBtn>
        <ToastBtn name="error">Error</ToastBtn>
        <ToastBtn name="info">Info</ToastBtn>
        <ToastBtn name="warning">Warning</ToastBtn>
      </ToastBtns>
      <FormEl>
        <FieldName>Message*</FieldName>
        <InputText name="message" defaultValue="This is a default message" autoFocus />
      </FormEl>
      <FormEl>
        <FieldName>Position</FieldName>
        <SelectPosition name="position" defaultValue="bottom-right">
          <option value="top-left">Top Left</option>
          <option value="top-right">Top Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-right">Bottom Right</option>
        </SelectPosition>
      </FormEl>
      <FormEl>
        <FieldName>Auto-close</FieldName>
        <CheckBox name="autoClose" checked={autoClose} onChange={() => setAutoClose(!autoClose)} />
      </FormEl>
      <FormEl>
        <FieldName>Auto-close Delay</FieldName>
        <InputMs name="autoCloseDelay" defaultValue="3000" min="0" step="100" disabled={!autoClose} />
      </FormEl>
      <FormEl>
        <FieldName>Close On click</FieldName>
        <CheckBox name="closeOnClick" defaultChecked={true} />
      </FormEl>
    </ConfigContainer>
  );
};

export default ToastCreator;
