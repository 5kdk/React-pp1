import styled from 'styled-components';
import ThemeSwitch from './components/ThemeSwitch';

const Title = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;

const Article = styled.article`
  width: 960px;
  margin: 50px auto 0;
  font-size: 1.5em;
  color: var(--colors-article);
`;

const App = () => (
  <>
    <Title>Light / Dark Mode - Toggle Button</Title>
    <ThemeSwitch />
    <Article>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum optio ab porro magni in sunt ipsam, doloremque
      minima, itaque sapiente consequatur, repellat velit voluptatum accusantium aperiam. Nostrum sunt reprehenderit
      nemo!
    </Article>
  </>
);
export default App;
