import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import selectedDateState from '../recoil/atoms/selectedDateState';
import calendarIsOpenedState from '../recoil/atoms/calendarIsOpenedState';

const Container = styled.div`
  --calendar-size: ${props => props.calendarSize};
  --calendar-grid-item-size: calc((var(--calendar-size) - 10px) / 7);
  --calendar-font-size: calc(var(--calendar-size) * 0.04);

  width: var(--calendar-size);
  box-shadow: 1px 1px 20px 0 rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 0 5px 5px;
  font-size: var(--calendar-font-size);
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin: -5px;
  margin-bottom: 0;
  background-color: var(--green);
  color: var(--white);
  border-radius: 10px 10px 0 0;
`;

const Title = styled.div`
  text-align: center;
  color: var(--white);
`;

const Month = styled.div`
  font-size: 1.4em;
`;

const ArrowLeft = styled(BsFillCaretLeftFill)`
  text-align: center;
  line-height: 30px;
  font-size: 1.2em;
  cursor: pointer;
`;

const ArrowRight = styled(BsFillCaretRightFill)`
  text-align: center;
  line-height: 30px;
  font-size: 1.2em;
  cursor: pointer;
`;

const Day = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--calendar-grid-item-size);
  color: rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
`;

// prettier-ignore
const DateItem = styled.div`
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.2s;

  :hover {
    color: #fff;
    background-color: var(--green);
  }

  ${props => props.isSunday ? `
    color: red; ` : ''}

  ${props => props.isMuted ? `
    color: rgba(0, 0, 0, 0.3);` : ''}

  ${props => props.isToday ? `
    border: 1px solid var(--green);` : ''}

  ${props => props.isSelected ? `
    background-color: var(--green);
    border-radius: 50%;
    color: var(--white);` : ''}
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--calendar-grid-item-size);
  }
`;

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const Calendar = ({ calendarSize = '350' }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [calendarIsOpened, setCalendarIsOpened] = useRecoilState(calendarIsOpenedState);

  useEffect(() => {
    const closeCalendar = () => setCalendarIsOpened(false);

    window.addEventListener('click', closeCalendar);

    return () => {
      window.removeEventListener('click', closeCalendar);
    };
  }, []);

  const getFullCalendar = () => {
    const firstDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const from = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1 - firstDate.getDay());

    return Array.from({ length: firstDate.getDay() + lastDate.getDate() + (7 - (lastDate.getDay() + 1)) }, (_, i) => {
      if (i !== 0) from.setDate(from.getDate() + 1);
      return new Date(from);
    });
  };

  const isSameDate = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  const isToday = date => isSameDate(date, new Date());
  const isSelected = date => isSameDate(date, new Date(selectedDate));
  const isMuted = date => date.getMonth() !== currentDate.getMonth();

  const goToPrevMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  const goToNextMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));

  return (
    <>
      {calendarIsOpened && (
        <Container calendarSize={`${calendarSize}px`} onClick={e => e.stopPropagation()}>
          <Navigation>
            <ArrowLeft onClick={goToPrevMonth} />
            <Title>
              <Month>{MONTHS[currentDate.getMonth()]}</Month>
              <div>{currentDate.getFullYear()}</div>
            </Title>
            <ArrowRight onClick={goToNextMonth} />
          </Navigation>
          <CalendarGrid>
            {WEEKDAYS.map(dayName => (
              <Day key={dayName}>{dayName}</Day>
            ))}
            {getFullCalendar().map((date, idx) => (
              <DateItem
                key={idx}
                isSunday={date.getDay() === 0}
                isToday={isToday(date)}
                isMuted={isMuted(date)}
                isSelected={isSelected(date)}
                onClick={() => {
                  setSelectedDate(date);
                  setCalendarIsOpened(!calendarIsOpened);
                }}>
                {date.getDate()}
              </DateItem>
            ))}
          </CalendarGrid>
        </Container>
      )}
    </>
  );
};

export default Calendar;
