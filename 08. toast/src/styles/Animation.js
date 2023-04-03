import { keyframes } from 'styled-components';

const enterFromRight = keyframes`
  from {
    transform: translate3D(100%, 0, 0);
  }

  to {
    transform: translate3D(0, 0, 0);
  }
`;

const enterFromLeft = keyframes`
  from {
    transform: translate3D(-100%, 0, 0);
  }

  to {
    transform: translate3D(0, 0, 0);
  }
`;

const dismissToRight = keyframes`
  from {
    transform: translate3D(0, 0, 0);
  }

  to {
    transform: translate3D(110%, 0, 0);
  }
`;

const dismissToLeft = keyframes`
  from {
    transform: translate3D(0, 0, 0);
  }

  to {
    transform: translate3D(-110%, 0, 0);
  }
`;

export { enterFromLeft, enterFromRight, dismissToLeft, dismissToRight };
