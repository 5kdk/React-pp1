import styled, { ThemeProvider } from 'styled-components';
import { BiSun, BiMoon } from 'react-icons/bi';
import GlobalStyle from './styles/GlobalStyle';
import useTheme from './hooks/useTheme';

const App = () => {
  const [darkTheme, changeTheme] = useTheme();

  return (
    <ThemeProvider theme={darkTheme ? darkThemeStyles : lightThemeStyles}>
      <GlobalStyle />
      <Title>Light / Dark Mode - Toggle Button</Title>
      <Wrapper onClick={changeTheme}>
        <Switch />
        <IconWrapper>
          <IconBackground>
            <BiSun />
          </IconBackground>
          <IconBackground>
            <BiMoon />
          </IconBackground>
        </IconWrapper>
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

const lightThemeStyles = {
  body: {
    backgroundColor: null,
  },
  switch: {
    left: '2px',
  },
  iconWrapper: {
    backgroundColor: '#3dbf87',
  },
  article: {
    color: null,
  },
};

const darkThemeStyles = {
  body: {
    backgroundColor: '#232323',
  },
  switch: {
    left: '52px',
  },
  iconWrapper: {
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

const IconBackground = styled.div`
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
