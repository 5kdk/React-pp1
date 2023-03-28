import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    font-family: 'Open Sans';
    font-weight: 300;
  }

  h1{
    color: #db5b33;
    font-weight: 300;
    text-align: center;
  }
`;

export default GlobalStyle;
