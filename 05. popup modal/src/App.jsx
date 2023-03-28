import { useState, useRef } from 'react';
import styled from 'styled-components';

const App = () => {
  const [isOpend, setIsOpend] = useState(false);
  const [outPutValue, setOutPutValue] = useState('');
  const inputRef = useRef();

  const popUpHandler = () => {
    setIsOpend(!isOpend);
  };

  return (
    <>
      <Title>Popup</Title>
      {isOpend && (
        <PopupWrapper>
          <PopupDimmed onClick={popUpHandler} />
          <PopupBox>
            <PopupCloseButton onClick={popUpHandler}>❌</PopupCloseButton>
            <Title>Hello!</Title>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem eius, qui dignissimos dolore itaque,
              quas saepe laudantium veniam rerum dolores ipsam est? Inventore eum earum nemo libero saepe! Alias, nemo?
            </p>
            <PopupForm
              onSubmit={e => {
                e.preventDefault();
                setOutPutValue(inputRef.current.value);
                popUpHandler();
              }}>
              <input type="text" ref={inputRef} />
              <button type="submit">OK</button>
              <button type="button" onClick={popUpHandler}>
                Cancel
              </button>
            </PopupForm>
          </PopupBox>
        </PopupWrapper>
      )}
      <button onClick={popUpHandler}>toggle popup</button>
      <p>{outPutValue && `from popup : ${outPutValue}`}</p>
    </>
  );
};

export default App;

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

const Title = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
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

const PopupCloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;
