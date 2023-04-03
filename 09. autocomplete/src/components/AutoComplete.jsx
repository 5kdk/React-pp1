import { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch, AiFillCaretDown } from 'react-icons/ai';
import Suggester from './Suggester';
import useOnClickOutside from '../hooks/useOnClickOutside';

const Container = styled.div`
  width: 450px;
  margin: 0 auto;
`;

const Toggler = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  background-color: #0479bc;
  border-radius: 4px;
`;

const ToggleBtn = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  height: 45px;
  font-family: inherit;
  font-weight: inherit;
  font-size: 1rem;
  padding: 14px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;

const SearchIcon = styled(AiOutlineSearch)`
  color: #0479bc;
  font-weight: 600;
  vertical-align: middle;
`;

const DropdownIcon = styled(AiFillCaretDown)`
  color: #0479bc;
  font-weight: 600;
  vertical-align: middle;
`;

const AutoCompleteTitle = styled.span`
  vertical-align: middle;
  color: #666;
`;

const Flag = styled.img`
  width: 24px;
  border: 1px solid #dcdee68c;
  vertical-align: middle;
`;

const CountryName = styled.span`
  padding-left: 10px;
`;

const AutoComplete = () => {
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [isOpened, setIsOpened] = useState(false);

  const [selectedFlag, selectedCountryName] = selectedCountry;

  useOnClickOutside(() => setIsOpened(false));

  return (
    <Container>
      <Toggler>
        <ToggleBtn
          onClick={e => {
            e.stopPropagation();
            setIsOpened(!isOpened);
          }}>
          <span>
            {selectedCountry.length > 0 ? (
              <>
                <Flag src={`./src/assets/images/flag/${selectedFlag}.svg`} />
                <CountryName>{selectedCountryName}</CountryName>
              </>
            ) : (
              <>
                <SearchIcon />
                <AutoCompleteTitle>Select a country</AutoCompleteTitle>
              </>
            )}
          </span>
          <DropdownIcon />
        </ToggleBtn>
      </Toggler>
      {isOpened && <Suggester setSelectedCountry={setSelectedCountry} />}
    </Container>
  );
};

export default AutoComplete;
