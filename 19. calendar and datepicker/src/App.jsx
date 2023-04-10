import { useState } from 'react';
import { DatePicker, Calendar } from './components';
// import calendarOpenState from './recoil/atoms/calendarOpenState';

const App = () => {
  // const isOpend = useRecoilValue(calendarOpenState);
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <DatePicker setIsOpend={setIsOpened} />
      <Calendar isOpened={isOpened} setIsOpend={setIsOpened} />
    </>
  );
};

export default App;
