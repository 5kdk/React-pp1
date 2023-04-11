import React from 'react';
import styled from 'styled-components';

import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';

import { MONTH_NAMES } from '../constants';

const Container = styled.div`
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

const Navigation = ({ currentDate, setCurrentDate }) => {
  const goToPrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const goToNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  // const goToNextMonth = () => setCurrentDate(new Date(new Date(currentDate).setMonth(currentDate.getMonth() + 1)));
  // const goToPrevMonth = () => setCurrentDate(new Date(new Date(currentDate).setMonth(currentDate.getMonth() - 1)));
  // const goToNextMonth = () => setCurrentDate(new Date(new Date(currentDate).setMonth(currentDate.getMonth() + 1)));
  // const goToPrevMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  // const goToNextMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));

  return (
    <Container>
      <ArrowLeft onClick={goToPrevMonth} />
      <Title>
        <Month>{MONTH_NAMES[currentDate.getMonth()]}</Month>
        <div>{currentDate.getFullYear()}</div>
      </Title>
      <ArrowRight onClick={goToNextMonth} />
    </Container>
  );
};

export default Navigation;
