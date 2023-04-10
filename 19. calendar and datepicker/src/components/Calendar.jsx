import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import selectedDateState from '../recoil/atoms/selectedDateState';

const Container = styled.div`
  --calendar-size: 350px;
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
    color: rgba(0, 0, 0, 0.3);
    
    :hover {} ` : ''}
  ${props => props.isToday ? `
    border: 1px solid var(--green);

    :hover {} ` : ''}
  ${props => props.isSelected ? `
    background-color: var(--green);
    border-radius: 50%;
    color: var(--white);

    :hover {} ` : ''}
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

const initialize = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  return { year, month };
};

const Calendar = ({ isOpened, setIsOpend }) => {
  const [dateState, setDateState] = useState(initialize);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);

  const getEmptyCounts = () => {
    const prevEmptyCount = new Date(dateState.year, dateState.month, 1).getDay();
    const nextEmptyCount = 7 - (new Date(dateState.year, dateState.month + 1, 0).getDay() + 1);

    return { prevEmptyCount, nextEmptyCount };
  };

  const getFullCalendar = () => {
    const { prevEmptyCount, nextEmptyCount } = getEmptyCounts();

    const prevLastDate = new Date(dateState.year, dateState.month, 0).getDate();
    const prevFirstDate = prevLastDate - prevEmptyCount + 1;

    const prevMonth = Array.from({ length: prevEmptyCount }, (_, i) => prevFirstDate + i);
    const current = Array.from({ length: new Date(dateState.year, dateState.month + 1, 0).getDate() }, (_, i) => i + 1);
    const nextMonth = Array.from({ length: nextEmptyCount }, (_, i) => i + 1);

    return [prevMonth, current, nextMonth];
  };

  const viewDates = () => {
    const [prevMonth, current, nextMonth] = getFullCalendar();
    return [...prevMonth, ...current, ...nextMonth];
  };

  const isToday = day => {
    const today = new Date();
    return dateState.year === today.getFullYear() && dateState.month === today.getMonth() && day === today.getDate();
  };

  const isSelected = day => {
    const convertedSelectedDate = new Date(selectedDate);

    return (
      dateState.year === convertedSelectedDate.getFullYear() &&
      dateState.month === convertedSelectedDate.getMonth() &&
      day === convertedSelectedDate.getDate()
    );
  };

  const isMuted = idx => {
    const { prevEmptyCount } = getEmptyCounts();
    const [, current] = getFullCalendar();

    return idx < prevEmptyCount || idx >= prevEmptyCount + current.length;
  };

  const goToPrevMonth = () => {
    setDateState(
      dateState.month === 0
        ? { year: dateState.year - 1, month: 11 }
        : { year: dateState.year, month: dateState.month - 1 }
    );
  };

  const goToNextMonth = () => {
    setDateState(
      dateState.month === 11
        ? { year: dateState.year + 1, month: 0 }
        : { year: dateState.year, month: dateState.month + 1 }
    );
  };

  return (
    <>
      {isOpened && (
        <Container>
          <Navigation>
            <ArrowLeft onClick={goToPrevMonth} />
            <Title>
              <Month>{MONTHS[dateState.month]}</Month>
              <div>{dateState.year}</div>
            </Title>
            <ArrowRight onClick={goToNextMonth} />
          </Navigation>
          <CalendarGrid>
            {WEEKDAYS.map(dayName => (
              <Day key={dayName}>{dayName}</Day>
            ))}
            {viewDates().map((day, idx) => (
              <DateItem
                key={idx}
                isSunday={idx % 7 === 0}
                isToday={isToday(day)}
                isMuted={isMuted(idx)}
                isSelected={isSelected(day)}
                onClick={() => {
                  const currentDate = `${dateState.year}-${`${dateState.month + 1}`.padStart(2, 0)}-${`${day}`.padStart(
                    2,
                    0
                  )}`;

                  setSelectedDate(currentDate);
                  setIsOpend(isOpend => !isOpend);
                }}>
                {day}
              </DateItem>
            ))}
          </CalendarGrid>
        </Container>
      )}
    </>
  );
};

export default Calendar;
