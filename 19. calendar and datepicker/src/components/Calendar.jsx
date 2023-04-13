import { useState } from 'react';
import styled from 'styled-components';

import { DateGrid, Navigation } from '.';

const Container = styled.div`
  --calendar-size: ${props => props.calendarSize};
  --calendar-grid-item-size: calc((var(--calendar-size) - 10px) / 7);
  --calendar-font-size: calc(var(--calendar-size) * 0.04);

  position: absolute;
  width: var(--calendar-size);
  box-shadow: 1px 1px 20px 0 rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 0 5px 5px;
  font-size: var(--calendar-font-size);
  background-color: var(--white);
`;

const Calendar = ({ calendarRef = null, selectedDate, setSelectedDate, calendarSize = '350' }) => {
  const [currentDate, setCurrentDate] = useState(selectedDate ?? new Date());

  return (
    <>
      <Container calendarSize={`${calendarSize}px`} ref={calendarRef} onClick={e => e.stopPropagation()}>
        <Navigation currentDate={currentDate} setCurrentDate={setCurrentDate} />
        <DateGrid currentDate={currentDate} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </Container>
    </>
  );
};

export default Calendar;
