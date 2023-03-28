import { useState } from 'react';
import Modal from './components/Modal';

const App = () => {
  const [isOpened, setisOpened] = useState(false);
  const [outPutValue, setOutPutValue] = useState('');

  const toggleModal = () => setisOpened(!isOpened);

  const submitValue = value => {
    setOutPutValue(value);
    toggleModal();
  };

  return (
    <>
      <h1>Popup</h1>
      <button onClick={toggleModal}>toggle popup</button>
      {outPutValue && <p>{`from Popup : ${outPutValue}`}</p>}
      {isOpened && <Modal toggleModal={toggleModal} submitValue={submitValue} />}
    </>
  );
};

export default App;
