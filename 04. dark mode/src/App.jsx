import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BiSun, BiMoon } from 'react-icons/bi';
import GlobalStyle from './styles/GlobalStyle';

// useState, useEffect, useTheme, theming / CSS variables, adapting based on props

// 로컬스토리지,

const App = () => {
  const [isDark, setIsDark] = useState(() => {
    const isLocalDark = window.localStorage.getItem('isDark');
    const isWindowDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    return isLocalDark ? JSON.parse(isLocalDark) : isWindowDark;
  });

  // useEffect(() => {
  //   const isLocalDark = window.localStorage.getItem('isDark');
  //   const isWindowDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  //   const initIsDark = isLocalDark ? JSON.parse(isLocalDark) : isWindowDark;

  //   setIsDark(initIsDark);
  // }, []);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Title>Light / Dark Mode - Toggle Button</Title>
      <Wrapper>
        <Switch
          onClick={() => {
            setIsDark(!isDark);
          }}
        />
        <Background>
          <IconWrapper>
            <BiSun />
          </IconWrapper>
          <IconWrapper>
            <BiMoon />
          </IconWrapper>
        </Background>
      </Wrapper>
      <Article>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum optio ab porro magni in sunt ipsam, doloremque
        minima, itaque sapiente consequatur, repellat velit voluptatum accusantium aperiam. Nostrum sunt reprehenderit
        nemo!
      </Article>
    </ThemeProvider>
  );
};

export default App;

const lightTheme = {
  body: {
    backgroundColor: null,
  },
  switch: {
    left: '2px',
  },
  background: {
    backgroundColor: '#3dbf87',
  },
  article: {
    color: null,
  },
};

const darkTheme = {
  body: {
    backgroundColor: '#232323',
  },
  switch: {
    left: '52px',
  },
  background: {
    backgroundColor: '#fc3164',
  },
  article: {
    color: '#fff',
  },
};

const Article = styled.article`
  width: 960px;
  margin: 50px auto 0;
  font-size: 1.5em;
  color: ${props => props.theme.article.color};
`;

const IconWrapper = styled.div`
  width: 50%;
  line-height: 50px;
  text-align: center;
  color: #fff;
`;

const Background = styled.div`
  display: flex;
  background-color: ${props => props.theme.background.backgroundColor};
  border-radius: 25px;
  box-shadow: 2px 2px 5px 0 rgba(50, 50, 50, 0.75);
  transition: background-color calc(var(--transition-duration) * 1s);
`;

const Switch = styled.div`
  position: absolute;
  top: 2px;
  left: ${props => props.theme.switch.left};
  width: 46px;
  height: 46px;
  background-color: #fff;
  border-radius: 100%;
  transition: left calc(var(--transition-duration) * 1s);
`;

// className="toggle-button"
const Wrapper = styled.div`
  position: relative;
  width: 100px;
  height: 50px;
  margin: 0 auto;
  cursor: pointer;
`;

const Title = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;
