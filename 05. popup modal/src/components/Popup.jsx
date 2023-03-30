import { useRef } from 'react';
import styled from 'styled-components';

const Popup = ({ toggleHandler, outPutHandler }) => {
  const inputRef = useRef();

  return (
    <PopupWrapper>
      <PopupDimmed onClick={toggleHandler} />
      <PopupBox>
        <PopupCloseButton onClick={toggleHandler}>❌</PopupCloseButton>
        <h1>Hello!</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem eius, qui dignissimos dolore itaque, quas
          saepe laudantium veniam rerum dolores ipsam est? Inventore eum earum nemo libero saepe! Alias, nemo?
        </p>
        <PopupForm
          onSubmit={e => {
            e.preventDefault();

            outPutHandler(inputRef.current.value);
            toggleHandler();
          }}>
          <PopupInput ref={inputRef} />
          <PopupSubmitBtn>OK</PopupSubmitBtn>
          <PopupCancelBtn onClick={toggleHandler}>Cancel</PopupCancelBtn>
        </PopupForm>
      </PopupBox>
    </PopupWrapper>
  );
};

export default Popup;

const PopupWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
`;

const PopupDimmed = styled(PopupWrapper)`
  background-color: rgba(0, 0, 0, 0.4);
`;

const PopupBox = styled.div`
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

const PopupForm = styled.form`
  display: inline-block;
`;

const PopupInput = styled.input.attrs({ type: 'text' })``;

const PopupSubmitBtn = styled.button.attrs({ type: 'submit' })``;

const PopupCancelBtn = styled.button.attrs({ type: 'button' })``;

const PopupCloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
