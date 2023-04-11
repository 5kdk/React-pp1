import { useState } from 'react';
import styled from 'styled-components';

import { AiOutlineMenu } from 'react-icons/ai';

const Container = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 24px;
  flex: 1;

  ${props => (props.over ? 'background-color: #eaeaea;' : '')}
`;

const SubTitle = styled.p`
  margin: 0 20px 0 0;
  color: ${props => (props.isCorrect ? '#2196f3' : '#ff3838')};
`;

const Draggable = ({ value, handleDragStart, swap, isCorrect }) => {
  const [isOvered, setIsOvered] = useState(false);

  return (
    <Container
      draggable="true"
      over={isOvered}
      onDragStart={handleDragStart}
      onDragEnter={() => setIsOvered(true)}
      onDragLeave={() => setIsOvered(false)}
      onDragOver={e => e.preventDefault()}
      onDrop={() => {
        swap();
        setIsOvered(false);
      }}>
      <SubTitle isCorrect={isCorrect}>{value}</SubTitle>
      <AiOutlineMenu />
    </Container>
  );
};

export default Draggable;
