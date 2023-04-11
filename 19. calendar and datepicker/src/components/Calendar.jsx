import { useState } from 'react';
import styled from 'styled-components';

import { useRecoilValue } from 'recoil';
import { DateGrid, Navigation } from '.';
import selectedDateStateFamily from '../recoil/atoms/selectedDateStateFamily';

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

const Calendar = ({ pickerId, calendarRef, calendarSize = '350' }) => {
  const selectedDate = useRecoilValue(selectedDateStateFamily(pickerId));
  const [currentDate, setCurrentDate] = useState(selectedDate ?? new Date());

  return (
    <>
      <Container calendarSize={`${calendarSize}px`} ref={calendarRef}>
        <Navigation currentDate={currentDate} setCurrentDate={setCurrentDate} />
        <DateGrid pickerId={pickerId} currentDate={currentDate} />
      </Container>
    </>
  );
};

export default Calendar;
