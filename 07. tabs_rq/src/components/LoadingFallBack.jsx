import styled from 'styled-components';

const Spinner = styled.img`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate3D(-50%, 0, 0);
`;

const LoadingFallback = () => <Spinner src="/ball-triangle.svg" alt="Loading..." />;

export default LoadingFallback;
