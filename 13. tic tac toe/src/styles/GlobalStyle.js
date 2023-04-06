import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
  --grid-item-width: 100px;
  --grid-item-gap: 6px;
  --game-width: calc(var(--grid-item-width) * 3 + var(--grid-item-gap) * 2);
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
