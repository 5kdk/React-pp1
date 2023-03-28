import React from 'react';
import styled from 'styled-components';
import { BiSun, BiMoon } from 'react-icons/bi';

import useTheme from '../hooks/useTheme';

const ThemeSwitch = () => {
  const changeTheme = useTheme();

  return (
    <Wrapper onClick={changeTheme}>
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
};

const Icon = styled.div`
  width: 50%;
  line-height: 50px;
  text-align: center;
  color: #fff;
`;

const IconWrapper = styled.div`
  display: flex;
  background-color: var(--colors-ico-background);
  border-radius: 25px;
  box-shadow: 2px 2px 5px 0 rgba(50, 50, 50, 0.75);
  transition: background-color calc(var(--transition-duration) * 1s);
`;

const Toggle = styled.div`
  position: absolute;
  top: 2px;
  left: var(--switch-left-position);
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
