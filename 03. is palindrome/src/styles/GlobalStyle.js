import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  body {
    font-family: 'Open Sans';
    font-weight: 300;
    background-color: #f0f3f4;
  }
`;

export default GlobalStyle;
