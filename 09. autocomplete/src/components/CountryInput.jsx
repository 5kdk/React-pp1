import React from 'react';
import styled from 'styled-components';

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

const CountryInput = ({userInput,onChange }) => (
  <Search
    value={userInput}
    onChange={onChange}
    placeholder="Select a country"
    autoFocus
  />
);

export default CountryInput;
