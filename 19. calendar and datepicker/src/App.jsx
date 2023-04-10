import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { DatePicker, Calendar } from './components';
import calendarIsOpenedState from './recoil/atoms/calendarIsOpenedState';

const Title = styled.h1`
  color: var(--red);
`;

const App = () => (
  <>
    <Title>DatePicker</Title>
    <DatePicker />
    <Calendar />
  </>
);

export default App;
