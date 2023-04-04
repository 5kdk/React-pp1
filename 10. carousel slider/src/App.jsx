import styled from 'styled-components';
import Carousel from './components/Carousel';
import IMAGE_URLS from './constants/imageUrls';

const Title = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;

const App = () => (
  <>
    <Title>Carousel Slider</Title>
    <Carousel images={IMAGE_URLS} />
  </>
);

export default App;
