import { useState } from 'react';
import styled from 'styled-components';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <Title>Counter</Title>
      <Constainer>
        <Button role="button" onClick={counter > 0 ? () => setCounter(counter - 1) : undefined}>
          <AiOutlineMinus />
        </Button>
        <Counter>{counter}</Counter>
        <Button role="button" onClick={() => setCounter(counter + 1)}>
          <AiOutlinePlus />
        </Button>
      </Constainer>
    </>
  );
};
export default App;

const Counter = styled.div`
  width: 50px;
  text-align: center;
`;

const Button = styled.button`
  width: 80px;
  height: 40px;
  font-size: 20px;
  background-color: #efd81d;
  border-color: #efd81d;
  outline: none;
  border-radius: 10px;
  cursor: pointer;
`;

const Constainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  margin: 20px auto;
  font-size: 24px;
`;

const Title = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;
