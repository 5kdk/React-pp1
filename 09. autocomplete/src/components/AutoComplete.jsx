import { useState } from 'react';
import styled from 'styled-components';
import Suggester from './Suggester';
import useOnClickOutside from '../hooks/useOnClickOutside';
import Toggler from './Toggler';

const Container = styled.div`
  width: 450px;
  margin: 0 auto;
`;

const AutoComplete = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState([]);

  const toggleSuggester = () => setIsOpened(!isOpened);
  const closeSuggester = () => setIsOpened(false);

  useOnClickOutside(closeSuggester);

  return (
    <Container>
      <Toggler toggleSuggester={toggleSuggester} selectedCountry={selectedCountry} />
      {isOpened && <Suggester setSelectedCountry={setSelectedCountry} />}
    </Container>
  );
};

export default AutoComplete;
