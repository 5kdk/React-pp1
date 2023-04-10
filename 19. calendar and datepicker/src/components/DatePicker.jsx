import { useRecoilValue } from 'recoil';

import styled from 'styled-components';

import selectedDateState from '../recoil/atoms/selectedDateState';

const Title = styled.h1`
  color: var(--red);
`;

const Input = styled.input`
  margin-bottom: 15px;
`;

const DatePicker = ({ setIsOpend }) => {
  const currentDate = useRecoilValue(selectedDateState);

  return (
    <>
      <Title>DatePicker</Title>
      <Input defaultValue={currentDate || ''} onClick={() => setIsOpend(isOpend => !isOpend)} />
    </>
  );
};

export default DatePicker;
