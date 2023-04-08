import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
  --background-color: #c3c7ca;
  --border-color: #e3e5e4;
  --text-color: #34444f;
}
*,
*::after,
*::before {
  box-sizing: border-box;
}
body {
  font-family: 'Open Sans';
  font-weight: 300;
  color: #58666e;
  background-color: #f0f3f4;
}
`;

export default GlobalStyle;
