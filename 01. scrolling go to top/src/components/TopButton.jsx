import React from 'react'
import styled, {keyframes} from 'styled-components';
import useScroll from '../hooks/useScroll';
import { TOP_POS_TO_START_SHOWING } from '../constants/constants';
import reactLogo from '../assets/react.svg';

const TopButton = () => {
  const isPassed = useScroll(TOP_POS_TO_START_SHOWING);
  
  return (
    <Icon
      role="button"
      visible={isPassed}
      onClick={() => {
        window.scrollTo({ top: 100, left: 100, behavior: 'smooth' });
      }}>
      <img src={reactLogo} alt="go up button" />
    </Icon>
  );
}

export default TopButton

const glow = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
    transform: translate3D(-50%, 10px, 0);
  }
`;

const Icon = styled.div`
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translate3D(-50%, 0, 0);
  font-size: 3em;
  cursor: pointer;
  animation: ${glow} 4s infinite;
  display: ${props => (props.visible ? null : 'none')};
`;