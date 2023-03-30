import React from 'react';
import styled, { keyframes } from 'styled-components';
import { HiChevronDoubleUp } from 'react-icons/hi';
import useScroll from '../hooks/useScroll';

const TopButton = ({ boundary }) => {
  const yPos = useScroll();

  return (
    yPos >= boundary && (
      <Icon
        role="button"
        onClick={() => {
          window.scrollTo({ top: 100, behavior: 'smooth' });
        }}>
        <HiChevronDoubleUp />
      </Icon>
    )
  );
};

export default TopButton;

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
  color: #fff;
`;
