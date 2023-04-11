import { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { debounce } from 'lodash';

import CountryInput from './CountryInput';
import CountryList from './CountryList';

import countryCode from '../constants/countryCode';

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
  const [filteredCountryCode, setFilteredCountryCode] = useState(countryCode);

  const userInputRegex = useRef(null);

  useEffect(() => {
    userInputRegex.current = new RegExp(userInput, 'i');
  }, [userInput]);

  const debounceRef = useRef(
    debounce(() => {
      setFilteredCountryCode(countryCode.filter(([, country]) => userInputRegex.current.test(country)));
    }, 500)
  );

  // const debounceFiltering = useCallback(debounce(filterCountryCode, 200), []); // => 강사님 피드백 결과 코드

  /*

  // 처음했던것

  const userInputRegex = useRef(null);

  const filterCountryCode = useCallback(() => {
    userInputRegex.current = new RegExp(userInput, 'i');
    setFilteredCountryCode(countryCode.filter(([, country]) => userInputRegex.current.test(country)));
  }, [userInput]);

  const debounceFiltering = useMemo(() => debounce(filterCountryCode, 200), [filterCountryCode]);

  useEffect(() => {
    debounceFiltering();
  }, [debounceFiltering]);
   
  // 이렇게 했었음 아래 onChange에 안넣고 useEffect로
*/
  const debounceFiltering = useCallback(
    debounce(string =>
      setFilteredCountryCode(countryCode.filter(([, country]) => new RegExp(string, 'i').test(country)))
    ),
    []
  );

  return (
    <Container
      onClick={e => {
        e.stopPropagation();
      }}>
      <Dropdown>
        <CountryInput
          userInput={userInput}
          onChange={e => {
            setUserInput(e.target.value);
            debounceRef.current?.();
          }}
        />
        <CountryList
          userInput={userInput}
          userInputRegex={userInputRegex.current}
          filteredCountryCode={filteredCountryCode}
          setSelectedCountry={setSelectedCountry}
        />
        {/* <CountryInput userInput={userInput} onChange={e => setUserInput(e.target.value)} />
        <CountryList
          userInput={userInput}
          userInputRegex={userInputRegex.current}
          filteredCountryCode={filteredCountryCode}
          setSelectedCountry={setSelectedCountry}
        /> */}
      </Dropdown>
    </Container>
  );
};

export default Suggester;
