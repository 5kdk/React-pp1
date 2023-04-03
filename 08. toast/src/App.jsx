import styled from 'styled-components';
import { ToastCreator, Toasts } from './components';

const App = () => (
  <>
    <Title>Toast</Title>
    <ToastCreator />
    <Toasts />
  </>
);

export default App;

const Title = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;
