import styled from 'styled-components';

import useTabs from './hooks/useTabs';
import spinner from '../public/img/ball-triangle.svg';

const App = () => {
  const { tabs, error, isLoading, selectedIdx, setSelectedIdx } = useTabs();

  if (error) return <p>Error...</p>;
  if (isLoading) return <Spinner src={spinner} alt="Loading..." />;

  return (
    <>
      <Title>Tabs</Title>
      <Tabs tabsLen={tabs.length}>
        <nav>
          {tabs.map(({ title }, idx) => (
            <Tab
              key={`tab-${idx}`}
              onClick={() => {
                setSelectedIdx(idx);
              }}>
              {title}
            </Tab>
          ))}
          <Glider selectedIdx={selectedIdx} />
        </nav>
        <TabContent>{tabs[selectedIdx]?.content}</TabContent>
      </Tabs>
    </>
  );
};

export default App;

const Title = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;

const Tabs = styled.div`
  --tab-width: 200;
  --tabs-length: ${props => props.tabsLen};
  width: calc(var(--tab-width) * var(--tabs-length) * 1px);
  margin: 0 auto;
  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  overflow: hidden;

  > nav {
    display: flex;
    position: relative;
    background-color: #f2f2f2;
  }
`;

const Tab = styled.div`
  width: calc(var(--tab-width) * 1px);
  height: 60px;
  line-height: 60px;
  text-align: center;
  cursor: pointer;
  transition: color 0.15s ease-in;
  z-index: 1000;
`;

const Glider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  width: calc(var(--tab-width) * 1px);
  background-color: #fff;
  transition: 0.25s ease-out;
  transform: ${props => `translate3D(${props.selectedIdx * 100}%, 0, 0)`};
`;

const TabContent = styled.div`
  min-height: 300px;
  line-height: 2.5;
  background-color: #fff;
  padding: 20px;
`;

const Spinner = styled.img`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate3D(-50%, 0, 0);
`;
