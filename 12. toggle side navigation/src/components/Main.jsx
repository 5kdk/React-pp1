import styled from 'styled-components';

import Article from './Article';

import { BsArrowRightCircle } from 'react-icons/bs';

// prettier-ignore
const MainPage = styled.main`
  height: 100%;
  padding: 20px;
  ${props => props.isOpened ? `
  transform: translate3d(300px, 0, 0);
    
  > ${Toggle} {
      transform: rotate(180deg);
  } ` : ''}
`;

const Toggle = styled(BsArrowRightCircle)`
  font-size: 2em;
  color: maroon;
  cursor: pointer;
  transition: transform 0.5s;
`;

const Main = ({ isOpened, setIsOpened }) => {
  const toggleNavStatus = () => {
    localStorage.setItem('open-status', !isOpened);
    setIsOpened(!isOpened);
  };

  return (
    <MainPage isOpened={isOpened}>
      <Toggle onClick={toggleNavStatus} />
      <h1>Toggle side nav</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <section>
        <Article />
        <Article />
        <Article />
      </section>
    </MainPage>
  );
};

export default Main;
