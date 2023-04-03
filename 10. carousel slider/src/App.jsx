import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  color: #db5b33;
  font-weight: 300;
  text-align: center;
`;

const Carousel = styled.div`
  position: relative;
  margin: 0 auto;
  overflow: hidden;
`;
/* carousel 요소의 width 셋팅이 완료될 때까지 감춘다. */
// opacity: 0;
const CarouselSlides = styled.div`
  --currentSlide: 0;
  --duration: 0;

  display: flex;
  transition: transform calc(var(--duration) * 1ms) ease-out;
  transform: translate3D(calc(var(--currentSlide) * -100%), 0, 0);
`;

const MovieImg = styled.img`
  padding: 5px;
`;

const CarouselController = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2em;
  color: #fff;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  z-index: 99;
  left: 0;

  :focus {
    outline: none;
  }
`;

const PrevBtn = styled(CarouselController)`
  left: 0;
`;

const NextBtn = styled(CarouselController)`
  right: 0;
`;

const App = () => {
  console.log('');
  return (
    <>
      <Title>Carousel Slider</Title>
      <Carousel>
        <CarouselSlides>
          <MovieImg src="./src/movies/movie-4.jpg" />
          <MovieImg src="./src/movies/movie-1.jpg" />
          <MovieImg src="./src/movies/movie-2.jpg" />
          <MovieImg src="./src/movies/movie-3.jpg" />
          <MovieImg src="./src/movies/movie-4.jpg" />
          <MovieImg src="./src/movies/movie-1.jpg" />
        </CarouselSlides>
        <PrevBtn className="prev">&laquo;</PrevBtn>
        <NextBtn className="next">&raquo;</NextBtn>
      </Carousel>
    </>
  );
};

export default App;
