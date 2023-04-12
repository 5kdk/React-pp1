import { useState, useRef } from 'react';
import styled from 'styled-components';

import shuffle from '../utils/shuffle';

import Draggable from './Draggable';

const Container = styled.div`
  width: 280px;
  margin: 0 auto;
`;

const List = styled.ul`
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 0;
  list-style-type: none;
`;

const Item = styled.li`
  background-color: #fff;
  display: flex;
  flex: 1;

  :not(:last-of-type) {
    border-bottom: 1px solid var(--border-color);
  }
`;

const Sequence = styled.div`
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
`;

const Swappable = ({ list }) => {
  const [rankTable, setRankTable] = useState(shuffle(list));
  const dragTargetIdx = useRef(null);

  const swap = idx => {
    if (dragTargetIdx.current === idx) return;

    const newRankTable = [...rankTable];
    [newRankTable[dragTargetIdx.current], newRankTable[idx]] = [newRankTable[idx], newRankTable[dragTargetIdx.current]];

    setRankTable(newRankTable);
  };

  const handleDragStart = idx => {
    dragTargetIdx.current = idx;
  };

  return (
    <Container>
      <List>
        {rankTable.map((value, idx) => (
          <Item key={value}>
            <Sequence>{idx + 1}</Sequence>
            <Draggable
              value={value}
              isCorrect={value === list[idx]}
              handleDragStart={() => handleDragStart(idx)}
              swap={() => swap(idx)}
            />
          </Item>
        ))}
      </List>
    </Container>
  );
};

export default Swappable;
