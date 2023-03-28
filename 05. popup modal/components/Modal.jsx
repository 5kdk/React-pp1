import { useRef } from 'react';
import styled from 'styled-components';

const Modal = ({ ModalHandler, submitHandler }) => {
  const inputRef = useRef();

  return (
    <ModalWrapper>
      <ModalDimmed onClick={ModalHandler} />
      <ModalBox>
        <ModalCloseButton onClick={ModalHandler}>❌</ModalCloseButton>
        <h1>Hello!</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem eius, qui dignissimos dolore itaque, quas
          saepe laudantium veniam rerum dolores ipsam est? Inventore eum earum nemo libero saepe! Alias, nemo?
        </p>
        <ModalForm onSubmit={() => submitHandler(inputRef.current.value)}>
          <ModalInput ref={inputRef} />
          <button type="submit">OK</button>
          <button type="button" onClick={ModalHandler}>
            Cancel
          </button>
        </ModalForm>
      </ModalBox>
    </ModalWrapper>
  );
};

export default Modal;

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
`;

const ModalDimmed = styled(ModalWrapper)`
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalBox = styled.div`
  position: absolute;
  top: 20%;
  max-width: 520px;
  min-height: 200px;
  padding: 15px 50px 35px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  z-index: 0;
`;

const ModalForm = styled.form`
  display: inline-block;
`;

const ModalInput = styled.input.attrs({ type: 'text' })``;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
