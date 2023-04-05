import React from 'react';
import ReactDOM from 'react-dom/client';

import { RecoilRoot } from 'recoil';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import GlobalStyle from './styles/GlobalStyle';
import Toasts from './library/toast/components/Toasts';

import SignIn from './page/SignIn';
import SignUp from './page/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
      <GlobalStyle />
      <Toasts />
    </RecoilRoot>
  </React.StrictMode>
);
