import { useState } from 'react';
import Modal from '../components/Modal';

const App = () => {
  const [isOpend, setIsOpend] = useState(false);
  const [outPutValue, setOutPutValue] = useState('');

  const ModalHandler = () => setIsOpend(!isOpend);

  const submitHandler = value => {
    setOutPutValue(value);
    ModalHandler();
  };

  return (
    <>
      <h1>Popup</h1>
      <button onClick={ModalHandler}>toggle popup</button>
      <p>{outPutValue && `from Popup : ${outPutValue}`}</p>
      {isOpend && <Modal ModalHandler={ModalHandler} submitHandler={submitHandler} />}
    </>
  );
};

export default App;
