import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Toasts from './library/toast/components/Toasts';

import SignForm from './components/Form';
import Main from './components/Main';

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<SignForm type="signin" />} />
      <Route path="/signup" element={<SignForm type="signup" />} />
      <Route path="/main" element={<Main />} />
    </Routes>
    <Toasts />
  </>
);
export default App;
