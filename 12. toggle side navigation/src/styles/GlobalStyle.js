import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    font-family: 'Open Sans';
    font-weight: 300;
    min-height: 100vh;
    margin: 0;
  }
  
  #root{
    height: 100vh;
  }

  nav,
  main {
    position: absolute;
    height: 100%;
    transition: transform 0.5s;
  }
`;

export default GlobalStyle;
