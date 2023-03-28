import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    /* .toggle-button의 transition duration */
    --transition-duration: 0.2;
  }

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    font-family: 'Open Sans';
    font-weight: 300;
    background-color: var(--colors-global-background);
  }
`;

export default GlobalStyle;
