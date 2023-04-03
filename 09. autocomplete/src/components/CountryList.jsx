import { useState } from 'react';
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

const CountryList = ({ userInput, setSelectedCountry }) => {
  const [flagIdx, setFlagIdx] = useState(null);
  const focusRef = useAutoFocus();

  const userInputRegex = new RegExp(userInput, 'i');
  const filtercountryCode = countryCode.filter(([, country]) => userInputRegex.test(country));

  return (
    <Container className="autocomplete-suggest-list">
      {filtercountryCode.length > 0 ? (
        filtercountryCode.map(([flag, country], idx) => (
          <Country
            key={flag}
            ref={flagIdx === idx ? focusRef : null}
            tabIndex="0"
            onClick={() => {
              setSelectedCountry([flag, country]);
              setFlagIdx(idx);
            }}
            onKeyDown={e => {
              e.preventDefault();

              if (e.key === 'ArrowUp') setFlagIdx(idx === 0 ? filtercountryCode.length - 1 : flagIdx - 1);
              if (e.key === 'ArrowDown' || e.key === 'Tab')
                setFlagIdx(flagIdx >= filtercountryCode.length - 1 ? 0 : flagIdx + 1);

              if (e.key === 'Enter') {
                setSelectedCountry([flag, country]);
                setFlagIdx(idx);
              }
            }}>
            <span className="country">
              <Flag src={`./src/assets/images/flag/${flag}.svg`} />
              <CountryName>{parse(country.replace(userInputRegex, match => `<b>${match}</b>`))}</CountryName>
            </span>
          </Country>
        ))
      ) : (
        <li tabIndex="0">
          <span className="country">
            <span>No results matched {`"${userInput}"`}</span>
          </span>
        </li>
      )}
    </Container>
  );
};

export default CountryList;
