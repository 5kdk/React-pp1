import React from 'react';
import styled from 'styled-components';
import { AiOutlineSearch, AiFillCaretDown } from 'react-icons/ai';

const Container = styled.div`
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

const Toggler = ({ toggleSuggester, selectedCountry }) => {
  const [selectedFlag, selectedCountryName] = selectedCountry;

  return (
    <Container>
      <ToggleBtn
        onClick={e => {
          e.stopPropagation();
          toggleSuggester();
        }}>
        <span>
          {selectedFlag ? (
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
    </Container>
  );
};

export default Toggler;
