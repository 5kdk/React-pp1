import React from 'react';
import styled from 'styled-components';

import { DAY_NAMES } from '../constants';

import useCalendarGrid from '../hooks/useCalendarGrid';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--calendar-grid-item-size);
  }
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

const DateGrid = ({ currentDate, selectedDate, setSelectedDate }) => {
  const { fullCalendar, isToday, isMuted, isSelected } = useCalendarGrid(selectedDate, currentDate);

  return (
    <Container>
      {DAY_NAMES.map(dayName => (
        <Day key={dayName}>{dayName}</Day>
      ))}
      {fullCalendar.map((date, idx) => (
        <DateItem
          key={idx}
          isSunday={date.getDay() === 0}
          isToday={isToday(date)}
          isMuted={isMuted(date)}
          isSelected={isSelected(date)}
          onClick={() => {
            if (selectedDate !== undefined) setSelectedDate(date);
          }}>
          {date.getDate()}
        </DateItem>
      ))}
    </Container>
  );
};

export default DateGrid;
