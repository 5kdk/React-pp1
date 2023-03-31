import styled, { ThemeProvider } from 'styled-components';

import GlobalStyle from './styles/GlobalStyle';
import useTheme from './hooks/useTheme';
import ThemeSwitch from './components/ThemeSwitch';

const App = () => {
  const [theme, changeTheme] = useTheme();

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
      <Title>Light / Dark Mode - Toggle Button</Title>
      <ThemeSwitch changeTheme={changeTheme} />
      <Article>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum optio ab porro magni in sunt ipsam, doloremque
        minima, itaque sapiente consequatur, repellat velit voluptatum accusantium aperiam. Nostrum sunt reprehenderit
        nemo!
      </Article>
    </ThemeProvider>
  );
};

export default App;

const themes = {
  light: {
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
  },

  dark: {
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
  },
};

const Title = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;

const Article = styled.article`
  width: 960px;
  margin: 50px auto 0;
  font-size: 1.5em;
  color: ${props => props.theme.article.color};
`;
