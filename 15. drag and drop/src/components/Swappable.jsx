import { useState, useRef } from 'react';
import styled from 'styled-components';

import { AiOutlineMenu } from 'react-icons/ai';

import shuffle from '../utils/shuffle';
// import { shuffle } from 'lodash';

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

const Draggable = styled.div`
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
  color: ${props => (props.correct ? '#2196f3' : '#ff3838')};
`;

const Swappable = ({ list }) => {
  const [rank, setRank] = useState(shuffle(list));
  const [overTargetIdx, setOverTargetIdx] = useState(null);
  const dragTargetIdxRef = useRef(null);

  return (
    <Container>
      <List>
        {rank.map((value, idx) => (
          <Item key={value}>
            <Sequence>{idx + 1}</Sequence>
            <Draggable
              draggable="true"
              over={idx === overTargetIdx}
              onDragStart={() => {
                dragTargetIdxRef.current = idx;
              }}
              onDragEnter={() => setOverTargetIdx(idx)}
              onDragLeave={() => setOverTargetIdx(overTarget => (overTarget === idx ? null : overTarget))}
              onDragOver={e => e.preventDefault()}
              onDrop={() => {
                const newRank = [...rank];
                [newRank[dragTargetIdxRef.current], newRank[idx]] = [newRank[idx], newRank[dragTargetIdxRef.current]];
                setRank(newRank);
                setOverTargetIdx(null);
              }}>
              <SubTitle correct={value === list[idx]}>{value}</SubTitle>
              <AiOutlineMenu />
            </Draggable>
          </Item>
        ))}
      </List>
    </Container>
  );
};

export default Swappable;
