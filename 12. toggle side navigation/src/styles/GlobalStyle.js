import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    font-family: 'Open Sans';
    font-weight: 300;
    height: 100%;
    margin: 0;
  }

  nav,
  main {
    position: absolute;
    height: 100%;
    transition: transform 0.5s;
  }
`;

export default GlobalStyle;
