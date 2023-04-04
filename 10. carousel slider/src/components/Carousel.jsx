import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: ${props => props.width};
  margin: 0 auto;
  overflow: hidden;
  opacity: ${props => (props.width ? 1 : 0)};
`;

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

const FIRST_SLIDE_INDEX = 1;
const DURATION_MS = 500;

const Carousel = ({ images }) => {
  const [offsetWidth, setOffsetWidth] = useState('');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(FIRST_SLIDE_INDEX);
  const [isMoving, setIsMoving] = useState(false);

  const slideCount = images.length;
  const lastImageUrl = images.at(-1);
  const firstImageUrl = images.at(0);

  const setCarouselWidth = e => {
    setOffsetWidth(`${e.target.offsetWidth}px`);
  };

  const moveToPrevSlide = () => {
    setIsMoving(true);
    setCurrentSlideIndex(currentSlideIndex - 1);
  };

  const moveToNextSlide = () => {
    setIsMoving(true);
    setCurrentSlideIndex(currentSlideIndex + 1);
  };

  const handleTransitionEnd = () => {
    setIsMoving(false);
    if (currentSlideIndex === 0) setCurrentSlideIndex(slideCount);
    if (currentSlideIndex === slideCount + 1) setCurrentSlideIndex(FIRST_SLIDE_INDEX);
  };

  return (
    <Container width={offsetWidth} onLoad={setCarouselWidth}>
      <CarouselSlides
        currentSlide={currentSlideIndex}
        duration={isMoving ? DURATION_MS : 0}
        onTransitionEnd={handleTransitionEnd}>
        <MovieImg src={lastImageUrl} />
        {images.map((url, idx) => (
          <MovieImg key={`${url}-${idx}`} src={url} />
        ))}
        <MovieImg src={firstImageUrl} />
      </CarouselSlides>
      <PrevBtn onClick={moveToPrevSlide} disabled={isMoving}>
        &laquo;
      </PrevBtn>
      <NextBtn onClick={moveToNextSlide} disabled={isMoving}>
        &raquo;
      </NextBtn>
    </Container>
  );
};

export default Carousel;
