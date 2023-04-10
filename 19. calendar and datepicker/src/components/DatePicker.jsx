import { useRecoilState, useRecoilValue } from 'recoil';

import styled from 'styled-components';

import selectedDateState from '../recoil/atoms/selectedDateState';
import calendarIsOpenedState from '../recoil/atoms/calendarIsOpenedState';

const Input = styled.input`
  margin-bottom: 15px;
`;

const DatePicker = () => {
  const [calendarIsOpened, setCalendarIsOpened] = useRecoilState(calendarIsOpenedState);
  const selectedDate = useRecoilValue(selectedDateState);

  // prettier-ignore
  const dateString = selectedDate
    ? `${selectedDate.getFullYear()}-${`${selectedDate.getMonth() + 1}`.padStart(2,0)}-${`${selectedDate.getDate()}`.padStart(2, 0)}`
    : '';

  return (
    <>
      <Input
        defaultValue={dateString}
        onClick={e => {
          e.stopPropagation();
          setCalendarIsOpened(!calendarIsOpened);
        }}
      />
    </>
  );
};

export default DatePicker;
