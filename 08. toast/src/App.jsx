import styled from 'styled-components';
import { ToastCreater, Toasts } from './components';

// overflow hidden 포탈로 옮기기
const App = () => (
  <>
    <Title>Toast</Title>
    <ToastCreater />
    <Toasts />
  </>
);

export default App;

const Title = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;
