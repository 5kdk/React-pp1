import styled from 'styled-components';
import useStopwatch from './hooks/useStopwatch';
import Display from './components/Display';
import Laps from './components/Laps';

const App = () => {
  const {
    states: { isStart, elapsedTime, laps },
    handlers: { start, stop, reset, lap },
  } = useStopwatch();

  // prettier-ignore
  return (
    <>
      <Header>Stopwatch</Header>
      <Main>
        <Display elapsedTime={elapsedTime} />
        {isStart ? 
          <>
            <Button onClick={stop}>Stop</Button>
            <Button onClick={lap}>Laps</Button>
          </>
        :
          <>
            <Button onClick={() => start(Date.now())}>Start</Button>
            <Button onClick={reset} disabled={!elapsedTime}>Reset</Button>
          </>
        }
        {laps.length !== 0 && <Laps laps={laps} />}
      </Main>
    </>
  );
};

export default App;

const Header = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;

const Main = styled.div`
  text-align: center;
  font-size: 3em;
  padding: 30px;
`;

const Button = styled.button`
  width: 120px;
  padding: 5px;
  margin: 15px;
  font-size: 36px;
  font-weight: bold;
  border: 2px solid #f44336;
  border-radius: 4px;
  cursor: pointer;
  outline: none;

  :hover:enabled {
    background: #f44336;
    color: aliceblue;
  }

  :disabled {
    color: gray;
    cursor: not-allowed;
  }
`;
