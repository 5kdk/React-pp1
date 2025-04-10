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
  background-color: #d6e1e5;
}`;

export default GlobalStyle;
