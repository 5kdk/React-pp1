import { useState } from 'react';
import Popup from './Popup';

const PopupController = () => {
  const [isOpened, setisOpened] = useState(false);
  const [outPutValue, setOutPutValue] = useState('');

  const toggleHandler = () => setisOpened(!isOpened);

  const outPutHandler = value => {
    setOutPutValue(value);
  };

  return (
    <>
      <button onClick={toggleHandler}>toggle popup</button>
      {outPutValue && <p>{`from Popup : ${outPutValue}`}</p>}
      {isOpened && <Popup toggleHandler={toggleHandler} outPutHandler={outPutHandler} />}
    </>
  );
};

export default PopupController;
