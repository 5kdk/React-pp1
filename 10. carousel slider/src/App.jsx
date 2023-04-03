import styled from 'styled-components';
import Carousel from './components/Carousel';

const Title = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;

const App = () => {
  const imagesUrl = [
    './src/movies/movie-1.jpg',
    './src/movies/movie-2.jpg',
    './src/movies/movie-3.jpg',
    './src/movies/movie-4.jpg',
  ];
  return (
    <>
      <Title>Carousel Slider</Title>
      <Carousel imagesUrl={imagesUrl} />
    </>
  );
};

export default App;
