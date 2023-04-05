import { useState, useMemo } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import countryCode from '../constants/countryCode';
import useAutoFocus from '../hooks/useAutoFocus';

const Container = styled.ul`
  width: 400px;
  padding: 0;
  margin: 5px 0;
  list-style-type: none;
  overflow-y: auto;
`;

const Country = styled.li`
  padding: 10px;
  color: #666;
  padding-left: 5px;
  cursor: pointer;
  border-radius: 4px;

  :hover,
  :focus {
    background-color: #dcdee68c;
    outline: none;
  }

  b {
    color: #000;
  }
`;

const Flag = styled.img`
  width: 24px;
  border: 1px solid #dcdee68c;
  vertical-align: middle;
`;

const CountryName = styled.span`
  padding-left: 10px;
`;

const CountryList = ({ userInput, userInputRegex, filteredCountryCode, setSelectedCountry }) => {
  const [focusingIdx, setFocusingIdx] = useState(null);
  const focusRef = useAutoFocus();

  const selectCountry = (selectCountry, idx) => {
    setSelectedCountry(selectCountry);
    setFocusingIdx(idx);
  };

  const handleArrowKey = e => {
    e.preventDefault();

    const lastIdx = filteredCountryCode.length - 1;

    if (e.key === 'ArrowUp') setFocusingIdx(focusingIdx === 0 ? lastIdx : focusingIdx - 1);
    if (e.key === 'ArrowDown' || e.key === 'Tab') setFocusingIdx(focusingIdx === lastIdx ? 0 : focusingIdx + 1);
  };

  return (
    <Container>
      {filteredCountryCode.length > 0 ? (
        filteredCountryCode.map(([flag, country], idx) => (
          <Country
            key={flag}
            ref={focusingIdx === idx ? focusRef : null}
            tabIndex="0"
            onClick={() => {
              selectCountry([flag, country], idx);
            }}
            onKeyUp={e => {
              if (e.key === 'Enter') selectCountry([flag, country], idx);
            }}
            onKeyDown={handleArrowKey}>
            <Flag src={`./src/assets/images/flag/${flag}.svg`} />
            <CountryName>{parse(country.replace(userInputRegex, match => `<b>${match}</b>`))}</CountryName>
          </Country>
        ))
      ) : (
        <li>
          <span>No results matched {`"${userInput}"`}</span>
        </li>
      )}
    </Container>
  );
};

export default CountryList;
