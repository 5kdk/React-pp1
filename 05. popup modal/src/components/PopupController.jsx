import { useState } from 'react';
import Popup from './Popup';

const PopupController = () => {
  const [isOpened, setisOpened] = useState(false);
  const [outputValue, setOutputValue] = useState('');

  const openPopup = () => setisOpened(true);
  const closePopup = () => setisOpened(false);

  return (
    <>
      <button onClick={openPopup}>toggle popup</button>
      {outputValue && <p>{`from Popup : ${outputValue}`}</p>}
      {isOpened && <Popup closePopup={closePopup} setOutputValue={setOutputValue} />}
    </>
  );
};

export default PopupController;
