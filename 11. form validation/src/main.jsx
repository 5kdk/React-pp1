import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { RecoilRoot } from 'recoil';
import GlobalStyle from './styles/GlobalStyle';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <GlobalStyle />
        <App />
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
);
