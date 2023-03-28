import React from 'react';
import styled from 'styled-components';
import { BiSun, BiMoon } from 'react-icons/bi';

const ThemeSwitch = ({ onClick }) => (
  <Wrapper onClick={onClick}>
    <Toggle />
    <IconWrapper>
      <Icon>
        <BiSun />
      </Icon>
      <Icon>
        <BiMoon />
      </Icon>
    </IconWrapper>
  </Wrapper>
);

const Icon = styled.div`
  width: 50%;
  line-height: 50px;
  text-align: center;
  color: #fff;
`;

const IconWrapper = styled.div`
  display: flex;
  background-color: ${props => props.theme.iconWrapper.backgroundColor};
  border-radius: 25px;
  box-shadow: 2px 2px 5px 0 rgba(50, 50, 50, 0.75);
  transition: background-color calc(var(--transition-duration) * 1s);
`;

const Toggle = styled.div`
  position: absolute;
  top: 2px;
  left: ${props => props.theme.switch.left};
  width: 46px;
  height: 46px;
  background-color: #fff;
  border-radius: 100%;
  transition: left calc(var(--transition-duration) * 1s);
`;

const Wrapper = styled.div`
  position: relative;
  width: 100px;
  height: 50px;
  margin: 0 auto;
  cursor: pointer;
`;

export default ThemeSwitch;
