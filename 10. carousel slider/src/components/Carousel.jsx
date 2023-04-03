import { useState } from 'react';
import styled from 'styled-components';

const DURATION = 500;

const Container = styled.div`
  position: relative;
  width: ${props => props.width};
  margin: 0 auto;
  overflow: hidden;
  opacity: ${props => (props.width ? 1 : 0)};
`;
/* carousel 요소의 width 셋팅이 완료될 때까지 감춘다. */
// opacity: 0;
const CarouselSlides = styled.div`
  --currentSlide: ${props => props.currentSlide};
  --duration: ${props => props.duration};

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

const Carousel = ({ imagesUrl }) => {
  const [offsetWidth, setOffsetWidth] = useState('');
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isMoving, setIsMoving] = useState(false);

  return (
    <Container
      width={offsetWidth}
      onLoad={e => {
        setOffsetWidth(`${e.target.offsetWidth}px`);
      }}>
      <CarouselSlides
        currentSlide={currentSlide}
        duration={isMoving ? DURATION : 0}
        onTransitionEnd={() => {
          setIsMoving(false);
          if (currentSlide === 0) setCurrentSlide(imagesUrl.length);
          if (currentSlide === imagesUrl.length + 1) setCurrentSlide(1);
        }}>
        <MovieImg src={imagesUrl[imagesUrl.length - 1]} />
        {imagesUrl.map(url => (
          <MovieImg key={url} src={url} />
        ))}
        <MovieImg src={imagesUrl[0]} />
        {/* <MovieImg src="./src/movies/movie-4.jpg" />
        <MovieImg src="./src/movies/movie-1.jpg" />
        <MovieImg src="./src/movies/movie-2.jpg" />
        <MovieImg src="./src/movies/movie-3.jpg" />
        <MovieImg src="./src/movies/movie-4.jpg" />
        <MovieImg src="./src/movies/movie-1.jpg" /> */}
      </CarouselSlides>
      <PrevBtn
        onClick={() => {
          setIsMoving(true);
          setCurrentSlide(currentSlide - 1);
        }}
        disabled={isMoving}>
        &laquo;
      </PrevBtn>
      <NextBtn
        onClick={() => {
          setIsMoving(true);
          setCurrentSlide(currentSlide + 1);
        }}
        disabled={isMoving}>
        &raquo;
      </NextBtn>
    </Container>
  );
};

export default Carousel;
