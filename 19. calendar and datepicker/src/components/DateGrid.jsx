import React from 'react';
import styled from 'styled-components';

import { useRecoilState } from 'recoil';

import { DAY_NAMES } from '../constants';
import selectedDateStateFamily from '../recoil/atoms/selectedDateStateFamily';

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

const DateGrid = ({ pickerId, currentDate }) => {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateStateFamily(pickerId));

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

  return (
    <Container>
      {DAY_NAMES.map(dayName => (
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
          }}>
          {date.getDate()}
        </DateItem>
      ))}
    </Container>
  );
};

export default DateGrid;
