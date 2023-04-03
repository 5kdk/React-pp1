import { useState, useEffect, useRef } from 'react';
import parse from 'html-react-parser';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { AiOutlineSearch, AiFillCaretDown } from 'react-icons/ai';
import countryCode from '../constants/countryCode';

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

const Suggester = styled.div`
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

const Search = styled.input.attrs({ type: 'text' })`
  width: 400px;
  min-height: 45px;
  border-radius: 4px;
  padding: 6px 12px;
  border: 1px solid #e2e2e2;
  box-shadow: inset 0 1px 1px transparent;
  font-family: inherit;
  font-weight: inherit;
  font-size: 1rem;
  color: #666;
`;

const CountryList = styled.ul`
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

const AutoComplete = () => {
  const [userInput, setUserInput] = useState('');
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [flagIdx, setFlagIdx] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  const flagRef = useRef();

  // 상태 구조분해 할당
  const [selectedFlag, selectedCountryName] = selectedCountry;

  const userInputRegex = new RegExp(userInput, 'i');

  const filtercountryCode = countryCode.filter(([, country]) => userInputRegex.test(country));

  useEffect(() => {
    const clickHandler = () => {
      setIsOpened(false);
    };

    window.addEventListener('click', clickHandler);

    return () => {
      window.removeEventListener('click', clickHandler);
    };
  }, []);

  useEffect(() => {
    flagRef.current?.focus();
  }, [flagIdx]);

  return (
    <Container>
      <Toggler className="autocomplete-toggler">
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
      {isOpened && (
        <Suggester
          onClick={e => {
            e.stopPropagation();
          }}>
          <Dropdown>
            <Search
              onInput={debounce(e => {
                setUserInput(e.target.value);
              }, 200)}
              placeholder="Select a country"
              autoFocus
            />
            <CountryList className="autocomplete-suggest-list">
              {filtercountryCode.length > 0 ? (
                filtercountryCode.map(([flag, country], idx) => (
                  <Country
                    key={flag}
                    ref={flagIdx === idx ? flagRef : null}
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
            </CountryList>
          </Dropdown>
        </Suggester>
      )}
    </Container>
  );
};

export default AutoComplete;
