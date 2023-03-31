import { useState } from 'react';
import styled from 'styled-components';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <Title>Counter</Title>
      <Container>
        <Button onClick={() => setCounter(counter > 0 ? counter - 1 : counter)}>
          <AiOutlineMinus />
        </Button>
        <Counter>{counter}</Counter>
        <Button onClick={() => setCounter(counter + 1)}>
          <AiOutlinePlus />
        </Button>
      </Container>
    </>
  );
};
export default App;

const Title = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  margin: 20px auto;
  font-size: 24px;
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

const Counter = styled.div`
  width: 50px;
  text-align: center;
`;
