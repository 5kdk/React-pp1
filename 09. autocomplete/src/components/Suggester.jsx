import { useState } from 'react';
import styled from 'styled-components';

import CountryInput from './CountryInput';
import CountryList from './CountryList';

const Container = styled.div`
  margin-top: 5px;
  background-color: #fff;
  border-radius: 4px;
`;

const Dropdown = styled.div`
  display: flex;
  height: 500px;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;

const Suggester = ({ setSelectedCountry }) => {
  const [userInput, setUserInput] = useState('');

  return (
    <Container
      onClick={e => {
        e.stopPropagation();
      }}>
      <Dropdown>
        <CountryInput setUserInput={setUserInput} />
        <CountryList userInput={userInput} setSelectedCountry={setSelectedCountry} />
      </Dropdown>
    </Container>
  );
};

export default Suggester;
