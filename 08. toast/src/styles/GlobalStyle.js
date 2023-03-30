import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    color: #58666e;
    background-color: #f0f3f4;
  }

  .toast {
  position: relative;
  width: 350px;
  height: 70px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  margin: 10px;
  padding-left: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 26%);
}

.toast.success {
  background-color: #5cb85c;
}

.toast.error {
  background-color: #d9534f;
}

.toast.info {
  background-color: #5bc0de;
}

.toast.warning {
  background-color: #f0ad4e;
}

.toast-close {
  position: absolute;
  top: 3px;
  right: 10px;
  padding: 0;
  font-size: 1.7em;
  background: none;
  border: none;
  color: inherit;
  outline: inherit;
  cursor: pointer;
}

`;

export default GlobalStyle;
