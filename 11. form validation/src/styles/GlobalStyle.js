import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
  --background-color: #fff;
  --main-color: #6002ee;
  --label-color: #0000008a;
  --font-color: #000000de;
  --red: #ed2553;
  --blue: #2196f3;
  --green: #60bc79;
  --gray: #757575;
  --width: 380px;
  --transition-delay: 0.2s;
}

*,
*::after,
*::before {
  box-sizing: border-box;
}
body {
  min-height: 100vh;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  background-image: url(./src/img/background.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
`;

export default GlobalStyle;
