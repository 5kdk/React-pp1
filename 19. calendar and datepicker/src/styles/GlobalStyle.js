import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
  --white: #fff;
  --gray: #adb1c2;
  --black: #000;
  --red: #f1404b;
  --green: #51c786;
}

* {
  box-sizing: border-box;
}

p {
  margin: 0;
}

`;

export default GlobalStyle;
