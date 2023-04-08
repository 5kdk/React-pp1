import React from 'react';
import styled from 'styled-components';
import { AiOutlineMenu } from 'react-icons/ai';

const Title = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;

const Swappable = styled.div`
  width: 280px;
  margin: 0 auto;
`;

const DraggableList = styled.ul`
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 0;
  list-style-type: none;
`;

const Sequence = styled.div`
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
`;

const LanguageName = styled.p`
  margin: 0 20px 0 0;
`;

const DraggableItem = styled.li`
  background-color: #fff;
  display: flex;
  flex: 1;

  :not(:last-of-type) {
    border-bottom: 1px solid var(--border-color);
  }

  ${LanguageName} {
    color: ${props => (props.right ? '#2196f3' : '#ff3838')};
  }
`;

const Draggable = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 24px;
  flex: 1;
`;

// .draggable-list li.over .draggable {
//   background-color: #eaeaea;
// }

const App = () => {
  const languages = ['JavaScript', 'Java', 'Python', 'CSS', 'PHP', 'Ruby', 'C++', 'C', 'Shell', 'C#'];

  return (
    <>
      <Title>Top 10 Programming languages</Title>
      <Swappable>
        <DraggableList>
          {languages.map(language => (
            <DraggableItem key={language} right={true}>
              <Sequence className="seq">1</Sequence>
              <Draggable draggable="true">
                <LanguageName>{language}</LanguageName>
                <AiOutlineMenu />
              </Draggable>
            </DraggableItem>
          ))}
        </DraggableList>
      </Swappable>
    </>
  );
};

export default App;
