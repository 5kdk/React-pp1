import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Toasts from './library/toast/components/Toasts';

// import SignForm from './components/Form';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';

import Main from './components/Main';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignInForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/main" element={<Main />} />
    </Routes>
    <Toasts />
  </BrowserRouter>
);
export default App;
