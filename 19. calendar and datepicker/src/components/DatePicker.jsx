import { useState } from 'react';
import styled from 'styled-components';

import useOnClickOutside from '../hooks/useOnClickOutside';

import { Calendar } from '.';

const Conatainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 5px;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 5px;
`;

const DatePicker = () => {
  const [calendarIsOpened, setCalendarIsOpened] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // prettier-ignore
  const dateString = selectedDate
    ? `${selectedDate.getFullYear()}-${`${selectedDate.getMonth() + 1}`.padStart(2,0)}-${`${selectedDate.getDate()}`.padStart(2, 0)}`
    : 'Select date';

  const closeCalendar = () => setCalendarIsOpened(false);
  const calendarRef = useOnClickOutside(closeCalendar);

  return (
    <Conatainer>
      <Input
        value={dateString}
        onClick={e => {
          e.stopPropagation();
          setCalendarIsOpened(!calendarIsOpened);
        }}
        readOnly
      />
      {calendarIsOpened && (
        <Calendar calendarRef={calendarRef} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      )}
    </Conatainer>
  );
};

export default DatePicker;
